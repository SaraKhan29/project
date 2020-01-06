import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import firebase = require('firebase');
import { ProfileService, Profile } from '../services/profile.service';
import { CarService, Car } from '../services/car.service';
import { RideService, Ride } from '../services/create-ride.service';


 var FIREBASE_AUTH = firebase.auth();
 var FIREBASE_MESSAGING = firebase.messaging();
 var FIREBASE_DATABASE = firebase.database();

function handleTokenRefresh() {
  return FIREBASE_MESSAGING.getToken().then((token) => {
    FIREBASE_DATABASE.ref('/tokens').push({
      token: token,
      uid: FIREBASE_AUTH.currentUser.uid
    });
  });
}


@Component({
  selector: 'app-search-results-details',
  templateUrl: './search-results-details.page.html',
  styleUrls: ['./search-results-details.page.scss'],
})
export class SearchResultsDetailsPage implements OnInit {

  private profile: Profile;
  private ride:Ride;
  private car:Car;
  private profileref: Profile
  private rideid= "BxD2h7xBCayTnzC7IA9m"; 
  public carid;
  public userid;
  public circle;
  public cross;

   constructor(public alertController: AlertController,
		public profileService: ProfileService,
		public carService: CarService,
		public rideService: RideService
		) { }

   ngOnInit()
   {
	
	this.rideService.getRide(this.rideid).subscribe(res1 => {
    this.ride = res1;
    this.carid=this.ride.car;
    console.log(this.ride)

		this.carService.getCar(this.carid).subscribe(res2 => {
    	this.car = res2;
		this.userid=this.car.owner;
		console.log(this.car)
	
			this.profileService.getProfile(this.userid).subscribe(res => {
    		this.profile = res;
			console.log(this.profile)
			})
    	})	
   })

	
  }



  async bookRide()
 {
     const alert = await this.alertController.create({
      header: 'Your ride resuest is on the way',
      message: 'Your ride request has been sent to the driver. We’ll notify you once your ride is confirmed',
      buttons: ['OK']
    })
	await alert.present();
	

	FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .catch((err) => {
      console.log("error getting permission!");
    })

	const notificationMessage = "Hi Driver! There is a booking reuqest for you!"
  	if ( !notificationMessage ) return;

  	FIREBASE_DATABASE.ref('/notifications')
    .push({
      user: FIREBASE_AUTH.currentUser.displayName,
      message: notificationMessage
    })
    .then(() => {
     console.log("notification sent")
    })
    .catch(() => {
      console.log("error sending notification :(")
    });

  };


}