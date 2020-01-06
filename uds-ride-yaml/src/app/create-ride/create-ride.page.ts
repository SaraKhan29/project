import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Ride, RideService } from "../services/create-ride.service";
import { async } from "rxjs/internal/scheduler/async";
import firebase = require("firebase");
import { checkLoggedIn, busStops } from "../util/auto-login";
import { Car, CarService } from "../services/car.service";

@Component({
  selector: "app-create-ride",
  templateUrl: "./create-ride.page.html",
  styleUrls: ["./create-ride.page.scss"]
})
export class CreateRidePage implements OnInit {
  private ride: Ride;
  private creating = false;
  private user = firebase.auth().currentUser;
  private cars: Car[];
  private stops: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private rideService: RideService,
    private carService: CarService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    if (!(await checkLoggedIn(this.alertController, this.navCtrl))) {
      console.log("cannot login");
      return;
    }
    // initialize empty ride, logged_in user and his cars.
    this.user = firebase.auth().currentUser;
    this.ride = this.rideService.initRide();
    this.stops = busStops();
    this.carService.getCars().subscribe(res => {
      this.cars = res;
    });
    console.log("logged_in");
  }

  back() {
    this.router.navigateByUrl("/tabs/tab1");
  }

  async offerRide() {
    this.ride.driver = firebase.auth().currentUser.uid;
    console.log("ride:" + JSON.stringify(this.ride));
    this.rideService.addRide(this.ride);

    const alert = await this.alertController.create({
      header: "Your ride has been offered",
      message:
        "Your ride has been published. You will receive a notification once a person books the ride",
      buttons: ["OK"]
    });
    await alert.present();
    await alert.onDidDismiss();
    this.back();
  }
}
