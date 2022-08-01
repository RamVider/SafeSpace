var loggedUser = "";
function headerSetup() {
    loggedUser = readUserFromSession()
    if (loggedUser) {
        $("#logoutLabel").removeClass('hidden');
        $("#loginLabel").addClass('hidden');
        $("#loggedUserName").text(loggedUser);
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
    if (moment().diff(moment(sessionStorage.getItem('expiration')), 'minutes') >= 20) {
        return "";
    }
    return sessionStorage.getItem('loggedUser');
}
function logout() {
    $.get(consts.url + "logout?userName=" + loggedUser, function (data, status) {});
    sessionStorage.clear();
    location.href = "/"
}
function popup(text) {
    var x = document.getElementById("snackbar");
    x.innerText = text;
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}