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
    let container = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i].userName !== loggedUser) {
            //בשורה 39 יש באג לא מובן אפשר הסבר?
            let div = `<div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div class="nameSlot" onclick="createPrivateChat('${users[i].userName}')">
                            ${users[i].userName}
                        </div>
                    </div>
                </div>`;
            container += div
        }
    }
    $("#loggedUsersContainer").html(container)
}

function createRoomsInHtml(rooms) {
    let roomContainer = ""
    let privateChatContainer = ""
    rooms.forEach(room => {
        if (room.roomName) {
            let div = `
                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 roomSlot" onclick="goToChat('${room.guid}')" >
                            ${room.roomName}
                        </div>`;
            roomContainer += div;
        } else if (room.addressee === loggedUser) {
            let div = `<div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 nameSlot"  onclick="goToChat('${room.guid}')"">
                            <div class="senderSlot" >
                                ${room.sender}
                            </div>
                        </div>
                    </div>`
            privateChatContainer += div
        }
    })
    $("#roomsContainer").html(roomContainer)
    $("#privateChatContainer").html(privateChatContainer)
}

function createPrivateChat(addressee) {
    let data = {
        "sender": loggedUser,
        "addressee": addressee,
        "guid": addressee + "+" + loggedUser,
    }
    $.post(consts.url + "createPrivateChat", data, function (data, status) { })
    alert("הבקשה נשלחה")
    goToChat(addressee + "+" + loggedUser)
    //ישלח לחלק בדטה בייס 
    //מהדטה בייס ישלח לאיש השני
    //לאיש השני יהיה כפתור קטן ליד השם של השולח
    // משם זה יקח את השולח והמקבל לצאט פרטי
}


function goToChat(guid) {
    location.href = "/chat/chat.html?guid=" + guid;
}

function createRoom() {
    closeModal()
    if ($("#newGroopName").val() !== "") {
        let name = $("#newGroopName").val()
        let time = moment().format("YYYY_MM_DDTHH:mm:ss");
        let data = {
            "roomName": name,
            "guid": loggedUser + "_" + time
        }
        $.post(consts.url + "createRoom", data, function (data, status) { })
        init()

    }
}

init()
setInterval(function () {
    init()
}, 60*1000*1.5)

//pop up js
// Get the modal
var modal = $("#myModal")[0];

// Get the button that opens the modal
var btn = $("#myBtn")[0];

// When the user clicks the button, open the modal 
function openModal() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}