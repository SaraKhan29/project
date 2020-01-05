import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase = require('firebase');

export interface Ride {
    id?: string;
    start_time: string;
    end_time: string;
	start_location: string;
    end_location: string;
    date: string;
	driver:string;
	requests: string;
	current_location: string;
	cancelled: boolean;
	car:string;

	
}

@Injectable({
    providedIn: 'root'
})
export class RideService {
    private rideCollection: AngularFirestoreCollection<Ride>;

    private rides: Observable<Ride[]>;

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
    	

    getRides() {
        return this.rides;
    }

    getRide(id: string) {
        return this.rideCollection.doc<Ride>(id).valueChanges();
    }

   }



