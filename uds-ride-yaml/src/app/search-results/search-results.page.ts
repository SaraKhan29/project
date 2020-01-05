import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {



  constructor(public toastController: ToastController) {}


    
  ngOnInit() {
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


}
