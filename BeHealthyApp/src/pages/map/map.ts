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

  // infowindow: any;

  @ViewChild('map') mapRef: ElementRef;
  map: any;

  placesService: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: Geolocation, public loadingController: LoadingController
    , public platform: Platform) {

    let loading = this.loadingController.create({content : "Loading map, please wait..."});
    loading.present();

    platform.ready().then(() => {
        this.geo.getCurrentPosition().then( pos => {
        this.currentLat = pos.coords.latitude;
        this.currentLng = pos.coords.longitude;
        this.showMap();
        loading.dismissAll();
       }).catch(err=>{
         console.log(err);
         loading.dismissAll();
      });
    });
    loading.dismissAll();
  }




  ionViewDidLoad() {


    console.log('ionViewDidLoad MapPage');
  }

  ionViewWillEnter(){

  }


  showHospitalsOnTheMap(){
    console.log("EXAMPLE");
    console.log(this.map);
    console.log(this.mapRef.nativeElement);
    var service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch({
        location: {lat:this.currentLat, lng: this.currentLng},
        radius: 60000,
        keyword: ['lekarz','przychodnia','szpital']
      }, (results,status,pagination) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      });

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
    this.wait();
  }
  // Awefull hack, I know, still... shit works
  async wait(){
    while(this.map==undefined){}
    this.showHospitalsOnTheMap();
  }


  createMarker(place) {

    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc,
      icon: {
        url: "assets/icon/mapICO.svg",
        size: new google.maps.Size(80, 80),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      }
    });

    google.maps.event.addListener(marker, 'click', function() {
      var infowindow = new google.maps.InfoWindow(
        {content:place.name}
      );
      infowindow.open(this.map, this);
    });
  }

}
