import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  appUser: firebase.User;
  user= {} as User;


  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, public platform: Platform, private facebook: Facebook,
    private gplus: GooglePlus) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWithEmailAndPassword(user: User){
    let loading = this.loadingController.create({content : "Loging in ,please wait..."});
    try{
      loading.present();

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.appUser = result;
      if(result){
        this.navCtrl.setRoot('MenuPage');
      }

      loading.dismissAll();
    } catch(e){
      console.log("Error while signing in with email and password, error: " + e);
      loading.dismissAll();
    }

  }

  registerPage(){
    this.navCtrl.push('RegisterPage');
  }


/* Login with facebook */
  loginWithFacebook(){
    try{
      if(this.platform.is('cordova')){
        this.facebook.login(["email"]).then(loginResp=>{
          let credential = firebase.auth.FacebookAuthProvider.credential(loginResp.authResponse.accessToken);
          firebase.auth().signInWithCredential(credential).then(info=>{
            console.log(info);
            this.appUser = info;
          }).catch(e=>{
            console.log(e);
          });
        }).catch(e=>{
          console.log(e);
        });

      }else{
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(()=>{
          firebase.auth().getRedirectResult().then(result=>{
            console.log(result);
            this.appUser=result;
          }).catch(err=>{
            console.log(err);
          });
        }).catch(e=>{});
      }
    }catch(e){

    }
  }

  /* Login with google */
  googleLogin() {
    console.log("google login ");

    if(this.platform.is('cordova')){

      try{
        //  const gplusUser =
        this.gplus.login({
          'webClientId':'756039335184-ke1ifc475v90oa1f52c66lb7d4tisbj6.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        }).then(loginResp=>{
          console.log("here");

          let credential = firebase.auth.GoogleAuthProvider.credential(loginResp.authResponse.idToken)
          firebase.auth().signInWithCredential(credential).then(info=>{
            console.log(info);
            this.appUser = info;
          }).catch(e=>{
            console.log("ErrorHERE"+e);
          });
        }).catch(err=>{
          console.log("Hell, here error: "+ err);
        });

      }catch(err){
        console.log("Error while singing in with cordova google: " + err);
      }
    }else{
      console.log("here");

      try{
        const provider = new firebase.auth.GoogleAuthProvider();

        // const credential = this.afAuth.auth.signInWithPopup(provider);
        firebase.auth().signInWithPopup(provider).then(()=>{
          firebase.auth().getRedirectResult().then(result=>{
            console.log(result);
            this.appUser =result;
          }).catch(err=>{
            console.log(err);
          });
        }).catch(e=>{
          console.log(e);
        });


      }catch(err){
        console.log("Error while singing in with web google: " + err);

      }
    }
  }




}
