import { Component, OnInit } from '@angular/core';
import firebase = require('firebase');
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private loggingIn = false;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    const loggedIn = localStorage.getItem('logged-in');

    if (loggedIn == null) {
      localStorage.setItem('logged-in', 'false');
      return;
    }

    if (loggedIn !== 'true') {
      return;
    }

    const loginEmail = localStorage.getItem('login-email');
    if (loginEmail === null) {
      localStorage.setItem('logged-in', 'false');
      return;
    }

    const loginPassword = localStorage.getItem('login-password');
    if (loginPassword === null) {
      localStorage.setItem('logged-in', 'false');
      return;
    }

    this.loggingIn = true;

    try {
      const credential = await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword);
    } catch (err) {
      const alert = await this.alertCtrl.create({
        header: 'Error while logging in',
        message: err.message,
        buttons: ['Okay']
      });
      alert.present();
      this.loggingIn = false;
      return;
    }

    this.navCtrl.navigateRoot('tabs');
  }
}
