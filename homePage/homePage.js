function openForm() {
  document.getElementById("myForm").style.display = "block";
  // window.location.href="C:/Users/yehud/Documents/project/SaveSpace/chatRooms/chats.html"
}
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function sendNum(){
  let phone= $("#phone").val()
  $.post(`http://localhost:3000/`, phone, function (data, status) {
    if (status === "success") {
        console.log("god")
    }
  });
}