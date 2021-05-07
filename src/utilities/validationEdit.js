export default function validation(values){    
    let errors = {}
    let valid = true;
    
    if(!values.username.trim()){
        errors.username = "Username Required";
        valid = false;
    }
    
    if(!values.password.trim()){
        errors.password = "Password Required";
        valid = false;
    }

    if(!values.firstName.trim() ){
        errors.firstName = "First Name Required";
        valid = false
    }

    if(!values.lastName.trim()){
        errors.lastName = "Last Name Required";
        valid = false
    }

    if(!values.role ==="admin" || !values.role ==="user" || !values.role.trim()){
        errors.role = "Role should be either admin or user only";
        valid = false
    }

    if(values.phonenumber.length > 10 || values.phonenumber.length < 10 ){
        errors.phonenumber = "Phone Number Required ";
        valid = false
    }
    return {errors,valid};
}