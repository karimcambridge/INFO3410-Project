import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentEvents;
  user: Observable<firebase.User>;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers = [];
  //ref = firebase.database().ref('geolocations/');

  constructor(public navCtrl: NavController,
              public platform: Platform
              //private geolocation: Geolocation,
              //private device: Device
              ) {

    platform.ready().then(() => {
      this.initMap();
    });
    /*this.ref.on('value', resp => {
      //this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if(data.uuid !== this.device.uuid) {
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation);
          this.setMapOnAll(this.map);
        } else {
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation);
          this.setMapOnAll(this.map);
        }
      });
    });*/
    this.currentEvents = [
        {
            year: 2018,
            month: 3,
            date: 22,
            event: 'Earth Day'
        },
        {
          year: 2018,
          month: 4,
          date: 18,
          event: 'End of Semester'
        },
        {
            year: 2018,
            month: 5,
            date: 16,
            event: 'Birthday'
        }
    ];
  }

  onDaySelect(ev) {
  
  }

  initMap() {
    this.deleteMarkers();
    let mylocation = new google.maps.LatLng(10.7169, -61.4764);
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: mylocation
    });
    let updatelocation = new google.maps.LatLng(10.7169, -61.4764);
    this.addMarker(updatelocation);
    this.setMapOnAll(this.map);
  }

  addMarker(location) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for(var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  /*updateGeolocation(uuid, lat, lng) {
    if(localStorage.getItem('geoKey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('geoKey')).set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('geoKey', newData.key);
    }
  }*/

}

/*export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};*/