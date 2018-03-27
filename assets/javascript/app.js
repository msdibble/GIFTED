$(document).ready(function() {

// Different forms of transportation that show up in the GIFs
    var transportation = ["car", "boat", "plane", "helicopter", "bicycle", "train", "walk", "motorcycle"];


    var GIFbutton;

// Creating new buttons for each variable in the transportation array

var createNewGIFButton = function () {

    // Area where GIF buttons are stored starts off empty
    $("newGIFButtons").empty();

    // For loop that loops through each individual variable in the array and creates new button for each
    for (var i = 0; i < transportation.length; i++) {
        // New button for each GIF in array created
        var GIFbutton = $("<button type =" + "button" + ">" + transportation[i] + "</button>").addClass("carBtn").attr("data-transportation", transportation[i]);
        $("#newGIFButtons").append(GIFbutton);

        $(".submit").on("click", function(){
            var newButton = $("#search-transportation").val().trim();
            transportation.push(newButton);
    
            });
    };
}

// GIF buttons created
createNewGIFButton();

$("#newGIFButtons").on("click", ".carBtn", function() {
    var transport = $(this).attr("data-transportation");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + transport + "&api_key=jxKwJklyrM9srNJJXsgQMwy6eaGkx7sG&limit=10";

// ajax is called to access the api object
$.ajax({
    url:queryURL,
    method: "GET"
}).done(function(response){
    console.log(response);

    var transportResults = response.data; // Data of the response stored in variable transportResults 

    // Loop through the array of results that has a limit of 10
    for (var i = 0; i < transportResults.length; i++) {

        // New div created to store gifs 
        var transportDiv = $("<div>");

        // Image tag created to show the gif
        var transportImage = $("<img>")

        // Rating tag created to show the rating of the gif
        var r = $("<p>").text("Rating: " + transportResults[i].rating);

        
        // A data state of still is added to the gifs
        transportImage.attr("src", transportResults[i].images.fixed_height_still.url);
        transportImage.attr("data-transportation-still", transportResults[i].images.fixed_height_still.url);

        // A data state of animation is added to the gifs
        transportImage.attr("data-transportation-animate", transportResults[i].images.fixed_height.url);
        transportImage.addClass("transGif");
        
        // Append the image into the transportImage div
        $("#GIFs").append(transportImage);
        // Append the rating into the rating div below the transportImage div
        $("#GIFs").append(r);

    }

    $(".transGif").on("click", function(event){
        event.preventDefault();
        $("newGIFButtons").empty();
        var gifState = $(this).attr("data-transportation-state");
        if (gifState === "still") {
        // If a gif is in a still state, click on it and then it animates
            $(this).attr("src", $(this).attr("data-transportation-animate"));
            $(this).attr("data-transportation-state", "animate");
        // If a gif is in an animation state, click on it again and it is still
        } else {
            $(this).attr("src", $(this).attr("data-transportation-still"));
            $(this).attr("data-transportation-state", "still");
        }    
        
    });
})

})

})