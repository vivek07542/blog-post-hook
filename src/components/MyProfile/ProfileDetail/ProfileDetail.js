import React from "react";
import "./ProfileDetail.css";
import Button from "../../../UI/Button/Button";

const ProfileDetail = (props) =>{
  const obj = props.loggedInUser;
  const details = Object.keys(obj).map((key) => {
    return (
      <div className = "col-sm-6" key={key}> 
        <div className = "row">
          <label className="col-sm-4 labelText" >{key}:</label>
            <div className="col-sm-8 ">
              <p className="textPara">{obj[key]}</p>
            </div>
        </div>            
      </div>
    );
  });
  return(
    <div className="jumbotron text-center my-5 mx-auto">
    <div className="form-group row justify-content-across">{details}</div>
    <Button
      className="btn btn-outline-info"
      id="editProfileBtn"
      onClick={props.editProfileHandler}
    >
      EDIT
    </Button>
  </div>
  )
}
export default ProfileDetail;