$(function () {
    $("#header").load("/commonFiles/header.html");
});
let guid = window.location.search.split('?')[1].split('=')[1]
function sendMessage() {
    if ($("#input").val()) {
        let input = $("#input").val()
        let user = $("#uName").text()
        let data = {
            "input": input,
            "user": user
        }
        $.post(consts.url + "takeDataFromChat", data, function (data, status) { })
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
    $.get(consts.url + "dataToChat", function (data, status) {
        if (status === "success") {
            let message = JSON.parse(data)
            let messageCOntainer = ""
            for (let i = 0; i < message.length; i++) {
                let div = `
                    <div class="mesegeContainer">
                        <p class="uNameTitel">${message[i].user}</p>
                        <h3>${message[i].input}</h3>
                    </div>
                    </br>
                    </br>
                    </br>
                `
                messageCOntainer += div
            }
            $("#messages").html(messageCOntainer)
        }
    })
}, 500);



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}