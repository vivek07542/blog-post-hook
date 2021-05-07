import React, { Component, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";

const SharePost = (props) =>{
  const[selecteduser,setSelectedUser] = useState([]);
  const[shareButton , setShareButton] = useState(false);

  const checkBoxHandler = (event) =>{
    let userName = [...selecteduser];
    if(event.target.checked){
        userName.push(event.target.value);
    }
    else{
        const editObjIndex = userName.findIndex(user => user === event.target.value);
        userName.splice(editObjIndex, 1);
    }
    if(userName !== null){
      setShareButton(true);
    }
    setSelectedUser(userName);
  }
  const submitHandler = () =>{
    props.saveButtonHandler(selecteduser,props.selectedPost);
    props.modelClosed();
  }

  const users = props.usersDetail.map((user) => {
    if (user.role !== "admin" && user.username !== props.selectedPost.username) {
      return (
        <div key={user.username} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            onClick = {(event)=>checkBoxHandler(event)}
            value={user.username}
          />
          <label className="form-check-label" >
            {user.username}
          </label>
        </div>
      );
    }
    return false;
  });
  return (
    <div>
      <Modal
        show={props.activePopup}
        modelClosed={props.modelClosed}
      >
        <div>
          <div className="jumbotron text-center my-5" id="myProfileDiv">
            <h4 className="display-4">Share Post</h4>
            <div>{users}</div>
            <Button disabled={!shareButton} className = "my-2" onClick={submitHandler}>Share</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default SharePost;