/**
 * Firebase Firestore Notification Token
 * 
 * Firestore data interface
 */

/*
 * Google Firebase
 */
// import firebase from '../firebase'   // Firebase config
//import 'firebase/firestore'          // Firestore

/*
 * Classes 
 */
import FS_User from './fs-user.class.js'

class FS_Notification_Token {

    constructor ( token = '' ) {
        this.token = token

        this.sample_user = new FS_User(1) // Sample user (user 1) from database
    }

    /**
     * Saves device token to user's database
     * 
     * @param {string} token 
     * @returns {Promise} Added token
     */
    save ( token = '' ) {

        if (token) {
            this.token = token
        }

        if (this.token === '') throw new Error('Token is empty')

        return this.sample_user.insert_notification_token(this.token)
        .then((token) => {
            return token
        })

        // return this.sample_user
        // .update({device_tokens: firebase.firestore.FieldValue.arrayUnion(this.token)})
        // .then(() => {
        //     console.log("Token updated", this.token)
        //     return true
        // })


        // return this.sample_user.get()
        // .then((doc) => {
        //     // console.log(doc.data().device_tokens)

        //     // var user_tokens = doc.data().device_tokens
        //     var is_token_added = false
        //     // user_tokens.forEach(e => {
        //     //     if (e == this.token) {
        //     //         console.log('its there already')
        //     //         is_token_added = true
        //     //     }
        //     // });

        //     // console.log(is_token_added)
        //     // if (is_token_added) {
        //     //     // throw new Error('meh meh')
        //     //     return true
        //     // }

            
        //     if (!is_token_added) {  
        //         // user_tokens.push(this.token)

        //         return this.sample_user
        //         .update({
        //             device_tokens: firebase.firestore.FieldValue.arrayUnion(this.token)
        //         })
        //         .then(() => {
        //             console.log("Token added", this.token)
        //             return true
        //         })
                
        //     }

        // }).catch(function(error) {
        //     console.error("Error: ", error)
        // })

    }

    // save ( token = '' ) {

    //     if (token) {
    //         this.token = token
    //     }

    //     if (this.token == '') {
    //         throw new Error('Token is empty') 
    //     }

    //     return this.sample_user.get()
    //     .then((doc) => {
    //         console.log(doc.data().device_tokens)

    //         var user_tokens = doc.data().device_tokens
    //         var is_token_added = false
    //         user_tokens.forEach(e => {
    //             if (e == this.token) {
    //                 console.log('its there already')
    //                 is_token_added = true
    //             }
    //         });

    //         console.log(is_token_added)
    //         if (is_token_added) {
    //             // throw new Error('meh meh')
    //             return true
    //         }

            
    //         if (!is_token_added) {  
    //             user_tokens.push(this.token)

    //             return this.sample_user.update({
    //                 device_tokens: user_tokens
    //             })
    //             .then(function() {
    //                 console.log("Token added");
    //                 return true
    //             });
                
    //         }

    //     }).catch(function(error) {
    //         console.error("Error: ", error)
    //     })
    // }

    // get ( ) {

    // }

    // get_user_fsref ( ) {
    //     let db = firebase.firestore()
    //     return db.doc("users/1")
    // }

}
  
export default FS_Notification_Token