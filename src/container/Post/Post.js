import React, { useState,useEffect } from "react";
import "./Post.css";
import AllPost from "../../components/AllPost/AllPost";
import "../../App.css";
import { useSelector,useDispatch } from "react-redux";
import * as postAction from "../../store/redux/PostRedux/PostRedux";

const Post = (props) =>{
  const[toggleTab,setToggleTab] = useState(2);


  const dispatch = useDispatch();

  const userPost= useSelector(state => state.Post.userPost);
  const pendingPostArray = useSelector(state => state.Post.pendingPostArray);
  const approvedPost = useSelector(state => state.Post.approvedPost);
  const adminPost = useSelector(state => state.Post.adminPost);

  const toggleTabClick = (index) => {
    setToggleTab(index);
    dispatch(postAction.postClickInit(userPost));
  };

  useEffect(() => {
    dispatch(postAction.initializePostInit());
  },[])

  useEffect(()=>{
    dispatch(postAction.postClickInit(userPost));
  },[userPost])

  return(
    <div className="tabDiv">
    <div className="bloc-tabs">
      <button
        className={toggleTab === 1 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTabClick(1)}
      >
        Pending Post
      </button>
      <button
        className={toggleTab === 2 ? "tabs active-tabs" : "tabs"}
        onClick={() => toggleTabClick(2)}
      >
        All Post
      </button>
      {props.loggedInUser.role === "admin" && (
        <button
          className={
            toggleTab === 3 ? "tabs active-tabs" : "tabs"
          }
          onClick={() => toggleTabClick(3)}
        >
          Promotional Post
        </button>
      )}
    </div>

    <div className="content-tabs">
      <div
        className={
          toggleTab === 1 ? "content  active-content" : "content"
        }
      >
        <div className="container">
          <h4 className="display-3 text-center heading">Pending Post</h4>
          <hr />
          <AllPost
            loggedInUser={props.loggedInUser}
            approvedPost={pendingPostArray}
            tabContent = "pendingPost"
          />
        </div>
      </div>

      <div
        className={
          toggleTab === 2 ? "content  active-content" : "content"
        }
      >
        <div className="container">
          <h4 className="display-3 text-center heading">All Post</h4>
          <hr />
          <AllPost
            loggedInUser={props.loggedInUser}
            approvedPost={approvedPost}
            tabContent = "allPost"
          />
        </div>
      </div>

      <div
        className={
          toggleTab === 3 ? "content  active-content" : "content"
        }
      >
        <div className="container">
          <h4 className="display-3 text-center heading">Promotional Post</h4>
          <hr />
          <AllPost
            loggedInUser={props.loggedInUser}
            approvedPost={adminPost}
            tabContent = "promotionalPost"
          />
        </div>
      </div>
    </div>
  </div>
  )
}
export default Post;