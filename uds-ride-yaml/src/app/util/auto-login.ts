import { AlertController, NavController } from "@ionic/angular";
import firebase = require("firebase");

export async function tryAutoLogin(
  alertCtrl: AlertController
): Promise<boolean> {
  const loggedIn = localStorage.getItem("logged-in");

  if (loggedIn == null) {
    localStorage.setItem("logged-in", "false");
    return false;
  }

  if (loggedIn !== "true") {
    return false;
  }

  const loginEmail = localStorage.getItem("login-email");
  if (loginEmail === null) {
    localStorage.setItem("logged-in", "false");
    return false;
  }

  const loginPassword = localStorage.getItem("login-password");
  if (loginPassword === null) {
    localStorage.setItem("logged-in", "false");
    return false;
  }

  try {
    await firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword);
  } catch (err) {
    const alert = await alertCtrl.create({
      header: "Error while logging in",
      message: err.message,
      buttons: ["Okay"]
    });
    alert.present();
    await alert.onDidDismiss();
    return false;
  }

  return true;
}

export async function checkLoggedIn(
  alertCtrl: AlertController,
  navCtrl: NavController
): Promise<boolean> {
  if (firebase.auth().currentUser === null) {
    const autoLoginSuccess = await tryAutoLogin(alertCtrl);
    if (!autoLoginSuccess) {
      navCtrl.navigateRoot("home");
      return false;
    }
  }
  return true;
}

export function busStops() {
  var stops = [
    { id: 1, name: "Markt, Dudweiler Saarbrücken" },
    { id: 2, name: "Bürgerhaus, Dudweiler Saarbrücken" },
    { id: 3, name: "Beim Weisenstein, Dudweiler Saarbrücken" },

    { id: 4, name: "Hermann-Löns-Str., Dudweiler Saarbrücken" },
    { id: 5, name: "Guckelsberg, Dudweiler Saarbrücken" },
    { id: 6, name: "Neuweilerweg, Rentrisch St.Ingbert" },

    { id: 7, name: "Brudermühlenweg, Rentrisch St.Ingbert" },
    { id: 8, name: "Am Katzental, Scheidt Saarbrücken" },
    { id: 9, name: "Jägerstr., St.Ingbert" },

    { id: 10, name: "Nordendstr., St.Ingbert" },
    { id: 11, name: "Hauptbahnhof (Vorplatz), Neunkirchen" },
    { id: 12, name: "A Dummy Station, Saarbrücken" },

    { id: 13, name: "A Dummy Station, Saarbrücken" },
    { id: 14, name: "A Dummy Station, Saarbrücken" },
    { id: 15, name: "A Dummy Station, Saarbrücken" },

    { id: 16, name: "A Dummy Station, Saarbrücken" },
    { id: 17, name: "A Dummy Station, Saarbrücken" },
    { id: 18, name: "A Dummy Station, Saarbrücken" },

    { id: 19, name: "A Dummy Station, Saarbrücken" },
    { id: 20, name: "A Dummy Station, Saarbrücken" },
    { id: 21, name: "A Dummy Station, Saarbrücken" },

    { id: 22, name: "A Dummy Station, Saarbrücken" },
    { id: 23, name: "A Dummy Station, Saarbrücken" },
    { id: 24, name: "A Dummy Station, Saarbrücken" },

    { id: 25, name: "A Dummy Station, Saarbrücken" },
    { id: 26, name: "A Dummy Station, Saarbrücken" },
    { id: 27, name: "A Dummy Station, Saarbrücken" }
  ];

  return stops;
}
