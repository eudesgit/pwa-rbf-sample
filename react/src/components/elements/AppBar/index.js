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
            console.log('Message received. ', payload);
        
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
            notifications_badge = ( <span class="badge badge-pill badge-primary">{this.state.notifications.length}</span> )
        }

        let render_notifications = notifications.map( (item, index) =>
            <a key={index} className="dropdown-item" href="#notification">{item}</a>
        )

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light pl-4 pr-4">
                <a class="navbar-brand" href="/">RBF PWA Sample</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        {this.render_menu_items()}

                        <li class="nav-item dropdown">
                            <button class="nav-link dropdown-toggle btn" onClick={(e) => this.handle_notifications_dropdown_click(e)} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Notifications {notifications_badge}
                            </button>
                            <div className="dropdown-menu" style={this.state.notifications_dropdown.style} aria-labelledby="navbarDropdown">
                                {render_notifications}
                            </div>
                        </li>
                        <li class="nav-item">
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

        let menu_items = items.map( (item, index) =>
            <li key={index} class="nav-item">
                <a className="nav-link" href="#menu">{item}</a>
            </li>
        )

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