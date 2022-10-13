//---register the Service Worker---
// import { getMessaging } from "firebase/messaging";
// import { initializeApp } from 'firebase/app';
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
import {getMessaging , getToken,onMessage} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging.js'
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

// Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);
window.addEventListener('load', e => {
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker not supported');
        return;
    }
    navigator.serviceWorker.register('/sw.js')
    .then(function() {
         console.log('Service Worker Registered');
    })
    .catch(function(error) {
        console.log('Service Worker Registration failed:', error);
    });
});

//---Update the Push Notification Status---
function updatePushNotificationStatus(status) {
    if (status) {
        console.log('status is now off')
        
    }
    else {
        
        console.log('status is now on')
    }
      
}

function checkIfPushIsEnabled() {
    //---check if push notification permission has been denied by the user---
    if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
    }
    
    //---check if push notification is supported or not---
    if (!('PushManager' in window)) {
        alert('Sorry, Push notification is ' + 'not supported on this browser.');
        return;
    }
    //---get push notification subscription if serviceWorker is registered and ready---
    navigator.serviceWorker.ready
    .then(function (registration) {
        registration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                //---user is currently subscribed to push---
            updatePushNotificationStatus(true);
            }
            else {
                //---user is not subscribed to push---
                updatePushNotificationStatus(false);
            }
        })
        .catch(function (error) {
            console.error('Error occurred enabling push ', error);
        });
    });
}

//---subscribe to push notification---
function subscribeToPushNotification() {
    if (localStorage.getItem('key')) 
        return
    navigator.serviceWorker.ready
    .then(function(registration) {
        if (!registration.pushManager) {
            alert('This browser does not ' + 'support push notification.');
            return false;
        }
        //---to subscribe push notification using pushmanager---
        console.log(registration.pushManager)
        getToken(messaging,{vapidKey: "BDYsYiQYevRS3ZbVjqXvo8T4EgqlaNSi9SP4u6Hx_PSQUbCruiSiVJ2qenFu0ajLWYfkChujIWsvN-ZetbUdgX4"})
        // ;(
        // //---always show notification when received---
        // { userVisibleOnly: true,
        //     applicationServerKey:"BH6wFloOiYlgg6hql0JI2uLLDXK7mPdBRLhKGP5ubEUbzZSs89G5XtRFx-BDTiNOjDfYex-vzcii2fi-I6i76pA"
        
        // }
        // )
        .then(function (subscription) {
            console.log('Push notification subscribed.');
            console.log(subscription);
            let lastname = localStorage.setItem('key',subscription);
            console.log('storage acces ',lastname)
            sendSubscriptionIDToServer(subscription);
            updatePushNotificationStatus(true);
        })
        .catch(function (error) {
            updatePushNotificationStatus(false);
            console.error('Push notification subscription error: ', error);
        });
    })
    .catch(err => console.log(err))
}

//---unsubscribe from push notification---
function unsubscribeFromPushNotification() {
    navigator.serviceWorker.ready
    .then(function() {
        getToken(messaging,{vapidKey: "BDYsYiQYevRS3ZbVjqXvo8T4EgqlaNSi9SP4u6Hx_PSQUbCruiSiVJ2qenFu0ajLWYfkChujIWsvN-ZetbUdgX4"})
        .then(function (subscription) {
            console.log(subscription , "subscript")
            if(!subscription) {
                alert('Unable to unsubscribe from push ' + 'notification.');
                return;
            }
            console.log('Push notification unsubscribed.');
            console.log(subscription);
            removeSubscriptionIDFromServer(subscription);
            updatePushNotificationStatus(false);
        })
        .catch(function (error) {
            console.error('Failed to unsubscribe push ' +'notification.');
         });
    })
}

//---extract the subscription id and send it
// over to the REST service---
function sendSubscriptionIDToServer(subscription) {
    var subscriptionid = subscription;
    console.log("sended Subscription ID", subscriptionid);
    fetch('https://http-nodejs-production-71b3.up.railway.app/subscribers', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { subscriptionid : subscriptionid })
    });
}

//---extract the subscription id and send it over to the REST service---
function removeSubscriptionIDFromServer(subscription) {
    var subscriptionid = subscription
    console.log("removed Subscription ID", subscriptionid);
    fetch('https://http-nodejs-production-71b3.up.railway.app/subscribers/' + subscriptionid, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}
console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
    else {
        console.log('Notification permission not granted');
    }
  }).
  catch (err => console.log(err));
//---get references to the UI elements---
var pushElement = true;

//---event handler for the push button---

subscribeToPushNotification();

//---check if push notification is supported---
checkIfPushIsEnabled()
