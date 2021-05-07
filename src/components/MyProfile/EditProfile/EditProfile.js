import React from "react";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import "./EditProfile.css";
// import { Validators } from "../../../utilities/Validators";
// import Button from "../../../UI/Button/Button";
// import Input from "../../../UI/Input/Input";

const EditProfile = (props) =>{
  const{register,handleSubmit,formState:{errors,isValid} } = useForm({mode : "onTouched"});

  const onSubmit =(data) => {
  const dataDetail = data;
  dataDetail.username = props.loggedInUser.username;
  dataDetail.role = props.loggedInUser.role;
  props.saveButtonHandler(dataDetail,isValid);
  props.changeModeHandler(); 
  }

  const details = (
    <>
      {/* User Name */}
      <label className="col-sm-2 labelText">User Name :</label>
      <div className="col-sm-4 ">
        <p className="textPara">{props.loggedInUser.username}</p>
      </div>
      {/* Password */}

      <label className="col-sm-2 labelText">Password :</label>
      <div className="col-sm-4 ">
      <input className = {classNames("form-control" ,{"is-invalid" : errors.password})} type = "password" defaultValue = {props.loggedInUser.password} placeholder = "Enter Your Password" {...register("password",{required : "Field Required"})}/>
      {errors.password && <p className = "invalid-feedback">{errors.password.message}</p>}
      </div>
      
      {/* Role */}
      <label className="col-sm-2 labelText">Role :</label>
      <div className="col-sm-4 ">
        <p className="textPara">{props.loggedInUser.role}</p>
      </div>
      
      {/* First Name */}
      <label className="col-sm-2 labelText">First Name:</label>
      <div className="col-sm-4 ">
      <input className = {classNames("form-control" ,{"is-invalid" : errors.firstName})} type = "text" defaultValue = {props.loggedInUser.firstName} placeholder = "Enter Your First Name" {...register("firstName",{required : "Field Required"})}/>
      {errors.firstName && <p className = "invalid-feedback">{errors.firstName.message}</p>}
      </div>
    
      {/* Last Name */}
      <label className="col-sm-2 labelText">Last Name:</label>
      <div className="col-sm-4 ">
      <input className = {classNames("form-control" ,{"is-invalid" : errors.lastName})} type = "text" defaultValue = {props.loggedInUser.lastName} placeholder = "Enter Your Last Name" {...register("lastName",{required : "Field Required"})}/>
      {errors.lastName && <p className = "invalid-feedback">{errors.lastName.message}</p>}
      </div>
        
      {/* Mobile Number */}
      <label className="col-sm-2 labelText">Mobile Number:</label>
      <div className="col-sm-4 ">
      <input className = {classNames("form-control" ,{"is-invalid" : errors.phonenumber})} type = "text" defaultValue = {props.loggedInUser.phonenumber} placeholder = "Enter Your Mobile Number" {...register("phonenumber",{required : "Field Required" , pattern : {value : /^\d{10}$/,message : "Valid 10 Mobile Number"}})}/>
      {errors.phonenumber && <p className = "invalid-feedback">{errors.phonenumber.message}</p>}
      </div>
    </>
  )
  return (
    <div className="jumbotron text-center my-5 mx-auto">
        <form onSubmit = {handleSubmit(onSubmit)}>
          <div className="form-group row justify-content-across">
            {details}
          </div>
          <button className = "btn btn-outline-info" type="submit">Save</button>
        </form>
    </div>
  )
}
export default EditProfile;