import { Component, ViewChild, OnInit } from '@angular/core';
import { MapComponent, FeatureComponent } from 'ngx-openlayers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  @ViewChild(MapComponent, {static: false}) map : MapComponent;
  public longitude : number = -45.89279472860653;
  public latitude : number = -23.196065627947135;
  
  ngOnInit(): void {
    
  }
   

  onMapClick(event: ol.MapBrowserEvent){
    // var feat : FeatureComponent;
    // feat.instance = event.map;
    // console.log(event);
    // const map = event.map;
  }

  onGetLocalizationClick(){
    if (window.navigator && window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        location => {
          this.latitude = Number(location.coords.latitude.toPrecision());
          this.longitude = Number(location.coords.longitude.toPrecision());
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
