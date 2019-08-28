/**
 * Notification 
 * 
 * Runs Firebase Messaging
 */

/*
 * Google Firebase
 */
import messaging from '../firebase.messaging'   // Firebase messaging config

/*
 * Classes 
 */
import FS_Notification_Token from './fs-notification-token.class.js'

class Notification {

    constructor ( ) {
        // Notification permission Token
        this.token = ''

        /*
         * Fetches notification
         * Test
         */
        messaging.onMessage(function(payload) {
            console.log('Notification received', payload)
        })

    }

    /**
     * Request permission and saves the user token
     * 
     * @returns {Promise} Device token
     * @see https://firebase.google.com/docs/cloud-messaging/js/first-message
     */
    setup_permission ( ) {

        /*
         * Request user permission
         */
        return messaging.requestPermission()
        .then(() => {
            // Permission granted
            console.log('Notification permission granted')
            return messaging.getToken()
        })
        .then((token) => {
            if (!token) {
                console.error('No Instance ID token available. Request permission to generate one.')
            } else {
                this.token = token
                console.log('Device notification token', this.token)

                // Saves the token to the database
                return this.save_user_token()
                .then((token) => {
                    console.log('Notification token saved', token)
                    return token
                })
            }
        })
        .catch(function(e) {
            console.error('Unable to get permission to notify', e)
        })

    }

    /**
     * Save user token
     * 
     * @param {string} token 
     * @returns {Promise}
     */
    save_user_token ( ) {
        let fs_nt = new FS_Notification_Token(this.token)
        return fs_nt.save()
    }

}
  
export default Notification