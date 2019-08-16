/**
 * AppFooter
 * 
 * Footer element
 * 
 * @version 1.0.0
 * @since 1.0.0
 */

import React, { Component } from 'react'

class AppFooter extends Component {

    render ( ) {
        return (
            <footer className="pt-4 my-md-5 pt-md-5 border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md">
                            <small className="d-block mb-3 text-muted">&copy; 2017-2020</small>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#x">Cool stuff</a></li>
                                <li><a className="text-muted" href="#x">Random feature</a></li>
                                <li><a className="text-muted" href="#x">Team feature</a></li>
                                <li><a className="text-muted" href="#x">Stuff for developers</a></li>
                                <li><a className="text-muted" href="#x">Another one</a></li>
                                <li><a className="text-muted" href="#x">Last time</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#x">Resource</a></li>
                                <li><a className="text-muted" href="#x">Resource name</a></li>
                                <li><a className="text-muted" href="#x">Another resource</a></li>
                                <li><a className="text-muted" href="#x">Final resource</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#x">Team</a></li>
                                <li><a className="text-muted" href="#x">Locations</a></li>
                                <li><a className="text-muted" href="#x">Privacy</a></li>
                                <li><a className="text-muted" href="#x">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )        
    }

}
  
export default AppFooter