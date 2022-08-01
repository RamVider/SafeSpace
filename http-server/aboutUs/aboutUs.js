$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);
    $("img").attr("src","https://startupistim3.s3.eu-central-1.amazonaws.com/assets/tick.png");
});