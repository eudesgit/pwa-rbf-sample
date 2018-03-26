import React, { Component } from 'react';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

/**
 * Classes
 */
import FirestoreDB from '../class/firestore.db.class.js';

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
            user_products: [],
        }

        this.fb = new FirestoreDB()
    }

    componentDidMount ( ) {
        this.load_products()
        this.load_user_products()
    }

    load_products ( ) {

        let products_ref = this.fb.get_products()

        products_ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                //console.log(doc.id, '=>', doc.data());

                let product = this.state.products
                product.push(doc.data())
                this.setState({
                    products: product,
                    loading: false,
                })

            }); // end snapshot
        }).catch(function(error) {
            console.log("Error getting document:", error)
        })

    }    

    load_user_products ( ) {

        this.fb.get(
            this.fb.get_user_products('1'),
            snapshot => {
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());

                    doc.data().ref_product.get().then(
                        (doc) => {
                            //console.log('user products' , doc.data())

                            let product = this.state.user_products
                            product.push(doc.data())
                            this.setState({
                                user_products: product
                            })

                        }
                    )
                })
            }
        )

    }

    render_products ( ) {
        return this.state.products.map( 
            (e, i) => <ProductBox key={i} name={e.name} price={'$' + e.price} desc={e.description} user_products={this.state.user_products} />
        )
    }

    render ( ) {

        let products = 'Loading products ...'
        if (this.state.loading == false) {
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