
  // Initialize Firebase
$(document).ready(() => {
    var config = {
      apiKey: "AIzaSyBvE1AMLqRSm-lMvPMwprcqfwk7sz5c0QQ",
      authDomain: "baihealthy.firebaseapp.com",
      databaseURL: "https://baihealthy.firebaseio.com",
      projectId: "baihealthy",
      storageBucket: "baihealthy.appspot.com",
      messagingSenderId: "756039335184"
    };
    firebase.initializeApp(config);

    if(!Login.IsUserSignedIn()){
      Login.PrepareLoginRegScreen();
    }else{

    }
});
