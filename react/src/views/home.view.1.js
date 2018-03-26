import React, { Component } from 'react';

/**
 * Classes
 */
import Main from '../class/main.class.js';

/**
 * Components
 */
import Product from '../components/product.component.js';
import AppFooter from '../components/app-footer.component.js';

class HomeView extends Component {

    constructor ( props ) {
        super(props)

        let m = new Main()
        this.api_url = m.api_url
        
        this.state = {
          error: null,
          is_loaded: false,
          data: [],
        }

    }

    componentDidMount ( ) {
        fetch(this.api_url + "/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        is_loaded: true,
                        data: result.data
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    is_loaded: true,
                    error
                });
            }
        )
    }    

    render() {

        let products = this.state.data.map( (e, i) =>
            <Product key={i} name={e.name} price={e.price} desc={e.description} />
        )

        if (false === this.state.is_loaded) {
            return (<p>Loading ...</p>)
        } else {
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
                        <div className="card-deck mb-3 text-center">
                            {products}
                        </div>
                    </div>

                    <AppFooter />
                </div> 
            );
        }
    }
    
}
  
export default HomeView;