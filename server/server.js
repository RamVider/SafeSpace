const fs = require('fs')
filePath = "/db/db.txt";
const express = require('express')
const cors = require('cors')
const res = require('express/lib/response')
const app = express()
var bodyParser = require('body-parser');
const { json } = require('express/lib/response');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.listen(3000)
app.post('/', function (req, res) {

    let users = [];
    let db = readFromFile()
    if (db!==""){   
        db = JSON.parse(db)
        if (typeof db == "object" && db.length > 0) {
            users = db;
        }
    }
    console.log(users)
    users.push(req.body)
    saveToFile(JSON.stringify(users))

})

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


app.get('/usersToRoomsPage', function (req, res) {
    res.send(users)
})