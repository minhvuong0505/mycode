import React, { Component } from 'react';

var naverLogin;
class NaverCallback extends Component {

    constructor(props) {
        super(props);
        window.naverLogin = new window.naver.LoginWithNaverId(
            {
                clientId: "81ppfgmWjHnIZMImAjHA",
                callbackUrl: window.location.origin + "/login/naver"
            }
        );
        window.naverLogin.init();
        
        window.naverLogin.getLoginStatus(function (status) {
            if (status) {
                var _returnObj = {
                    email:window.naverLogin.user.getEmail(),
                    from_social:1,
                    social_name:'naver',
                    social_id: window.naverLogin.user.getId(),
                    name: window.naverLogin.user.getNickName(),
                    avatar: window.naverLogin.user.getProfileImage()      
                };
                window.opener.naverComponent.onLoginSuccess(_returnObj);
                window.close();
                open(location, '_self').close();
            } else {
                window.location.href = "/login";
            }
        });
    }
    

    render() {
        return (<a><img src="/default/images/icon/social3.png" alt="img" /></a>);
    }
}

export default NaverCallback;