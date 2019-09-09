/**
 * AppBar
 * 
 * App and navigation bar
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react'

/*
 * Google Firebase
 */
import messaging from '../../../firebase.messaging'   // Firebase messaging config

class AppBar extends Component {

    constructor ( props ) {
        super(props)

        this.state = {
            notifications: [],
            notifications_dropdown: {
                style: { display: 'none' }
            },
        }

    }    

    componentDidMount ( ) {
        this.load_push_notification()
    }   

    /**
     * Fetch new notification
     * 
     * @see https://firebase.google.com/docs/cloud-messaging/js/receive
     */
    load_push_notification ( ) {

        // Fetching notification
        messaging.onMessage(payload => {
            console.log('Message received. ', payload)
        
            let current_notifications = this.state.notifications

            current_notifications.push(payload.data.status) // new notification

            this.setState({
                notifications: current_notifications
            })
        })
    }

    render ( ) {

        let notifications_badge = ''
        let notifications = ['No new notifications']
        
        if (this.state.notifications.length > 0) {
            notifications = this.state.notifications
            notifications_badge = ( <span className="badge badge-pill badge-primary">{this.state.notifications.length}</span> )
        }

        let render_notifications = notifications.map((e, i) => <a key={i} className="dropdown-item" href="#notification">{e}</a>)

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light pl-4 pr-4">
                <a className="navbar-brand" href="/">RBF PWA Sample</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {this.render_menu_items()}

                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle btn" onClick={(e) => this.handle_notifications_dropdown_click(e)} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Notifications {notifications_badge}
                            </button>
                            <div className="dropdown-menu" style={this.state.notifications_dropdown.style} aria-labelledby="navbarDropdown">
                                {render_notifications}
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="checkout/1">My Cart</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }

    /**
     * Navigation menu items
     */
    render_menu_items ( ) {

        let items = ['Features', 'Enterprise', 'Support', 'Price']

        let menu_items = items.map((e, i) => (
            <li key={i} className="nav-item">
                <a className="nav-link" href="#menu">{e}</a>
            </li>
        ))

        return menu_items

    }

    /**
     * Handles dropdown click
     * @param {object} e 
     */
    handle_notifications_dropdown_click ( e ) {
        this.toggle_notifications_dropdown()
    }

    /**
     * Toggles notification dropdown display
     */
    toggle_notifications_dropdown ( ) {
        if (this.state.notifications_dropdown.style.display === 'none') {
            this.setState({
                notifications_dropdown: {
                    style: { display: 'block' }
                }
            })
        } else {
            this.setState({
                notifications_dropdown: {
                    style: { display: 'none' }
                }
            })
        }
    }

}

export default AppBar