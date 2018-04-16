/**
 * Firebase Cloud Functions Index
 * 
 * One single functions to send a notification
 */


/**
 * Firebase
 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

/**
 * Firebase config
 * exports.config = { // App config }
 */
const config = require('./firebase')

/**
 * Firebase init
 */
admin.initializeApp(config);


/**
 * Express
 * To deal with request params
 */
const express = require('express')
const express_app = express();



/***************** BEGIN FUNCTIONS *******************/
 

 /**
  * Send a sample notification to user devices
  * 
  * Endpoint: URL/user/id
  * 
  * @since      1.0.0
  * @param      id      User ID
  * @return     string  Success message
  */
 express_app.get('/user/:id', (req, res) => {

    let function_return = {
        success: false,
        error: "",
        data: "",
    }

    var id_user = req.params.id

    // Checks the id
    if (id_user <= 0) {

        function_return.error = 'Wrong param'
        console.error(function_return.error)
        return res.json(function_return)

    } else {

        // Gets users' devices
        admin.firestore().collection('users').doc(id_user).get()
        .then((doc) => {

            user_devices = doc.data().device_tokens

            // Sample notification
            var message = {
                data: {
                    status: "Happy notification!"
                },
            }

            return admin.messaging().sendToDevice(user_devices, message)
        })
        .then((response) => {
            console.log('Successfully sent message:', response)
        
            function_return.success = true
            function_return.data = 'Notification sent'
            return res.json(function_return)
        })
        .catch((error) => {
            console.error('Error sending message:', error);
        })
    }

    return true
})

exports.send_notification_to_devices = functions.https.onRequest(express_app)















// express_app.get('/user/:id', (req, res) => {

//     let function_return = {
//         success: false,
//         error: "",
//         data: "",
//     }

//     var id_user = req.params.id

//     // Checks the id
//     if (id_user <= 0) {

//         function_return.error = 'Wrong param'
//         console.error(function_return.error)
//         return res.json(function_return)

//     } else {

//         // Gets users' devices
//         admin.firestore().collection('users').doc(id_user).get()
//         .then((doc) => {

//             user_devices = doc.data().device_tokens

//             // Sample notification
//             var message = {
//                 data: {
//                     status: "Happy notification!"
//                 },
//             }

//             return admin.messaging().sendToDevice(user_devices, message)
//             .then((response) => {
//                 console.log('Successfully sent message:', response)

//                 function_return.success = true
//                 function_return.data = 'Notification sent'
//                 return res.json(function_return)
//             })
//             .catch((error) => {
//                 console.error('Error sending message:', error);
//             })

//         })
//         .catch((error) => {
//             console.error("Error getting data: ", error);
//         })

//     }
// })
// exports.send_notification_to_devices = functions.https.onRequest(express_app)
