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
     * 
     * @returns {object} Reference
     */
    get_fsref ( ) {
        return this.fsref
    }

    /**
     * Inserts notification token device
     * 
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

    /**
     * Get cart collection docs snapshot
     * 
     * @param {object} ref_product
     * @returns {Promise} Collection snapshot
     * @see https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
     * @see https://firebase.google.com/docs/firestore/query-data/queries?authuser=0#simple_queries
     */
    select_cart ( ref_product ) {

        let collection

        if (ref_product) {
            collection = this.get_fsref().collection('cart').where('ref_product', '==', ref_product)
        } else {
            collection = this.get_fsref().collection('cart')
        }

        return collection.get()
        .then((snapshot) => {
            return snapshot
        })
        .catch(function(e) {
            console.error('Unable to get user cart', e)
        })

    }

}

export default FS_User