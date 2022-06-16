let users = ["cyvj", "nolj", "vbwioueai", "yvwiu", "in;nkj"];
let rooms = ["grop 1", "prop 2", "prop 3", "prop 4"];


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


for (let i = 0; i < rooms.length; i++) {
    let div = `
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 roomSlot" >
                    ${rooms[i]}
                </div>`;
    document.getElementById("roomsContainer").innerHTML += div;
}