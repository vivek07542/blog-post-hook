import React, { Suspense } from "react";
import Navbar from "../../UI/Navbar/Navbar";
import Spinner from "../../UI/Spinner/Spinner";
import {Switch,Route} from "react-router-dom";


const BlogPost = ({match}) =>{
    const ProfilePage = React.lazy(()=>{
    return new Promise (resolve =>{
        setTimeout(()=>resolve(import('../../container/Profile/Profile')),3000);
    })
});

const PostPage = React.lazy(()=>{
  return new Promise (resolve =>{
      setTimeout(()=>resolve(import('../../container/Post/Post')),3000);
  })
});


  return (
      <div>
        <Navbar match={match}/>
            <Switch>
            <Suspense fallback = {<Spinner loading={true}></Spinner>}>
                <Route exact path={`${match.path}`} >
                  <PostPage />
                </Route>
                <Route path={`${match.path}/profile`} >
                  <ProfilePage />
                </Route>                
            </Suspense>
            </Switch>
      </div>
    );
}
export default BlogPost;

//  class BlogPost extends Component {
//   state={
//     openProfile : false,
//     openPost : true,
//     loading : false
//   }
//   componentDidMount(){
//     this.setState({loading : true});
//     setTimeout(()=>{
//       this.setState({loading : false});
//     },3000)
//   }
//   componentDidUpdate(){
//     if(this.state.openPost !== this.props.openPost || this.state.openProfile !== this.props.openProfile){
//       this.setState({openProfile : this.props.openProfile,openPost : this.props.openPost},()=>{
//         this.setState({loading : true});
//         setTimeout(()=>{
//           this.setState({loading : false});
//         },3000)  
//       })
//     }
//   }
//   render() {
//     return (
//       <div>
//        <Navbar loggedInUser ={this.props.loggedInUser} logoutHandler ={this.props.logoutHandler} profileHandler ={this.props.profileHandler} postHandler = {this.props.postHandler}/>
//         {this.state.openPost ? 
//         this.state.loading ? <Spinner loading={this.state.loading} /> : <Post loggedInUser ={this.props.loggedInUser}/> :
//         this.state.openProfile  && this.state.loading ? <Spinner loading={this.state.loading} /> : <Profile loggedInUser ={this.props.loggedInUser}/>}
//       </div>
//     );
//   }
// }

// export default BlogPost;