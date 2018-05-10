import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { DailyStats } from '../models/DailyStats';
// import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../pages/menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  // usr: firebase.User;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    platform.ready().then(() => {

      afAuth.authState.take(1).subscribe(auth=>{
        console.log('Starting app');
        console.log(auth);
        console.log("Again");
        if(auth.uid){
          this.rootPage = MenuPage;
        }else{
          this.rootPage= LoginPage;
        }
      });





      statusBar.overlaysWebView(true);

// set status bar to white
      statusBar.backgroundColorByHexString('#d54e07');

      splashScreen.hide();
    });
  }
}
