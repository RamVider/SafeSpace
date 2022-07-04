const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
const app = express()
var bodyParser = require('body-parser');
const { json } = require('express/lib/response');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())
const fs = require('fs')
var usersFilePath = "/db/usersDB.txt";
var chatFilePath = "/db/dbChat.txt";

app.listen(3000)


//files system
function readFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}
function saveToFile(data, filePath) {
    try {
        fs.writeFileSync(filePath, data);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
//files system - END

//login page
function isUserExistForLogin(db, userEmail) {

}
app.post('/login', function (req, res) {
    let users = [];
    let result = "user don't exist";
    let db = readFromFile(usersFilePath)
    if (db !== "") {
        users = JSON.parse(db);
        let resUser = users.find(function (user) {
            return user.email.toLowerCase() === req.body.email.toLowerCase();
        });
        if (resUser !== undefined) {
            if (resUser.password === req.body.password) {
                result = "user confirmed";
            }
            else{
                result = "wrong password";
            }
        }
    }
    res.send(result)
});

app.post('/signin', function (req, res) {
    let users = [];
    let db = readFromFile(usersFilePath)
    let result = addUsersToDB(db, users, req.body)
    console.log(users)
    res.send(result)
});

function addUsersToDB(db, users, body) {
    if (db !== "") {
        users = JSON.parse(db)
        if (isUserEmailExist(body, users)) {
            return "user exist";
        }
        if (isUserNameExist(body, users)) {
            return "user name in used"
        }
    }
    users.push(body);
    saveToFile(JSON.stringify(users),usersFilePath)
    return "user added"
}
function isUserEmailExist(newUser, users) {
    let result = false;
    if (typeof users == "object" && users.length > 0) {
        let resUser = users.find(function (user) {
            return user.email === newUser.email
        })
        if (resUser !== undefined) {
            result = true
        }
    }
    return result
}
function isUserNameExist(newUser, users) {
    let result = false;
    if (typeof users == "object" && users.length > 0) {
        let resUser = users.find(function (user) {
            return user.uName === newUser.uName
        })
        if (resUser !== undefined) {
            result = true
        }
    }
    return result
}
//login page -END

//chat rooms page
app.get('/usersToRoomsPage', function (req, res) {

    res.send(readFromFile(usersFilePath))
})
//chat rooms page -END

//Chats
app.get("/dataToChat", function (req, res) {
    res.send(readFromFile(chatFilePath))
})
app.post("/takeDataFromChat", function (req, res) {
    let text = [];
    let db = readFromFile(chatFilePath)
    let result = addMessageToDB(db, text, req.body)
    console.log(text)
})
function addMessageToDB(db, text, body) {
    if (db !== "") {
        text = JSON.parse(db)
    }
    text.push(body);
    saveToFile(JSON.stringify(text), chatFilePath)
}


//Chats -END