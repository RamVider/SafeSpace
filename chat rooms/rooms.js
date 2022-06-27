let users = ["cyvj", "nolj", "vbwioueai", "yvwiu", "in;nkj"];
let rooms = [{
    name: "grop 1",
    gropLink: "link"
}, {
    name: "grop 2",
    gropLink: "link2"
}, {
    name: "grop 3",
    gropLink: "link3"
}, {
    name: "grop 4",
    gropLink: "link4"
}, {
    name: "grop 5",
    gropLink: "link5"
}];

function creatNamesInHtml(users) {
    for (let i = 0; i < users.length; i++) {
        let div = `<div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                        <div class="nameSlot">
                            ${users[i]}
                        </div>
                    </div>
                </div>`;
        document.getElementById("usersContainer").innerHTML += div;
    }
}

function creatRoomsInHtml(rooms) {
    console.log(rooms.length)
    let container=""
    for (let i = 0; i < rooms.length; i++) {
        let div = `
                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 roomSlot" onclick="goToChat(${rooms.link})" >
                        ${rooms[i].name}
                    </div>`;
        container += div;
    }
    $("#roomsContainer").html(container)
}

function goToChat(link){
    
}


creatNamesInHtml(users)
creatRoomsInHtml(rooms)