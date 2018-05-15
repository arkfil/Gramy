import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, ToastController } from 'ionic-angular';
import { CardioParams } from '../../models/CardioParams';

@IonicPage()
@Component({
  selector: 'page-add-measure-modal',
  templateUrl: 'add-measure-modal.html',
})
export class AddMeasureModalPage {

  cardioParams = {} as CardioParams;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController
    , public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeasureModalPage');
    //  const data = this.navParams.get('data');
  }

  closeModal() {
    this.view.dismiss();
  }

  addMeasure(){
    this.cardioParams.date = new Date().getTime();
    if (this.cardioParams.diastolic_pressure !== undefined 
      && this.cardioParams.systolic_pressure !== undefined 
      && this.cardioParams.pulse !== undefined) {
      // showing toast-success on success
      let toast = this.toastCtrl.create({
        message: `Measurements have been added`,
        duration: 2700,
        position: "top",
        showCloseButton: true,
        closeButtonText: 'OK',
        dismissOnPageChange: true,
        cssClass: "toast-success"
      });
      toast.present();
      this.view.dismiss(this.cardioParams);
    } else {
      // showing toast-failed
      let toast = this.toastCtrl.create({
        message: `Measurements can't be added. \n Please enter them firstly!`,
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
