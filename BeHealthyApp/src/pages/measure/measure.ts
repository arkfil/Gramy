import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal,ModalOptions, ModalController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CardioParams } from '../../models/CardioParams';
import { OtherSympthoms } from '../../models/OtherSympthoms';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-measure',
  templateUrl: 'measure.html',
})
export class MeasurePage {
  userId: string;
  cardioParams: CardioParams;
  otherSympthoms: OtherSympthoms

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
    private afDatabase: AngularFireDatabase, private afAuth : AngularFireAuth, private callNumber: CallNumber) {
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

  callEmergency(){
    this.callNumber.callNumber(`*101#`, true);

    // this.callNumber.isCallSupported()
    // .then(function (response) {
    //     if (response == true) {
    //       this.callNumber.callNumber(`796284682`, true);

    //     }
    //     else {
    //         // do something else
    //     }
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeasurePage');
  }

  presentOtherSympthomsModal(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    let modal: Modal = this.modalCtrl.create('AddOtherSympthomsModalPage', myModalOptions);
    modal.present();

    modal.onDidDismiss((data) => {
      console.log("Modal have dismissed.");
      console.log(data);

    });

    modal.onWillDismiss((data) => {
      console.log("Modal is about to dismiss");
      console.log(data);

      this.otherSympthoms = <OtherSympthoms>data;
      this.setOtherSymthoms(this.otherSympthoms);
    });

  }

  presentCardioModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };


    let modal: Modal = this.modalCtrl.create('AddMeasureModalPage', myModalOptions);
    modal.present();

    modal.onDidDismiss((data) => {
      console.log("Modal have dismissed.");
      console.log(data);


    });

    modal.onWillDismiss((data) => {
      console.log("Modal is about to dismiss");
      console.log(data);
      this.cardioParams = <CardioParams>data;
      this.setMeasure(this.cardioParams);
    });
  }

  async setMeasure(cardioParams){
      this.afAuth.authState.take(1).subscribe(auth=>{
        this.afDatabase.list(`measures/${auth.uid}`).push(cardioParams)
        .then(()=>{
            // Nothing
            // TODO
            console.log("SAVED MEASURE IN DB");
          });
      });
  }

  async setOtherSymthoms(otherSympthom){
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.afDatabase.list(`sympthoms/${auth.uid}`).push(otherSympthom)
      .then(()=>{
          // Nothing
          // TODO
          console.log("SAVED DESEASE IN DB");
        });
    });
  }
}
