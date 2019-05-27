import React, { Component } from 'react';
import { LoginRequest } from '../../helpers/Helpers';

var naverLogin;
var naverComponent;

class Naver extends Component {
    constructor(props) {
        super(props);
        
        window.naverComponent = this;

        this.onNaverLogin = this.onNaverLogin.bind(this);
    }

    componentDidMount() {
        $(document).ready(function(){
            window.naverLogin = new window.naver.LoginWithNaverId(
                {
                    clientId: "81ppfgmWjHnIZMImAjHA",
                    callbackUrl: window.location.origin + "/login/naver"
                }
            );
            window.naverLogin.init(); 
        });
        
    }

    onLoginSuccess(data){
        LoginRequest(data);
    }

    onNaverLogin(){
        var _url = window.naverLogin.generateAuthorizeUrl();
        window.open(_url, "naver_login", "width=500,height=500");
    }
 
    render() {
        return (
                <a id="LoginURL" onClick={this.onNaverLogin}><img src="/default/images/icon/social1.png" alt="img" /></a>
        );
    }
}

export default Naver;