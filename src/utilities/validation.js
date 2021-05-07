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
    

    return {errors,valid};
}