import React, { Component } from 'react';


/**
 * Components
 */
import Products from '../components/products.component.js';
import AppFooter from '../components/app-footer.component.js';


class NotificationsView extends Component {

    constructor (props) {
        super(props);
    }

    render ( ) {
        return (
            <div className="container">
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">PWA Sample</h1>
                    <h2>Notifications admin</h2>
                </div>

                <div className="container">
                    <a href="#" class="btn btn-primary">Send notification</a>
                </div>

                <AppFooter />
            </div> 
        );
    }
    
}
  
export default NotificationsView;