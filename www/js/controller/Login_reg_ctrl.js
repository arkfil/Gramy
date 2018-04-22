function CallbackUserData(userData){
  if(userData.password_2!=undefined && userData.email!=undefined && userData.password_2!="" && userData.email!=""){
    Login_reg_ctrl.SignUserUp(userData);
  }else if(userData.password!=undefined && userData.username!=undefined ){
    Login_reg_ctrl.SignUserIn(userData);
  }else{
    console.log("Social media sign in");
    switch(userData){
      case "facebook": Login_reg_ctrl.SignInWithFacebook(); break;
      case "google": Login_reg_ctrl.SignInWithGoogle(); break;
      case "twitter": Login_reg_ctrl.SignInWithTwitter(); break;
    }
  }
}

var Login_reg_ctrl = {

  PrepareForm: ()=>{
    Login_reg_view.ShowLogRegForm(CallbackUserData);
  },

  SignUserIn: (userLoginData)=>{
    console.log("signing user in "+userLoginData.username+" "+userLoginData.password);
    let auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(userLoginData.username,userLoginData.password);
    promise.catch(e => console.log("Error while logging in: " + e.message));

  },

  SignUserUp: (userRegData)=>{
    console.log("signing user up "+userRegData.username+" "+userRegData.password_1+" "+userRegData.email);
    let auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(userLoginData.username,userLoginData.password);
    promise.catch(e => console.log("Error while registering: " + e.message));

  },
  SignInWithFacebook: () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
      'display': 'popup'
    });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  },

  SignInWithGoogle: () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  },

  SignInWithTwitter: () => {
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });  }
}

firebase.auth().onAuthStateChanged(firebaseUser=>{
  if(firebaseUser){
    console.log("logged in");
  }else{
    console.log("not logged in");
  }
});
