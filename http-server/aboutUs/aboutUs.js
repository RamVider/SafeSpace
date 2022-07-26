$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);
});