// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA
import { initializeApp } from 'firebase/app'
import {getMessaging , getToken,onMessage} from 'firebase/messaging'
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
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
//   document.getElementById("allot_number").innerHTML = payload.notification.body;
  new Notification("Welcome to TCE !")
  alert('welcome to tce')
  // ...
});
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://cra.link/PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://cra.link/PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}


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
export function subscribeToPushNotification() {
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