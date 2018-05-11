import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { OtherSympthoms } from '../../models/OtherSympthoms';


@IonicPage()
@Component({
  selector: 'page-add-other-sympthoms-modal',
  templateUrl: 'add-other-sympthoms-modal.html',
})
export class AddOtherSympthomsModalPage {

  otherSympthom= {} as OtherSympthoms;


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOtherSympthomsModalPage');
  }

  addMeasure(){
    this.otherSympthom.date = new Date().getTime();

    this.view.dismiss(this.otherSympthom);

  }

  closeModal() {
    this.view.dismiss();
  }

}
