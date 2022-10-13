import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
import {getMessaging , getToken,onMessage} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.jsfirebase/messaging'
const firebaseConfig = {
    apiKey: "AIzaSyBTmLFT2eXjSz4U01Kxo8uQ4yL5Af0qUSg",
    authDomain: "pwa-ml-dbdeb.firebaseapp.com",
    projectId: "pwa-ml-dbdeb",
    storageBucket: "pwa-ml-dbdeb.appspot.com",
    messagingSenderId: "872539464589",
    appId: "1:872539464589:web:803a3bf73e27e8d7ee93c4",
    measurementId: "G-9FXY1WGQEJ"
  };
console.log('loded main')
const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);


messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.title;
    const notificationOptions = {
      body:payload.body,
      icon: '/firebase-logo.png'
    };
    // set("alot_number",payload.body)
    self.registration.showNotification("Welcome to TCE");
  });
