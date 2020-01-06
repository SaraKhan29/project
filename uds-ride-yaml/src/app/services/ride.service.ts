import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from './car.service';

export interface Ride {
    available_seats: Int16Array;
    cancelled: boolean;
    car: string;
    carobj: Car;
    current_location: string;
    date: string;
    driver: string;
    end_location: string;
    end_time: string;
    id: string;
    requests: string[];
    start_location: string;
    start_time: string;
}

@Injectable({
    providedIn: 'root'
})

export class RideService {
  private rideCollection: AngularFirestoreCollection<Ride>;

  private rides: Observable<Ride[]>;
  private allRides: Ride[];
  constructor(db: AngularFirestore) {
      this.rideCollection = db.collection<Ride>('rides');

      this.rides = this.rideCollection.snapshotChanges().pipe(
          map(actions => {
            return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
          })
      );
  }

  results: Ride[];
  getRides() {
      //this.allRides = this.rides;

    
      //this.start_location = start;
      //this.end_location = end;
      return this.rides;
  }


}