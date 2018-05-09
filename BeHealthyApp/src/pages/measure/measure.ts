import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal,ModalOptions, ModalController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-measure',
  templateUrl: 'measure.html',
})
export class MeasurePage {
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, private afAuth : AngularFireAuth) {
    try{
      this.afAuth.authState.subscribe(data => {
        if(data.email && data.uid){
          this.userId=data.uid;
          console.log('logged in measure actv: ' + data);
        }else{
          console.log('should do something to get rid of the user! He is not logged in!');
        }
      });
      console.log('ionViewDidLoad Menu');
    }catch(e){

    }
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
