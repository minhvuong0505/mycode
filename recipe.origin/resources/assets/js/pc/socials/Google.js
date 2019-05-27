import React, { Component } from 'react';
import { LoginRequest } from '../../helpers/Helpers';

class Google extends Component {

    loginGoogle() {
        auth2.signIn()
        .then(function(success){
            console.log(success);
            var _name = "";
            var _avatar = "";
            if(success.w3.ig != undefined) {
                _name =  success.w3.ig;
            }
            if(success.w3.Paa != undefined) {
                _avatar = success.w3.Paa;
            }
            LoginRequest({
                email:success.w3.U3,
                from_social:1,
                social_name:'google',
                social_id: success.w3.Eea,
                name:_name,
                avatar: _avatar      
            });
        }, function(error){ 
            console.log(error);
        });
    }

    render() {
        return (
            <a id="login_google" onClick={this.loginGoogle}><img src="/default/images/icon/social4.png" alt="img" /></a>
        );
    }
}

export default Google;