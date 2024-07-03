const apiUrl = 'https://script.google.com/macros/s/AKfycbzqgvh8Vgm8z9wGP2V5-tSfRY7er4gNPDAiB_l3eAOYYfHkbgb5MdxhA1EKbMyEVayE9A/exec';

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

renderData();
setInterval(renderData, 60000);
