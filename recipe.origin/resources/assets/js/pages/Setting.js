import React, { Component } from 'react';
import {IndexLink, Link, browserHistory} from "react-router"


class Setting extends Component {
    constructor() {
        super();
        this.state = {
			  profiles: PROFILES,
    };
    
        this.handelClose = this.handelClose.bind(this)
    }

    handelClose(){
      window.history.go(-1);
    }
    render() {
        const { profiles } = this.state

        return (
            <main className="site-main header-setting" >
        <div className="block-setting">
          <div className="block-title mypage-heading">
            <span className="title">설정</span>
            <a onClick={this.handelClose} className="close" />
          </div>
          <div className="block-content">
            <div className="subtitle">앱 설정</div>
            <ul className="links">
              <li>
                <span className="text">{profiles.name}</span>
                
                <Link to="/logout">
                    <span className="action">로그아웃</span>
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </main>
        );
    }
}

export default Setting;