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
    loggedUser = readUserFromSession();
    $.get(consts.url + "getChatRooms", function (data, status) {
        if (data !== "") {
            rooms = JSON.parse(data)
            createRoomsInHtml(rooms)
        }
    });
    getActiveUsers();
}
function getActiveUsers() {
    $.get(consts.url + "getUsers", function (data, status) {
        if (status === "success") {
            users = data
            createUsersInHtml(users)
        } else {
            console.log("זה לא עובד")
        }
    })
}
function createUsersInHtml(users) {
    let container = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i] !== loggedUser) {
            let chat = rooms.find(function (room) {
                return (room.addressee === users[i] && room.sender === loggedUser) || 
                       (room.addressee === loggedUser && room.sender === users[i]);
            });
            //בשורה 39 יש באג לא מובן אפשר הסבר?
            let div = `<ul li class="row">
                           <ul li class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                               <ul li class="nameSlot" onclick="createPrivateChat('${users[i]}')">
                                   ${users[i]} ${chat !== undefined ? `<i class="fa fa-0.5x fa-comments text-primary pull-right" aria-hidden="true"></i>` : ""}
                               </ul li>
                           </ul li>
                       </ul li>`;
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
                        <div class="col-sm-3 roomSlot" onclick="goToChat('${room.guid}')" >
                            ${room.roomName}
                        </div>`;
            roomContainer += div;
        }
        // else if (room.addressee === loggedUser) {
        //     let div = `<div class="row">
        //                 <div class="col-sm-12 nameSlot"  onclick="goToChat('${room.guid}')"">
        //                     <div class="senderSlot" >
        //                         ${room.sender}
        //                     </div>
        //                 </div>
        //             </div>`
        //     privateChatContainer += div
        // }
    })
    $("#roomsContainer").html(roomContainer)
    // $("#privateChatContainer").html(privateChatContainer)
}

function createPrivateChat(addressee) {
    let isLoggedFirst = loggedUser[0] > addressee[0];
    let guid = isLoggedFirst ? loggedUser + "+" + addressee : addressee + "+" + loggedUser;
    let data = {
        "sender": loggedUser,
        "addressee": addressee,
        "guid": guid,
    }
    $.post(consts.url + "createPrivateChat", data, function (data, status) { })
    popup("הבקשה נשלחה")
    goToChat(guid)
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
function checkForPrivateChatRequest() {

}

init()
setInterval(init, 60 * 1000 * 1.5)
setInterval(getActiveUsers, 2000);

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