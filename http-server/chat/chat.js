$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);
});
var guid = window.location.search.split('?')[1].split('=')[1]
function sendMessage() {
    if ($("#input").val()) {
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
function getMassegeToChat() {
    console.log("gujhmn")
    $.get(consts.url + "dataToChat", function (data, status) {
        if (status === "success" && data !== "") {
            let message = JSON.parse(data)
            let messageCOntainer = ""
            message.forEach(function(message)  {
                if (message.guid===guid) {
                    let div = `
                        <div class="mesegeContainer">
                            <p class="uNameTitel">${message.user}</p>
                            <h3>${message.input}</h3>
                        </div>
                    `
                    messageCOntainer += div
                }
            });
            $("#messages").html(messageCOntainer)
        }
    })}
setInterval(getMassegeToChat(), 5000);
getMassegeToChat()