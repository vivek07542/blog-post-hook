import React, { useState} from "react";
import "./Profile.css";
import "../../App.css";
import "../../components/MyProfile/MyProfile";
import MyProfile from "../../components/MyProfile/MyProfile";
import Users from "../../components/Users/Users";
import {useSelector} from "react-redux";

const Profile = () =>{
  const[toggleTab,setToggleTab] = useState(1);

  const loggedInUser = useSelector(state => state.Login.loggedInUser);

  const toggleTabClick = (index) => {
    setToggleTab(index);
  };

  return(
    <div className="row verticalTab" >
      <div className="col-2 tabDivs">
        <div className="row">
          <button
            className={
              toggleTab === 1
                ? "tabss active-tabss btn"
                : "tabss btn"
            }
            onClick={() => toggleTabClick(1)}
          >
            My Profile
          </button>
        </div>
        {loggedInUser.role === "admin" && (
          <div className="row">
            <button
              className={
                toggleTab === 2
                  ? "tabss active-tabss btn"
                  : "tabss btn"
              }
              onClick={() => toggleTabClick(2)}
            >
              Users
            </button>
          </div>
        )}
      </div>

      <div className="col-10">
        <div className="row content-tabs">
          <div
            className={
              toggleTab === 1
                ? "contents  active-contents"
                : "contents"
            }
          >
            <div className ="row headingColor justify-content-center">
            <h2 className="heading ">Logged In User Detail</h2>
            </div>
            <hr />
            <MyProfile loggedInUser = {loggedInUser}/>
          </div>
          <div
            className={
              toggleTab === 2
                ? "contents  active-contents"
                : "contents"
            }
          >
          <div className ="row headingColor justify-content-center">
            <h2 className="heading ">Users Detail</h2>

          </div>
            <hr />
            <Users />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile;