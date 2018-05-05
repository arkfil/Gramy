import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import { Geolocation } from '@ionic-native/geolocation'

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    console.log(this.mapRef);
    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(51.507,-0.127);
    const options = {
      center: location,
      zoom: 10
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

}
