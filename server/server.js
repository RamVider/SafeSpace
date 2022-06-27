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
filePath = "/db/db.txt";

app.listen(3000)
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

app.get('/', function (req, res) {


})

function readFromFile() {
    return fs.readFileSync(filePath, 'utf-8');
}
function saveToFile(data) {
    try {
        fs.writeFileSync(filePath, data);
        console.log("File written successfully");
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
let users = readFromFile()
