import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user= {} as User;

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController, public platform: Platform, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWithEmailAndPassword(user: User){
    let loading = this.loadingController.create({content : "Loading map ,please wait..."});
    try{
      loading.present();

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result)
        this.navCtrl.setRoot('MenuPage');
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
    // try{
      // if(this.platform.is('cordova')){
        this.facebook.login(["email"]).then(loginResp=>{
          let credential = firebase.auth.FacebookAuthProvider.credential(loginResp.authResponse.accessToken);
          firebase.auth().signInWithCredential(credential).then(info=>{
            console.log(info);
          }).catch(e=>{
            console.log(e);

          });

        }).catch(e=>{
          console.log(e);

        });

    //   }else{
    //     let provider = new firebase.auth.FacebookAuthProvider();
    //     firebase.auth().signInWithPopup(provider).then(()=>{
    //       firebase.auth().getRedirectResult().then(result=>{
    //         console.log(result);
    //       }).catch(err=>{
    //         console.log(err);
    //       });
    //     }).catch(e=>{});
    //   }
    // }catch(e){

    // }
  }


}
