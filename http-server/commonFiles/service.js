var loggedUser = "";
function headerSetup() {
    var loggedUser = readUserFromSession()
    if (loggedUser) {
        $("#logoutLabel").removeClass('hidden');
        $("#loginLabel").addClass('hidden');
        $("#userName").text(loggedUser);
    }
}
function isUserConnected() {
    debugger;
    var loggedUser = readUserFromSession();
    if (loggedUser) {
        console.log(loggedUser);
    }
    else{
        location.href = "/logInPage/logIn.html"
    }

    // $.get(consts.url + "isUserConnected?userName=" + loggedUser, function (data, status) {
    //     if (data) {
    //         console.log(data);
    //     }
    //     else {
    //         location.href = "/logInPage/logIn.html"
    //     }
    // })
}
function saveUserToSession(userName) {
    debugger;
    sessionStorage.setItem('loggedUser', userName);
}
function readUserFromSession() {
    return sessionStorage.getItem('loggedUser');
}
function logout(params) {
    sessionStorage.clear();
    location.href = "/homePage/homePage.html"
}
