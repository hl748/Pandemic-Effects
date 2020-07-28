// Loading the Drop-down list and the Carouselgut
$(document).ready(function () {
    $('select').formSelect();
    $(".carousel").carousel({
        fullWidth: true,
    });
    function autoplay() {
        $(".carousel").carousel("next");
        setTimeout(autoplay,5500);
    }
    autoplay();
});

$(".current-date").text(moment().format("LLL"));

$("#preCOVID").addClass("hide");
$("#postCOVID").addClass("hide");


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

// The Guardian function - PAST - for preCOVID Section
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
        for (var i = 0; i < response.response.results.length; i++) {
            title = response.response.results[i].webTitle;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < sortableDisplayObj.length; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", (i + 1) + "word").appendTo($("#preCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// The Guardian function - PRESENT - for postCOVID Section
function GuardianSearchPresent() {
    var guardianAPI = "fac02636-ec64-432c-80e9-88d7553d783c"
    var guardianURL = "https://content.guardianapis.com/search?q=" + keywordSearch.value + "&api-key=" + guardianAPI;

    $.ajax({
        url: guardianURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.response.results.length; i++) {
            title = response.response.results[i].webTitle;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < sortableDisplayObj.length; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", (i + 1) + "word").appendTo($("#postCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// NYT function - PAST - for preCOVID Section
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
        NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + APIKey;
    }
    $.ajax({
        url: NYTimesURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.response.docs.length; i++) {
            title = response.response.docs[i].headline.print_headline;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < sortableDisplayObj.length; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", (i + 1) + "word").appendTo($("#preCOVID"));
        }
        sortableDisplayObj = [];
    })
}

// NYT function - PRESENT - for postCOVID Section
function NYTimesSearchPresent() {
    var APIKey = "2dUYhsd7NHElbbIY9bgav2GCAlGSin97";
    var NYTimesURL;
    beginDate = 20200315;
    endDate = moment().format("YYYYMMDD");
    NYTimesURL = "https:api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keywordSearch.value + "&begin_date=" + beginDate + "&end_date=" + endDate + "&api-key=" + APIKey;
    $.ajax({
        url: NYTimesURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.response.docs.length; i++) {
            title = response.response.docs[i].headline.print_headline;
            RemoveWords();
        }
        sortWords();
        for (var i = 0; i < sortableDisplayObj.length; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", (i + 1) + "word").appendTo($("#postCOVID"));
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

$("#searchBtn").on("click", function () {
    $("#preCOVID").removeClass("hide");
    $("#postCOVID").removeClass("hide");
    $(".commonWords").empty();
    
    if ($("#newsSource")[0][0].selected === true && $("#newsSource")[0][1].selected === true) {
        $(".commonWords").empty();
    }
    
    else if ($("#newsSource")[0][0].selected === true) {
            $("<img>").attr("src", "https://static01.nyt.com/vi-assets/images/share/1200x1200_t.png").attr("id", "NYTimesLogo").addClass("logos").appendTo(".card-title");
            NYTimesSearch();
    }
    
    else if ($("#newsSource")[0][1].selected === true) {
        $("<img>").attr("src", "https://www.daniellecitron.com/wp-content/uploads/2016/05/the-guardian-logo.jpg").attr("id", "guardianLogo").addClass("logos").appendTo(".card-title");
        GuardianSearch();
    }
})
