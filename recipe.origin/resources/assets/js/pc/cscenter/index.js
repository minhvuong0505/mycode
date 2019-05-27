import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import { browserHistory } from 'react-router/lib';
import CsCenterPageHeader from './CsCenterPageHeader';


class index extends Component {
    
    handleClose(){
        window.history.go(-1);    
    }
    
    render() {
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                </div>
            </main>
        );
    }
}

export default index;