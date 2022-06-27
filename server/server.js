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
var filePath = "/db/db.txt";
var filePathToChat = "/db/dbChat.txt"

app.listen(3000)


//files system
function readFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}
function saveToFile(data,filePath) {
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
app.post('/', function (req, res) {
    let users = [];
    let db = readFromFile()
    let result = addUsersToDB(db, users, req.body)
    console.log(users)
    res.send(result)
});
function addUsersToDB(db, users, body) {
    if (db !== "") {
        users = JSON.parse(db)
        if (isUserExist(body, users)) {
            return "user exist";
        }
    }
    users.push(body);
    saveToFile(JSON.stringify(users))
    return "user added"
}
function isUserExist(newUser, users) {
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
//login page -END

//chat rooms page
app.get('/usersToRoomsPage', function (req, res) {
    res.send(readFromFile(filePath))
})
//chat rooms page -END

//Chats
app.get("/dataToChat", function (req, res) {
    res.send(readFromFile(filePathToChat))
})
app.post("/takeDataFromChat", function (req, res) {
    let text = [];
    let db = readFromFile(filePathToChat)
    let result = addMessageToDB(db, text, req.body)
    console.log(text)
})
function addMessageToDB(db, text, body) {
    if (db !== "") {
        text = JSON.parse(db)
    }
    text.push(body);
    saveToFile(JSON.stringify(text),filePathToChat)
}
//Chats -END