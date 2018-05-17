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
    this.navCtrl.setRoot(this.page);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
