import {combineReducers} from "redux";
import Login from "./LoginRedux/LoginRedux";
import Post from "./PostRedux/PostRedux";

export default combineReducers({
    Login,Post
})
