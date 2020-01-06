import { Injectable } from "@angular/core";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Ride {
  id?: string;
  available_seats: string;
  date: string;
  car: string;
  end_location: string;
  start_time: string;
  driver: string;
  requests: string[];
  start_location: string;
  current_location: string;
  end_time: string;
  cancelled: boolean;
}

@Injectable({
  providedIn: "root"
})
export class RideService {
  private ridesCollection: AngularFirestoreCollection<Ride>;

  private rides: Observable<Ride[]>;

  constructor(db: AngularFirestore) {
    this.ridesCollection = db.collection<Ride>("rides");

    this.rides = this.ridesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  initRide() {
    var ride = {
      available_seats: "",
      cancelled: false,
      car: "",
      current_location: "",
      date: "",
      driver: "",
      end_location: "",
      end_time: "",
      requests: [""],
      start_location: "",
      start_time: ""
    };
    return ride;
  }

  getRides() {
    return this.rides;
  }

  getRide(id) {
    return this.ridesCollection.doc<Ride>(id).valueChanges();
  }

  updateRide(ride: Ride) {
    return this.ridesCollection.doc(ride.id).update(ride);
  }

  addRide(ride: Ride) {
    return this.ridesCollection.add(ride);
  }

  removeRide(id) {
    return this.ridesCollection.doc(id).delete();
  }
}
