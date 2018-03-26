import React, { Component } from 'react';

/**
 * Classes
 */
import Main from '../class/main.class.js';

class TopNav extends Component {

    constructor ( props ) {
        super(props)

        let m = new Main()
        this.brand = m.brand
    }

    render() {

        let menu_items = this.props.items.map( (item, index) =>
            <a key={index} className="p-2 text-dark" href="#x">{item}</a>
        )

        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                <h5 className="my-0 mr-md-auto font-weight-normal">{this.brand}</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    {menu_items}
                </nav>
                <a className="btn btn-outline-primary" href="checkout/1">My Cart</a>
            </div>
        );
    }

}
  
export default TopNav;