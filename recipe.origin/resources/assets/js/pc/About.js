import React, { Component } from 'react';
import { browserHistory } from 'react-router/lib';

class About extends Component {
    handleClose(){
        window.history.go(-1);
    }
    render() {
        return (
            <main className="site-main">
                <div className="container">
                

                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title">레시피봄 소개</strong>
                            
                        </div>

                        <div className="text-center">
                            <p><img src="/default/images/media/img9.png" alt="" /></p>
                            <br/>
                        </div>
                    </div>                                                          
                </div>
            </main>
        );
    }
}

export default About;