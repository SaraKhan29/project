const functions = require('firebase-functions');
const admin = require('firebase-admin');
//import {environment} from "./src/app/environments/environment"
//const fireadmin = admin.initializeApp(functions.config().firebase);

var var11 = functions.database.ref('/notifications/book').onWrite((event) => {
  //if (!event.data.exists()) {
    //          console.log("Not a new write event");
      //        return;
        //  }
  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/notifications/book/token`).once('value');
  const postId = admin.database().ref(`/notifications/book/post`).once('value');
  return Promise.all([getDeviceTokensPromise, postId]).then(results => {
    const tokensSnapshot = results[0];
    const varr = results[1];
    const postId = varr.val();
    console.log('Post ID is: ', postId);


    console.log('Token is', tokensSnapshot.val());

    // Notification details.
    const payload = {
      data:{
      "title": "book",
      "post": postId,
    }
    };

    // Listing all tokens.
    const token = tokensSnapshot.val();
	console.log(token)
    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(token, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending data to', token[index], error);

        }
        else console.log('No error sending data.');
      });

      const payload = {
        notification: {
          title: 'Booking Request',
          body: "Dear Driver! You have a booking request!",
          sound: 'default',
          click_action: 'OPEN_NOTIFICATION',
          }
      };

      return admin.messaging().sendToDevice(token, payload).then(response => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
          const error = result.error;
          if (error) {
            console.error('Failure sending notification to', token[index], error);

          }
          else console.log('No error sending notification.');
        });

      return Promise.all(tokensToRemove);
    });
  });
});
});


module.exports = var11;