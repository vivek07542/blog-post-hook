export const INITLIZE_APP = "INITLIZE_APP";
export const SIGNUP_SUBMIT_INIT = "SIGNUP_SUBMIT_INIT";
export const SIGNUP_SUBMIT_SUCCESS = "SIGNUP_SUBMIT_SUCCESS";
export const LOGOUT_SESSION_INIT = "LOGOUT_SESSION_INIT";
export const LOGOUT_SESSION_SUCCESS = "LOGOUT_SESSION_SUCCESS";
export const PROFILE_HANDLER_INIT = "PROFILE_HANDLER_INIT";
export const PROFILE_HANDLER_SUCCESS= "PROFILE_HANDLER_SUCCESS";
export const POST_HANDLER_INIT = "POST_HANDLER_INIT";
export const POST_HANDLER_SUCCESS= "POST_HANDLER_SUCCESS";
export const SAVE_INIT = "SAVE_INIT";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const EDIT_USER_INIT = "EDIT_USER_INIT";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const DELETE_USER_INIT = "DELETE_USER_INIT";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const SAVE_EDIT_USER_INIT = "SAVE_EDIT_USER_INIT";
export const SAVE_EDIT_USER_SUCCESS = "SAVE_EDIT_USER_SUCCESS";
export const SAVE_CREATE_USER_INIT = "SAVE_CREATE_USER_INIT";
export const SAVE_CREATE_USER_SUCCESS = "SAVE_CREATE_USER_SUCCESS";

export const initlizerAppInit = () =>{
    ("initlizerAppInit");
    return{
        type : INITLIZE_APP
    }
}
export const submitHandlerInit = (values,valid) =>{  

    
    return{
        type : SIGNUP_SUBMIT_INIT,
        username : values.username,
        password : values.password,
        isAuth : valid
    }
}
export const submitHandlerSuccess = (loginBlogApp) =>{


    return{
        type : SIGNUP_SUBMIT_SUCCESS,
        loggedInUser : loginBlogApp.loggedInUser,
        isAuth : loginBlogApp.isAuth,
        openProfile : loginBlogApp.openProfile,
        usersDetail : loginBlogApp.usersDetail
    }
}

export const logoutHandlerInit = () =>{
    return{
        type : LOGOUT_SESSION_INIT
    }
}
export const logoutHandlerSuccess = (loginBlogApp) =>{
    return{
        type : LOGOUT_SESSION_SUCCESS,
        loggedInUser : loginBlogApp.loggedInUser,
        isAuth : loginBlogApp.isAuth,
        openPost:loginBlogApp.openPost,
        openProfile : loginBlogApp.openProfile
    }
}
export const profileHandlerInit = () =>{
    return{
        type : PROFILE_HANDLER_INIT
    }
}
export const profileHandlerSuccess = (loginBlogApp) =>{
    return{
        type : PROFILE_HANDLER_SUCCESS,
        openProfile : loginBlogApp.openProfile,
        openPost : loginBlogApp.openPost
    }
}
export const postHandlerInit = () =>{
 return{
     type : POST_HANDLER_INIT
 }   
}
export const postHandlerSuccess = (loginBlogApp) =>{
    return{
        type : POST_HANDLER_SUCCESS,
        openProfile : loginBlogApp.openProfile,
        openPost : loginBlogApp.openPost
    }   
   }

   export const saveHandlerInit = (values) =>{  

    return{
        type : SAVE_INIT,
        values : values
    }
}
export const saveHandlerSuccess = (loginBlogApp) =>{  
    return{
        type : SAVE_SUCCESS,
        loggedInUser : loginBlogApp.loggedInUser,
        usersDetail : loginBlogApp.usersDetail
    }
}
export const editUserHandlerInit = (username) =>{
    return{
        type : EDIT_USER_INIT,
        username : username
    }
}
export const editUserHandlerSuccess = (loginBlogApp) =>{
    return{
        type : EDIT_USER_SUCCESS,
        editObject : loginBlogApp.editObject
    }
}

export const deleteUserHandlerInit = (username) =>{
    return{
        type : DELETE_USER_INIT,
        username : username
    }
}
export const deleteUserHandlerSuccess = (loginBlogApp) =>{
    return{
        type : DELETE_USER_SUCCESS,
        usersDetail : loginBlogApp.usersDetail
    }
}
export const saveUserHandlerInit = (editUser) =>{
    return{
        type : SAVE_EDIT_USER_INIT,
        editUser : editUser
    }
}

export const saveUserHandlerSuccess = (loginBlogApp) =>{
    return{
     type : SAVE_EDIT_USER_SUCCESS,
     usersDetail : loginBlogApp.usersDetail,
     editObject : loginBlogApp.editObject,
     loggedInUser : loginBlogApp.loggedInUser   
    }
}
export const createUserHandlerInit = (editUser) =>{
    return{
        type : SAVE_CREATE_USER_INIT,
        editUser : editUser
    }
}

export const createUserHandlerSuccess = (loginBlogApp) =>{
    return{
     type : SAVE_CREATE_USER_SUCCESS,
     usersDetail : loginBlogApp.usersDetail
    }
}
const initialState = {
    loggedInUser:{},
    isAuth:false,
    openProfile : false,
    openPost : true,
    usersDetail : [],
    editObject : {},  
}
const Login = (state =initialState ,action) =>{
    switch(action.type){
        case SIGNUP_SUBMIT_SUCCESS : 
        return{
            ...state,
            loggedInUser : action.loggedInUser,
            isAuth : action.isAuth,
            usersDetail : action.usersDetail
        }
        case LOGOUT_SESSION_SUCCESS : 
        return{
            ...state,
            loggedInUser :action.loggedInUser,
            isAuth : action.isAuth,
            openProfile : action.openProfile,
            openPost : action.openPost
        }
        case PROFILE_HANDLER_SUCCESS : 
        return{
            ...state,
            openProfile : action.openProfile,
            openPost : action.openPost
        }
        case POST_HANDLER_SUCCESS : 
        return{
            ...state,
            openProfile : action.openProfile,
            openPost : action.openPost
        }
        case SAVE_SUCCESS : 
        return{
            ...state,
            loggedInUser : action.loggedInUser,
            usersDetail : action.usersDetail
        }
        case EDIT_USER_SUCCESS : 
        return{
            ...state,
            editObject : action.editObject,
        }
        case DELETE_USER_SUCCESS : 
        return{
            ...state,
            usersDetail : action.usersDetail
        }
        case SAVE_EDIT_USER_SUCCESS : 
        return{
            ...state,
            usersDetail : action.usersDetail,
            editObject : action.editObject,
            loggedInUser : action.loggedInUser
        }
        case SAVE_CREATE_USER_SUCCESS : 
        return{
            ...state,
            usersDetail : action.usersDetail
        }
        default : 
        return state;
    }
}
export default Login;