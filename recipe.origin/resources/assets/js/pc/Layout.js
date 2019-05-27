//import libs
import React, { Component } from 'react'
import { Link } from 'react-router/lib';
//import components
import Navigation from "../pc/navigation/Navigation"
 
class Layout extends Component {
    constructor(props) {
        super(props);
        
      }

    render(){
        const { location } = this.props;
        const containerStyle = {
        };

        return(
            <div>
                <Navigation location={location} />
                <div className="wrapper">
                    {this.props.children}
                </div>
                <footer className="site-footer">
                    <div className="footer-top">
                    <div className="container">
                    <Link to="/about">회사소개</Link>
                    <Link to="/policy">개인정보처리방침</Link>
                    <Link to="/agreements">이용약관</Link>
                    <Link to="/cscenter">고객행복센터</Link>
                    <Link to="/anounce">공지사항</Link>
                    <Link to="https://store.bom.co.kr/board/list.php?bdId=media" target="_blank">미디어</Link>
                    </div>
                    </div>
                    <div className="footer-content">
                    <div className="container">
                        <p>상호명 : (주)봄프렌즈  |  대표 : 심태왕  |  주소 : 서울특별시 강남구 도산대로4길 12 203호(논현동,장원빌딩)  |  사업자등록번호 : 829-81-00792 </p>
                        <p>대표번호: 1544-9667  |  팩스번호 : 070-8260-1863  |  이메일 :cs@bom.co.kr  |  통신판매업신고번호 : 제2018-서울강남-02288호  |  개인정보관리자 : 정현수</p>
                        <p>COPYRIGHT ⓒ recipebom ALL RIGHT RESERVED</p>
                    </div>
                    </div>
                    <div className="footer-bottom">
                    <div className="container">
                        모바일에서 레시피봄을 만나세요
                        <a href="https://play.google.com/store/apps/details?id=com.recipebom.byapps"><img src="/default/images/media/img-footer1.png" alt="img" /></a>
                        <a href="https://itunes.apple.com/kr/app/%EB%A0%88%EC%8B%9C%ED%94%BC%EB%B4%84-%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EB%8C%80%ED%91%9C-%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC-%EB%A0%88%EC%8B%9C%ED%94%BC/id1449439370"><img src="/default/images/media/img-footer2.png" alt="img" /></a>
                        <img src="/default/images/media/img-footer3.png" alt="img" style={{width:"50px"}} />
                    </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Layout
