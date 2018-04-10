import React, { Component } from 'react';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import 'firebase/firestore'          // Firestore

class CheckoutForm extends Component {

    constructor ( props ) {
        super(props)
        
        this.state = {
            error: null,
            loading: true,
            data: [],
            no_client: false,
        }

    }

    componentDidMount ( ) {
        if (this.is_no_user()) {
            this.load_user()
        }
    }   

    get_user_fsref ( ) {
        let db = firebase.firestore()
        return db.doc("users/1")
    }

    is_no_user ( ) {
        if (this.props.client_id === undefined) {
            this.setState({
                no_client: true,
                loading: false
            })

            return false
        }    

        return true
    }

    load_user ( ) {

        this.get_user_fsref()
        .get()
        .then((doc) => {
            //console.log(doc.data())

            this.setState({
                loading: false,
                data: doc.data(),
            })
        })
        .catch(function(error) {
            console.error("Error: ", error);
        });


    }

    render() {

        if (this.state.loading === true) {
            return(<p>Loading</p>)
        } else {

            return (
                <div>
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input type="text" className="form-control" id="firstName" autoComplete="given-name" placeholder="" value={this.state.data.first_name} required />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" className="form-control" id="lastName" autoComplete="family-name" placeholder="" value={this.state.data.last_name} required />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input type="text" className="form-control" id="username" placeholder="Username" value={this.state.data.username} required />
                                <div className="invalid-feedback">
                                    Your username is required.
                                </div>
                            </div>
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                            <input type="email" className="form-control" id="email" autoComplete="email" placeholder="you@example.com" value={this.state.data.email} />
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping updates.
                            </div>
                        </div>
    
                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input type="text" className="form-control" id="address" autoComplete="address-line1" value={this.state.data.address} placeholder="1234 Main St" required />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>
    
                <div className="mb-3">
                  <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                  <input type="text" className="form-control" id="address2" autoComplete="address-line2" placeholder="Apartment or suite" />
                </div>
    
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <select className="custom-select d-block w-100" id="country" autoComplete="country-name" required>
                      <option value="">Choose...</option>
                      <option>Canada</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="state">State/Province</label>
                    <select className="custom-select d-block w-100" id="state" autoComplete="address-level1" required>
                      <option value="">Choose...</option>
                      <option>Ontario</option>
                    </select>
                    <div className="invalid-feedback">
                      Please provide a valid state.
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Postal Code</label>
                    <input type="text" className="form-control" id="postal" autoComplete="postal-code" placeholder="" required />
                    <div className="invalid-feedback">
                      Zip code required.
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
        </div>
            );

        }
        
        
    }

}

export default CheckoutForm;