
// TODO: When whole loggin system will be ready
//       checkout whether user is logged in if he is not continue with this script
//       if he is logged in you can ommit it and use app

$(document).ready(() => {
  console.log("login.js");
  $('head').append('<link class="login_screen_style" rel="stylesheet" href="./css/login.css" type="text/css" />');
  $(".main_contents").empty();
  $('.main_contents').load('html/login.html', () => {
    // TODO: We may need to implement

    $(".sing_up_btn").click(()=>{
      // TODO: We have to change this function, instead of just setting style
      //       we have to apply some class with animation so everything is
      //       smooth
      // $(".login_container").css("height","100%");
      $(".login_screen_heading").css("display","none");
      $(".password_repeat_group").css("display","block");
      $(".email_group").css("display","block");


      $(".whole_form").css("width","100%");
      $(".whole_form").css("height","100%");
      $(".login_form").css("margin-top","13%");


      $(".sing_in_btn").val("Cancel");
    });

    $(".sing_in_btn").click(()=>{
      if($(".sing_in_btn").val() == "Cancel"){
        // $(".login_container").css("height","");
        $(".login_screen_heading").css("display","block");
        $(".password_repeat_group").css("display","none");
        $(".email_group").css("display","none");


        $(".whole_form").css("width","");
        $(".whole_form").css("height","");
        $(".login_form").css("margin-top","");
      }else{

      }
    });


  });





});
