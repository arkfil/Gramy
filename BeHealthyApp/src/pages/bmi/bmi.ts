import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalOptions, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-bmi',
  templateUrl: 'bmi.html',
})
export class BmiPage {
  bmi: any;
  result: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
      
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter MeasurePage');
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).valueChanges().take(1).subscribe(
        data => {
          if (data) {
            console.log('GETTING BMI - calc');
            // weight/(height/100*height/100)
            this.bmi = ((<Profile>data).weight / (Math.pow(((<Profile>data).height / 100), 2))).toFixed(2);
            if (this.bmi < 18.5) {
              this.result = "You are too thin (Underweight)"
            }
            if (this.bmi > 18.5 && this.bmi < 25) {
              this.result = "You are healthy (Normal weight)"
            }
            if (this.bmi > 25) {
              this.result = "You have Overweight"
            }
          }
        });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BmiPage');
  }

}
