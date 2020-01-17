import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { IonicSelectableComponent } from 'ionic-selectable';
import {IonSlides, NavController } from '@ionic/angular';
import { Ride, RideService } from '../services/ride.service';
import { BookedRide, BookedRideService } from '../services/bookedrides.service';
import { Router } from '@angular/router';
import {Car, CarService } from '../services/car.service';
import firebase = require('firebase');

 const FIREBASE_DATABASE = firebase.database()
 const FIREBASE_AUTH = firebase.auth();

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  rides: Ride[];
  rides2: Ride;
  cars: Car[];
  bookedrides: BookedRide[]
  public carobj2
  constructor(
    public alertController: AlertController,
    private navControl: NavController,
    private router: Router,
    private rideservice: RideService,
    private carService: CarService,
	private bookrideService: BookedRideService
  ) {}

  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  ngOnInit() {
  }

  async getRides() {
   
   await this.rideservice.getMyRidesUpdates().subscribe(res => {
   this.rides = res;
   console.log(this.rides)
   // for each ride in this.rides set the value of carobj using this.rides[i].car which is the id. 
   
   this.carService.getAllCarUpdates().subscribe(res => {
    this.cars = res;

    for (const ride of this.rides) {
      for (const car of this.cars) {
        if (car.id === ride.car) {
          ride.carobj = car;
        }
      }
    }
   });
    console.log("Rides found: " + this.rides);
  });
  }


async getBookedRides()
{
	var currentuser=FIREBASE_AUTH.currentUser.uid;
	await this.bookrideService.getRides().subscribe(res => {
    		this.bookedrides = res;

	 console.log(this.bookedrides)
   // for each ride in this.rides set the value of carobj using this.rides[i].car which is the id. 
   
   /*this.carService.getAllCarUpdates().subscribe(res => {
    this.cars = res;

    for (const ride of this.bookedrides) {
      for (const car of this.cars) {
        if (car.id === ride.car) {
          ride.carobj = car;
        }
      }
    }
   });
    console.log("Rides found: " + this.bookedrides);










			//if(this.bookedrides[0].uid==currentuser)
			//{
   					/*console.log(this.bookedrides[0].rideid)
   					this.rideservice.getRide(this.bookedrides[0].rideid).subscribe(res => {
    				this.rides2 = res;
		    		console.log(this.rides2);
					this.carService.getCar(this.rides2.car).subscribe(res2 => {
    				this.carobj2 = res2;
					console.log(this.carobj2)
					
   					})
			})*/
		
	})
}

chatTest() {
  this.navControl.navigateForward('chat');
}


}
