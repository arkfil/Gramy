function CallbackUserData(userData){
  if(userData.password_2!=undefined && userData.email!=undefined && userData.password_2!="" && userData.email!=""){
    Login_reg_ctrl.SignUserUp(userData);
  }else{
    Login_reg_ctrl.SignUserIn(userData);
  }
}

var Login_reg_ctrl = {

  PrepareForm: ()=>{
    Login_reg_view.ShowLogRegForm(CallbackUserData);
  },



  SignUserIn: (userLoginData)=>{
    console.log("signing user in "+userLoginData.username+" "+userLoginData.password);
    return "not implemented";

  },

  SignUserUp: (userRegData)=>{
    console.log("signing user up "+userRegData.username+" "+userRegData.password_1+" "+userRegData.email);
    return "not implemented";
  }
}
