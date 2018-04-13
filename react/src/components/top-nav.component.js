import React, { Component } from 'react';

import NotificationsDropdown from '../components/notifications-dropdown.component';

/**
 * Google Firebase
 */
import firebase from '../firebase'   // Firebase config
import messaging from '../firebase.messaging'   // Firebase config

/**
 * Classes
 */
import Main from '../class/main.class.js';

class TopNav extends Component {

    constructor ( props ) {
        super(props)

        let m = new Main()
        this.brand = m.brand

        this.state = {
            notifications: [],
            notifications_dropdown: {display: 'none'},
        }

    }

    componentDidMount ( ) {
        this.get_push_notification()
    }   

    get_push_notification ( ) {
        // Fetching notification
        messaging.onMessage( (payload) => {
            console.log('Message received. ', payload);
            // ...

            let notifications = this.state.notifications
            notifications.push(payload.data.status)

            this.setState({
                notifications: notifications
            })
        });
    }

    open_dropdown = ( ) => {
        if (this.state.notifications_dropdown.display == 'none') {
            this.setState({
                notifications_dropdown: {display: 'block'},
            })
        } else {
            this.setState({
                notifications_dropdown: {display: 'none'},
            })
        }
        
    }

    render() {

        let notifications_badge = ''

        if (this.state.notifications.length > 0) {
            notifications_badge = ( <span class="badge badge-pill badge-primary">{this.state.notifications.length}</span> )
        }

        let menu_items = this.props.items.map( (item, index) =>
            <li key={index} class="nav-item">
                <a className="nav-link" href="#menu">{item}</a>
            </li>
        )

        return (


<nav class="navbar navbar-expand-lg navbar-light bg-light pl-4 pr-4">
  <a class="navbar-brand" href="#">{this.brand}</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">

     {menu_items}

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" onClick={this.open_dropdown} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Notifications {notifications_badge}
        </a>
        <div className="dropdown-menu" style={this.state.notifications_dropdown} aria-labelledby="navbarDropdown">
            <NotificationsDropdown notifications={this.state.notifications} />
        </div>
      </li>

      <li class="nav-item">
      <a className="btn btn-outline-primary" href="checkout/1">My Cart</a>
      </li>
        

    </ul>
   
  </div>
</nav>


            
        );
    }

}
  
export default TopNav;