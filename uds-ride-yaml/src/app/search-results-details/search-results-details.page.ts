import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProfileService, Profile } from '../services/profile.service';
import { CarService, Car } from '../services/car.service';
import { RideService, Ride } from '../services/ride.service';
//import { ChatService, ChatMessage } from '../services/chat.service';
import firebase = require('firebase');
import { FcmPushService } from "../services/message.service";






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
  private userid= "cv6U38HvXwM3Xnsy2KOgjki1SQa2"
  private rideid= "BxD2h7xBCayTnzC7IA9m"; 
  private carid= "Wm3XI3kHeDxAhZAWzPCL";
  //private carid;
 private title="app works";
 private user;
  private message;

  constructor(public alertController: AlertController,
		public profileService: ProfileService,
		public carService: CarService,
		public rideService: RideService,
		private _fcmPushService: FcmPushService
		) { }

  ngOnInit() {
	
	 this.profileService.getProfile(this.userid).subscribe(res => {
     this.profile = res;
    });


	this.rideService.getRide(this.rideid).subscribe(res1 => {
    this.ride = res1;
    this.carid=this.ride.car;
    console.log(this.carid)
    });

	this.carService.getCar(this.carid).subscribe(res2 => {
     this.car = res2;
	//console.log(this.car);
    });
	
	
  }
  
  async bookRide() {
    const alert = await this.alertController.create({
      header: 'Your ride resuest is on the way',
      message: 'Your ride request has been sent to the driver. We’ll notify you once your ride is confirmed',
      buttons: ['OK']
    });

    await alert.present();

	this.user = this.userid;
	this._fcmPushService.getPermission();
    this._fcmPushService.receiveMessage();
    this._fcmPushService.currentMessage.subscribe(message => this.message = message);

//still working on it
 /*   this.messagingService.requestPermission(this.userid)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage*/
	
	}
}