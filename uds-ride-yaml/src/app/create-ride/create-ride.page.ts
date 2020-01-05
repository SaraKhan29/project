import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-ride',
  templateUrl: './create-ride.page.html',
  styleUrls: ['./create-ride.page.scss'],
})
export class CreateRidePage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async offerRide() {
    const alert = await this.alertController.create({
      header: 'Your ride has been offered',
      message: 'Your ride has been published. You will receive a notification once a person books the ride',
      buttons: ['OK']
    });

    await alert.present();
  }

}
