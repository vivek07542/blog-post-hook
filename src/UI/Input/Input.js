// import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {validateInput} from "../../utilities/Validators";


import React, { Component } from 'react'

export default class Input extends Component {
    state = {
        error : false
    }
    
    handleChange = (event) => {
        const { validators,  onChange} = {...this.props}
        const value = event.target.value;
        const updateError = validateInput(validators,value);
        this.setState({error : updateError},()=>{
            onChange(value,this.state.error);
        });
    };
    render() {
      
        const {value, label, placeholder, type, data,touched} = {...this.props}

        const inputClasses = ["form-control"];
        if(touched ){
            this.state.error ? inputClasses.push("is-invalid") : inputClasses.push("is-valid")
        }
        return (
            <div className="form-group">
            {label && <label htmlFor="app-input-field">{label}</label>}
            {type === 'textarea' ? 
                <textarea
                    type ={type}
                    className= {inputClasses.join(' ')}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleChange}
                />
             : type === "select" ? 
                <select
                   type={type}
                    value={value}
                    className={inputClasses.join(' ')}
                    placeholder={placeholder}
                    onChange={this.handleChange}>
                    {data.map((e, key) => {
                        return <option key={key} value={e.name}>{e.name}</option>;
                    })}
            </select> : (
                <input
                    type={type}
                    value={value}
                    className={inputClasses.join(' ')}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                /> 
            )}
            {this.state.error && <span className='text-danger'>{this.state.error.message}</span>}
        </div>
    )
        
    }
}

Input.propTypes = {
    value:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validators: PropTypes.array,
    type: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    data : PropTypes.array
};

Input.defaultProps = {
  value: '',
  label: '',
  placeholder: '',
  type: 'text',
  validators: [],
  data : []
};
// const Input = ({value, label, placeholder, validators, type, onChange,data,touched}) => {
//     const [error, setError] = useState(false);
    
//     const this.handleChange = (event) => {
//         const {value} = event.target;
//         console.log(validateInput(validators));
//         setError(validateInput(validators,value));
//         onChange(value,error);
//     };

// const inputClasses = ["form-control"];
// if(touched ){
//    error ? inputClasses.push("is-invalid") : inputClasses.push("is-valid")
// }
    
//     return (
//         <div className="form-group">
//             {label && <label htmlFor="app-input-field">{label}</label>}
//             {type === 'textarea' ? 
//                 <textarea
//                     type ={type}
//                     className= {inputClasses.join(' ')}
//                     placeholder={placeholder}
//                     value={value}
//                     onChange={this.handleChange}
//                 />
//              : type === "select" ? 
//                 <select
//                    type={type}
//                     value={value}
//                     className={inputClasses.join(' ')}
//                     placeholder={placeholder}
//                     onChange={this.handleChange}>
//                     {data.map((e, key) => {
//                         return <option key={key} value={e.name}>{e.name}</option>;
//                     })}
//             </select> : (
//                 <input
//                     type={type}
//                     value={value}
//                     className={inputClasses.join(' ')}
//                     placeholder={placeholder}
//                     onChange={this.handleChange}
//                 /> 
//             )}
//             {error && <span className='text-danger'>{error.message}</span>}
//         </div>
//     )
// };

// Input.propTypes = {
//     value:  PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//       ]),
//     label: PropTypes.string,
//     placeholder: PropTypes.string,
//     validators: PropTypes.array,
//     type: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     data : PropTypes.array
// };

// Input.defaultProps = {
//   value: '',
//   label: '',
//   placeholder: '',
//   type: 'text',
//   validators: [],
//   data : []
// };

// export default Input;