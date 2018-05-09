import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { CardioParams } from '../../models/CardioParams';

/**
 * Generated class for the AddMeasureModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-measure-modal',
  templateUrl: 'add-measure-modal.html',
})
export class AddMeasureModalPage {

  cardioParams= {} as CardioParams;

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeasureModalPage');
    //  const data = this.navParams.get('data');
  }

  closeModal() {
    this.view.dismiss();
  }

  addMeasure(){
    // this.view.dismiss(cardioParams);
  }

}
