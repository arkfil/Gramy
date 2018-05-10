import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { CardioParams } from '../../models/CardioParams';


@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  measures: IterableIterator<CardioParams>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.afAuth.authState.take(1).subscribe(auth=>{
      afDatabase.list(`measures/${auth.uid}`).valueChanges().take(1).subscribe(
        data =>{
          console.log("heeeerewere:");
          console.log(data);
          if(data){
            this.measures = data.values.arguments;
            console.log("Measures in history");
            console.log(this.measures);
          }else{
            //something else
          }
      });
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }

}
