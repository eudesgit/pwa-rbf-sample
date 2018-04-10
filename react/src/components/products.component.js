import React, { Component } from 'react';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

/**
 * Components
 */
import ProductBox from '../components/product-box.component.js';

class Products extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            products: [],
        }
    }

    componentDidMount ( ) {
        this.load_products()
    }

    get_products_fsref ( ) {
        let db = firebase.firestore()
        return db.collection("products")
    }

    load_products ( ) {

        this.get_products_fsref().get().then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());

                let product = {
                    data: doc.data(),
                    ref: doc.ref,
                }

                let products = this.state.products
                products.push(product)  

                this.setState({
                    products: products,
                    loading: false,
                })

            }); // end snapshot
        }).catch(function(error) {
            console.log("Error getting document:", error)
        })

    }    

    render_products ( ) {
        return this.state.products.map( 
            (e, i) => <ProductBox key={i} name={e.data.name} price={'$' + e.data.price} desc={e.data.description} fsref={e.ref} />
        )
    }

    render ( ) {

        let products = 'Loading products ...'
        if (this.state.loading === false) {
            products = this.render_products() 
        }

        return (
            <div className="card-deck mb-3 text-center">
                {products}
            </div>
        )
    }
}

export default Products;