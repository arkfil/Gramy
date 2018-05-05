import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// import { GoogleLoginComponent } from '../components/google-login/google-login';
import { ComponentsModule } from '../components/components.module';

// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { Geolocation } from '@ionic-native/geolocation'


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
    LoginPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage

  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    // Geolocation
  ]
})
export class AppModule {}
