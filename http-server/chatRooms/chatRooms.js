$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);
});
var rooms = [];

var users = [];

isUserConnected();

function init() {
    $.get(consts.url + "getChatRooms", function (data, status) {
        if (data !== "") {
            rooms = JSON.parse(data)
            createRoomsInHtml(rooms)
        }
    })
    $.get(consts.url + "getUsers", function (data, status) {
        if (status === "success") {
            users = JSON.parse(data)
            createUsersInHtml(users)
        } else {
            console.log("זה לא עובד")
        }
    })
}

function createUsersInHtml(users) {
    loggedUser = readUserFromSession();
    document.getElementById("usersContainer").innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName !== loggedUser) {
            //בשורה 39 יש באג לא מובן אפשר הסבר?
            let div = `<div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div class="nameSlot" onclick="createPrivateChat(${users[i].userName})">
                            ${users[i].userName}
                        </div>
                    </div>
                </div>`;
            $("#usersContainer").append(div)
        }
    }
}

function createRoomsInHtml(rooms) {
    let container = ""
    rooms.forEach(room => {
        if (room.roomName) {
            let div = `
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 roomSlot" onclick="goToChat('${room.guid}')" >
                            ${room.roomName}
                        </div>`;
            container += div;
        } else if (room.addressee === userName) {
            let div = `<div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12  onclick="goToChat(${room.guid})"">
                            <div class="senderSlot" >
                                ${room.sender}
                            </div>
                        </div>
                    </div>`
            $("#privateChatContainer").append(div)
        }
    })
    $("#roomsContainer").html(container)
}

function createPrivateChat(addressee) {
    let data = {
        "sender": userName,
        "addressee": addressee,
        "guid": addressee + "+" + userName,
    }
    $.post(consts.url + "createPrivateChat", data, function (data, status) { })
    alert("הבקשה נשלחה")
    //ישלח לחלק בדטה בייס 
    //מהדטה בייס ישלח לאיש השני
    //לאיש השני יהיה כפתור קטן ליד השם של השולח
    // משם זה יקח את השולח והמקבל לצאט פרטי
}


function goToChat(guid) {
    location.href = "/chat/chat.html?guid=" + guid;
}

function createRoom() {
    if ($("#newGroopName").val() !== "") {
        let name = $("#newGroopName").val()
        const d = new Date();
        let time = moment(d).format("YYYY_MM_DDTHH:mm:ss");
        let data = {
            "roomName": name,
            "guid": userName + "_" + time
        }
        $.post(consts.url + "createRoom", data, function (data, status) { })
        init()

    }
}

init()
setInterval(function () {
    init()
}, 2000)


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