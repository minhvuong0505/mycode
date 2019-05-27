import React, { Component } from 'react';
import {IndexLink, Link} from "react-router"

class NotFound extends Component {
    render() {
        return (
            <div>
                <img src="/html/images/404.png" style={{width: '100vw', height: '100vw', display: 'block', margin: 'auto', position: 'relative' }} />
                <center><Link to="/">Return to Home Page</Link></center>
            </div>
        );
    }
}

export default NotFound;