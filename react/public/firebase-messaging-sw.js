importScripts('https://www.gstatic.com/firebasejs/6.2.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.2.3/firebase-messaging.js');

// Initialize Firebase
var config = {
    messagingSenderId: "885118303528"
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: payload.data.status,
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
  });