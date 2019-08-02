/**
 * Firebase Firestore User
 * 
 * Firestore data interface
 */

/*
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

class FS_User {

    constructor ( id = 0 ) {
        // FB Firestore
        this.db = firebase.firestore()

        // User ID
        this.id = id > 0 ? id : 0

        // FB Firestore user reference
        this.fsref = this.load_fsref()
    }

    /**
     * Loads user reference
     * 
     * @returns {object} Reference
     * @see https://firebase.google.com/docs/firestore/data-model#references
     */
    load_fsref ( ) {
        this.fsref = this.db.doc('users/' + this.id)
        return this.fsref
    }

    /**
     * Firestore Reference getter
     * @returns {object} Reference
     */
    get_fsref ( ) {
        return this.fsref
    }

    /**
     * Inserts notification token device
     * @param {string} token 
     * @returns {Promise} Added token
     * @see https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
     */
    insert_notification_token ( token ) {

        if (!token) throw Error('Token is empty')

        return this.get_fsref().update({device_tokens: firebase.firestore.FieldValue.arrayUnion(token)})
        .then(() => {
            return token
        })
        .catch(function(e) {
            console.error('Unable to update notification token', e)
        })

    }

}

export default FS_User