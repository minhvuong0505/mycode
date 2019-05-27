//import libs
import React, { Component } from 'react'
// import { Link } from "react-router"

//import components
import Navigation from "../includes/navigation/Navigation"

class Layout extends Component {
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
                    <div className="logo-footer">
                    <a href="#"><img src="/html/images/logo-footer.png" alt="logo" /></a>
                    </div>
                    <p>상호명 : (주)봄프렌즈  |  대표 : 심태왕  |  주소 : 서울특별시 강남구 도산대로4길 12 203호(논현동,장원빌딩)  |  사업자등록번호 : 829-81-00792 </p>
                    <p>대표번호: 1544-9667  |  팩스번호 : 070-8260-1863  |  이메일 :cs@bom.co.kr  |  통신판매업신고번호 : 제2018-서울강남-02288호  |  개인정보관리자 : 정현수</p>
                    <div className="copyright">
                        <p>COPYRIGHT ⓒ recipebom ALL RIGHT RESERVED</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Layout
