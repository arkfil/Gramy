import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal,ModalOptions, ModalController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-measure',
  templateUrl: 'measure.html',
})
export class MeasurePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurePage');
  }

  presentModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    // const myModalData = {
    //   name: 'Paul Halliday',
    //   occupation: 'Developer'
    // };

    let modal = this.modalCtrl.create('AddMeasureModalPage',myModalOptions);

    modal.present();

    modal.onDidDismiss((data) => {
      console.log("I have dismissed.");
      console.log(data);
    });

    modal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
});
  }
}
