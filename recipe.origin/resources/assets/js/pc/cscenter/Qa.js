import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, Redirect } from 'react-router/lib';
import { browserHistory } from 'react-router';
import CsCenterPageHeader from './CsCenterPageHeader';



class Qa extends Component {
  constructor(props) {
    super(props);
    
    if(!PROFILES) {
      window.location.href = "/login";
      console.log("need login");
    }
    
    this.state = {
      faqs:[],
      offset:0,
      limit: 10,
      pageCount:0,
      qna:''
    };

    this.loadData = this.loadData.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
    this.onChange = this.onChange.bind(this);
    this.contactUs = this.contactUs.bind(this);
  }

  componentDidMount(){
    this.loadData()
  }

  
  loadData(){
    const {limit} = this.state;
    const {offset} = this.state;
    var _search = "status={1}";
    if(PROFILES) {
      _search = `status={1;2},user_id=${PROFILES.id}`;
  }

    axios.get('/api/v1/qna?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=object_type=Qna,'+_search)
    .then((res)  => {
      this.setFaqs(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  onChange({value}){
    this.setState({ qna: value })
  }


  setFaqs(faqs) {   
        const {limit} = this.state 
        this.setState({ faqs:faqs['result'], total:faqs.meta.total_count, pageCount: Math.ceil(faqs.meta.total_count / limit)}); 
    }

  handleClose(){
    window.history.go(-1);
  }

  contactUs(){
    alert('아직 로그인하지 않았습니다.');
    browserHistory.push("/login");
    return false;
  }

  handlePageClick(data){
    let selected = data.selected;
    const { limit } = this.state
    let offset = Math.ceil(selected);

    this.setState({offset: offset}, () => {
      this.loadData();
    });
    $('html, body').animate({
      scrollTop: 0
      }, 0);
  };

    render() {
        const {faqs} = this.state
        let btn = (<button className="btn btn-default pull-right" onClick={this.contactUs} type="button">문의하기</button>)
        if(PROFILES){
          btn = (<Link to="/qna_write"><button className="btn btn-default pull-right" type="button">문의하기</button></Link>)
        }
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">1:1 상담 <span>고객센터 운영시간 : 오전 9시 ~ 오후 6시 (토/일/공휴일 제외)</span></strong>
                            {btn}
                        </div>
                        <ul className="items-notice">
                            {faqs.map((faq,index) => {
                                let status = (<label className="_gray">답변대기</label>);
                                if(faq.status == 1){
                                    status = (<label className="">답변완료</label>);
                                }
                                return (
                                    <li  key={`faq-${index}`} className="item-notice">
                                        <Link className="info" to={`/qna/${faq.id}/detail`}>
                                            <span className="title">{status}{faq.subject}</span>
                                            <span className="time" style={{width:"10%"}}>{faq.created_at.substr(0,10)}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ReactPaginate previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>                                                          
                </div>
            </main>
        );
    }
}

export default Qa;