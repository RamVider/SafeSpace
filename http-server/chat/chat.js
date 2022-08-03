$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);
});
var guid = window.location.search.split('?')[1].split('=')[1]
if(guid!=="anonymous"){
    isUserConnected();
}
function sendMessage() {
    if ($("#input").val()&&(guid=="anonymous"||loggedUser!=="")) {
        let input = $("#input").val()
        let user = loggedUser
        const d = new Date();
        let time = moment(d).format("YYYY_MM_DDTHH:mm:ss");
        let data = {
            "input": input,
            "user": user,
            "guid": guid,
            "time": time
        }
        $.post(consts.url + "sendMesegeToDB", data, function (data, status) {})
        getMassegeToChat()
        $("#input").val("");
    }
}
$(function () {
    $(document).keypress(function (event) {
        if ($("#input").is(":focus") && event.charCode == 13) {
            sendMessage();
        }
    });
});
function chekIfTheSenderIsTheUser(sender){
    if(sender==loggedUser){
        return "pull-left usercolor"
    }else{
        return "pull-right"
    }
}

function getMassegeToChat() {
    $.get(consts.url + "dataToChat", function (data, status) {
        if (status === "success" && data !== "") {
            let message = JSON.parse(data)
            let messageCOntainer = ""
            message.forEach(function(message)  {
                if (message.guid===guid) {
                    let side= chekIfTheSenderIsTheUser(message.user)
                    let div = `
                    <div class="row">
                        <div class="col-sm-10  maxWidth mesegeContainer ${side}" >
                                <p>${message.user}</p>
                                <h4 dir="rtl">${message.input}</h4>
                        </div>
                    </div>
                    `
                    messageCOntainer += div
                }
            });
            $("#messages").html(messageCOntainer)
        }
    })}
setInterval(getMassegeToChat, 1000);
getMassegeToChat()