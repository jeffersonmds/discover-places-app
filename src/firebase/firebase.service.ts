import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { OnWater } from 'src/app/model/onwater.model';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //public places: Observable<any[]>;
  public places: AngularFirestoreCollection<OnWater>;

    constructor(db: AngularFirestore) {
        //this.places = db.collection('/random-places').valueChanges();
        this.places = db.collection('random-places');
    }

    addPlace(place : OnWater) {
      return new Promise<any>((resolve, reject) =>{
        this.places
            .add(place)
            .then(res => {}, err => reject(err));
      });
      // if (place != null){
      //   this.places.add(place);
      // }      
    } 
}
