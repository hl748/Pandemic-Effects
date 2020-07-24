// Loading the Drop-down list and the Carouselgut
$(document).ready(function () {
  $('select').formSelect();
  $('.carousel').carousel();
});

// Global variable
var shortTerm = document.getElementsByName("shortTerm");
var keywordSearch = $("#keywordSearch")[0];

// new global variables
var title
var word
var titleArray = []
var removeWords = ['the', 'a', 'an', 'some', 'saw', 'time', 'really', 'today', 'dont', 'do', 'of', 'is', 'are', 'going', 'to', 'got', 'didnt', 'cant', 'can', 'will', 'finally', 'going', 'new', 'wait', 'think', 'just', 'see', 'one', 'still', 'might', 'shall', 'in', 'for', 'and', "",
  'be', 'as', 'arent', 'how', 'with', 'its', keywordSearch.value.toLowerCase()]
var displayObj = [{}];

console.log(displayObj)

// function to remove words
function RemoveWords() {
  title = title.replace(/[^a-zA-Z ]/g, "").toLowerCase()
  word = title.split(" ")
  word = word.filter(function (x) {
    return !removeWords.includes(x);
  });
  titleArray = titleArray.concat(word);
}

// function to sort and count number of duplicated words
function sortWords() {
  titleArray.sort();
  var current = null;
  var cnt = 0;
  for (var i = 0; i <= titleArray.length; i++) {
    if (titleArray[i] != current) {
      if (cnt > 0) {
        localStorage.setItem(cnt, current)
      }
      current = titleArray[i];
      cnt = 1;
    } else {
      
      localStorage.setItem(cnt, current)
      cnt++;
    }
  }
  if (cnt > 0) {
    localStorage.setItem(cnt, current)
  }

}

function largestCounts () {
  localStorage.getItem()
}

// The Guardian function
function GuardianSearch() {
  var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"
  var beginDate;
  if (shortTerm[0].checked === true) {
    beginDate = '2020-02-01'
    var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=2020-02-01&api-key=" + guardianAPI;
    console.log(keywordSearch)
    $.ajax({
      url: guardianURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < 10; i++) {
        title = response.response.results[i].webTitle

        RemoveWords()
      }
      sortWords()
      largestCounts()
      console.log(titleArray)
      console.log(displayObj)
    })
  }

  else {
    beginDate = moment().format("YYYYMMDD") - 10000
    var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=" + beginDate + "&api-key=" + guardianAPI;
    console.log(keywordSearch)
    $.ajax({
      url: guardianURL,
      method: "GET"
    }).then(function (response) {
      for (var i = 0; i < 10; i++) {
        console.log(response.response.results[i].webTitle)
      }
    }
    )
  }
}

// function NYTimesSearch() {
//     var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
//     var titleArray = [];
//     var NYTimesURL;
//     var beginDate;

//     if (shortTerm[0].checked === true) {
//         beginDate = 20200201;
//         NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
//         $.ajax({
//             url: NYTimesURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//         })
//     }
//     else {
//         beginDate = moment().format("YYYYMMDD") - 10000;
//         queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
//         $.ajax({
//             url: NYTimesURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log(response);
//         })
//     }
// }

$("#searchBtn").on("click", GuardianSearch)
// $("#searchBtn").on("click", NYTimesSearch);
