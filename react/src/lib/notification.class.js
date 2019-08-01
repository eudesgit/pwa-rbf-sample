/**
 * Notification 
 * 
 * Runs Firebase Messaging
 */

/*
 * Google Firebase
 */
import messaging from '../firebase.messaging'   // Firebase config

/*
 * Classes 
 */
import FS_Notification_Token from './fs-notification-token.class.js'

class Notification {

    constructor ( ) {
        this.token = ''
    }

    /**
     * Request permission and saves the user token
     */
    setup_permission ( ) {

        /*
         * Request user permission
         * @see https://firebase.google.com/docs/cloud-messaging/js/first-message
         */
        messaging.requestPermission()
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
                console.log('Token', this.token)

                // Saves the token to the database
                this.save_user_token().then((res) => {
                    console.log('res: ' + res)
                })
            }
        })
        .catch(function(e) {
            console.error('Unable to get permission to notify.', e)
        })

    }

    /**
     * Save user token
     * 
     * @param {string} token 
     */
    save_user_token ( ) {
        let fs_nt = new FS_Notification_Token(this.token)
        return fs_nt.save()
    }

}
  
export default Notification