import React from 'react';
import Modal from "../../../UI/Modal/Modal";
import EditUsers from "./EditUsers/EditUsers";
import NewUser from "./NewUser/NewUser";

const CreateUser = (props) => {
    const createUser = (
    <div>
        <h3> {props.editMode ? "Edit User" : "Create User"}</h3>
        {props.editMode ?
         <EditUsers  
            editMode = {props.editMode} 
            editObject = {props.editObject} 
            saveButtonHandler = {props.saveButtonHandler} 
            changeModeHandler = {props.modelClosed} 
         /> :
         <NewUser saveButtonHandler = {props.saveUserButtonHandler} 
         changeModeHandler = {props.modelClosed} />
        }
    </div>
    )
    return (
        <div>
        <Modal show={props.activePopup} modelClosed = {props.modelClosed}>
           {createUser}
       </Modal>
   </div>
    )
}
export default CreateUser;