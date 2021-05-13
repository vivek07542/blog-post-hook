import React, {useState } from "react";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import EditProfile from "./EditProfile/EditProfile";
import {useDispatch, useSelector} from "react-redux";
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";

  const MyProfile = () => {
    const[editMode,setEditMode] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.Login.loggedInUser);   
    const editHandler = () =>{
      setEditMode(true);
    }
    const changeModeHandler = () =>{      
      setEditMode(false);
    }

    return (
      <div >   
      {!editMode ? 
       <ProfileDetail loggedInUser = {loggedInUser} editProfileHandler = {editHandler}/>
        : <EditProfile loggedInUser = {loggedInUser} saveButtonHandler = {(values,valid)=>dispatch(loginAction.saveHandlerInit(values,valid))} changeModeHandler = {changeModeHandler}/> }
    </div>
    )
  }
export default MyProfile; 