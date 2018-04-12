const express = require('express')
const express_app = express();
const functions = require('firebase-functions');
const admin = require('firebase-admin');


const config = require('./firebase')

admin.initializeApp(config);



//
//
// This code is messy and full of testing stuff :P
//
// TODO: sort this all out
//


/**
 * HTTPS Send notification
 */

express_app.get('/user/:id', (req, res) => {

    var id_user = req.params.id

    if (id_user > 0) {

        console.log("got here")

        admin.firestore().collection('users').doc(id_user).get()
        .then(doc => {
            console.log(doc.data())

            user_devices = doc.data().device_tokens

            console.log(user_devices)

            var message = {
                data: {
                  status: "happy with that"
                },
              };

            
              console.log(message)


              return admin.messaging().sendToDevice(user_devices, message)
              .then(function(response) {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log('Successfully sent message:', response);

                return res.send("Success")

              })
              .catch(function(error) {
                console.log('Error sending message:', error);
              });


            
        })
        .catch(function(error) {
            console.error("Error: ", error);
        })

    } else {
        res.send("wrong param") 
    }


});
exports.send_notification_to_devices = functions.https.onRequest(express_app)






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase! Hey there.");
// });



// exports.hello_world = functions.https.onCall((data, response) => {
//     return {
//         data: "Hello from Firebase! I was called."
//     }
// });



exports.send_test_notification = functions.https.onCall((data, response) => {


// This registration token comes from the client FCM SDKs.
var registrationToken = 'dc6XeaKc47Y:APA91bFWw7Vg6JG_yxGx4lqDMmP9cIRL9QDqHfubkPxkkW0GkXlceX54wPuj7MbL5s3_if1cqyXG5v09aD8NQUi7eNXh7VQKp6H3tTlPmDyYy4NH7B8uBxCbiA88CbKIPa5Zoz4g9M_3';

// See documentation on defining a message payload.
var message = {
  data: {
    status: "happy with that"
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);

    return {
        data: "SENT!"
    }


  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });



});
