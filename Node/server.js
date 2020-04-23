var express = require("express");
var app = express();
var fs = require("fs");

app.get("/data", function(req, res) {
    fs.readFile("./data.json", function(err, data) {
        let studentList = JSON.parse(data)
        res.send(studentList.employeeData)
    })
})

app.get("/data/:id", function(req, res) {
    fs.readFile("./data.json", function(err, data) {
        let studentList = JSON.parse(data)
        studentList.employeeData = studentList.employeeData.filter(function(emp) {
            if(emp.id == req.params.id) {
                return true;
            } else {
                return false;
            }
        })
        res.send(studentList.employeeData[0])
    })
})

app.get("/", function(req, res) {
    res.send("Hello World...")
})

app.listen(8000);