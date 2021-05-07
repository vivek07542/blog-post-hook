import React from 'react';
import CommentIcon from "@material-ui/icons/Comment";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const Navbar = (props) => {
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
                  onClick={props.postHandler}
                >
                  <CommentIcon />
                  Posts
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
                      {`${props.loggedInUser.firstName} ${props.loggedInUser.lastName}`}
                    </p>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <p
                        className="dropdown-item"
                        id="dropdownUserProfile"
                        onClick={props.profileHandler}
                      >
                        Profile
                      </p>
                      <p
                        className="dropdown-item"
                        id="dropdownUserSignOut"
                        onClick = {props.logoutHandler}
                      >
                        SignOut
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
