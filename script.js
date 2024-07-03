const apiUrl = 'https://gfgarticleapi.azurewebsites.net/article'; // Replace 'https://your-new-api-url.com' with your actual API URL

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function renderData() {
    const jsonData = await fetchData();
    if (!jsonData) return;

    const articlesContainer = document.getElementById('articles-container');
    articlesContainer.innerHTML = '';

    jsonData.forEach((item, index) => {
        const section = document.createElement('div');
        section.classList.add('section');
        section.innerHTML = `
            <h2>${item.Title}</h2>
            <p>${item.Article_Type} | Tags: ${item.Tags}</p>
            <a href="${item.Link}" target="_blank">Read more</a>
        `;
        articlesContainer.appendChild(section);
    });

    const note = document.createElement('p');
    note.classList.add('note');
    note.textContent = '*Stay tuned for even more insightful articles! New additions will automatically appear at the top of this section...*';
    articlesContainer.appendChild(note);

    const totalCount = jsonData.length;
    const authorCount = jsonData.filter(item => item.Article_Type === 'Author').length;
    const improvementCount = jsonData.filter(item => item.Article_Type === 'Added Improvement in existing Article').length;

    const totalSpan = document.getElementById('total-count');
    const authorSpan = document.getElementById('author-count');
    const improvementSpan = document.getElementById('improvement-count');

    animateCount(totalSpan, totalCount);
    animateCount(authorSpan, authorCount);
    animateCount(improvementSpan, improvementCount);
    
    // Automatically scroll articles-container
    autoScrollArticlesContainer();
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

const visitorApiUrl = 'https://geekwordsvisitorcounter.azurewebsites.net/totalgeekwordsviews?id=visitor_count'; // Replace with your actual visitor API URL

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

// Call renderVisitorCount initially and then refresh every 
renderData();
setInterval(renderData, 60000);
