import React, {  useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import "./Users.css";
import UserList from "./UserList/UserList";
import CreateUser from "./CreateUser/CreateUser";
import Pagination from "../../UI/Pagination/Pagination";
import Button from "../../UI/Button/Button"
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";

const Users = () =>{
    const[state,setState] = useState({
        ediMode : false,
        activePopup : false,
        currentPage : 1,
        postPerPage : 5,
        sortType : "asc"
    })
    const dispatch = useDispatch();

    const editObject =  useSelector(state =>state.Login.editObject);
    const usersDetail = useSelector(state =>state.Login.usersDetail);

    const EditHandler = (username) =>{
        setState({...state,activePopup : true,editMode : true})
        dispatch(loginAction.editUserHandlerInit(username));
    }
    const createHandler = () =>{
        setState({...state,activePopup : true,editMode : false})
    }
    const modelClicked = () =>{
        setState({...state,activePopup : false,editMode : false})
    }
    const paginate = (pageNumbers) =>{
        setState({...state,currentPage : pageNumbers})
    }
    const pageSelect = (pagePerPost) =>{
        setState({...state,postPerPage : pagePerPost})
    }
    const onSort = ()=>{
        state.sortType === "asc" ? setState({...state,sortType : "desc"}) : setState({...state,sortType : "asc"})      
    }
    
    const indexOfLastPost = state.currentPage * state.postPerPage;
    const indexOfFirstPost = indexOfLastPost -  state.postPerPage;
    let reverseDetail = usersDetail.reverse();
    const currentPosts = reverseDetail.slice(indexOfFirstPost,indexOfLastPost)
    const sortedArray = currentPosts.sort((a,b)=>{
        const isReversed = (state.sortType === "asc") ? 1 : -1;
        return isReversed* a.firstName.localeCompare(b.firstName)
    });
    let users = (
        sortedArray.map(details =>{
            return(
                <UserList 
                key = {details.username}
                username = {details.username}
                password = {details.password}
                firstName = {details.firstName}
                lastName= {details.lastName}
                role = {details.role}
                phonenumber = {details.phonenumber}
                editClick = {(username)=>EditHandler(username)}
                deleteClick = {(username)=>dispatch(loginAction.deleteUserHandlerInit(username))}
            />
            )
        })
    )
    return (
        <div>
        <div className="jumbotron text-center my-5">
        <div>
            <Button className="my-4 float-right" onClick={createHandler}>Create User</Button>
        </div>
        <div id="tableBox row">             
                <table className="table table-striped">
                <thead>
                <tr>
                    <th>User Name</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th><span>First Name</span> 
                    <Button className = "btn-sm" onClick ={()=>onSort()}><ImportExportOutlinedIcon fontSize="small"/></Button>
                   </th>
                    <th>Last Name</th>
                    <th>Mobile Number</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>   
            </thead>
                    {users}
                </table>
            </div>
            <div className="pageNumbers col-12" id="pagination3">
                <Pagination pageSelect = {pageSelect} paginate = {paginate} currentPage = {state.currentPage} postPerPage = {state.postPerPage} totalPosts={usersDetail.length}/>
            </div>            
        </div>
        {state.activePopup && <CreateUser 
        editObject={editObject} 
        activePopup = {state.activePopup} 
        editMode = {state.editMode}
        saveButtonHandler ={(editUser) =>{dispatch(loginAction.saveUserHandlerInit(editUser))}}
        saveUserButtonHandler = {(editUser) =>{dispatch(loginAction.createUserHandlerInit(editUser))}}
        modelClosed = {modelClicked}    
        />}
        </div>
    )    
}
export default Users;
