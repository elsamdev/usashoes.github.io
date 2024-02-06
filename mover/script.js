let articles = [];

function renderArticles() {
  const articlesContainer = document.getElementById('articles-container');
  articlesContainer.innerHTML = '';

  articles.forEach((article, index) => {
    const articleElement = document.createElement('div');
    articleElement.classList.add('article');

    const imageElement = document.createElement('img');
    imageElement.src = article.images[0];
    articleElement.appendChild(imageElement);

    const titleElement = document.createElement('div');
    titleElement.classList.add('article-title');
    titleElement.textContent = article.title;
    articleElement.appendChild(titleElement);

    const positionInput = document.createElement('input');
    positionInput.type = 'number';
    positionInput.step = '1';
    positionInput.min = '1';
    positionInput.value = index + 1;
    positionInput.addEventListener('blur', () => {
      const newPosition = Number(positionInput.value) - 1;

      if (index !== newPosition && newPosition >= 0 && newPosition < articles.length) {
        const selectedArticle = articles.splice(index, 1)[0];
        articles.splice(newPosition, 0, selectedArticle);
        renderArticles();
      }
    });
    articleElement.appendChild(positionInput);

    articlesContainer.appendChild(articleElement);

    articleElement.addEventListener('click', () => {
      selectArticle(index);
    });
  });
}

function selectArticle(index) {
  const positionInputs = document.getElementsByTagName('input');
  for (let i = 0; i < positionInputs.length; i++) {
    positionInputs[i].classList.remove('selected');
  }
  if (index >= 0) {
    positionInputs[index].classList.add('selected');
  }
}

function saveChanges() {
  const downloadLink = document.getElementById('download-link');
  const modifiedData = JSON.stringify(articles, null, 2);
  const blob = new Blob([modifiedData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.style.display = 'block';
}

function discardChanges() {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      articles = data;
      renderArticles();
      selectArticle(-1);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.getElementById('save-button').addEventListener('click', saveChanges);
document.getElementById('discard-button').addEventListener('click', discardChanges);

fetch('products.json')
  .then(response => response.json())
  .then(data => {
    articles = data;
    renderArticles();
    selectArticle(-1);
  })
  .catch(error => {
    console.error('Error:', error);
  });