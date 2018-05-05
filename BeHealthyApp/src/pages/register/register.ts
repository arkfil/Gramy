import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth'



@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private afAuth : AngularFireAuth, private toasts: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
      if(user.password == user.repeated_password){
        const result  = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        console.log(result);
        if(result)
          this.navCtrl.setRoot('LoginPage');
      }else{
        this.toasts.create({
          message:'Passwords should match!',
          duration: 4000,
          position: 'bottom',
          showCloseButton: true,
          cssClass: 'assertive'
        }).present();
      }

    }catch(e){
      console.log("Error while creating user with email and password, error: " + e);
    }
  }
}
