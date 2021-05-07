import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Modal from "../../UI/Modal/Modal";
import classNames from "classnames";

const CreatePost = (props) =>{
  const[counter,setCounter] = useState(500);

  const{register,handleSubmit,formState : {errors}} = useForm({mode:"onChange"});
  
  const counterHandler = (value)=>{
    const count = value.length
    setCounter(500 -count);
  }
  
  const onSubmit = (data) =>{
    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+" "+time;

    props.saveButtonHandler(data.post,dateTime);
    props.modelClosed();
  }
  return(
    <div>
    <Modal
      show={props.activePopup}
      modelClosed={props.modelClosed}
    >
      <div>
        <div className="jumbotron text-center my-5" id="myProfileDiv">
          <h3 className="display-4">Create Post</h3>
          <form onSubmit = {handleSubmit(onSubmit)}>
            <textarea className = {classNames("form-control" , {"is-invalid": errors.post})} placeholder = "...WritePost" {...register("post",{required : "Write Some Post",validate : value => counterHandler(value)})}/>
            {errors.post && <p className = "invalid-feedback">{errors.post.message}</p>}

            <p className="text-info">
              {" "}
              You Have{" "}
              <span
                className={
                  counter === 0 ? "text-danger" : "text-info"
                }
              >
                {" "}
                {counter}
              </span>
              Character Left..
            </p>
          
          <button className = "btn btn-outline-info" type="submit">Save Post</button>
          </form>
        </div>
      </div>
    </Modal>
  </div>
  )
}
export default CreatePost;

// export default class CreatePost extends Component {
//   state = {
//     post: { value: "",valid: false, touched: false },
//     counter: 500,
//     date : ""
//   };
//   handleChange = (key) => (value, error) => {
//     if (this.state.counter !== 0) {
//       this.setState({ [key]: { value: value, valid: !error, touched: true } });
//       const counter = 500 - value.length;
//       this.setState({ counter: counter });
//     }
//   };
//   submitHandler = ()=>{
//     var today = new Date();

//     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
//     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
//     var dateTime = date+" "+time;

//     this.setState({date : dateTime},() => {
//         this.props.saveButtonHandler(this.state.post.value,this.state.date);
//         this.props.modelClosed();
//     });
//   }
//   render() {
//     return (
//       <div>
//         <Modal
//           show={this.props.activePopup}
//           modelClosed={this.props.modelClosed}
//         >
//           <div>
//             <div className="jumbotron text-center my-5" id="myProfileDiv">
//               <h3 className="display-4">Create Post</h3>
//               <div>
//                 <Input
//                   type="textarea"
//                   placeholder="...Write Post"
//                   value={this.state.post.value}
//                   onChange={this.handleChange("post")}
//                   validators={[
//                     {
//                       check: Validators.required,
//                       message: "Please Write Post",
//                     },
//                   ]}
//                   touched={this.state.post.touched}
//                 />
//                 <p className="text-info">
//                   {" "}
//                   You Have{" "}
//                   <span
//                     className={
//                       this.state.counter === 0 ? "text-danger" : "text-info"
//                     }
//                   >
//                     {" "}
//                     {this.state.counter}
//                   </span>
//                   Character Left..
//                 </p>
//               </div>
//               <Button onClick={this.submitHandler}>Save Post</Button>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }
