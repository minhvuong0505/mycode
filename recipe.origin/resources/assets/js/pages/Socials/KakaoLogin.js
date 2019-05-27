import React, { Component } from 'react';
import { LoginRequest } from '../../helpers/Helpers';

window.fbAsyncInit = function() {
    Kakao.init('934fdc0536a46fb308365d9cd5999fd8');
};

class KakaoLogin extends Component {

    componentDidMount () {
        
    }

    DoLogin(){
        // 카카오 로그인 버튼을 생성합니다.
        Kakao.Auth.login({
            success: function(authObj) {
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function(res) {
                        
                        var _name = "";
                        var _avatar = "";
                        if(res.properties.nickname != undefined) {
                            _name =  res.properties.nickname;
                        }
                        if(res.properties.profile_image != undefined) {
                            _avatar = res.properties.profile_image;
                        }
                        LoginRequest({
                            email:res.kakao_account.email,
                            from_social:1,
                            social_name:'kakao',
                            social_id: res.id,
                            name:_name,
                            avatar: _avatar      
                        });
                    },
                    fail: function(error) {
                        console.log(error);
                    }
                });
            },
            fail: function(err) {
                console.log(err);
            }
        });
    }

    render() {
        return (<a onClick={this.DoLogin}><img src="/default/images/icon/social3.png" alt="img" /></a>);
    }
}

export default KakaoLogin;