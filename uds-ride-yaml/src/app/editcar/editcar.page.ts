import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Car, CarService } from '../services/car.service';
import firebase = require('firebase');

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.page.html',
  styleUrls: ['./editcar.page.scss'],
})
export class EditcarPage implements OnInit {

  private creating = false;
  private car: Car;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private carService: CarService,
    private alertCtrl: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.creating = this.router.getCurrentNavigation().extras.state.creating;
        if (this.creating) {
          this.car = {
            name: '',
            brand: '',
            model: '',
            seats: 2,
            childseat: false,
            wheelchair: false,
            color: 'black',
            owner: firebase.auth().currentUser.uid
          };
        } else {
          this.car = this.router.getCurrentNavigation().extras.state.car;
        }
      }
    });
  }

  ngOnInit() { }

  back() {
    // TODO update the screen. This needed to be reset because the screen has been integrated into the tab menu.
    this.navCtrl.back();
  }

  async saveCar() {
    if (this.creating) {
      this.carService.addCar(this.car);
    } else {
      this.carService.updateCar(this.car);
    }

    const alert = await this.alertCtrl.create({
      header: 'Car saved',
      message: `This car has been successfully ${ this.creating ? 'created' : 'saved' }.`,
      buttons: ['Okay']
    });
    await alert.present();
    await alert.onDidDismiss();

    this.back();
  }

  async deleteCar() {
    if (this.creating) {
      return;
    }

    const carScreen = this;
    const confirmDialog = await this.alertCtrl.create({
      header: 'Confirm deletion',
      message: 'Do you really want to delete this car?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            carScreen.carService.removeCar(carScreen.car.id);

            const alert = await carScreen.alertCtrl.create({
              header: 'Car deleted',
              message: 'This car has been successfully deleted.',
              buttons: ['Okay']
            });
            alert.present();
            await alert.onDidDismiss();

            carScreen.back();
          }
        }
      ]
    });
    confirmDialog.present();
  }

}
