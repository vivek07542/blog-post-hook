import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";
import * as loginAction from "./store/redux/LoginRedux/LoginRedux";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BlogPost from "./components/BlogPost/BlogPost";
import { Redirect, Route, Switch } from "react-router-dom";

const App = () => {
  const isAuth = useSelector((state) => state.Login.isAuth);

  const dispatch = useDispatch();

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    dispatch(loginAction.initlizerAppInit());
  }, []);

  useEffect(() => {
    if (isAuth !== isSubmit) {
      setIsSubmit(isAuth);
    }
  }, [isAuth]);

  let routes = !isSubmit ? (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path = "*">
        <Redirect to="/" />
      </Route> 
    </Switch>
  ) : (
    <Switch>
      <Route path="/" component={BlogPost} />
      <Route path="/login" component={Login} />
    </Switch>
  );
  return <div>{routes}</div>;
};
export default App;
// class App extends Component {
//   state = {
//     isSubmit : false
//   }

//   componentDidMount(){
//     this.props.onInitlizeApp();
//   }

//   componentDidUpdate(){
//     if(this.state.isSubmit !== this.props.isAuth){
//       this.setState({isSubmit : this.props.isAuth})
//     }
//   }

//   confirmLogoutHandler = () =>{
//     if (window.confirm("Do you want to Signout?")) {
//      this.props.onLogoutHandler();
//     }
//   }

//   render() {
//     return (
//       <div>
//         {!this.state.isSubmit ?
//           <Login
//           submitButtonHandler = {this.props.onSubmitHandler}
//           isAuthenticate = {this.props.isAuth}
//           />
//           :
//           <BlogPost
//           loggedInUser = {this.props.loggedInUser}
//           logoutHandler = {this.confirmLogoutHandler}
//           profileHandler = {this.props.onProfileHandler}
//           openProfile = {this.props.openProfile}
//           postHandler = {this.props.onPostHandler}
//           openPost = {this.props.openPost}
//           /> }
//       </div>
//     )
//   }
// }
// const mapStateToProps = state =>{
//   return{
//     isAuth : state.Login.isAuth,
//     loggedInUser : state.Login.loggedInUser,
//     openProfile : state.Login.openProfile,
//     openPost : state.Login.openPost
//   }
// }
// const mapDispatchToProps = dispatch =>{
//   return{
//     onInitlizeApp : ()=> dispatch(loginAction.initlizerAppInit()),
//     onSubmitHandler : (values,valid) => dispatch(loginAction.submitHandlerInit(values,valid)),
//     onLogoutHandler : ()=>dispatch(loginAction.logoutHandlerInit()),
//     onProfileHandler : () =>dispatch(loginAction.profileHandlerInit()),
//     onPostHandler : () =>dispatch(loginAction.postHandlerInit())
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(App);
