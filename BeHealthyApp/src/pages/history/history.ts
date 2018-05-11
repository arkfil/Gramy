import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { CardioParams } from '../../models/CardioParams';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  measures: Array<CardioParams>;
  user_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.measures=[];
    this.afAuth.authState.take(1).subscribe(auth=>{

      this.user_id = auth.uid;
    });

    console.log("History constructor");
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter HistoryPage');

    this.afDatabase.list(`measures/${this.user_id}`).valueChanges().take(1).subscribe(
      data =>{
        console.log("heeeerewere:");
        console.log(data);
        if(data){
          console.log("Measures in history");
          console.log(this.measures);
          this.measures=[];

          data.forEach(item => {
             this.measures.push(<CardioParams>item);
          });

          console.log(this.measures);
        }else{
          //something else
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

  }

}
