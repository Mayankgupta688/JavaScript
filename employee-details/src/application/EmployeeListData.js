import React from "react";

export default function EmployeeListData(props) {
    return (
        <>
            <img src={props.employee.avatar} />
            <h1>Employee Name: {props.employee.name}</h1>
            <h2>Employee Created At: {props.employee.createdAt}</h2>
            <input type="button" id={props.employee.id} value={"Delete " + props.employee.name} onClick={props.deleteEmployee} /><hr/>
        </>
    )
}