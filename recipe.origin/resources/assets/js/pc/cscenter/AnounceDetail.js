import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import CsCenterPageHeader from './CsCenterPageHeader';

class AnounceDetail extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            qna:{
                created_at:''
            },
            qnaId: props.routeParams.id,
		};

        this.getQna();
    }
    
    getQna() {
        const { qnaId } = this.state;

        axios.get(`/api/v1/qna?filters=status={1;2},id=${qnaId}`)
            .then(response => {
                console.log(response);
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
     

    render() {
        const {qna} = this.state;
        let imgs = "";
        if(qna.images != undefined && qna.images != null && qna.images != "" && qna.images != "[]") {
            if(qna.images.includes("{")) {
                var imgList = Object.values(JSON.parse(qna.images));
                imgs = (imgList.map((_subQna,index) => { 
                    return (<p key={`qna-image-${index}`} ><img src={CDN_URL+_subQna.images} alt="img" /></p>)
                }));
            } else {
                imgs = (<img src={CDN_URL+qna.images} alt="img" />);
            }
        }
        
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">공지사항</strong>
                        </div>
                        <div className="event-detail">
                            <div className="clearfix">
                                <h1 className="title pull-left">{qna.title}</h1>
                                <div className="date pull-right">~ {qna.created_at.substr(0,10)}</div>
                            </div>
                            <div>{imgs}</div>
                            <p dangerouslySetInnerHTML={{__html: qna.content}}></p>
                        </div>
                        <nav aria-label="Page navigation">
                            <ul className="pagination">
                                <li><Link to="/anounce">목록</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </main>
        );
    }
}

export default AnounceDetail;