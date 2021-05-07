import React, { Component } from 'react'
import {connect} from "react-redux";
import Login from "./components/Login/Login";
import * as loginAction from "./store/redux/LoginRedux/LoginRedux";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BlogPost from './components/BlogPost/BlogPost';

class App extends Component {
  state = {
    isSubmit : false
  }
  
  componentDidMount(){
    this.props.onInitlizeApp();
  }

  componentDidUpdate(){
    if(this.state.isSubmit !== this.props.isAuth){
      this.setState({isSubmit : this.props.isAuth})
    }
  }

  confirmLogoutHandler = () =>{
    if (window.confirm("Do you want to Signout?")) {
     this.props.onLogoutHandler();
    }
  }

  render() {
    return (
      <div>
        {!this.state.isSubmit ? 
          <Login 
          submitButtonHandler = {this.props.onSubmitHandler} 
          isAuthenticate = {this.props.isAuth}
          /> 
          : 
          <BlogPost 
          loggedInUser = {this.props.loggedInUser} 
          logoutHandler = {this.confirmLogoutHandler}
          profileHandler = {this.props.onProfileHandler}
          openProfile = {this.props.openProfile}
          postHandler = {this.props.onPostHandler}
          openPost = {this.props.openPost}
          /> }
      </div>
    )
  }
}
const mapStateToProps = state =>{
  return{
    isAuth : state.Login.isAuth,
    loggedInUser : state.Login.loggedInUser,
    openProfile : state.Login.openProfile,
    openPost : state.Login.openPost
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onInitlizeApp : ()=> dispatch(loginAction.initlizerAppInit()),
    onSubmitHandler : (values,valid) => dispatch(loginAction.submitHandlerInit(values,valid)),
    onLogoutHandler : ()=>dispatch(loginAction.logoutHandlerInit()),
    onProfileHandler : () =>dispatch(loginAction.profileHandlerInit()),
    onPostHandler : () =>dispatch(loginAction.postHandlerInit())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);