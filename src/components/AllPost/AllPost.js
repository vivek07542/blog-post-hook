import React, { useState } from "react";
import Button from "../../UI/Button/Button";
import Pagination from "../../UI/Pagination/Pagination";
import CreatePost from "../../components/CreatePost/CreatePost";
import { useSelector,useDispatch } from "react-redux";
import * as postAction from "../../store/redux/PostRedux/PostRedux";
import SharePost from "../SharePost/SharePost";
import "./AllPost.css";
import ReadMore from "../../UI/ReadMore/ReadMore";

const AllPost = (props) =>{
  const[state,setState] = useState({
    activePopup: false,
    currentPage: 1,
    postPerPage: 5,
    sortType: "asc",
    checkBox: false,
    checkBoxPopUp: false,
    selectedPost: {},
    readMore: true,
  })
  const dispatch = useDispatch();
  
  const userPost= useSelector(state => state.Post.userPost);
  const usersDetail= useSelector(state => state.Login.usersDetail);
  const loggedInUser= useSelector(state => state.Login.loggedInUser);
  
  const createHandler = () => {
    setState({...state,activePopup: true });
  };

  const modelClicked = () => {
    setState({...state, activePopup: false, checkBoxPopUp: false });
  };

  const paginate = (pageNumbers) => {
    setState({...state, currentPage: pageNumbers });
  };

  const pageSelect = (pagePerPost) => {
    setState({...state, postPerPage: pagePerPost });
  };

  const onSort = () => {
    state.sortType === "asc"
      ? setState({...state, sortType: "desc" })
      : setState({...state, sortType: "asc" });
  };

  const checkBoxHandler = (event, post, username) => {
    setState({...state, checkBox: true }, () => {
      if (state.checkBox) {
        let adminDecision = window.confirm(
          "Do you want to allow this post to be visible to other users?"
        );
        if (adminDecision) {
          setState({...state,
            checkBoxPopUp: true,
            selectedPost: { post: post, username: username },
          });
        } else {
          setState(
            { selectedPost: { post: post, username: username } },
            () => {
              dispatch(postAction.shareHandlerInit([], state.selectedPost));
            }
          );
        }
      }
    });
  };

  const indexOfLastPost = state.currentPage * state.postPerPage;
  const indexOfFirstPost = indexOfLastPost - state.postPerPage;
  const currentPosts = props.approvedPost.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const sortedArray = currentPosts.sort((a, b) => {
    const isReversed = state.sortType === "asc" ? 1 : -1;
    return isReversed * a.date.localeCompare(b.date);
  });
  // let textRead;
  const approvedPost = sortedArray.map((post) => {
    return (
      <div
        className="card m-3 mx-auto cardBox"
        style={{ width: "45rem" }}
        key={post.date}
      >
        <div className="postBox">
          <ReadMore text={post.post} readMore={state.readMore} />
        </div>
        <div className="row justify-content-between">
          {loggedInUser.role === "admin" &&
            props.tabContent === "pendingPost" && (
              <div className="col-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={state.checkBox}
                  onClick={(event) =>
                    checkBoxHandler(event, post.post, post.username)
                  }
                />
              </div>
            )}
          <div className="col-5">
            <small>{post.username}</small>
          </div>
          <div className="col-5">
            <small>{post.date}</small>
          </div>
        </div>
      </div>
    );
  });
  return(
    <div>
    <div>
      {loggedInUser.role !== "admin" &&
      (props.tabContent === "allPost" ||
        props.tabContent === "pendingPost") ? (
        <Button className="float-right" onClick={createHandler}>
          Create Post
        </Button>
      ) : (
        props.tabContent === "promotionalPost" && (
          <Button className="float-right" onClick={createHandler}>
            Create Post
          </Button>
        )
      )}
    </div>
    <div className="row">
      <Button className="btn-sm float-right" onClick={() => onSort()}>
        Sort Date
      </Button>
    </div>
    <div >{approvedPost}</div>
    <Pagination
      pageSelect={pageSelect}
      paginate={paginate}
      currentPage={state.currentPage}
      postPerPage={state.postPerPage}
      totalPosts={props.approvedPost.length}
    />
    {state.activePopup && (
      <CreatePost
        activePopup={state.activePopup}
        saveButtonHandler={(post, date) => {dispatch(postAction.saveHandlerInit(post, date))}}
        modelClosed={modelClicked}
      />
    )}
    {state.checkBoxPopUp && (
      <SharePost
        loggedInUser={loggedInUser}
        selectedPost={state.selectedPost}
        usersDetail={usersDetail}
        activePopup={state.checkBoxPopUp}
        modelClosed={modelClicked}
        saveButtonHandler={dispatch(postAction.shareHandlerInit([], state.selectedPost))}
      />
    )}
  </div>
  )
}
export default AllPost;

