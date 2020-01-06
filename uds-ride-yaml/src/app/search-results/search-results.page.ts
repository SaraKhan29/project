import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { RideService, Ride } from '../services/ride.service';
import { CarService, Car } from '../services/car.service';
import firebase = require('firebase');
import { checkLoggedIn } from '../util/auto-login';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

    private rides: Ride[];
    private allRides: Ride[];
    private requestedRides: Ride[] = [];
    private cars: Car[];
    private ride: Ride;
    private car: Car;
    private user = firebase.auth().currentUser;
    private name: string;
    private start_location;
    private end_location;
    private sub: any

  constructor(
    public toastController: ToastController,
    private router: Router,
    public navCtrl: NavController,
    private searchService: RideService,
    private carService: CarService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
      ) {}
    
  async ngOnInit() {
    if (!await checkLoggedIn(this.alertCtrl, this.navCtrl)) {
        return;
    }

    this.sub = this.route.params.subscribe(params => {
      //this.name = params['name']; 
      this.start_location = params['start_location'];
      this.end_location = params['end_location'];

   });

    this.user = firebase.auth().currentUser;


    this.searchService.getRides().subscribe(res => {
      this.rides = res;
      this.allRides = this.rides;

      for (var ride of this.allRides) {
        if (ride.start_location == this.start_location && ride.end_location == this.end_location) {
          this.requestedRides.push(ride);
        }
      }

      this.carService.getAllCars().subscribe(res => {
        this.cars = res;

        for (var aride of this.requestedRides) {
          for (var acar of this.cars) {

            if (acar.id == aride.car)
            {
              
              aride.carobj = acar;
            }
          }
          
        }
       });
      
    });

  }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Your settings have been saved.',
        duration: 2000
      });
      toast.present();
    }

    async presentToastWithOptions() {
      const toast = await this.toastController.create({ 
        header: '3 Rides Found',
        position: 'bottom',
        color: "success",
        duration: 2000,
        buttons: [
        {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }

    async assigndata() {
      
    }

     async getCar(): Promise<string> {
        return "Hello";
    }

}
