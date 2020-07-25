// Loading the Drop-down list and the Carouselgut
$(document).ready(function () {
    $('select').formSelect();
    $('.carousel').carousel();
});

$("#newsSource").on("click", function() {
    console.log($("#newsSource").value);
})

$(".current-date").text(moment().format("LLL"));

// Global variable
var keywordSearch = $("#keywordSearch")[0];

// new global variables
var title;
var word;
var titleArray = [];
var removeWords = ['the', 'a', 'an', 'some', 'saw', 'time', 'really', 'today', 'dont', 'do', 'of', 'is', 'are', 'going', 'to', 'got', 'didnt', 'cant', 'can', 'will', 'finally', 'going', 'new', 'wait', 'think', 'just', 'see', 'one', 'still', 'might', 'shall', 'in', 'for', 'and', "", 'be', 'as', 'arent', 'how', 'with', 'its', keywordSearch.value.toLowerCase()];
var beginDate;
var endDate;
var displayObj = {};
var sortableDisplayObj = [];

// function to remove words
function RemoveWords() {
    if (title !== null) {
        title = title.replace(/[^a-zA-Z ]/g, "").toLowerCase();
        word = title.split(" ");
        word = word.filter(function (x) {
            return !removeWords.includes(x);
        });
        titleArray = titleArray.concat(word);
    }
}

// function to sort and count number of duplicated words
function sortWords() {
    titleArray.sort();
    var current = null;
    var cnt = 0;
    for (var i = 0; i <= titleArray.length; i++) {
        if (titleArray[i] != current) {
            if (cnt > 0) {
                displayObj[titleArray[i]] = cnt;
            }
            current = titleArray[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }

    for (var keyword in displayObj) {
        sortableDisplayObj.push([keyword, displayObj[keyword]]);
    }
    sortableDisplayObj.sort(function (a, b) {
        return b[1] - a[1];
    })

    if (cnt > 0) {
    }
}

// Find all the keys in key/values with max values

// The Guardian function - PAST
function GuardianSearchPast() {
    var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"

    if ($("#shortTerm")[0].checked === true) {
        var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=2020-02-01&to-date=2020-03-01&api-key=" + guardianAPI;

    } else {
        beginDate = moment().subtract(1, "years").format("YYYY-MM-DD");
        console.log(beginDate);
        endDate = moment().subtract(11, "months").format("YYYY-MM-DD");
        console.log(endDate);
        var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=" + beginDate + "&to-date" + endDate + "&api-key=" + guardianAPI;
    }

    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.results[i].webTitle;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < 10; i++) {
            $("<p>").text(sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).appendTo($("#preCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// The Guardian function - PRESENT
function GuardianSearchPresent() {
    var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"
    var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&api-key=" + guardianAPI;

    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.results[i].webTitle;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < 10; i++) {
            $("<p>").text(sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).appendTo($("#postCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// NYT function - PAST
function NYTimesSearchPast() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var NYTimesURL;

    if ($("#shortTerm")[0].checked === true) {
        beginDate = 20200201;
        endDate = 20200301;
        NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + APIKey;
    } else {
        beginDate = moment().format("YYYYMMDD") - 10000;
        endDate = beginDate + 100;
        queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + APIKey;
    }
    $.ajax({
        url: NYTimesURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.docs[i].headline.print_headline;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < 10; i++) {
            $("<p>").text(sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).appendTo($("#preCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// NYT function - PRESENT
function NYTimesSearchPresent() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var NYTimesURL;
    beginDate = 20200315;
    queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&begin_date=" + beginDate + "&api-key=" + APIKey;
    $.ajax({
        url: NYTimesURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.docs[i].headline.print_headline;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < 10; i++) {
            $("<p>").text(sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).appendTo($("#postCOVID"));
        }
        sortableDisplayObj = [];
    })
}

function GuardianSearch() {
    GuardianSearchPast();
    GuardianSearchPresent();
}

function NYTimesSearch() {
    NYTimesSearchPast();
    NYTimesSearchPresent();
}

$("#searchBtn").on("click", GuardianSearch);
// $("#searchBtn").on("click", NYTimesSearch);
