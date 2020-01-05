import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.page.html',
  styleUrls: ['./register-car.page.scss'],
})
export class RegisterCarPage implements OnInit {
  

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  async RegisterCar() {
    const alert = await this.alertController.create({
      header: 'Car Registered',
      message: 'Thank you for registering the car with us',
      buttons: ['OK']
    });

    await alert.present();
  }

}
