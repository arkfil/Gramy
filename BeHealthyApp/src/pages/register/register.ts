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

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
    try{
      if (user.email) {
        // check that password fields are not empty and they are equal
        if (user.password && user.repeated_password
          && user.password === user.repeated_password) {
          const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
          console.log(result);
          if (result) {
            // showing toast-success on success
            let toast = this.toastCtrl.create({
              message: `Account has been created successfully!`,
              duration: 2700,
              position: "top",
              showCloseButton: true,
              closeButtonText: 'OK',
              dismissOnPageChange: true,
              cssClass: "toast-success"
            });
            toast.present();
            // opens LoginPage
            this.navCtrl.setRoot('LoginPage');
          }
        } else {
          // checking and showing alert when password fields are empty or one of them is empty
          if ((!user.password && !user.repeated_password) 
            || !user.password || !user.repeated_password) {
            // showing toast-failed
            let toast = this.toastCtrl.create({
              message: `Passwords shouldn't be empty!`,
              duration: 4500,
              position: "top",
              showCloseButton: true,
              closeButtonText: 'Got it!',
              dismissOnPageChange: true,
              cssClass: "toast-failed"
            });
            toast.present();
          }
          
          // checking and showing alert when passwords are not equal
          else if (user.password !== user.repeated_password) {
            // showing toast-failed
            let toast = this.toastCtrl.create({
              message: `Passwords should match!`,
              duration: 4500,
              position: "top",
              showCloseButton: true,
              closeButtonText: 'Got it!',
              dismissOnPageChange: true,
              cssClass: "toast-failed"
            });
            toast.present();
          }
        }
      } else {
        // showing toast-failed
        let toast = this.toastCtrl.create({
          message: `Email field is required!`,
          duration: 4500,
          position: "top",
          showCloseButton: true,
          closeButtonText: 'Got it!',
          dismissOnPageChange: true,
          cssClass: "toast-failed"
        });
        toast.present();
      }
    }catch(e){
      console.log("Error while creating user with email and password, error: " + e);
      // showing toast-failed
      let toast = this.toastCtrl.create({
        message: `Error while creating user with email and password! \n Please try again.` + e,
        duration: 4500,
        position: "top",
        showCloseButton: true,
        closeButtonText: 'Got it!',
        dismissOnPageChange: true,
        cssClass: "toast-failed"
      });
      toast.present();
    }
  }
}
