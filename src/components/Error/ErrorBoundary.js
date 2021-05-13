import React, { Component } from 'react'
import errorImage from "../../assets/images/error-image.jpg";
import "./Error.css";
import {withRouter} from "react-router-dom";

 class ErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = {
            hasError : false
        }        
    }

    static getDerivedStateFromError(error){
        return{
            hasError : true
        }
    }

    clickHandler = ()=>{
        this.props.history.push("/");
        window.location.reload();
    }

    render() {
        if(this.state.hasError){
            return (
                <div>
                    <div className="image-div">
                        <img className="image" src={errorImage}/>
                        <button onClick = {this.clickHandler} className = "btn btn-outline-info m-3">Try Again</button>
                    </div>
                </div>

            )
        }
        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);

