// Loading the Drop-down list and the Carouselgut
$(document).ready(function () {
    $('select').formSelect();
    $('.carousel').carousel();
});

$(".current-date").text(moment().format("LLL"));

// Global variable
var shortTerm = document.getElementsByName("shortTerm");
var keywordSearch = $("#keywordSearch")[0];

// The Guardian function
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

function NYTimesSearch() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var titleArray = [];
    var NYTimesURL;
    var beginDate;
    
    if (shortTerm[0].checked === true) {
        beginDate = 20200201;
        NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
        $.ajax({
            url: NYTimesURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }
    else {
        beginDate = moment().format("YYYYMMDD") - 10000;
        queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch + "&api-key=" + APIKey;
        $.ajax({
            url: NYTimesURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }
}

$("#searchBtn").on("click", GuardianSearch)
$("#searchBtn").on("click", NYTimesSearch);
