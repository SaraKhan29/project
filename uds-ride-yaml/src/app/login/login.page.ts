import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email = "";
  password = "";

  constructor(
    public alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log("authn state changed.");
      if (user) {
        console.log("signed_in user: " + JSON.stringify(user));
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        if (!emailVerified) {
          console.log("email not verified yet.");
          // can send an email but donot
        }
      } else {
        console.log("user not signed in");
        // User is signed out.
      }
    });
  }

  async login() {
    var header = "";
    var message = "";
    var is_loggedIn = false;
    console.log("login not called");

    await firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        header = "User Login";
        message = "logged in successfully!";
        is_loggedIn = true;

        localStorage.setItem("logged-in", "true");
        localStorage.setItem("login-email", this.email);
        localStorage.setItem("login-password", this.password);
      })
      .catch(function(error) {
        header = error.code;
        message = error.message;
      });

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ["Dismiss"]
    });

    await alert.present();

    if (is_loggedIn) {
      var user = firebase.auth().currentUser;
      if (user) {
        console.log("Logged in user: " + JSON.stringify(user));
        this.router.navigateByUrl("/tabs");
      } else {
        // some error occurred.
      }
    }
  }
}
