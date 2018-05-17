import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { ChartPage } from '../chart/chart';
import { LoginPage } from '../login/login';
import { AuthorsPage } from '../authors/authors';
import { ProfilePage } from '../profile/profile';

export interface PageInterface{
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'menu.html',
})
export class MenuPage {
  rootPage = 'TabsPage';
  @ViewChild(Nav) nav: Nav;

  // pages: Array<{title: string, component: any}>;
  pages: PageInterface[] = [
    {title:'Measure', pageName: 'TabsPage', tabComponent: 'MeasurePage', index: 0, icon: 'md-analytics'},
    {title:'History', pageName: 'TabsPage', tabComponent: 'HistoryPage', index: 1, icon: 'md-clock'},
    {title:'Map', pageName: 'MapPage', icon: 'map'},
    {title:'Chart', pageName: 'ChartPage', icon: 'md-stats'},
    {title:'Profile', pageName:'ProfilePage', icon:'md-contact'},
    {title:'Authors', pageName:'AuthorsPage', icon: 'md-brush'}
  ]

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    try{
      this.afAuth.authState.take(1).subscribe(data => {
        if(data.email && data.uid){
          console.log('logged in: ' + data);
        }else{
          console.log('should do something to get rid of the user! He is not logged in!');
        }
      });
      console.log('ionViewDidLoad Menu');
    }catch(e){
    }
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    let params = {};
    if(page.index){
      params = { tabIndex: page.index };
    }
    if(this.nav.getActiveChildNavs()[0] && page.index != undefined){
      this.nav.getActiveChildNavs()[0].select(page.index);
    }else{
      this.nav.setRoot(page.pageName, params, {animate: true, direction: 'forward'});
    }
  }

  isActive(page: PageInterface){
    let childNav = this.nav.getActiveChildNavs()[0];

    if(childNav){
      if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return 'primary';
      }
      return;
    }
    if(this.nav.getActive() && this.nav.getActive().name == page.pageName){
      return "primary";
    }
  }

  signOut(){
      try{
        this.afAuth.auth.signOut();
        // if(this.platform.is('cordova')){
        //   this.gplus.logout();
        // }else{

        // }
        this.navCtrl.setRoot(LoginPage);
      }catch(e){
        console.log("Error while logging out with google");
      }
  }
}
