import { Component } from '@angular/core';
import { IonicPage, ToastController, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  appUser: firebase.User;
  user= {} as User;
  // profileData: AngularFireObject<Profile>

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, public platform: Platform, private facebook: Facebook,
    private gplus: GooglePlus, private afDatabase: AngularFireDatabase, private alertCtrl: AlertController,
    public toastCtrl: ToastController ) {

      afAuth.auth.onAuthStateChanged((user)=> {
        this.appUser = user;
        console.log("User:");
        console.log(this.appUser);
        if (user) {
          afDatabase.object(`profile/${user.uid}`).valueChanges().take(1).subscribe(
            data =>{
              console.log("heeeerewere:");
              console.log(data);
              if(data){
                navCtrl.setRoot('MenuPage');
              }else{
                navCtrl.setRoot('ProfilePage');
              }
          });


          console.log("USER PROFILE");

        } else {
          // No user is signed in.
          // navCtrl.setRoot('LoginPage');
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWithEmailAndPassword(user: User){
    let loading = this.loadingController.create({content : "Logging in,please wait..."});
    try{
      if(user.email && user.password) {
        loading.present();
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
        console.log(result);

        setTimeout(() => {
          loading.dismiss();
        }, 1000);

      } else {
        let alert = this.alertCtrl.create({
          title: "Invalid data",
          subTitle: "Email and password shouldn't be empty!",
          buttons: ['OK']
        });
        alert.present();
      }
    } catch(e){
      console.log("Error while signing in with email and password, error: " + e);
      // showing toast-failed
      let toast = this.toastCtrl.create({
        message: "Error while signing in with email and password. \n Please try again." ,
        duration: 5500,
        position: "top",
        showCloseButton: true,
        closeButtonText: 'Got it!',
        dismissOnPageChange: true,
        cssClass: "toast-failed"
      });
      toast.present();

      setTimeout(() => {
        loading.dismiss();
      }, 2500);
    }
  }

  registerPage(){
    this.navCtrl.push('RegisterPage');
  }

/* Login with facebook */
  loginWithFacebook(){
    try{
      if(this.platform.is('cordova')){
        this.nativeFacebookLogin();
      }else{
        this.webFacebookLogin();
      }
    }catch(e){

    }
  }

  async nativeFacebookLogin(): Promise<void> {
    try{
      const facebookLogin = await this.facebook.login(["email"]);
      let credential = firebase.auth.FacebookAuthProvider.credential(facebookLogin.authResponse.accessToken);
      return await this.afAuth.auth.signInWithCredential(credential);
    }catch(e){
      console.log("native fb: " + e);
    }
  }

  async webFacebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
  }


  /* Login with google */
  googleLogin() {
    console.log("google login ");

    if(this.platform.is('cordova')){
        //  const gplusUser =
        this.nativeGoogleLogin();
    }else{
      console.log("here");
        this.webGoogleLogin();
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
    if(err==7 || err==8)
      alert("No internet connection!");
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
}
