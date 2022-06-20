var userList = []
function send() {
    let name = $("#fName").val();
    let age = $("#age").val();
    let uName = $("#userName").val();
    let pass = $("#password").val();
    let email = $("#mail").val();
    let phone = $("#phoneNumber").val();

    var user = {
        name: name,
        password: pass,
        age: age,
        uName: uName,
        email: email,
        phone: phone
    };
    $.post(`http://localhost:3000/`, user, function (data, status) {
        if (status == "success") {
            alert(data)
            console.log(data)
        }


    })
}
function getData() {
    $.get(`http://localhost:3000/`, function (data, status) {
        if (status == "success") {
            userList = data
        }


    })
}
