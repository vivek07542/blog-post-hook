const regex = {
  email: new RegExp(
    "^(([^<>()\\[\\]\\\\.,;:\\s@]+(\\.[^<>()\\[\\]\\\\.,;:\\s@]+)*)|(.+))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$"
  ),
  number: new RegExp("^[0-9]+$"),
};

export class Validators {
  static email(value, message) {
    if (value) {
      const result = regex.email.test(value);
      if (!result) return { error: true, message };
    }
  }
  static userCheck(value, message) {
    const localValue = JSON.parse(localStorage.getItem("usersDetail"));
    const loginBlogApp = JSON.parse(localStorage.getItem("loginBlogApp"));
    for (let users in localValue) {
      if (localValue[users].username === value  && message !== "User cant be Same") {
        return { error: true, message };
      }
      else if(loginBlogApp.loggedInUser.username === value && message === "User cant be Same"){
        return false
      }
    }
    return false;
  }
  static phoneNumber(value, message) {
    let phoneno = /^[0-9]{10}$/;
    if(value){
      if(!value.match(phoneno)){
        return { error: true, message }
      }
      else{
        return false
      }
    }    
    return false;
  }
  static required(value, message) {
    if (!value || !value.toString().trim().length) {
      return { error: true, message };
    }
    return false;
  }
  static number(value, message) {
    const length = value ? value.toString().length : 0;
    if (length > 0) {
      const result = regex.number.test(value);
      if (!result) {
        return { error: true, message };
      }
    }
    return false;
  }
}
export const validateInput = (validators, value) => {
  if (validators && validators.length) {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i].check(value, validators[i].message);
      if (error) {
        return error;
      }
    }
  }
  return false;
};