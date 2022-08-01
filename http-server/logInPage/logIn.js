$(function () {
    $("#header").load("/commonFiles/header.html");
    setTimeout(() => {
        headerSetup()
    }, 50);

    $("body").keypress(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            if (isSignUp) {
                signIn();
            }
            else {
                login();
            }
        }
    })
});
var isSignUp = false;
var userList = []
var userInfo = []
function login() {
    let email = $("#loginEmail").val()
    let pass = $("#loginPassword").val()
    var user = {
        email: email,
        password: pass
    }


    $.post(consts.url + "login", user, function (data, status) {
        if (status == "success") {
            if (data.status === "user confirmed") {
                saveUserToSession(data.userName);
                location.href = "/chatRooms/chatRooms.html";
            }
            else {
                popup(data)
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
        userName: uName,
        email: email,
        phone: phone
    };
    $.post(consts.url + ``, user, function (data, status) {

    })
    $.post(consts.url + `signin`, user, function (data, status) {
        if (status == "success") {
            popup(data)
            console.log(data)
            if (data == "user added") {
                location.href = "/logInPage/logIn.html"
            }
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
    isSignUp = true;
    document.getElementById("signup").classList.remove('hidden')
}
function goToSignIn() {
    $("#login").show()
    $("#signup").hide()
    isSignUp = false;
    document.getElementById("login").classList.remove('hidden')
}