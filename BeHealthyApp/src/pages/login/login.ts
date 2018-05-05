import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth'



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user= {} as User;

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController) {
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

}
