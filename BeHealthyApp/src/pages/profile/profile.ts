import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {
  profile = {} as Profile;
  profileData: AngularFireObject<Profile>;
  profile_already_exists: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth,
    private afDatabase: AngularFireDatabase, public toastCtrl: ToastController) {
    this.profile_already_exists = false;
    this.afAuth.authState.take(1).subscribe(auth=>{
      afDatabase.object(`profile/${auth.uid}`).valueChanges().take(1).subscribe(
        data =>{
          console.log("heeeerewere:");
          console.log(data);
          if(data){
            this.profile_already_exists = true;
            this.profile.age = (<Profile>data).age;
            this.profile.weight = (<Profile>data).weight;
            this.profile.height = (<Profile>data).height;
            this.profile.username = (<Profile>data).username;
            this.profile.telephone = (<Profile>data).telephone;
            this.profile.gender = (<Profile>data).gender;
          }else{
            this.profile_already_exists = false;
            //something
          }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  async setProfile(){
    if(this.profile.username && this.profile.height && this.profile.weight 
      && this.profile.age && this.profile.telephone){
      this.afAuth.authState.take(1).subscribe(auth=>{
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(()=>{
          if(this.profile_already_exists){
            // showing toast-success on success
            let toast = this.toastCtrl.create({
              message: `Profile has been updated`,
              duration: 2700,
              position: "top",
              showCloseButton: true,
              closeButtonText: 'OK',
              dismissOnPageChange: true,
              cssClass: "toast-success"
            });
            toast.present();

          }else{
            this.navCtrl.setRoot('MenuPage');
          }
          });
      });
    }else{
      // showing toast-failed
      let toast = this.toastCtrl.create({
        message: `All fields are required. \n Profile has not been updated!`,
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
