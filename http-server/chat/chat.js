function sendMessage() {
    if ($("#input").val()) {
        let input = $("#input").val()
        let user = $("#uName").text()
        let data = {
            "user": user,
            "input": input,
        }
        $.post("http://localhost:3000/takeDataFromChat", data, function (data, status) { })
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

setInterval(function () {
    $.get("http://localhost:3000/dataToChat", function (data, status) {
        if (status === "success") {
            // console.log(JSON.parse(data))
            let message = JSON.parse(data)
            let messageCOntainer=""
            for (let i = 0; i < message.length; i++) {
                let div=`
                    <div class="mesegeContainer">
                        <p class="uNameTitel">${message[i].user}</p>
                        <h3>${message[i].input}</h3>
                    </div>
                    </br>
                    </br>
                    </br>
                `
                messageCOntainer+=div
            }
            console.log(messageCOntainer)
            $("#messages").html(messageCOntainer)
        }
    })
}, 20);