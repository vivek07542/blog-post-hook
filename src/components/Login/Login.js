import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";

const Login = (props) => {
  const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onChange" });
  const [touched, setTouched] = useState(false);
  const isAuth = useSelector(state => state.Login.isAuth);

  const dispatch = useDispatch();

  const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  }

  const onSubmit = (data) => {
    setTouched(true);
    const expirationTime = new Date((new Date().getTime() + 3600000));
    const remainingDuration = calculateRemainingTime(expirationTime);
    setTimeout(() => {
      dispatch(loginAction.logoutHandlerInit());
    }, remainingDuration);
    dispatch(loginAction.submitHandlerInit(data, isValid));
    reset({ username: "", password: "" });
  }

  return (
    <div className="Login">
      <div className="container my-5">
        <h1 className="display-4 heading">Blog post Login</h1>
        <div className="jumbotron ">
          {!isAuth && touched && (
            <small className="form-text text-muted textIfFail">
              Please get Approval From Admin Or Check UserName & Password.
            </small>
          )}
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">User Name </label>
              <input className={classNames("form-control", { "is-invalid": errors.username })} type="text" placeholder="Enter Your User Name" {...register("username", { required: "Field Required" })} />
              {errors.username && <p className="invalid-feedback">{errors.username.message}</p>}
            </div>
            <div className="form-group ">
              <label htmlFor="password">Password </label>
              <input className={classNames("form-control", { "is-invalid": errors.password })} type="password" placeholder="Enter Your Password" {...register("password", { required: "Field Required" })} />
              {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
            </div>
            <button className="btn btn-outline-info" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;