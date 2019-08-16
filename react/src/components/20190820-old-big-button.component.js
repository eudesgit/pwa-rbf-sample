import React, { Component } from 'react';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore


class BigButton extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            is_added: false,
            loading: true,
        }

        this.user = this.get_user_fsref()

        this.add_cart = this.add_cart.bind(this) 
    }

    componentDidMount ( ) {
        this.load_cart_products()
    }

    get_user_fsref ( ) {
        let db = firebase.firestore()
        return db.doc("users/1")
    }

    load_cart_products ( ) {

        this.user.collection('cart').get().then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.data().ref_product.path)
                //console.log(this.props.product_fsref.path)

                if (doc.data().ref_product.path === this.props.product_fsref.path) {
                    this.setState({
                        is_added: true,
                    })
                }

            })

            this.setState({
                loading: false,
            })
            
        }).catch(function(error) {
            console.error("Error getting document:", error)
        })
    }

    add_cart ( ) {
        if (false === this.state.is_added) {

            this.user.collection('cart').add({
                ref_product: this.props.product_fsref,
                name: this.props.product_name
            }).then((doc) => {
                console.log("Document written with ID: ", doc.id);

                this.setState({
                    is_added: true,
                    loading: false,
                })

            }).catch(function(error) {
                console.error("Error adding document: ", error);
            })

        }   
    } 

    render ( ) {

        let button_classes = "btn btn-lg btn-block btn-outline-primary"
        let button_text = 'Loading'

        if (!this.state.loading) {

            if (this.state.is_added) {
                button_classes += ' active'
                button_text = 'Added'
            } else {
                button_text = 'Add to cart'
            }

        }

        return (
            <button onClick={this.add_cart} className={button_classes}>
                {button_text}
            </button>
        );

    }

}
  
export default BigButton;