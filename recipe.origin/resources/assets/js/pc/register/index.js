import React, { Component } from 'react';
import {IndexLink, Link} from "react-router"
import Facebook from '../socials/Facebook';
import KakaoLogin from '../socials/KakaoLogin';
import Google from '../socials/Google';
import Naver from '../socials/Naver';

class Index extends Component {
  constructor(props) {
    super(props)
    }
    render() {
        return (
      <main className="site-main">
      <div className="container">
        <div className="block-gird-item">
          <div className="toobar">
            <strong className="title pull-left">회원가입 </strong>
          </div>
          <div className="block-myform block-login" style={{borderBottom: 'none'}}>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active">
                <div className="note">
                  <p className="title"><b>레시피봄 간편 회원가입</b></p>
                  <p>가입 후 레시피봄을 더 편하게 이용하세요</p>
                </div>
                <br />
                <div className="form-group">
                  <Link to="/join" className="btn btn-default" style={{lineHeight:'2.4vw'}}> 간편 회원 가입 하기</Link>
                </div>
                <div className="login-social sp272">
                  <span className="label">SNS 간편 로그인</span>
                  {/* <Naver/>
                  <Facebook/> */}
                  <KakaoLogin />
                  <Google />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
        );
    }
}

export default Index;