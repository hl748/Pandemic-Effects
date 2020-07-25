// Loading the Drop-down list and the Carouselgut
$(document).ready(function () {
    $('select').formSelect();
    $('.carousel').carousel();
});

$(".current-date").text(moment().format("LLL"));

// Global variable
var keywordSearch = $("#keywordSearch")[0];

// new global variables
var title
var word
var titleArray = []
var removeWords = ['the', 'a', 'an', 'some', 'saw', 'time', 'really', 'today', 'dont', 'do', 'of', 'is', 'are', 'going', 'to', 'got', 'didnt', 'cant', 'can', 'will', 'finally', 'going', 'new', 'wait', 'think', 'just', 'see', 'one', 'still', 'might', 'shall', 'in', 'for', 'and', "",
    'be', 'as', 'arent', 'how', 'with', 'its', keywordSearch.value.toLowerCase()]
var displayObj = {};

// function to remove words
function RemoveWords() {
    if (title !== null) {
        title = title.replace(/[^a-zA-Z ]/g, "").toLowerCase()
        word = title.split(" ")
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
    localStorage.setItem("titleArray", JSON.stringify(titleArray));
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
    var maxValue = 0;
    var maxKey;
    var sortableDisplayObj = [];
    for (var [key, value] of Object.entries(displayObj)) {
        if (`${value}` > maxValue) {
            maxValue = `${value}`;
            maxKey = `${key}`;
        }
        console.log(`${key}: ${value}`);
        // console.log(displayObj);
    }
    
    for (var keyword in displayObj) {
        sortableDisplayObj.push([keyword], displayObj[keyword]);
    }
    sortableDisplayObj.sort(function (a, b) {
        return a[1] - b[1];
    })
    console.log(sortableDisplayObj);
    $("<p>").text(maxKey).appendTo($("#preCOVID"))
    // console.log(maxValue);
    // console.log(maxKey);

    if (cnt > 0) {
    }
}
// Find all the keys in key/values with max values

// The Guardian function
function GuardianSearch() {
    var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"
    var beginDate;
    if ($("#shortTerm")[0].checked === true) {
        var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=2020-02-01&api-key=" + guardianAPI;

    } else {
        beginDate = moment().format("YYYYMMDD") - 10000
        var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&from-date=" + beginDate + "&api-key=" + guardianAPI;
    }

    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.results[i].webTitle
            RemoveWords()
        }
        sortWords()
        // console.log(titleArray)
        // console.log(displayObj)
    })
}

function NYTimesSearch() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var NYTimesURL;
    var beginDate;

    if ($("#shortTerm")[0].checked === true) {
        beginDate = 20200201;
        NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&api-key=" + APIKey;
    } else {
        beginDate = moment().format("YYYYMMDD") - 10000;
        queryURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&api-key=" + APIKey;
    }
    $.ajax({
        url: NYTimesURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 10; i++) {
            title = response.response.docs[i].headline.print_headline
            RemoveWords()
        }
        sortWords()
        // console.log(titleArray)
        // console.log(displayObj)
    })
}

// $("#searchBtn").on("click", GuardianSearch)
$("#searchBtn").on("click", NYTimesSearch);
