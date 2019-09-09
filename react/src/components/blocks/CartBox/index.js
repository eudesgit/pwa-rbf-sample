/**
 * CartBox
 * 
 * Cart box with items on cart
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Lib
 */
import FS_User from '../../../lib/fs-user.class.js'

class Cart extends Component {

    static propTypes = {
        client_id: PropTypes.number,
    }

    static defaultProps = {
        client_id: 1, // Sample user (user 1) from database
    }

    constructor ( props ) {
        super(props)

        this.state = {
            loading: true,
            data: [],
        }

        this.sample_user = new FS_User(this.props.client_id)
    }

    componentDidMount ( ) {
        this.load_user_cart() 
    }

    /**
     * Loads user cart
     */
    load_user_cart ( ) {
        
        let cart = []

        this.sample_user.select_cart()
        .then(snapshot => {
            snapshot.forEach(doc => {
                doc.data().ref_product.get()
                .then(doc => {
                    cart.push(doc.data())

                    this.setState({
                        loading: false,
                        data: cart
                    })
                })
            })
        })
    }

    render ( ) {       

        let cart_total = 0
        this.state.data.forEach(e => { cart_total += e.price })

        let cart_items = this.state.data.map((e, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                <h6 className="my-0">{e.name}</h6>
                <span className="text-muted">${e.price}</span>
            </li>
        ))

        return (
            <div>
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                </h4>
                <ul className="list-group mb-3">
                    {cart_items}

                    <li className="list-group-item d-flex justify-content-between">
                        <span>Total (CAD)</span>
                        <strong>${cart_total}</strong>
                    </li>
                </ul>
            </div>
        )
        
    }

}
  
export default Cart;