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
            name: "Ankit Gupta",
            age: 30
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