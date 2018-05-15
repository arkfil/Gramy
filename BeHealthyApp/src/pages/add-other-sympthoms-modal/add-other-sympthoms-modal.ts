import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { OtherSympthoms } from '../../models/OtherSympthoms';


@IonicPage()
@Component({
  selector: 'page-add-other-sympthoms-modal',
  templateUrl: 'add-other-sympthoms-modal.html',
})
export class AddOtherSympthomsModalPage {

  otherSympthom = {} as OtherSympthoms;
  intensity: string;
  illnesses: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController
    , public toastCtrl: ToastController) {

    this.intensity = "1";
    // list of illnesses to be selected by user
    this.illnesses = [
      'Other',
      'Chest Pain',
      'Coughs',
      'Dizziness',
      'Fever',
      'Flu',
      'General Pain',
      'Headache',
      'Stroak',
      'Rash',
      'Respiratory Problems',
      'Sore Throats',
      'Stomachache',
      'Vomiting'
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOtherSympthomsModalPage');
  }

  addMeasure() {
    this.otherSympthom.date = new Date().getTime();
    this.otherSympthom.intensity = Number(this.intensity);
    if (this.otherSympthom.name !== undefined) {
      // showing toast-success on success
      let toast = this.toastCtrl.create({
        message: `Symptom has been added`,
        duration: 2700,
        position: "top",
        showCloseButton: true,
        closeButtonText: 'OK',
        dismissOnPageChange: true,
        cssClass: "toast-success"
      });
      toast.present();
      this.view.dismiss(this.otherSympthom);
    } else {
      // showing toast-failed
      let toast = this.toastCtrl.create({
        message: `Symptom can't be added. \n Please select illness firstly!`,
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

  closeModal() {
    this.view.dismiss();
  }
}
