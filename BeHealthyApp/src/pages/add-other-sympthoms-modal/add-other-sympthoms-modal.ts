import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-add-other-sympthoms-modal',
  templateUrl: 'add-other-sympthoms-modal.html',
})
export class AddOtherSympthomsModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddOtherSympthomsModalPage');
  }

  addMeasure(){

  }

  closeModal() {
    this.view.dismiss();
  }

}
