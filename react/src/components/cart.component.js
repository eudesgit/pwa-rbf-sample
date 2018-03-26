import React, { Component } from 'react';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

class Cart extends Component {

    constructor ( props ) {
        super(props)

        this.state = {
            loading: true,
            data: [],
        }

    }

    componentDidMount ( ) {
        this.get_cart()
    }        

    get_user_fsref ( ) {
        let db = firebase.firestore()
        return db.doc("users/1")
    }

    get_cart ( ) {
        this.get_user_fsref().collection('cart').get()
        .then(snapshot => {

            let cart_products = []

            snapshot.forEach(doc => {
                //console.log(doc.data().ref_product.path)
                
                let product_ref = doc.data().ref_product
                
                product_ref.get()
                .then(doc => {
                    //console.log(doc.data())
                    
                    cart_products.push(doc.data())

                    this.setState({
                        loading: false,
                        data: cart_products
                    })

                })
                .catch(function(error) {
                    console.error("Error: ", error)
                })

            })
            
        })
        .catch(function(error) {
            console.error("Error:", error)
        })
    }

    get_cart_total ( ) {

        let cart_total = 0

        this.state.data.forEach( function ( e ) {
            cart_total += e.price
        })

        return cart_total
    }

    render ( ) {       

        let cart_items = this.state.data.map( (e, i) =>
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <h6 class="my-0">{e.name}</h6>
                <span class="text-muted">${e.price}</span>
            </li>
        )

        if (true === this.state.no_client) {
            return (<p>No logged in client</p>)
        } else if (false === this.state.is_loaded) {
            return (<p>Loading ...</p>)
        } else {
            return (
                <div>
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cart_items}

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (CAD)</span>
                            <strong>${this.get_cart_total()}</strong>
                        </li>
                    </ul>
                </div>
            );
        }
        
    }

}
  
export default Cart;