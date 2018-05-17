import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
// import { GoogleLoginComponent } from '../components/google-login/google-login';
import { ComponentsModule } from '../components/components.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation'
import { MenuPage } from '../pages/menu/menu';
import { LoginPageModule } from '../pages/login/login.module';
import { MenuPageModule } from '../pages/menu/menu.module';
import { IntroPage } from '../pages/intro/intro';
//
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from "@ionic/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvE1AMLqRSm-lMvPMwprcqfwk7sz5c0QQ",
  authDomain: "baihealthy.firebaseapp.com",
  databaseURL: "https://baihealthy.firebaseio.com",
  projectId: "baihealthy",
  storageBucket: "baihealthy.appspot.com",
  messagingSenderId: "756039335184"
}

@NgModule({
  declarations: [
    MyApp,
    IntroPage
    //,
    // LoginPage,
    // MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //
    // IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'BeHealthy',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LoginPageModule,
    MenuPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MenuPage,
    IntroPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Facebook
  ]
})
export class AppModule {}
