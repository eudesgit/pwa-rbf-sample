import React, { Component } from 'react';

/**
 * Classes
 */
import Notification from '../lib/notification.class.js';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore
import messaging from '../firebase.messaging'   // Firebase config

/**
 * Components
 */
import Products from '../components/products.component.js';
import AppFooter from '../components/app-footer.component.js';


class HomeView extends Component {

    constructor (props) {
        super(props)

        let n = new Notification()
        n.setup_permission()
        
        messaging.onMessage(function(payload) {
            console.log('Notification received', payload)
        })

        // Permission and token
        // messaging.requestPermission()
        // .then(function() {
        //     console.log('Notification permission granted.');
        //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
        //     // ...

        //     return messaging.getToken()
        //   })
        //   .then((token) => {
        //         if (token) {
        //             console.log(token)

        //             this.get_user_fsref().get()
        //             .then((doc) => {
        //                 console.log(doc.data().device_tokens)

        //                 var user_tokens = doc.data().device_tokens
        //                 var is_token_added = false
        //                 user_tokens.forEach(e => {
        //                     if (e == token) {
        //                         console.log('its there already')
        //                         is_token_added = true
        //                     }
        //                 });

        //                 console.log(is_token_added)
        //                 if (!is_token_added) {  
        //                     user_tokens.push(token)

        //                     this.get_user_fsref().update({
        //                         device_tokens: user_tokens
        //                     })
        //                     .then(function() {
        //                         console.log("Token added");
        //                     });
                            
        //                 }

                        
                     
            
        //             })
        //             .catch(function(error) {
        //                 console.error("Error: ", error);
        //             })


        //         } else {
        //             console.log('No Instance ID token available. Request permission to generate one.')
        //         }
        //   })
        //   .catch(function(err) {
        //     console.log('Unable to get permission to notify.', err);
        //   });



          // Fetching notification
        //   messaging.onMessage(function(payload) {
        //     console.log('Message received. ', payload);
        //     // ...
        //   });


    }

    // get_user_fsref ( ) {
    //     let db = firebase.firestore()
    //     return db.doc("users/1")
    // }

    render ( ) {
        return (
            <div className="container">
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">PWA Sample</h1>
                    <h2>React + Bootstrap + Firebase</h2>
                    <p className="lead">
                    It's a progressive web app sample made with React, Bootstrap and Firebase Cloud services (Firestore, Messaging and Functions)
                    </p>
                </div>

                <div className="container">
                    <Products />
                </div>

                <AppFooter />
            </div> 
        );
    }
    
}
  
export default HomeView;