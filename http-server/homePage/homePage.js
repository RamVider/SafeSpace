$(function () {
  $("#header").load("/commonFiles/header.html");
  setTimeout(() => {
    headerSetup()
}, 50);
});

function goToChat(guid) {
  location.href = "/chat/chat.html?guid=" + guid;
}