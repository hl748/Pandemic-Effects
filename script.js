// Loading the Drop-down list and the Carousel
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
