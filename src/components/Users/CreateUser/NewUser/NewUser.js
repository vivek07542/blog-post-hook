import React from "react";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import Button from "../../../../UI/Button/Button";

const NewUser = (props) => {
  const{register,handleSubmit,formState : {errors,isSubmitted,isValid}} = useForm({mode:"onTouched"});

  const onSubmit = (data) => {
      props.saveButtonHandler(data);
      props.changeModeHandler();
  };

  const userCheck = (value, message) =>{
    const localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlogApp = JSON.parse(localStorage.getItem("loginBlogApp"));
    for (let users in localValue) {
      if (localValue[users].username === value  && message !== "User cant be Same") {
        return { error: true, message };
      }
      else if(loginBlogApp.loggedInUser.username === value && message === "User cant be Same"){
        return false
      }
    }
    return false;
  }

  const details = (
    <>
      {/* User Name */}
      <label className="col-sm-2 labelText">User Name:</label>
      <div className="col-sm-4 my-3 ">
        <input className = {classNames("form-control",{"is-invalid" : errors.username})} placeholder = "Enter Your User Name" type = "text" {...register("username" , {required : "Field Required" ,validate : value =>  !userCheck(value,"User Name Already Exists") || "User Name Already Exists"})}/>
        {errors.username && <p className = "invalid-feedback">{errors.username.message}</p>}        
      </div>

      {/* Password */}
      <label className="col-sm-2 labelText">Password :</label>
      <div className="col-sm-4 my-3 ">
        <input className = {classNames("form-control ",{"is-invalid" : errors.password})} placeholder = "Enter Your Password" type = "text" {...register("password" , {required : "Field Required" })}/>
        {errors.password && <p className = "invalid-feedback">{errors.password.message}</p>}  
      </div>

      {/* Role */}
      <label className="col-sm-2 labelText">Role :</label>
      <div className="col-sm-4 my-3 ">
          <select className = {classNames("form-control py-1",{"is-invalid" : errors.role})} placeholder = "Slect Role" {...register("role" , {required : "Field Required" })}>
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className = "invalid-feedback">{errors.role.message}</p>}
      </div>
      {/* First Name */}
      <label className="col-sm-2 labelText">First Name:</label>
      <div className="col-sm-4 my-3 ">
        <input className = {classNames("form-control",{"is-invalid" : errors.firstName})} placeholder = "Enter Your First Name" type = "text" {...register("firstName" , {required : "Field Required" })}/>
        {errors.firstName && <p className = "invalid-feedback">{errors.firstName.message}</p>}  
     
      </div>
      {/* Last Name */}
      <label className="col-sm-2 labelText">Last Name:</label>
      <div className="col-sm-4 my-3 ">
        <input className = {classNames("form-control",{"is-invalid" : errors.lastName})} placeholder = "Enter Your Last Name" type = "text" {...register("lastName" , {required : "Field Required" })}/>
        {errors.lastName && <p className = "invalid-feedback">{errors.lastName.message}</p>}  
       
      </div>

      {/* Mobile Number */}
      <label className="col-sm-2 labelText">Mobile Number:</label>
      <div className="col-sm-4 my-3 ">
        <input className = {classNames("form-control" ,{"is-invalid" : errors.phonenumber})} type = "text" placeholder = "Enter Your Mobile Number" {...register("phonenumber",{required : "Field Required" , pattern : {value : /^\d{10}$/,message : "Valid 10 Mobile Number"}})}/>
        {errors.phonenumber && <p className = "invalid-feedback">{errors.phonenumber.message}</p>}
      </div>
    </>
  );
  return (
    <div>
      <form onSubmit = {handleSubmit(onSubmit)}>
          <div className="jumbotron text-center my-5" id="myProfileDiv">
              <div className="form-group row justify-content-across">{details}</div>
              <Button type = "submit">Save</Button>
            </div>
      </form>
        
    </div>
  )
}

export default NewUser;