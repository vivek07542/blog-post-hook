import React from 'react'
import Button from "../../../UI/Button/Button";

const UserList = (props) => {
    const editHandler =() =>{
        props.editClick(props.username)
    }
    const deleteHandler = () =>{
        props.deleteClick(props.username);
    }
    let eachChild = (
        <tr key={props.username}>
            <td>{props.username}</td>
            <td>{props.password}</td>
            <td>{props.role}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phonenumber}</td>
            <td>
                <Button className = "btn-sm" onClick = {editHandler}>Edit</Button>
            </td>
            <td>
                <Button className = "btn-sm" onClick = {deleteHandler}>Delete</Button>
            </td>
        </tr>
    )
    return (
        <>
        <tbody>
            {eachChild}
        </tbody>
    </>
    )
}
export default UserList;