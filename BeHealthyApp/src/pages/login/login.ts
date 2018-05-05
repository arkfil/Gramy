import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth'



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user= {} as User;

  constructor(private afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async loginWithEmailAndPassword(user: User){
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result)
        this.navCtrl.setRoot('MenuPage');
    } catch(e){
      console.log("Error while signing in with email and password, error: " + e);
    }

  }

  registerPage(){
    this.navCtrl.push('RegisterPage');
  }

}
