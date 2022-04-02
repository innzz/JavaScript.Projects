let source = "the-times-of-india";
let apikey = "eac5e8d953e14688b3a94f5614f62fa9";
let newsTemplate = document.getElementById("newsTemplate");

// const newsSources = new XMLHttpRequest();
// newsSources.open('Get',`https://newsapi.org/v2/top-headlines?country=in&apiKey=eac5e8d953e14688b3a94f5614f62fa9`,true);
// newsSources.onload = function(){
//     let data = JSON.parse(this.responseText);
//     let newsSource = data.articles;
//     newsSource.forEach(function(element){
//         console.log(element.source.name);
//     });
// }
// newsSources.send();

let badge = document.getElementById('badge');
badge.innerText =(source);

const xhr = new XMLHttpRequest();
xhr.open(
  "Get",
  `https://newsapi.org/v2/everything?sources=${source}&apikey=${apikey}`,
  true
);
xhr.onload = function () {
  if (this.status === 200) {
    let data = JSON.parse(this.responseText);
    let articles = data.articles;
    let newsHtml = "";
    // console.log(articles);
    articles.forEach(function (element,index) {
        // console.log(element)
      let news = `
      <div class="newsCards">
              <h2 class="accordion-header">
                <button class="accordion-button bg-secondary bg-opacity-25" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                <h6><b>News ${index+1}</b>: ${element['title']}</h6>
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsTemplate">

                <div class="accordion-body">
                  ${element['content']} <a href="${element['url']}" target="_blank">Read more</a>
                </div>
              </div>
      </div>`;
      newsHtml += news;
    });
    newsTemplate.innerHTML = newsHtml;
  } 
  else 
  {
    console.error("Some error occured");
  }
};
xhr.send();

// search section
let search = document.getElementById("input");
let newsCards = document.getElementsByClassName('newsCards');
search.addEventListener("input",function(){
  // console.log(search.value);
  let inputVal = search.value;
  Array.from(newsCards).forEach(function(element){
    let cardTxt = element.getElementsByTagName('h6')[0].innerText;
    if(cardTxt.includes(inputVal))
    {
      element.style.display = 'block';
    }
    else
    {
      element.style.display = 'none';
    }
  })
});