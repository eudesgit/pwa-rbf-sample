import React, { Component } from 'react';

/**
 * Components
 */
import BigButton from '../components/big-button.component.js';


class ProductBox extends Component {

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
                    <BigButton product_name={this.props.name} product_fsref={this.props.fsref} />
                </div>
            </div>
        );

    }

}
  
export default ProductBox;