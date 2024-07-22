const apiUrl = 'https://fetchgfgarticlesapi.azurewebsites.net/gfgarticles';
const visitorApiUrl = 'https://geekwordsvisitorcounter.azurewebsites.net/totalgeekwordsviews?id=visitor_count';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data[0]; // The API now returns an array with a single object
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function renderData() {
    const jsonData = await fetchData();
    if (!jsonData) {
        showError();
        return;
    }

    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';

    // Render articles
    jsonData.articles.forEach((item) => {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
            <h2>${item.name}</h2>
            <p>Author | Tags: ${item.tags}</p>
            <a href="${item.link}" target="_blank">Read more</a>
        `;
        articlesContainer.appendChild(section);
    });

    // Render improvements
    jsonData.improvements.forEach((item) => {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
            <h2>${item.name}</h2>
            <p>Added Improvement in existing Article | Tags: ${item.tags}</p>
            <a href="${item.link}" target="_blank">Read more</a>
        `;
        articlesContainer.appendChild(section);
    });

    const note = document.createElement('p');
    note.classList.add('note');
    note.textContent = '*Stay tuned for even more insightful articles! New additions will automatically appear at the top of this section...*';
    articlesContainer.appendChild(note);

    const totalCount = jsonData.articles.length + jsonData.improvements.length;
    const authorCount = jsonData.articles.length;
    const improvementCount = jsonData.improvements.length;

    const totalSpan = document.getElementById('total-count');
    const authorSpan = document.getElementById('author-count');
    const improvementSpan = document.getElementById('improvement-count');

    animateCount(totalSpan, totalCount);
    animateCount(authorSpan, authorCount);
    animateCount(improvementSpan, improvementCount);

    // Automatically scroll articles-container
    autoScrollArticlesContainer();

    // Hide skeleton loader and show content
    document.getElementById('skeleton-loader').style.display = 'none';
    document.getElementById('content').style.display = 'block';
}

// The rest of the functions remain the same
function showError() {
    document.getElementById('skeleton-loader').style.display = 'none';
    document.getElementById('content').innerHTML = '<p>Error loading data. Please try again later.</p>';
    document.getElementById('content').style.display = 'block';
}

function animateCount(element, count) {
    let currentCount = 0;
    const animationDuration = 1000;
    const increment = Math.ceil(count / (animationDuration / 100));

    const interval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= count) {
            currentCount = count;
            clearInterval(interval);
        }
        element.textContent = currentCount;
    }, 10);
}

function autoScrollArticlesContainer() {
    const articlesContainer = document.getElementById('articles-container');
    const scrollSpeed = 1; // Adjust scroll speed as needed

    const scrollInterval = setInterval(() => {
        articlesContainer.scrollTop += scrollSpeed;
    }, 50); // Adjust scroll interval as needed

    // Stop scrolling when reaching the bottom of the container
    articlesContainer.addEventListener('scroll', () => {
        if (articlesContainer.scrollHeight - articlesContainer.scrollTop === articlesContainer.clientHeight) {
            clearInterval(scrollInterval);
        }
    });
}

async function fetchVisitorCount() {
    try {
        const response = await fetch(visitorApiUrl);
        const data = await response.json();
        return data.visitor_count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        return null;
    }
}

async function renderVisitorCount() {
    const visitorCount = await fetchVisitorCount();
    if (visitorCount === null) return;

    const visitorCountElement = document.getElementById('visitor-count');
    visitorCountElement.textContent = visitorCount;
}

async function init() {
    await renderData();
    await renderVisitorCount();
    setInterval(renderData, 60000);
    setInterval(renderVisitorCount, 60000);
}

window.addEventListener('load', init);
