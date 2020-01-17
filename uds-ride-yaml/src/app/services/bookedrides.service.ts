import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase = require('firebase');

export interface BookedRide {
	rideid: string;
	uid: string
}

@Injectable({
	providedIn: 'root'
})
export class BookedRideService {
	private rideCollection: AngularFirestoreCollection<BookedRide>;

	private ridesUpdates: Observable<BookedRide[]>;
	private rides: BookedRide[] = [];

	constructor(db: AngularFirestore) {
		this.rideCollection = db.collection<BookedRide>('bookedrides');

		this.ridesUpdates = this.rideCollection.snapshotChanges().pipe(
			map(actions => {
				return actions.map(a => {
					const data = a.payload.doc.data();
					const id = a.payload.doc.id;
					return { id, ...data };
				});
			})
		);
		this.ridesUpdates.pipe(map(res => {
            this.rides = res;
        }));
	}

	

	getRides() {
		return this.ridesUpdates;
	}




	getRide(id: string) {
		return this.rideCollection.doc<BookedRide>(id).valueChanges();
	}

	
	addRide(ride: BookedRide) {
		return this.rideCollection.add(ride);
	}

	removeRide(id: string) {
		return this.rideCollection.doc(id).delete();
	}
}