// Loading the Drop-down list and the Carousel
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

// Global variables
var keywordSearch = $("#keywordSearch")[0];
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
    displayObj = {};
    sortableDisplayObj = [];
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
    titleArray = [];
}

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
        for (var i = 0; i < 10; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", "word" + (i+1)).appendTo($("#preCOVID"));
        }
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
        for (var i = 0; i < 10; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", "word" + (i + 1)).appendTo($("#postCOVID"));
        }
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
        for (var i = 0; i < 10; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", "word" + (i + 1)).appendTo($("#preCOVID"));
        }
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
        for (var i = 0; i < 10; i++) {
            $("<p>").addClass("commonWords").html((i + 1) + '. ' + sortableDisplayObj[i][0].charAt(0).toUpperCase() + sortableDisplayObj[i][0].slice(1)).attr("id", "word" + (i + 1)).appendTo($("#postCOVID"));
        }
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

$("<img>").attr("src", "https://cms.groupeditors.com/img/dfd82319-1720-487e-88f2-8ef4f6e1da21.jpg?crop=100,0,500,400&w=400&h=400&scale=both").attr("id", "NYTimesLogo").addClass("NYTimesLogos").appendTo(".card-title");
$("<img>").attr("src", "https://pbs.twimg.com/profile_images/1175141826870861825/K2qKoGla_400x400.png").attr("id", "guardianLogo").addClass("guardianLogos").appendTo(".card-title");
$(".NYTimesLogos").addClass("hide");
$(".guardianLogos").addClass("hide");

$("#searchBtn").on("click", function () {
    $("#preCOVID").removeClass("hide");
    $("#postCOVID").removeClass("hide");
    // $(".carousel").addClass("hide");
    $(".commonWords").empty();

    if ($("#newsSource")[0][0].selected === true && $("#newsSource")[0][1].selected === true) {

    }

    else if ($("#newsSource")[0][0].selected === true) {
        $(".guardianLogos").addClass("hide");
        $(".NYTimesLogos").removeClass("hide");
        NYTimesSearch();
    }

    else if ($("#newsSource")[0][1].selected === true) {
        $(".NYTimesLogos").addClass("hide");
        $(".guardianLogos").removeClass("hide");
        GuardianSearch();
    }
})
