import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DailyStats } from '../models/DailyStats';
// import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../pages/menu/menu';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';
//
import { Storage } from '@ionic/storage';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild('myNav') nav: NavController;
  // usr: firebase.User;

  ionViewDidLoad() {
    console.log('ionViewDidLoad app.component.ts !!!');

    console.log('ionViewDidLoad NAV SET ROOT INTRO');
    
    
    this.storage.get('intro-done').then(done => {
      // if (!done) {
        this.storage.set('intro-done', true);
        this.nav.setRoot(IntroPage);//, { 'defaultRootPage': "LoginPage" });
      // }
    });
  }

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
    public storage: Storage,) {

    platform.ready().then(() => {

      afAuth.authState.take(1).subscribe(auth=>{
        console.log('Starting app');
        console.log(auth);
        console.log("Again");
        if (auth && auth.uid) {  
          //
          this.storage.get('intro-done').then(done => {
            // if (!done) {
            if (done !== null && done !== undefined) {
              this.storage.set('intro-done', true);
              this.nav.setRoot(IntroPage, { 'defaultRootPage': "MenuPage" });
            }
          });

          //this.rootPage = MenuPage;

        }else{
          //
          this.storage.get('intro-done').then(done => {
            // if (!done) {
            if (done !== null && done !== undefined) {
              
              this.storage.set('intro-done', true);
              this.nav.setRoot(IntroPage, { 'defaultRootPage': "LoginPage" });
            }
          });

          //this.rootPage= LoginPage;

        }
      });

      // set status bar to white
      statusBar.backgroundColorByHexString('#d54e07');
    });
  }
}
