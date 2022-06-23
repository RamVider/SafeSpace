function sendMessage() {
    if ($("#input").val()) {
        $("#messages").append("<br/>" + $("#input").val());
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