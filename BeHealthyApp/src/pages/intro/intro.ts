import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  page: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  navHome() {
    this.page = this.navParams.get('defaultRootPage');
    if(this.page)
    {
      // redirect to specific page if NavParams have been sent
      this.navCtrl.setRoot(this.page);
    } else {
      // redirect to LoginPage if NavParams have not been sent
      this.navCtrl.setRoot(LoginPage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
