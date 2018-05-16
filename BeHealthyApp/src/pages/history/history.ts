import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { CardioParams } from '../../models/CardioParams';
import { OtherSympthoms } from '../../models/OtherSympthoms';


export interface MeasureMapper{
  date: string,
  systolic_pressure: number,
  diastolic_pressure: number,
  pulse: number
}

export interface SympthomMapper{
  date: string,
  intensity: number,
  name: string,
  description: string
}
@IonicPage()

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})


export class HistoryPage {
  @ViewChild(Slides) slides: Slides;
  measures: Array<MeasureMapper>;
  sympthoms: Array<SympthomMapper>;
  user_id: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.measures=[];
    this.sympthoms=[];
    this.afAuth.authState.take(1).subscribe(auth=>{
      this.user_id = auth.uid;
    });
    console.log("History constructor");
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
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
            let tmpMsr= {} as MeasureMapper;

            tmpMsr.date = new Date((<CardioParams>item).date).toDateString() + " " +
              new Date((<CardioParams>item).date).getHours() + ":" +
              ((new Date((<CardioParams>item).date).getMinutes() < 10 ? '0' : '') +
              new Date((<CardioParams>item).date).getMinutes());

            tmpMsr.pulse = (<CardioParams>item).pulse;
            tmpMsr.diastolic_pressure = (<CardioParams>item).diastolic_pressure;
            tmpMsr.systolic_pressure = (<CardioParams>item).systolic_pressure;

            this.measures.push(tmpMsr);
          });
          console.log(this.measures);
        }else{
          //something else
        }
    });


    this.afDatabase.list(`sympthoms/${this.user_id}`).valueChanges().take(1).subscribe(
      data =>{
        console.log("heeeerewer222:");
        console.log(data);
        if(data){

          this.sympthoms=[];

          data.forEach(item => {
            let tmpSpt= {} as SympthomMapper;

            tmpSpt.date = new Date((<OtherSympthoms>item).date).toDateString() + " " +
             new Date((<OtherSympthoms>item).date).getHours() + ":" +
              ((new Date((<OtherSympthoms>item).date).getMinutes() < 10 ? '0' : '') +
              new Date((<OtherSympthoms>item).date).getMinutes());

            tmpSpt.intensity = (<OtherSympthoms>item).intensity;
            tmpSpt.name = (<OtherSympthoms>item).name;
            tmpSpt.description = (<OtherSympthoms>item).description;

             this.sympthoms.push(tmpSpt);
          });

          console.log(this.sympthoms);
        }else{
          //something else
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

  }

}
