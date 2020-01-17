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
import { DataService } from '../services/data.service';

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
    private count: number = 0;
    private countr: string;
    private sub: any;
    private locations: string[];

  constructor(
    public toastController: ToastController,
    private router: Router,
    public navCtrl: NavController,
    private searchService: RideService,
    private carService: CarService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DataService
      ) {}
    
  async ngOnInit() {
    if (!await checkLoggedIn(this.alertCtrl, this.navCtrl)) {
        return;
    }
    if (this.route.snapshot.data['special']) {
      this.locations = this.route.snapshot.data['special'];
      this.start_location = this.locations[0];
      this.end_location = this.locations[1];
    }

    this.user = firebase.auth().currentUser;


    this.searchService.getRides().subscribe(res => {
      this.rides = res;
      this.allRides = this.rides;

      for (var ride of this.allRides) {
        if (ride.start_location == this.start_location && ride.end_location == this.end_location) {
          this.count  = this.requestedRides.push(ride);
        }
      }
      this.countr = this.count.toString();

      this.cars = this.carService.getAllCars();
      for (const requestedRide of this.requestedRides) {
        for (const car of this.cars) {
          if (car.id === requestedRide.car) {
            requestedRide.carobj = car;
          }
        }
      }

      this.carService.getAllCarUpdates().subscribe(res => {
        this.cars = res;

        for (const requestedRide of this.requestedRides) {
          for (const car of this.cars) {
            if (car.id === requestedRide.car) {
              requestedRide.carobj = car;
            }
          }
        }
       });
      
    });

  }
  goToDetails(selectedRide: Ride) {
    this.dataService.setData(42, selectedRide);
    //this.router.navigateByUrl('/search-results-details/42');
    this.router.navigate(['/search-results-details/42']);
    //this.router.navigate(['/search-results-details', { start_location: "Hello", end_location: "Hi" }]);
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
