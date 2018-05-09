import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase } from 'angularfire2/database';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    // try{
    //   this.afAuth.authState.subscribe(data => {
    //     if(data.email && data.uid){
    //       console.log('logged in: ' + data);
    //     }else{
    //       console.log('should do something to get rid of the user! He is not logged in!');
    //     }
    //   });
    //   console.log('ionViewDidLoad Menu');
    // }catch(e){

    // }

    console.log('ionViewDidLoad ProfilePage');
  }

  async setProfile(){
    if(this.profile.username && this.profile.height && this.profile.weight && this.profile.age){
      this.afAuth.authState.take(1).subscribe(auth=>{
        this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
            .then(()=>{
              this.navCtrl.setRoot('MenuPage');
             });


      });
    }else{
      alert("Invalid data ");
    }

  }
}
