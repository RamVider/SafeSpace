var userList = []
var userInfo = []
function login() {
    let email = $("#loginEmail").val()
    let pass = $("#loginPassword").val()
    var user = {
        email: email,
        password: pass
    }


    $.post(consts.url + `login`, user, function (data, status) {
    if (status == "success") {
            if(data === "user confirmed"){
                location.href = "/chatRooms/chatRooms.html"
            }
            else{
                alert(data)
            }
        }
    })
}
function signIn() {
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
    $.post(consts.url + ``, user, function (data, status) {

    })
    $.post(consts.url + `signin`, user, function (data, status) {
        if (status == "success") {
            alert(data)
            console.log(data)
        }
    })
}
function getData() {
    $.get(consts.url + ``, function (data, status) {
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