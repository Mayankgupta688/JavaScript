import React, { useState, useEffect } from "react";

function getEmployees() {
    return [
        {
        "id": "1",
        "createdAt": "2018-12-03T11:37:42.015Z",
        "name": "Ms. Gaylord Streich",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jagan123/128.jpg"
      },
      {
        "id": "2",
        "createdAt": "2018-12-02T21:06:49.825Z",
        "name": "Roxanne Kunde",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/chaabane_wail/128.jpg"
      },
      {
        "id": "3",
        "createdAt": "2018-12-03T03:37:39.995Z",
        "name": "Dante Spencer",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/moscoz/128.jpg"
      },
      {
        "id": "4",
        "createdAt": "2018-12-03T11:07:34.261Z",
        "name": "Benny Hartmann",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/abdots/128.jpg"
      },
      {
        "id": "5",
        "createdAt": "2018-12-03T11:38:36.583Z",
        "name": "Easton Fisher",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/brenton_clarke/128.jpg"
      },
      {
        "id": "6",
        "createdAt": "2018-12-02T17:48:52.784Z",
        "name": "Mrs. Brandi Grant",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/g3d/128.jpg"
      },
      {
        "id": "7",
        "createdAt": "2018-12-02T17:57:35.899Z",
        "name": "Leopoldo Ortiz",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/aoimedia/128.jpg"
      },
      {
        "id": "8",
        "createdAt": "2018-12-03T06:31:54.963Z",
        "name": "Marielle Zulauf",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jjshaw14/128.jpg"
      },
      {
        "id": "9",
        "createdAt": "2018-12-03T00:28:30.136Z",
        "name": "Maynard Hilll",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/danro/128.jpg"
      },
      {
        "id": "10",
        "createdAt": "2018-12-03T13:42:04.578Z",
        "name": "Jovanny Dare",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/s4f1/128.jpg"
      }]
}

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
        var empList = getEmployees();
        setEmployeeList(empList)
        setEmployeeFilterList(empList)
        setEmpDetails({
          ...empDetails,
          id: empList.length + 1
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
      })

      setEmployeeFilterList(filteredList)
    }

    return (
        <div>

            <h1>Filter Data</h1>
            <input type="text" value={filterData} onChange={filterEmployeeList} />
            <br/><br/>

            <div style={{"border": "1px solid black", "marginBottom": "10px", "marginLeft": "10px"}}>

              <h1>{empDetails.id}</h1>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Name: </b>
              <input type="text" id="name" value={empDetails.name} onChange={updateEmployeeData} /><br/><br/>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Created At: </b>
              <input type="text" id="createdAt" value={empDetails.createdAt} onChange={updateEmployeeData} /><br/><br/>

              <b style={{"width": "150px", "display": "inline-block", "marginLeft": "10px", "marginTop": "5px"}}>Enter Avatar: </b>
              <input type="text" id="avatar" value={empDetails.avatar} onChange={updateEmployeeData} /><br/><br/>

              <input style={{"marginLeft": "10px"}} type="button" value="Add Employee" onClick={addEmployee} /><br/><br/>
            </div>

            {employeeFilterList.map(function(emp, index) {
                return (
                  <div key={index}>
                    <img src={emp.avatar} />
                    <h1>Employee Name: {emp.name}</h1>
                    <h2>Employee Created At: {emp.createdAt}</h2><hr/>
                  </div>
                )
            })}
        </div>
    )
}