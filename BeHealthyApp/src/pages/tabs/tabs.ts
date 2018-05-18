import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {
  tab1Root = 'MeasurePage';
  tab2Root = 'HistoryPage';
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    private backgroundMode: BackgroundMode, private localNotifications: LocalNotifications) {
    this.myIndex = navParams.data.tabIndex || 0;

    platform.ready().then(() => {

      this.backgroundMode.on('activate').subscribe(() => {



      });

      this.backgroundMode.enable();
      console.log("notific");
      this.localNotifications.requestPermission();
      this.localNotifications.schedule({
        id: 1,
        title: 'Remember to take a measures!',
        text: 'Get your hearth rate and blood pressure measure now!',
        data: { my_data: "" },
        every: 'hour'
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }



}
