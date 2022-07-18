$(function () {
    $("#header").load("/commonFiles/header.html");
});
var rooms = [];

var users = [];


function gett() {
    $.get(consts.url + "roomsToRoomsPage", function (data, status) {
        if(data!==""){
            rooms = JSON.parse(data)
            creatRoomsInHtml(rooms)
        }
    })
    $.get(consts.url + "usersToRoomsPage", function (data, status) {
        if (status === "success") {
            users = JSON.parse(data)
            creatNamesInHtml(users)
        } else {
            console.log("זה לא עובד")
        }
    })
}




function creatNamesInHtml(users) {
    document.getElementById("usersContainer").innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        let div = `<div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div class="nameSlot">
                            ${users[i].uName}
                        </div>
                    </div>
                </div>`;
        $("#usersContainer").append(div)
    }
}

function creatRoomsInHtml(rooms) {
    let container = ""
    for (let i = 0; i < rooms.length; i++) {
        let div = `
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 roomSlot" onclick="goToChat('${rooms[i].guid}')" >
                        ${rooms[i].roomName}
                    </div>`;
        container += div;
    }
    $("#roomsContainer").html(container)
}


gett()

function goToChat(guid) {
    location.href = "/chat/chat.html?guid=" + guid;
}

function createMorRoom() {
    if ($("#newGroopName").val() !== "") {
        let name = $("#newGroopName").val()
        $("#newGroopName").val()
        let uName = "fix_this"
        const d = new Date();
        let time = moment(d).format("YYYY_MM_DDTHH:mm:ss");
        let data = {
            "roomName": name,
            "guid": uName + "_" + time
        }
        $.post(consts.url + "rooms", data, function (data, status) { })
        gett()

    }
}




//pop up js
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}