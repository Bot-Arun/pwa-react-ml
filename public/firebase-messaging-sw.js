importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
importScripts("https://cdn.jsdelivr.net/npm/idb-keyval@6/dist/umd.js");
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyBTmLFT2eXjSz4U01Kxo8uQ4yL5Af0qUSg",
    authDomain: "pwa-ml-dbdeb.firebaseapp.com",
    projectId: "pwa-ml-dbdeb",
    storageBucket: "pwa-ml-dbdeb.appspot.com",
    messagingSenderId: "872539464589",
    appId: "1:872539464589:web:803a3bf73e27e8d7ee93c4",
    measurementId: "G-9FXY1WGQEJ"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);


messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    // const notificationTitle = payload.title;
    // const notificationOptions = {
    //   body:payload.body,
    //   icon: '/firebase-logo.png'
    // };
    // set("alot_number",payload.body)
    self.registration.showNotification("Welcome to TCE");
  });
