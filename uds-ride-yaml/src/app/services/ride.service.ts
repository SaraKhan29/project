import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from './car.service';
import firebase = require('firebase');

export interface Ride {
	id?: string;

	available_seats: number;

	cancelled: boolean;

	car: string;
	carobj?: Car;

	current_location: string;

	date: string;
	driver: string;
	requests: string[];

	start_location: string;
	start_time: string;

	end_location: string;
	end_time: string;
}

@Injectable({
	providedIn: 'root'
})
export class RideService {
	private rideCollection: AngularFirestoreCollection<Ride>;

	private ridesUpdates: Observable<Ride[]>;
	private rides: Ride[] = [];

	constructor(db: AngularFirestore) {
		this.rideCollection = db.collection<Ride>('rides');

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

	initRide(): Ride {
		return {
			available_seats: 0,
			cancelled: false,
			car: '',
			current_location: '',
			date: '',
			driver: '',
			end_location: '',
			end_time: '',
			requests: [],
			start_location: '',
			start_time: ''
		}
	}

	getRides() {
		return this.ridesUpdates;
	}


	getMyRides() {
		return this.rides.filter(ride => {
            if (!ride.driver || !firebase.auth().currentUser) {
                return false;
            }
            return ride.driver === firebase.auth().currentUser.uid;
        });
	}

	getMyRidesUpdates() {
        return this.ridesUpdates.pipe(
            map(rides => {
                return rides.filter(ride => {
                    if (!ride.driver || !firebase.auth().currentUser) {
                        return false;
                    }

                    return ride.driver === firebase.auth().currentUser.uid;
                });
            })
        );
    }


	getRide(id: string) {
		return this.rideCollection.doc<Ride>(id).valueChanges();
	}

	updateRide(ride: Ride) {
		return this.rideCollection.doc(ride.id).update(ride);
	}

	addRide(ride: Ride) {
		return this.rideCollection.add(ride);
	}

	removeRide(id: string) {
		return this.rideCollection.doc(id).delete();
	}
}