deprecated
/*

$(document).ready(() => {


  let STATE = {
    SIGNING_UP : {value: 0},
    SIGNING_IN: {value: 1},
  };
  let currentState = STATE.SIGNING_IN;


  let validateEmail = (email)=>{
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  let signUserIn = (username,password)=>{
    console.log("signing user in "+username+" "+password);
    return "not implemented";

  };

  let signUserUp = (username,password,email)=>{
    console.log("signing user up "+username+" "+password+" "+email);

    return "not implemented";
  };

  $('head').append('<link class="login_screen_style" rel="stylesheet" href="./css/login.css" type="text/css" />');
  $(".main_contents").empty();
  $('.main_contents').load('html/login.html', () => {
    $(".sing_up_btn").click(()=>{
      // TODO: We have to change this function, instead of just setting style
      //       we have to apply some class with animation so everything is
      //       smooth
      if(currentState != STATE.SIGNING_UP){
        $(".login_screen_heading").css("display","none");
        $(".password_repeat_group").css("display","block");
        $(".email_group").css("display","block");

        $(".whole_form").css("width","100%");
        $(".whole_form").css("height","100%");
        $(".login_form").css("margin-top","13%");

        $(".sing_in_btn").val("Cancel");

        currentState = STATE.SIGNING_UP;
      }else{
        let username = $(".username_input").val();
        let password_1 = $(".password_input").val();
        let password_2 = $(".password_repeat_input").val();
        let email = $(".email_input").val();

        if(password_1 == password_2 && validateEmail(email)){
          signUserUp(username,password_1,email);
        }else{
          // TODO: Display info that passwords don't match or email isn't valid
        }
      }
    });


    $(".sing_in_btn").click(()=>{
      if(currentState == STATE.SIGNING_UP){
        $(".login_screen_heading").css("display","block");
        $(".password_repeat_group").css("display","none");
        $(".email_group").css("display","none");


        $(".whole_form").css("width","");
        $(".whole_form").css("height","");
        $(".login_form").css("margin-top","");
        $(".sing_in_btn").val("Sign in");

        currentState = STATE.SIGNING_IN;
      }else if(currentState == STATE.SIGNING_IN){
        let username = $(".username_input").val();
        let password = $(".password_input").val();
        signUserIn(username,password);
      }
    });


  });





});
