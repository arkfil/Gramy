import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { DailyStats } from '../models/DailyStats';
// import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../pages/menu/menu';
// import * as firebase from 'firebase/app';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  // usr: firebase.User;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

    // this.usr=afAuth.auth.currentUser;
    // console.log("HIGHHIGHHIGHHIGHHIGHHIGHHIGHHIGH");
    // console.log(this.usr);
    //  if (this.usr) {
    //       // this.appUser = user;
    //       // console.log("User:");
    //       // console.log(this.appUser);
    //       this.rootPage = MenuPage;

    //     } else {
    //       // No user is signed in.
          this.rootPage= LoginPage;

    //     }


      // statusBar.styleDefault();
//

      statusBar.overlaysWebView(true);

// set status bar to white
      statusBar.backgroundColorByHexString('#d54e07');

      splashScreen.hide();
    });
  }
}
