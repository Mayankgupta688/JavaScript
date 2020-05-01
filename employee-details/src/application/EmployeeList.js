import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeListData from "./EmployeeListData";



export default function EmployeeList() {

    var [employeeList, setEmployeeList] = useState([]);
    var [employeeFilterList, setEmployeeFilterList] = useState([]);

    var [filterData, setFilterData] = useState("");

    var [empDetails, setEmpDetails] = useState({
      id: employeeList.length + 1,
      name: "Rahul Garg",
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jagan123/128.jpg",
      createdAt: "2018-12-03T11:37:42.015Z"
    });

    useEffect(function() {

        var returnPromise = axios.get("http://localhost:8000/data")
        
        returnPromise.then(function(res) {
          var empList = res.data;
          setEmployeeList(empList)
          setEmployeeFilterList(empList)
          setEmpDetails({
            ...empDetails,
            id: empList.length + 1
          })
        }, function() {
          console.log("Promise Rejection...")
        })  

    }, [])

    function addEmployee() {
      setEmployeeList([
        empDetails,
        ...employeeList
      ])

      setEmpDetails({
        ...empDetails,
        id: empDetails.id + 1
      })
    }

    function updateEmployeeData(event) {
      debugger;
      setEmpDetails({
        ...empDetails,
        [event.target.id]: event.target.value
      })
    }

    function filterEmployeeList(event) {
      setFilterData(event.target.value)

      var filteredList = employeeList.filter(function(emp) {
        if(emp.name.indexOf(event.target.value) > -1) {
          return true;
        }

        return false;
      })

      setEmployeeFilterList(filteredList)
    }

    function deleteEmployee(event) {
      debugger;
      var deletedArray = employeeList.filter(function(emp) {
        if(emp.id == event.target.id) {
          return false;
        }
        return true;
      })

      setEmployeeList(deletedArray);
      setEmployeeFilterList(deletedArray);
    }

    return (
        <div>

            <h1>Filter Data</h1>
              <input type="text" value={filterData} onChange={filterEmployeeList} />
            <br/><br/>

            <form method="post" action="http://localhost:8000/postdata" style={{"border": "1px solid black", "marginBottom": "10px", "marginLeft": "10px"}}>

              <h1>Next Id: {empDetails.id}</h1>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Name: </b>
              <input type="text" id="name" value={empDetails.name} onChange={updateEmployeeData} name="userName" /><br/><br/>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Created At: </b>
              <input type="text" id="createdAt" value={empDetails.createdAt} onChange={updateEmployeeData} name="userCreatedAt"/><br/><br/>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Avatar: </b>
              <input type="text" id="avatar" value={empDetails.avatar} onChange={updateEmployeeData} name="userAvatar" /><br/><br/>

              <input style={{"marginLeft": "10px"}} type="submit" value="Add Employee" /><br/><br/>
            </form>

            {employeeFilterList.map(function(emp, index) {
                return (
                  <div key={index}>
                    <EmployeeListData employee={emp} deleteEmployee={deleteEmployee} ></EmployeeListData>
                  </div>
                )
            })}
        </div>
    )
}