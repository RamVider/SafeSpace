var loggedUser = "";
function headerSetup() {
    loggedUser = readUserFromSession()
    if (loggedUser) {
        $("#logoutLabel").removeClass('hidden');
        $("#loginLabel").addClass('hidden');
        $("#userName").text(loggedUser);
    }
}
function isUserConnected() {
    var loggedUser = readUserFromSession();
    if (loggedUser) {
        console.log(loggedUser);
        saveUserToSession(loggedUser)
    }
    else {
        sessionStorage.clear();
        location.href = "/logInPage/logIn.html"
    }
}
function saveUserToSession(userName) {
    sessionStorage.setItem('loggedUser', userName);
    sessionStorage.setItem('expiration', moment());
}
function readUserFromSession() {
    if (moment().diff(moment(sessionStorage.getItem('expiration')),'minutes') >= 20) {
        return "";
    }
    return sessionStorage.getItem('loggedUser');
}
function logout() {
    // $.post(consts.url + "deleteUserFromloggedUserDB", data, function (data, status) { })
    sessionStorage.clear();
    location.href = "/"
}
