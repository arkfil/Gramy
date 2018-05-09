import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  currentLat: any;
  currentLng: any;

  @ViewChild('map') mapRef: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: Geolocation, public loadingController: LoadingController) {


  }

  ionViewDidLoad() {
    let loading = this.loadingController.create({content : "Loading map ,please wait..."});
    loading.present();

    console.log('ionViewDidLoad MapPage');
    this.geo.getCurrentPosition().then( pos => {
      this.currentLat = pos.coords.latitude;
      this.currentLng = pos.coords.longitude;
      this.showMap();
      loading.dismissAll();
     }).catch(err=>{
       console.log(err);
       loading.dismissAll();
    });


    console.log(this.mapRef);


  }

  showMap(){
    var location;
    if(this.currentLat && this.currentLng){
      location = new google.maps.LatLng(this.currentLat,this.currentLng);
    }else{
      location = new google.maps.LatLng(51.507,-0.127);
    }

    const options = {
      center: location,
      zoom: 10,
      enableHighAccuracy: false
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  async showHospitalsOnTheMap(){
    /// ...
  }

}
