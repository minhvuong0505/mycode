import React, { Component } from 'react';
import { LoginRequest } from '../../helpers/Helpers';

class Facebook extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    fbLogin() {
        FB.init({
            appId      : '261850117954164', // FB App ID
            cookie     : true,  // enable cookies to allow the server to access the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v3.1' // use graph api version 2.8
          });
          
          // Check whether the user already logged in
          FB.getLoginStatus(function(response) {
              if (response.status === 'connected') {
                  //display user data
                  //getFbUserData();
                  console.log('logged');
              }
          });
        

        FB.login(function (response) {
            if (response.authResponse) {
                // Get and display the user profile data
                FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
                    function (response) {
                        LoginRequest({
                            email:response.email,
                            from_social:1,
                            social_name:'facebook',
                            social_id: response.id,
                            name:response.email,
                            avatar:response.picture.data.url,        
                        });
                    });
            } else {
                //document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
            }
        }, {scope: 'email'});
    }

    render() {
        return (<a onClick={this.fbLogin} target="_blank"><img src="/html/images/icon/social2.png"  alt="img" /></a>);
    }
}

export default Facebook;