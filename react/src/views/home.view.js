import React, { Component } from 'react';

/**
 * Classes
 */
//import Main from '../class/main.class.js';

/**
 * Components
 */
import Products from '../components/products.component.js';
import AppFooter from '../components/app-footer.component.js';


class HomeView extends Component {

    render ( ) {
        return (
            <div className="container">
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">PWA Sample</h1>
                    <h2>React + Bootstrap + Firebase</h2>
                    <p className="lead">
                    It's a progressive web app sample made with React, Bootstrap and Firebase Cloud services (Firestore, Messaging and Functions)
                    </p>
                </div>

                <div className="container">
                    <Products />
                </div>

                <AppFooter />
            </div> 
        );
    }
    
}
  
export default HomeView;