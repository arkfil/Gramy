import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
    private afDatabase: AngularFireDatabase, private alertController: AlertController, public toastCtrl: ToastController) {
    this.profile_already_exists=false;
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
    if(this.profile.username && this.profile.height && this.profile.weight && this.profile.age){
      this.afAuth.authState.take(1).subscribe(auth=>{
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(()=>{
          if(this.profile_already_exists){
            // showing succes toast on success
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
      // showing invalid daata toast on success
      let toast = this.toastCtrl.create({
        message: `Some data is invalid. Profile has not been updated`,
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
