export  const INITILIZE_POST_INIT = "INITILIZE_POST_INIT";
export const INITILIZE_POST_SUCCESS = "INITILIZE_POST_SUCCESS";

export const POST_CLICK_INIT = "POST_CLICK_INIT";
export const POST_CLICK_SUCCESS = "POST_CLICK_SUCCESS";

export const SAVE_POST_INIT = "SAVE_POST_INIT";
export const SAVE_POST_SUCCESS = "SAVE_POST_SUCCESS";

export const SHARE_POST_INIT = "SHARE_POST_INIT";
export const SHARE_POST_SUCCESS = "SHARE_POST_SUCCESS";

export const initializePostInit = ()=>{
    return{
        type : INITILIZE_POST_INIT
    }
}
export const initializePostSuccess = (userPost) =>{
    return{
        type : INITILIZE_POST_SUCCESS,
        userPost:userPost
    }
}

export const postClickInit = (userPost) =>{
    return{
        type : POST_CLICK_INIT,
        userPost : userPost
    }
}
export const postClickSuccess = (pendingPostArray,approvedPost,adminPost) =>{
    return{
        type : POST_CLICK_SUCCESS,
        pendingPostArray : pendingPostArray,
        approvedPost : approvedPost,
        adminPost : adminPost
    }
}
export const shareHandlerInit = (selectedUser,selectedPost) =>{
    return{
        type : SHARE_POST_INIT,
        selectedUser : selectedUser,
        selectedPost : selectedPost
    }
}
export const sharePostSuccess = (userPost) =>{
    return{
        type : SHARE_POST_SUCCESS,
        userPost : userPost
    }
}
export const saveHandlerInit = (post,date) =>{
    return{
        type:SAVE_POST_INIT,
        post : post,
        date : date      
    }
}
export const saveHandlerSuccess = (userPost) =>{
    return{
        type:SAVE_POST_SUCCESS,
        userPost : userPost
    }
}
const initialState = {
    userPost : [],
    pendingPostArray : [],
    approvedPost : [],
    adminPost : []
}
const Post = (state = initialState,action) =>{
    switch(action.type){
        case INITILIZE_POST_SUCCESS : 
        return{
            ...state,
            userPost : action.userPost
        }

        case POST_CLICK_SUCCESS : 
        return{
            ...state,
            pendingPostArray : action.pendingPostArray,
            approvedPost : action.approvedPost,
            adminPost : action.adminPost
        }
        case SAVE_POST_SUCCESS : 
         return{
             ...state,
             userPost : action.userPost
        }
        case SHARE_POST_SUCCESS :
            return{
                ...state,
                userPost : action.userPost
            }
        default : 
        return state;
    }
}
export default Post;