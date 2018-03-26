import React, { Component } from 'react';

/**
 * Components
 */
import Cart from '../components/cart.component.js';
import CheckoutForm from '../components/checkout-form.component.js';
import AppFooter from '../components/app-footer.component.js';

class Checkout extends Component {

    get_url_id ( ) {
        return this.props.match.params.id
    }

    render() {

        return (
            <div className="container">
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h2>Checkout form</h2>
                    <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                </div>

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <Cart client_id={this.get_url_id()} />
                    </div>{/* END col */}

                    <div className="col-md-8 order-md-1">
                        <CheckoutForm client_id={this.get_url_id()} />
                    </div>{/* END col */}

                </div>{/* END row */}

                <AppFooter />

            {/* END container */}
            </div>
        );
    }
    
}
  
export default Checkout;