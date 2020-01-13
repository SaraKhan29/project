import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase = require('firebase');

export interface Car {
    id?: string;
    name: string;
    brand: string;
    model: string;
    seats: number;
    childseat: boolean;
    wheelchair: boolean;
    color: string;
    owner: string;
}

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private carCollection: AngularFirestoreCollection<Car>;

    private carUpdates: Observable<Car[]>;
    private cars: Car[] = [];

    constructor(db: AngularFirestore) {
        this.carCollection = db.collection<Car>('cars');

        this.carUpdates = this.carCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );

        this.carUpdates.pipe(map(res => {
            this.cars = res;
        }));
    }

    getMyCars() {
        return this.cars.filter(car => {
            if (!car.owner || !firebase.auth().currentUser) {
                return false;
            }

            return car.owner === firebase.auth().currentUser.uid;
        });
    }

    getMyCarUpdates() {
        return this.carUpdates.pipe(
            map(cars => {
                return cars.filter(car => {
                    if (!car.owner || !firebase.auth().currentUser) {
                        return false;
                    }

                    return car.owner === firebase.auth().currentUser.uid;
                });
            })
        );
    }

    getAllCars() {
        return this.cars;
    }

    getAllCarUpdates() {
        return this.carUpdates;
    }

    getCar(id: string) {
        return this.carCollection.doc<Car>(id).valueChanges();
    }

    updateCar(car: Car) {
        return this.carCollection.doc(car.id).update(car);
    }

    addCar(car: Car) {
        return this.carCollection.add(car);
    }

    removeCar(id: string) {
        return this.carCollection.doc(id).delete();
    }
}
