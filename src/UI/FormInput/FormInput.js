import {useState} from "react";
// import validation from "../../utilities/validation"

const FormInput = () =>{
    const[values,setValues] = useState({
        username : "",
        password : ""
    })

    const inputHandler = event =>{
        const{name,value} = event.target
        setValues({
            ...values,
            [name] : value
        })
    }

    return {inputHandler,values}
}
export default FormInput;