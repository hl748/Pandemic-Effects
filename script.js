// Loading the Drop-down list
$(document).ready(function () {
    $('select').formSelect();
});

var shortTerm = document.getElementsByName("shortTerm");
var queryURL;
var keywordSearch = $("#keywordSearch")[0].value;

function NYTimesSearch() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var titleArray = [];
    var beginDate;

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