import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Ride } from '../services/ride.service';
import firebase = require('firebase');
import { BookedRide, BookedRideService } from '../services/bookedrides.service';
//import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';


 const FIREBASE_AUTH = firebase.auth();
 const db=firebase.database();

@Component({
  selector: 'app-search-results-details',
  templateUrl: './search-results-details.page.html',
  styleUrls: ['./search-results-details.page.scss'],
})
export class SearchResultsDetailsPage implements OnInit {

 
  ride: Ride;
  bookedride: BookedRide
  constructor(public alertController: AlertController, private route: ActivatedRoute, private router: Router, private bookrideService: BookedRideService) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.ride = this.route.snapshot.data['special'];
    }
  }
  
  async bookRide() {
    const alert = await this.alertController.create({
      header: 'Your ride resuest is on the way',
      message: 'Your ride request has been sent to the driver. We’ll notify you once your ride is confirmed',
      buttons: ['OK']
    });

	

    await alert.present();
  
	this.bookedride=
	{
		rideid: this.ride.id,
		uid: firebase.auth().currentUser.uid,
	};
	
	this.bookrideService.addRide(this.bookedride);


	//in driver  side
	 console.log(this.ride.available_seats);
	 this.ride.available_seats= this.ride.available_seats-1
	 
	 
	 





}
}
