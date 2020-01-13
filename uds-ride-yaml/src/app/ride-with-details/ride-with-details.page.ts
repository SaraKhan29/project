import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Ride } from '../services/ride.service';
import { ActivatedRoute, Router } from '@angular/router';
import firebase = require('firebase');
@Component({
  selector: 'app-ride-with-details',
  templateUrl: './ride-with-details.page.html',
  styleUrls: ['./ride-with-details.page.scss'],
})
export class RideWithDetailsPage implements OnInit {

  ride: Ride;
  //private ride= "EqoEryuc138pz89Bnjfm"

  constructor(public alertController: AlertController,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	if (this.route.snapshot.data['special']) {
      this.ride = this.route.snapshot.data['special'];
    }
  }
  async reConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Cancellation',
      message: 'Are you sure to cancel the Ride!',
      buttons: ['Dismiss', 'Cancel Ride']
    });

    await alert.present();
  }


}
