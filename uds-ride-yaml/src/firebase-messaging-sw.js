importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

var config = {
   apiKey: 'AIzaSyCFD2VqepyNei_vnMmcHkFZxjxh0unwmE4',
    authDomain: 'test-8d603.firebaseapp.com',
    databaseURL: 'https://test-8d603.firebaseio.com',
    projectId: 'test-8d603',
    storageBucket: 'test-8d603.appspot.com',
    messagingSenderId: '931160702009',
    appId: '1:931160702009:web:8e8a9c825fd3cd4afc61e8',
    measurementId: 'G-V1DXSXGSR6'
};
const messagingSenderId = '931160702009';
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    const title = 'Booking Request';
    const options = {
        body: payload.data.status
    };
    return self.registration.showNotification(title, options);
});