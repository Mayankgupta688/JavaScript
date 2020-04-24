var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/data", function(req, res) {
    fs.readFile("./data.json", function(err, data) {
        let studentList = JSON.parse(data)
        res.send(studentList.employeeData)
    })
})

app.get("/data/:id", function(req, res) {
    fs.readFile("./data.json", function(err, data) {
        let studentList = JSON.parse(data);
        studentList.employeeData = studentList.employeeData.filter(function(emp) {
            if(emp.id == req.params.id) {
                return true;
            } else {
                return false;
            }
        })
        res.send(studentList.employeeData[0]);
    })
})

app.post("/postdata", function(req, res) {
    var userName = req.body.userName;
    res.send("Application processed for the user: " + userName);
})

app.get("/postdata", function(req, res) {
    var userName = req.query.userName;
    res.send("Application processed for the user: " + userName);
})

app.get("/", function(req, res) {
    fs.readFile("./templates/index.html", function(err, data) {
        res.send(data.toString());
    })
    var a = 10;
    console.log(a)
})

app.get("/async", function(req, res) {
    var data = fs.readFileSync("./templates/index.html");
    res.send(data.toString());
})

app.listen(8000);