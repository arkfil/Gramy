var STATE = {
  SIGNING_UP : {value: 0},
  SIGNING_IN: {value: 1},
};
var CurrentState = STATE.SIGNING_IN;
var Login_reg_view = {

  ShowLogRegForm: (CallbackUserData)=>{
      $('head').append('<link class="login_screen_style" rel="stylesheet" href="./css/login.css" type="text/css" />');
      $(".main_contents").empty();
      $('.main_contents').load('html/login.html', () => { // TODO: Callback when loading login form
          console.log("Callback when loading login form into DOM ");

          $(".sing_up_btn").on("click",()=>{
              if(CurrentState != STATE.SIGNING_UP){
                $(".login_screen_heading").css("display","none");
                $(".password_repeat_group").css("display","block");
                $(".email_group").css("display","block");

                $(".whole_form").css("width","100%");
                $(".whole_form").css("height","100%");
                $(".login_form").css("top","20px");
                $(".login_form").css("height","80%");

                $(".sing_in_btn").val("Cancel");
                CurrentState = STATE.SIGNING_UP;
              }else{
                let v_username = $(".username_input").val();
                let v_password_1 = $(".password_input").val();
                let v_password_2 = $(".password_repeat_input").val();
                let v_email = $(".email_input").val();
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                if(v_password_1 == v_password_2 &&  re.test(v_email)){
                  CallbackUserData({username: v_username, password_1:v_password_1, password_2: v_password_2, email: v_email});
                }else{
                  // TODO: Display info that passwords don't match or email isn't valid
                }
              }
          });

          $(".sing_in_btn").on("click",()=>{
            if(CurrentState == STATE.SIGNING_UP){
              $(".login_screen_heading").css("display","block");
              $(".password_repeat_group").css("display","none");
              $(".email_group").css("display","none");

              $(".whole_form").css("width","");
              $(".whole_form").css("height","");
              $(".login_form").css("margin-top","");
              $(".sing_in_btn").val("Sign in");
              CurrentState = STATE.SIGNING_IN;
            }else if(CurrentState == STATE.SIGNING_IN){
              let v_username = $(".username_input").val();
              let v_password_1 = $(".password_input").val();

              CallbackUserData({username: v_username, password:v_password_1});
            }

          });

          $(".facebook_login_start").on("click",()=>{
            CallbackUserData("facebook");
          });
          $(".twitter_login_start").on("click",()=>{
            CallbackUserData("twitter");
          });
          $(".google_login_start").on("click",()=>{
            CallbackUserData("google");
          });

      });


  }
}
