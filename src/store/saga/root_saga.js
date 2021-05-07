import { takeLatest } from "@redux-saga/core/effects";
import * as loginAction from "../redux/LoginRedux/LoginRedux";
import * as postAction from "../redux/PostRedux/PostRedux";

import {initilizeHandlerSaga,submitHandlerSaga,logoutHandlerSaga,profileHandlerSaga,
    postHandlerSaga,saveHandlerSaga,editUserHandlerSaga,
    deleteUserHandlerSaga,saveUserHandlerSaga,saveCreateUserHandlerSaga} from "./LoginSaga/LoginSaga";
import {initilizeSage,savePostHandlerSaga,allPostClickSaga,sharePostHandlerSaga} from "./PostSaga/PostSaga";

export function* watch(){
    // Login Action
    yield takeLatest(loginAction.INITLIZE_APP,initilizeHandlerSaga);
    yield takeLatest(loginAction.SIGNUP_SUBMIT_INIT,submitHandlerSaga)
    yield takeLatest(loginAction.LOGOUT_SESSION_INIT,logoutHandlerSaga)
    yield takeLatest(loginAction.PROFILE_HANDLER_INIT,profileHandlerSaga)
    yield takeLatest(loginAction.POST_HANDLER_INIT,postHandlerSaga)
    yield takeLatest(loginAction.SAVE_INIT,saveHandlerSaga)
    yield takeLatest(loginAction.EDIT_USER_INIT,editUserHandlerSaga)
    yield takeLatest(loginAction.DELETE_USER_INIT,deleteUserHandlerSaga)
    yield takeLatest(loginAction.SAVE_EDIT_USER_INIT,saveUserHandlerSaga)
    yield takeLatest(loginAction.SAVE_CREATE_USER_INIT,saveCreateUserHandlerSaga)

    // Post Action
    yield takeLatest(postAction.INITILIZE_POST_INIT,initilizeSage)
    yield takeLatest(postAction.SAVE_POST_INIT,savePostHandlerSaga)
    yield takeLatest(postAction.POST_CLICK_INIT,allPostClickSaga)
    yield takeLatest(postAction.SHARE_POST_INIT,sharePostHandlerSaga)

    
}