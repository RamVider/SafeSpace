var userList = []
var userInfo = []
function login() {
    let email = $("#loginEmail").val()
    let pass = $("#loginPassword").val()
    var userl = {
        email: email,
        password: pass
    }


    $.post(`http://localhost:3000/login`, userl, function (data, status) {
    if (status == "success") {
            alert(data)
            console.log(data)
        }
    })
}
function sendS() {
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

    })
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
function goToSignUp() {
    $("#login").hide()
    $("#signup").show()
    document.getElementById("signup").classList.remove('hidden')
}
function goToSignIn() {
    $("#login").show()
    $("#signup").hide()
    document.getElementById("login").classList.remove('hidden')
}