import * as loginAction from "../../redux/LoginRedux/LoginRedux";
import { put } from "redux-saga/effects";
export function* initilizeHandlerSaga(){
    const localValue =  JSON.parse(localStorage.getItem("usersDetail"));
    const localBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));

    const loginBlogApp = {
        isAuth : false,
        loggedInUser : {},
        openProfile : false,
        openPost : true,
        usersDetail : [],
        editObject : {},
        userPost : []
    }
    if(localBlog.loggedInUser !== null && localBlog.loggedInUser.username !== undefined){
        loginBlogApp.isAuth = true
        loginBlogApp.loggedInUser = localBlog.loggedInUser;
    }
    
    if (localValue === null) {
        const userArrayDetail = [];
        const userDetail = {
            username: "vivek@123",
            password: "Vivek@123",
            role: "admin",
            firstName: "Vivek",
            lastName: "Bindal",
            phonenumber: 8888269609,
        }
        userArrayDetail.push(userDetail);
       yield localStorage.setItem("usersDetail", JSON.stringify(userArrayDetail));
       loginBlogApp.usersDetail = userArrayDetail;
    }    
    else{
        loginBlogApp.usersDetail = localValue; 
    }
    yield put(loginAction.submitHandlerSuccess(loginBlogApp));
    yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlogApp));
}

export function* logoutHandlerSaga(){
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    const updateValue = {...loginBlog};
    updateValue.isAuth = false;
    updateValue.loggedInUser = {};
    updateValue.openProfile = false;
    updateValue.openPost = true;
    updateValue.editObject = {};
    yield localStorage.setItem("loginBlogApp", JSON.stringify(updateValue));
    yield put(loginAction.logoutHandlerSuccess(updateValue));
}

export function* submitHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    for(let users in localValue){
        if(localValue[users].username === action.username && localValue[users].password === action.password){
            loginBlog.isAuth = action.isAuth;
            loginBlog.loggedInUser = localValue[users];
            loginBlog.usersDetail = [...localValue];
            yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
            yield put(loginAction.submitHandlerSuccess(loginBlog));
        }
    }
}

export function* profileHandlerSaga(){
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    const updateValue = {...loginBlog};
    updateValue.openProfile = true;
    updateValue.openPost = false;
    yield localStorage.setItem("loginBlogApp", JSON.stringify(updateValue));
    yield put(loginAction.profileHandlerSuccess(updateValue));
}

export function* postHandlerSaga(){
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    const updateValue = {...loginBlog};
    updateValue.openProfile = false;
    updateValue.openPost = true;
    yield localStorage.setItem("loginBlogApp", JSON.stringify(updateValue));
    yield put(loginAction.postHandlerSuccess(updateValue));
}

export function* saveHandlerSaga(action){
    const localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    for(let users in localValue){
        if(localValue[users].username === action.values.username && localValue[users].role === action.values.role){
            localValue[users] = action.values;
            loginBlog.loggedInUser = localValue[users];
            loginBlog.usersDetail = [...localValue];
        }        
        yield localStorage.setItem("usersDetail", JSON.stringify(localValue));
        yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
        yield put(loginAction.saveHandlerSuccess(loginBlog));
    }
}
export function* editUserHandlerSaga(action){
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    const editObject = loginBlog.usersDetail.find(user => user.username === action.username);
        loginBlog.editObject = editObject;
        yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
        yield put(loginAction.editUserHandlerSuccess(loginBlog));    
}

export function* deleteUserHandlerSaga(action){
    let localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    const editObjIndex = loginBlog.usersDetail.findIndex(user => user.username === action.username);
    loginBlog.usersDetail.splice(editObjIndex, 1);
    localValue = loginBlog.usersDetail;
    yield localStorage.setItem("usersDetail", JSON.stringify(localValue));
    yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
    yield put(loginAction.deleteUserHandlerSuccess(loginBlog));
}
export function* saveUserHandlerSaga(action){
    let localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
        const editObjIndex = loginBlog.usersDetail.findIndex(user => user.username === loginBlog.editObject.username);
        if(loginBlog.editObject.username === loginBlog.loggedInUser.username){
            loginBlog.loggedInUser = action.editUser;
        }
        loginBlog.usersDetail[editObjIndex] = action.editUser;
        localValue = loginBlog.usersDetail;
        loginBlog.editObject = {}    
    yield localStorage.setItem("usersDetail", JSON.stringify(localValue));
    yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
    yield put(loginAction.saveUserHandlerSuccess(loginBlog));
}
export function* saveCreateUserHandlerSaga(action){
    let localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlog =  JSON.parse(localStorage.getItem("loginBlogApp"));
    loginBlog.usersDetail.push(action.editUser);
    localValue.push(action.editUser);
    yield localStorage.setItem("usersDetail", JSON.stringify(localValue));
    yield localStorage.setItem("loginBlogApp", JSON.stringify(loginBlog));
    yield put(loginAction.createUserHandlerSuccess(loginBlog));
}