import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import { browserHistory } from 'react-router/lib';


class CsCenterPageHeader extends Component {
    
    handleClose(){
        window.history.go(-1);    
    }
    
    render() {
        let _path = window.location.pathname;
        let notice_state = "";
        let faq_state = "";
        let qna_state = "";

        if(_path.includes("/anounce")) notice_state = "active";
        else if(_path.includes("/faq")) faq_state = "active";
        else if(_path.includes("/qna")) qna_state = "active";

        return (
            <div className="block-cscenter-top">
                <ul className="actions">
                    <li className={notice_state}>
                        <Link to="/anounce">공지사항</Link>
                    </li>
                    <li className={faq_state}>
                        <Link to="/faq">자주하는 질문</Link>
                    </li>
                    <li  className={qna_state}>
                        <Link to="/qna">1:1 상담</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CsCenterPageHeader;