import React, { Component } from 'react';
import {IndexLink, Link} from "react-router"
import Facebook from '../Socials/Facebook';
import KakaoLogin from '../Socials/KakaoLogin';
import Google from '../Socials/Google';
import Naver from '../Socials/Naver';

class Index extends Component {
  constructor(props) {
    super(props)
    
  }
    render() {
        return (
            <main className="site-main">
        <div className="block-myform">
          <div className="block-title mypage-heading">
            <Link to="/login" className="back"></Link>
            <span className="title">회원가입</span>
          </div>
          <div className="block-content">
            <div className="box-login">
              <strong className="title">레시피봄 간편 회원가입</strong>
              <p className="subtitle">가입 후 레시피봄을 더 편하게 이용하세요</p>
              <Link to="/join" className="btn btn-default" style={{lineHeight:'11vw'}}> 간편 회원 가입 하기</Link>
              <div className="login-social sp272">
                <span className="label">SNS 회원가입</span>
                <div>
                  {/* <Naver/>
                  <Facebook/> */}
                  <KakaoLogin />
                  <Google />
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