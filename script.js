<<<<<<< HEAD
// Loading the Drop-down list and the Carousel
=======
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
  $('select').formSelect();
});

// Global variable
var shortTerm = document.getElementsByName("shortTerm");
var keywordSearch = $("#keywordSearch")[0];
console.log(keywordSearch)


// The guardian function
function GuardianSearch() {

  var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"
  var beginDate;

  if (shortTerm[0].checked === true) {

    beginDate = "2020-02-01"
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

  if (shortTerm[0].checked === true) {

    beginDate = moment().format("YYYYMMDD")-10000
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

$("#searchBtn").on("click", GuardianSearch)

// Loading the Drop-down list and the Carouselgut
>>>>>>> d01c2fb6cf41341f61523120f57f3c874db00b3a
$(document).ready(function () {
    $('select').formSelect();
    $('.carousel').carousel();
});

var shortTerm = document.getElementsByName("shortTerm");
var queryURL;
var keywordSearch = $("#keywordSearch")[0];

function NYTimesSearch() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var titleArray = [];
    var beginDate;
    keywordSearch = keywordSearch.value;

    if (shortTerm[0].checked === true) {
        beginDate = 20200201;
        queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }
    else {
        beginDate = moment().format("YYYYMMDD") - 10000;
        queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }
}

$("#searchBtn").on("click", NYTimesSearch);
