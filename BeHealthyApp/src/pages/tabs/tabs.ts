import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'MeasurePage';
  tab2Root = 'HistoryPage';
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private backgroundMode: BackgroundMode) {
    this.myIndex = navParams.data.tabIndex || 0;

    platform.ready().then(() => {

      this.backgroundMode.on('activate').subscribe(() => {



      });

      this.backgroundMode.enable();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }



}
