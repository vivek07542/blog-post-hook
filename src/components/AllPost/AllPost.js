import React, { Component } from "react";
import Button from "../../UI/Button/Button";
import Pagination from "../../UI/Pagination/Pagination";
import CreatePost from "../../components/CreatePost/CreatePost";
import { connect } from "react-redux";
import * as postAction from "../../store/redux/PostRedux/PostRedux";
import SharePost from "../SharePost/SharePost";
import "./AllPost.css";
import ReadMore from "../../UI/ReadMore/ReadMore";

class AllPost extends Component {
  state = {
    activePopup: false,
    currentPage: 1,
    postPerPage: 5,
    sortType: "asc",
    checkBox: false,
    checkBoxPopUp: false,
    selectedPost: {},
    readMore: true,
  };

  createHandler = () => {
    this.setState({ activePopup: true });
  };
  modelClicked = () => {
    this.setState({ activePopup: false, checkBoxPopUp: false });
  };

  paginate = (pageNumbers) => {
    this.setState({ currentPage: pageNumbers });
  };
  pageSelect = (pagePerPost) => {
    this.setState({ postPerPage: pagePerPost });
  };

  onSort = () => {
    this.state.sortType === "asc"
      ? this.setState({ sortType: "desc" })
      : this.setState({ sortType: "asc" });
  };

  checkBoxHandler = (event, post, username) => {
    this.setState({ checkBox: true }, () => {
      if (this.state.checkBox) {
        let adminDecision = window.confirm(
          "Do you want to allow this post to be visible to other users?"
        );
        if (adminDecision) {
          this.setState({
            checkBoxPopUp: true,
            selectedPost: { post: post, username: username },
          });
        } else {
          this.setState(
            { selectedPost: { post: post, username: username } },
            () => {
              this.props.onSharedHandler([], this.state.selectedPost);
            }
          );
        }
      }
    });
  };

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postPerPage;
    const currentPosts = this.props.approvedPost.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    const sortedArray = currentPosts.sort((a, b) => {
      const isReversed = this.state.sortType === "asc" ? 1 : -1;
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
            <ReadMore text={post.post} readMore={this.state.readMore} />
          </div>
          <div className="row justify-content-between">
            {this.props.loggedInUser.role === "admin" &&
              this.props.tabContent === "pendingPost" && (
                <div className="col-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={this.state.checkBox}
                    onClick={(event) =>
                      this.checkBoxHandler(event, post.post, post.username)
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

    return (
      <div>
        <div>
          {this.props.loggedInUser.role !== "admin" &&
          (this.props.tabContent === "allPost" ||
            this.props.tabContent === "pendingPost") ? (
            <Button className="float-right" onClick={this.createHandler}>
              Create Post
            </Button>
          ) : (
            this.props.tabContent === "promotionalPost" && (
              <Button className="float-right" onClick={this.createHandler}>
                Create Post
              </Button>
            )
          )}
        </div>
        <div className="row">
          <Button className="btn-sm float-right" onClick={() => this.onSort()}>
            Sort Date
          </Button>
        </div>
        <div className="">{approvedPost}</div>
        <Pagination
          pageSelect={this.pageSelect}
          paginate={this.paginate}
          currentPage={this.state.currentPage}
          postPerPage={this.state.postPerPage}
          totalPosts={this.props.approvedPost.length}
        />
        {this.state.activePopup && (
          <CreatePost
            activePopup={this.state.activePopup}
            saveButtonHandler={this.props.onSaveButtonHandler}
            modelClosed={this.modelClicked}
          />
        )}
        {this.state.checkBoxPopUp && (
          <SharePost
            loggedInUser={this.props.loggedInUser}
            selectedPost={this.state.selectedPost}
            usersDetail={this.props.usersDetail}
            activePopup={this.state.checkBoxPopUp}
            modelClosed={this.modelClicked}
            saveButtonHandler={this.props.onSharedHandler}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userPost: state.Post.userPost,
    usersDetail: state.Login.usersDetail,
    loggedInUser: state.Login.loggedInUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSaveButtonHandler: (post, date) => {
      dispatch(postAction.saveHandlerInit(post, date));
    },
    onSharedHandler: (selectedUser, selectedPost) => {
      dispatch(postAction.shareHandlerInit(selectedUser, selectedPost));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllPost);