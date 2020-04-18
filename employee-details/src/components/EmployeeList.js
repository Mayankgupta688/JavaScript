import React from "react";
import employeeData from "../data/employeeList";

var componentStyling = {
    headerOne: {
        color: "red"
    }
}

export default function EmployeeList() {

    function getEmployeeDetails(event, employeeDetails) {
        alert(employeeDetails.name)
    }

    return (
        <>
            <h1 style={componentStyling.headerOne} id="headerData">Following is the list of Employees:</h1><hr/>

            { employeeData.map(function(emp, index) {
                return (
                    <div>
                        <div key={index} >
                            <img src={emp.avatar} />
                            <h1>Employee Data: {emp.name}</h1>
                            <h2>User Id is: {emp.id}</h2>
                            <h3>User Create On: {new Date(emp.createdAt).toDateString()}</h3>
                            <input type="button" value="Get Details" onClick={function(event) {
                                getEmployeeDetails(event, emp)
                            }} /><hr/>
                        </div>
                    </div>
                )
            })}
        </>
    )
}