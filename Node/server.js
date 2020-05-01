var express = require("express");
var app = express();
var fs = require("fs");
var mongoDBClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017/";
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

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

app.post("/postdata", function(req, outputResponse) {

    mongoDBClient.connect(mongoUrl, function(err, mongoDatabase) {
        if(err) {
            console.log("Error Occured During Execution....")
        }
    
        var employeeList = mongoDatabase.db("employeeData")
    
        employeeList.createCollection("employees", function(err, res) {
            var employees = employeeList.collection("employees");
    
            employees.insertOne({
                name: req.body.userName,
                createdAt: req.body.userCreatedAt,
                userAvatar: req.body.userAvatar
            }, function(err, response) {
                outputResponse.send("Entry added tro the database....")
            })
        })
    })
})

app.get("/postdata", function(req, res) {
    var userName = req.query.userName;

    var mongoDBClient = require("mongodb").MongoClient;
    var mongoUrl = "mongodb://localhost:27017/";

    mongoDBClient.connect(mongoUrl, function(err, mongoDatabase) {
        if(err) {
            console.log("Error Occured During Execution....")
        }

        var employeeList = mongoDatabase.db("employeeData")

        employeeList.createCollection("employees", function(err, res) {
            var employees = employeeList.collection("employees");

            employees.insertOne({
                name: req.query.userName,
                age: req.query.userAge
            }, function(err, response) {
                if(err) {
                    console.log("Error Inserting Data")
                } 
                console.log("Data Inserted Successfully...")

                employees.find({}).toArray(function(err, result) {

                    if(err) {
                        console.log("Error Retrieving Data")
                    }

                    employees.deleteOne({name: "Rahul Garg"}, function(err, obj) {
                        console.log("Employee with Name: " + obj.name + " deleted from database...")
                    })

                    console.log(result.name + " " + result.age)

                    mongoDatabase.close();
                })

            })

            
        })
    })
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