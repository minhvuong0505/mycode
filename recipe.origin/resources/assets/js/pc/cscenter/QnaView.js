import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import CsCenterPageHeader from './CsCenterPageHeader';
import renderHTML from 'react-render-html';


class QnaView extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            qna:{
                created_at:'',
                images:""
            },
            qnaId: props.routeParams.id,
		};

        
    }

    componentDidMount(){
        this.getQna();
    }
    
    getQna() {
        const { qnaId } = this.state;
        var _userId = "";
        if(PROFILES) {
            _userId = PROFILES.id;
        }
        axios.get(`/api/v1/qna?filters=status={1;2},id=${qnaId},user_id=${_userId}`)
            .then(response => {
                if(response.data.result.length == 0) {
                    window.location.href = "/404";
                }
                this.setQna(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

	
    setQna(qna) {  
        this.setState({ qna:qna['result'][0]}); 
    }

    handleClose(){
        window.location.href = window.referrer || "/cscenter"
    }

    strToObj(str){
        var obj = {};
        if(str||typeof str ==='string'){
            var objStr = str.match(/\{(.)+\}/g);
            eval("obj ="+objStr);
        }
        return obj
     }

     parseHTML(html) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t.content.cloneNode(true);
    }
    
     

    render() {
        const {qna} = this.state;
        let imgs = "";
        if(qna != undefined && qna.images != undefined && qna.images != null && qna.images != "" && qna.images != "[]") {
            if(qna.images.includes("{")) {
                var imgList = Object.values(JSON.parse(qna.images));
                imgs = (imgList.map((_subQna,index) => { 
                    return (<p key={`qna-image-${index}`} ><img src={CDN_URL+_subQna.images} alt="img" /></p>)
                }));
            } else {
                imgs = (<img src={CDN_URL+qna.images} alt="img" />);
            }
        }
        var _answer = "답변대기중";
        let parser=new DOMParser();
        let htmlDoc=parser.parseFromString(qna.content, "text/html");
        if(qna.status == 1) {
            _answer = "답변완료";
        }
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">1:1 상담 <span>고객센터 운영시간 : 오전 9시 ~ 오후 6시 (토/일/공휴일 제외)</span></strong>
                        </div>
                        <div className="event-detail">
                            <div className="clearfix">
                                <h1 className="title pull-left">{qna.subject}</h1>
                                <div className="date pull-right">~ {qna.created_at.substr(0,10)}</div>
                            </div>
                            <div>{imgs}</div>
                            <br />
                            <p>{qna.title}</p>
                            <br /><br />
                            <hr />
                            <br />
                            <p><button className="btn btn-default">{_answer}</button></p>
                            <p dangerouslySetInnerHTML={{__html: qna.content}}></p>
                        </div>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                            <li><Link to="/qna">목록</Link></li>
                            </ul>
                        </nav>
                    </div>                                                          
                </div>
            </main>
        );
    }
}

export default QnaView;