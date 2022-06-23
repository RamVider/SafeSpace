function sendMessage() {
    if ($("#input").val()) {
        let input = $("#input").val() 
        let user = $("#uName").text()
        let data={
            "user":user,
            "input":input,
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