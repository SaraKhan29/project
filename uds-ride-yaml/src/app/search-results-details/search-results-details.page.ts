import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import firebase = require('firebase');
import { ProfileService, Profile } from '../services/profile.service';
import { CarService, Car } from '../services/car.service';
import { RideService, Ride} from '../services/create-ride.service';
import { environment } from 'src/environments/environment';


 var FIREBASE_AUTH = firebase.auth();
 var FIREBASE_MESSAGING = firebase.messaging();
 var FIREBASE_DATABASE = firebase.database();







@Component({
  selector: 'app-search-results-details',
  //templateUrl:  './search-results-details.page.html',
  templateUrl:  './sara.html',
  styleUrls: ['./search-results-details.page.scss'],
})
export class SearchResultsDetailsPage implements OnInit {

  private profile: Profile;
  private ride:Ride;
  private car:Car;
  private profileref: Profile
  public carid;
  public  userid;
  public circle;
  public cross;
  public rideid="kWcDR0fbGrpuT9YhdKCw";

   constructor(public alertController: AlertController,
		public profileService: ProfileService,
		public carService: CarService,
		public rideService: RideService
		) { }


	
	
 ngOnInit()
   {
	console.log("nginit");
	
	
	this.rideService.getRide(this.rideid).subscribe(res1 => {
    this.ride = res1;
    this.carid=this.ride.car;
    console.log(this.ride)
	console.log(this.carid)
	
	
	this.carService.getCar(this.carid).subscribe(res2 => {
    this.car = res2;
	//console.log(this.car)
	this.userid=this.car.owner;
	
	this.profileService.getProfile(this.userid).subscribe(res => {
    this.profile = res;
	console.log(this.profile)
			
    })	
	})
	})
 }



  async bookRide()
 {
     	
	const alert1 = await this.alertController.create({
      header: 'Booking Request',
      message: 'Dear Driver! You have a booking request!',
      buttons: [
		 {
        text: 'Accept',
        handler: () => {
          console.log('Accept');
		 
	
        	}
      	},
		 {
        text: 'Rejectt',
        handler: () => {
          console.log('Rejectt');
        	}
      	}
	]
    })
	await alert1.present();
	
	/*const alert = await this.alertController.create({
      header: 'Your ride resuest is on the way',
      message: 'Your ride request has been sent to the driver. We’ll notify you once your ride is confirmed',
      buttons: ['OK']
    })
	await alert.present();*/

	const id="cv6U38HvXwM3Xnsy2KOgjki1SQa2";
	const token="eK6JhkaW4LH2dTJaHg80YQ:APA91bEeW447cmbk4qRTsWpFqkHuttLAsVU-Uu0JHJOTiWtxsyuuWLWc5UVT3PISJ4QDVZF9Gbe2VQDv5ABJkrYEDDd28UvRcnkFVHCmIdbh7S2M8D1-6CUT0DGG1dFJHVzAojiJeAQO";
	let bookk = new Map<string, string>();
	bookk.set("post", id);
    bookk.set("token", token);
	console.log(bookk)
	var refNot = firebase.database().ref('notifications/book');
	//console.log(refNot);
	
	FIREBASE_DATABASE.ref('/notifications/book').set({
     	post: id,
      	token: token
    });
    //refNot.child("book").set(bookk);
	
	
	
	//refNot = new Firebase(Constants.FIREBASE_URL_NOT); 
	//HashMap<String, String> bookk = new HashMap<String, String>();
    
	
	
   
	/*FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .catch((err) => {
      console.log("Error getting permission!");
    })

	const notificationMessage = "Hi Driver! There is a booking for you!"
  	FIREBASE_DATABASE.ref('/tokens')
    .push({
      user: FIREBASE_AUTH.currentUser.uid,
      message: notificationMessage
    })
    .then(() => {
     console.log("notification sent")
    })
    .catch(() => {
      console.log("error sending notification :(")
    });*/



  };
}