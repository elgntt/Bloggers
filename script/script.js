const monthNames = ["Январь", "Февраль", "Март", "Парель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

getDataFromApi('Бизнес')

function setData(data, cardClone) {
      const timestamp = data.publishedAt;
      const date = new Date(timestamp);
      cardClone.setAttribute('href', data.url);
      cardClone.querySelector('.card-author span').innerHTML = data.author;
      cardClone.querySelector('.card__title h3').innerHTML = data.title;
      cardClone.querySelector('.card__text p').innerHTML = data.description;
      cardClone.querySelector('.published-time').innerHTML = monthNames[date.getMonth()] + " " + date.getDate();
      cardClone.querySelector('.card-short__img img').setAttribute('src', data.urlToImage);

      return cardClone;

}

function addElements(data) {
      const blogs = document.querySelector('.blogs');
      const card = document.querySelector('.card__url');

      data.forEach(blog => {
            let cardClone = card.cloneNode(true);
            cardClone = setData(blog, cardClone);
            blogs.appendChild(cardClone);
      });
      card.remove();
}

const categoryButtons = document.querySelectorAll('.category-btn');

categoryButtons.forEach(btn => {
      btn.addEventListener('click', function(event) {
            getDataFromApi(btn.textContent);
            console.log(btn.textContent);
            event.preventDefault();
      })
})

function getDataFromApi(query) {
      fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=2897df6ae4d04534836cc6e3408af1eb&pageSize=20`)
      .then((response) => response.json())
      .then((data) => addElements(data.articles));
}

