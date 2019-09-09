/**
 * ProductsSection
 * 
 * Loads the home page Products section
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react';

/*
 * Lib
 */
import FS_Product from '../../../lib/fs-product.class.js'
import FS_User from '../../../lib/fs-user.class.js'

/*
 * Components
 */
import ProductBox from '../../elements/ProductBox'

class ProductsSection extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            loading: true,
            products: [],
        }

        this.fs_p = new FS_Product()
        this.sample_user = new FS_User(1) // Sample user (user 1) from database

    }

    componentDidMount ( ) {
        this.load_products()
    }

    /**
     * Load all products to state
     */
    load_products ( ) {

        let products = []
        let cart = []

        // Fetching products
        this.fs_p.select().then(snapshot => {
            snapshot.forEach(doc => { products.push(doc.data()) })
            
            // Fetching user's cart
            this.sample_user.select_cart()
            .then(snapshot => {
                snapshot.forEach(doc => { cart.push(doc.data()) })

                // Update products with cart information
                let updated_products = products.map((product, i) => {
                    product.is_added = false
                    if ( cart.find(e => e.name === product.name) ) {
                        product.is_added = true
                    }
                    return product
                })

                this.setState({
                    products: updated_products,
                    loading: false,
                })
              
            })
        })

    }

    render ( ) {

        if (this.state.loading) return <p>Loading products ...</p>

        let products = this.state.products.map((e, i) => <ProductBox key={i} name={e.name} price={'$' + e.price} desc={e.description} in_cart={e.is_added} fsref={e.ref} />)

        return (
            <div className="card-deck mb-3 text-center">
                {products}
            </div>
        )
    }

}

export default ProductsSection