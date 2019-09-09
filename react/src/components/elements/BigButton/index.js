/**
 * BigButton
 * 
 * Big blue button
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BigButton extends Component {

    static defaultProps = {
        children: 'Button',
        active: false,
    }

    static propTypes = {
        children: PropTypes.string.isRequired,
        active: PropTypes.bool,
    }

    render ( ) {
        let { active, ...props } = this.props
        let button_classes = 'btn btn-lg btn-block btn-outline-primary'

        // if (this.props.active === true) {
        //     button_classes += ' active'
        // }

        button_classes += this.props.active ? ' active' : ''

        return <button className={button_classes} {...props}>{this.props.children}</button>
    }

}

export default BigButton