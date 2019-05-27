import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import { browserHistory } from 'react-router/lib';


class index extends Component {
    
    handleClose(){
        window.history.go(-1);    
    }
    
    render() {
        return (
            <main className="site-main">
           
            
            <div className="block-setting">
               
                <div className="block-title mypage-heading">
                    <span className="title">고객센터</span>
                    <Link className="close" to="/"></Link>
                </div>
                <div className="block-content">
                    <div className="subtitle">무엇을 도와드릴까요?</div>
                    <ul className="links">
                        <li>
                            <Link style={{display:'inherit',width:'100vw'}} to="/anounce"><span className="text">공지사항  <span>레시피봄의 소식을 알려드립니다</span></span>
                            <span className="pull-right icon-action"></span></Link>
                        </li>
                        <li>
                            <Link  style={{display:'inherit',width:'100vw'}} to="/faq"><span className="text">도움말  <span>레시피봄 이용 팁이 궁금하다면? </span></span>
                            <span className="pull-right icon-action"></span></Link>
                        </li>
                        <li>
                            <Link  style={{display:'inherit',width:'100vw'}} to="/qna"><span className="text">문의하기<span>궁금하신점을 문의해주세요!</span></span>
                            <span className="pull-right icon-action"></span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
        );
    }
}

export default index;