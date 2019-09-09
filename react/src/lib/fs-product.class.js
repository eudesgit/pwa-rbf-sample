/**
 * Firebase Firestore Products
 * 
 * Firestore data interface
 */

/*
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

class FS_Product {

    constructor ( ) {
        // FB Firestore
        this.db = firebase.firestore()

        // FB Firestore user reference
        this.fsref = this.load_fsref()
    }

    /**
     * Loads reference
     * 
     * @returns {object} Reference
     * @see https://firebase.google.com/docs/firestore/data-model#references
     */
    load_fsref ( ) {
        this.fsref = this.db.collection('products')
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
     * Get products collection docs snapshot
     * 
     * @param {string} name
     * @returns {Promise} Collection snapshot
     * @see https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
     * @see https://firebase.google.com/docs/firestore/query-data/queries?authuser=0#simple_queries
     */
    select ( name ) {

        let collection

        if (name) {
            collection = this.get_fsref().where('name', '==', name)
        } else {
            collection = this.get_fsref()
        }

        return collection.get()
        .then((snapshot) => {
            return snapshot
        })
        .catch(function(e) {
            console.error('Unable to get products', e)
        })

    }

}

export default FS_Product