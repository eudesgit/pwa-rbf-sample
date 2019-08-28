/**
 * ProductBox
 * 
 * The main box that displays Product info
 * Add to cart button is changed to added and the product is on user's cart
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Lib
 */
import FS_User from '../../../lib/fs-user.class.js';

/*
 * Elements
 */
import BigButton from '../../elements/BigButton'

class ProductBox extends Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        desc: PropTypes.string,
        fsref: PropTypes.object, // FS Product reference
    }

    static defaultProps = {}

    constructor ( props ) {
        super(props)

        this.state = {
            is_added: false,
        }

        this.sample_user = new FS_User(1) // Sample user (user 1) from database
    }

    componentDidMount ( ) {
        this.load_user_cart_product() 
    }

    render ( ) {
        return (
            <div className="card mb-4 box-shadow">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{this.props.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{this.props.price} <small className="text-muted">/ mo</small></h1>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li>{this.props.desc}</li>
                    </ul>
                    <BigButton active={this.state.is_added} onClick={(e) => this.handle_click(e)}>
                        {this.state.is_added ? 'Added' : 'Add to cart'}
                    </BigButton>
                </div>
            </div>
        )
    }

    /**
     * Handles button click
     * @param {object} e 
     */
    handle_click ( e ) {
        this.add_product_to_cart()
    }

    /**
     * Add product to user's cart
     */
    add_product_to_cart ( ) {

        this.sample_user.insert_cart({
            ref_product: this.props.fsref,
            name: this.props.name,
        }).then(inserted_doc => {
            this.setState({is_added: true})
            console.log('Product added', inserted_doc.id)
        })

    }

    /**
     * Search the product on client's cart
     * and set the state
     */
    load_user_cart_product ( ) {
        this.sample_user.select_cart(this.props.fsref).then(snapshot => {
            snapshot.forEach(doc => {
                // console.log('cart', this.props.name, doc.data().name, doc)
                this.setState({is_added: true})
            })
        })
    }

}

export default ProductBox