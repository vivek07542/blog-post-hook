import React, { Component } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import Profile from "../../container/Profile/Profile";
import Post from "../../container/Post/Post";
import Spinner from "../../UI/Spinner/Spinner";

 class BlogPost extends Component {
  state={
    openProfile : false,
    openPost : true,
    loading : false
  }
  componentDidMount(){
    this.setState({loading : true});
    setTimeout(()=>{
      this.setState({loading : false});
    },3000)
  }
  componentDidUpdate(){
    if(this.state.openPost !== this.props.openPost || this.state.openProfile !== this.props.openProfile){

      this.setState({openProfile : this.props.openProfile,openPost : this.props.openPost},()=>{
        this.setState({loading : true});
        setTimeout(()=>{
          this.setState({loading : false});
        },3000)
  
      })
    }
  }
  render() {
    return (
      <div>
       <Navbar loggedInUser ={this.props.loggedInUser} logoutHandler ={this.props.logoutHandler} profileHandler ={this.props.profileHandler} postHandler = {this.props.postHandler}/>
        {this.state.openPost ? 
        this.state.loading ? <Spinner 
          loading={this.state.loading} 
          /> : 
          <Post loggedInUser ={this.props.loggedInUser}/>
        :
        this.state.openProfile  && this.state.loading ? <Spinner 
          loading={this.state.loading} 
          /> :
          <Profile loggedInUser ={this.props.loggedInUser}/>}
      </div>
    );
  }
}

export default BlogPost;