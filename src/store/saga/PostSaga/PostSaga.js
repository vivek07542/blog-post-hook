import * as postAction from "../../redux/PostRedux/PostRedux";
import { put } from "redux-saga/effects";

export function* initilizeSage() {
    const userPosts = JSON.parse(localStorage.getItem("userPost"));
    const localValue = JSON.parse(localStorage.getItem("loginBlogApp"));
    if (userPosts === null) {
        let arrayPost = [];
        yield localStorage.setItem("userPost", JSON.stringify(arrayPost));
    } else {
        localValue.userPost = userPosts;
        yield localStorage.setItem("userPost", JSON.stringify(userPosts));
        yield localStorage.setItem("loginBlogApp", JSON.stringify(localValue));
        yield put(postAction.initializePostSuccess(userPosts));
        yield put(postAction.postClickInit(userPosts));
    }
}

export function* savePostHandlerSaga(action) {
    const userPosts = JSON.parse(localStorage.getItem("userPost"));
    const localValue = JSON.parse(localStorage.getItem("loginBlogApp"));
    const updateValue = { ...localValue };
    let approvedPost = false;
    let sharePost = [];
    if (updateValue.loggedInUser.role === "admin") {
        approvedPost = true;
    }
    for(let user in updateValue.usersDetail){
        if(updateValue.usersDetail[user].role === "user"){
            sharePost.push(updateValue.usersDetail[user].username);           
        }
    }
    const postObject = {
        approved: approvedPost,
        sharePost:sharePost,
        date: action.date,
        post: action.post,
        username: updateValue.loggedInUser.username,
    };

    userPosts.push(postObject);
    yield localStorage.setItem("userPost", JSON.stringify(userPosts));

    updateValue.userPost = userPosts;
    yield localStorage.setItem("loginBlogApp", JSON.stringify(updateValue));
    yield put(postAction.saveHandlerSuccess(userPosts));
}

export function* allPostClickSaga(action) {
    const localValue = JSON.parse(localStorage.getItem("loginBlogApp"));
    const updateValue = { ...localValue };
    const pendingPostArray = [];
    const approvedPost = [];
    const adminPost = [];
    // let arrayForPage=[];  
    if (action.userPost !== null) {
        let reverseArray = action.userPost.reverse();
        reverseArray.forEach(e => {
            if (e.username === updateValue.loggedInUser.username || updateValue.loggedInUser.role === "admin") {
                // Condition For Pending Post
                if (e.approved === false) {
                    pendingPostArray.push(e);
                    localStorage.setItem("postForPending", JSON.stringify(pendingPostArray));
                }

                // Condition For all post
                for (let i = 0; i < updateValue.usersDetail.length; i++) {
                    if (e.approved === true && updateValue.usersDetail[i].username === e.username && updateValue.usersDetail[i].role !== "admin") {
                        approvedPost.push(e);
                        localStorage.setItem("postForallPost", JSON.stringify(approvedPost));
                    }
                }

                // Condition For Promotional Post
                for (let i = 0; i < updateValue.usersDetail.length; i++) {
                    if (e.approved === true && updateValue.usersDetail[i].username === e.username && updateValue.usersDetail[i].role === "admin") {
                        adminPost.push(e);
                        localStorage.setItem("postByAdmin", JSON.stringify(adminPost));
                    }
                }

            }
            else if (e.sharePost !== "") {
                for (let i = 0; i < e.sharePost.length; i++) {
                    if (e.sharePost[i] === updateValue.loggedInUser.username) {
                        for (let j = 0; j < updateValue.usersDetail.length; j++) {
                            if (updateValue.usersDetail[j].username === e.sharePost[i] && e.approved === true) {
                                approvedPost.push(e);
                                localStorage.setItem("postForallPost", JSON.stringify(approvedPost));
                            }
                        }
                        break;
                    }
                }
            }
        });
    }
    yield put(postAction.postClickSuccess(pendingPostArray, approvedPost, adminPost));
}

export function* sharePostHandlerSaga(action) {
    const localValue = JSON.parse(localStorage.getItem("userPost"));
    const localObject = JSON.parse(localStorage.getItem("loginBlogApp"));
    let updateValue = [...localValue];

    const editObjectIndex = updateValue.findIndex(user => (user.username === action.selectedPost.username && user.post === action.selectedPost.post));
    updateValue[editObjectIndex].approved = true;

        
        updateValue[editObjectIndex].sharePost = action.selectedUser;
    
    localObject.userPost = updateValue;
    yield localStorage.setItem("loginBlogApp", JSON.stringify(localObject));
    yield localStorage.setItem("userPost", JSON.stringify(updateValue));
    yield put(postAction.sharePostSuccess(updateValue));
}