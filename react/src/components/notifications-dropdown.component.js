import React, { Component } from 'react';

class NotificationsDropdown extends Component {

    constructor ( props ) {
        super(props)

        this.state = {
            notifications: this.props.notifications
        }        
    }

    render ( ) {

        let notifications = this.state.notifications

        if (notifications.length == 0) {
            notifications = ['No new notifications']
        } 

        let render_notifications = notifications.map( (item, index) =>
            <a key={index} className="dropdown-item" href="#notification">{item}</a>
        )

        return (
            <div>
                {render_notifications}
            </div>
        );
    }

}
  
export default NotificationsDropdown;