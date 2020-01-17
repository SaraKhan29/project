import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offer-ride-details',
  templateUrl: './offer-ride-details.page.html',
  styleUrls: ['./offer-ride-details.page.scss'],
})
export class OfferRideDetailsPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
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
