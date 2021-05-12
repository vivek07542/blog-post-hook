import React from 'react';
import CommentIcon from "@material-ui/icons/Comment";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import {useSelector,useDispatch} from "react-redux";
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";
import {Link} from "react-router-dom";

const Navbar =({match}) => {
console.log(match);
  const loggedInUser = useSelector(state => state.Login.loggedInUser);

  const dispatch = useDispatch();

  const confirmLogoutHandler = () =>{
    if (window.confirm("Do you want to Signout?")) {
      dispatch(loginAction.logoutHandlerInit());
    }
  }

  return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div
            className="collapse navbar-collapse container"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <p
                  className="nav-link"
                  onClick={()=>dispatch(loginAction.postHandlerInit())}
                >
                <Link className="nav-link" to ={`${match.path}`} >  <CommentIcon /> Posts</Link>
                </p>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <p
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      data-toggle="dropdown"
                    >
                      <AccountCircleRoundedIcon />
                      {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                    </p>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <p
                        className="dropdown-item"
                        id="dropdownUserProfile"
                        onClick={()=>dispatch(loginAction.profileHandlerInit())}
                      >
                        <Link className="nav-link" to ={`${match.path}/profile`} > Profile</Link>
                      </p>
                      <p
                        className="dropdown-item"
                        id="dropdownUserSignOut"
                        onClick = {confirmLogoutHandler}
                      >
                      <Link className = "nav-link" to = {`${match.path}/login`}>SignOut</Link>
                        {/* SignOut */}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </nav> 
        </div>
    )
 }

export default Navbar
