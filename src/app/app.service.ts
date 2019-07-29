import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { OnWater } from './model/onwater.model';
import { throwError } from 'rxjs/internal/observable/throwError';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ONWATER_API_KEY } from '../environments/const/onwater';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _http: HttpClient,
              private firebaseService: FirebaseService) { 
                this.place = { lat:0, lon:0, water: false };
              }
  private place: OnWater;
  private readonly ONWATER_API = "https://api.onwater.io/api/v1/results/";

  async getOnWater(lat : number, long : number) : Promise<boolean>{
    var url_request = `${this.ONWATER_API}${String(lat)},${String(long)}${ONWATER_API_KEY}`;
    await this._http.get<OnWater>(url_request, {observe: 'response'}).subscribe(resp => {
      this.place.lat = lat;
      this.place.lon = long;
      this.place.water = resp.body.water;      
      this.firebaseService.addPlace(this.place); 
      return resp.body.water;
    }, err => {
      this.handleError(err);
    });
    return false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
