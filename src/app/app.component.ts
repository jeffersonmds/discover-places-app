import { Component, ViewChild, OnInit } from '@angular/core';
import { MapComponent, FeatureComponent } from 'ngx-openlayers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  @ViewChild(MapComponent, {static: false}) map : MapComponent;
  public longitude : number;// -45.89279472860653;
  public latitude : number; // -23.196065627947135;
  public mapZoom : number;
  public dotColor : string = 'blue';
  
  ngOnInit(): void {
    this.onGetRandomClick();
    this.setMapZoom();
    console.log("Latitude: " + this.latitude + "\nLongitude: " + this.longitude);
  }
   

  onMapClick(event: ol.MapBrowserEvent){
    // var feat : FeatureComponent;
    // feat.instance = event.map;
    // console.log(event);
    // const map = event.map;
  }

  setMapZoom(value : number = 0){
    switch(value){
      case 0:
        this.mapZoom = 3;
        break;
      case 1:
        this.mapZoom = 12;
        break;
      case -1:
        this.mapZoom = 1;
        break;
    }
  }

  onGetRandomClick(){
    this.dotColor = 'blue';
    this.latitude = Math.random() * (90 - (-90)) + (-90);
    this.longitude = Math.random() * (180 - (-180)) + (-180);
    console.log("Latitude: " + this.latitude + "\nLongitude: " + this.longitude);
  }

  onGetLocalizationClick(){
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => {
          this.latitude = Number(location.coords.latitude.toPrecision());
          this.longitude = Number(location.coords.longitude.toPrecision());
          this.dotColor = 'green';
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
    else {
      console.log('Geolocation API not supported.');
    }
  }
}
