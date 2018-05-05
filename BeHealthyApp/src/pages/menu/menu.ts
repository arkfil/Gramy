import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { ChartPage } from '../chart/chart';

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
    {title:'Measure', pageName: 'TabsPage', tabComponent: 'MeasurePage', index: 0, icon: 'home'},
    {title:'Tab 2', pageName: 'TabsPage', tabComponent: 'Tab2Page', index: 1, icon: 'contacts'},
    {title:'Map', pageName: 'MapPage', icon: 'map'},
    {title:'Chart', pageName: 'ChartPage', icon: 'md-stats'}

  ]

  constructor(private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    // this.pages = [
    //   { title: 'Chart Page', component: ChartPage  }
    // ];

  }

  ionViewDidLoad() {
    try{
      this.afAuth.authState.subscribe(data => {
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
}
