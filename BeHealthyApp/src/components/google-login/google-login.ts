import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})

export class GoogleLoginComponent {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform) {
    try{
      this.user = this.afAuth.authState;
    }catch(e){

    }
  }

  googleLogin() {
    console.log("google login ");

    if(this.platform.is('cordova')){
      this.nativeGoogleLogin();
      console.log("native google login ");

    }else{
      this.webGoogleLogin();
      console.log("web google login");
    }
  }

  async nativeGoogleLogin(): Promise<void> {
    try{
      const gplusUser = await this.gplus.login({
        'webClientId':'756039335184-ke1ifc475v90oa1f52c66lb7d4tisbj6.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)
      );

    }catch(err){
      console.log("Error while singing in with cordova google: " + err);
    }
  }

  async webGoogleLogin(): Promise<void>{
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log(credential);

    }catch(err){
      console.log("Error while singing in with web google: " + err);

    }
  }

  signOut(){
  try{
    this.afAuth.auth.signOut();
    if(this.platform.is('cordova')){
      this.gplus.logout();
    }else{

    }
  }catch(e){
    console.log("Error while logging out with google");
  }
  }

}
