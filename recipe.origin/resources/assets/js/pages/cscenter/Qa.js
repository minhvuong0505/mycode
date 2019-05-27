import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router/lib';
import { browserHistory } from 'react-router';



class Qa extends Component {
  constructor(props) {
    super(props);
    
    if(!PROFILES) {
      window.location.href = "/login";
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
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount(){
    this.loadData()
  }

  
  loadData(){
    const {limit} = this.state
    const {offset} = this.state
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
        let btn = (<button className="btn btn-default pull-right" onClick={this.contactUs} type="button">
        문의하기 
    </button>)
        if(PROFILES){
          btn = (<Link to="/qna_write"><button className="btn btn-default pull-right" type="button">
          문의하기 
      </button></Link>)
        }
        return (
            <main className="site-main">
            <div className="block-setting">
              <div className="block-title mypage-heading">
                <span className="title">Q&amp;A</span>
                <Link to="/cscenter" className="close"> </Link>
              </div>
              <div className="contacus">
                <span className="title pull-left">고객센터 : 오전 9시 ~ 오후 6시 <span>(토/일/공휴일 제외)</span></span>
                {btn}
              </div>
              <div className="block-content">
                <ul className="links">
                {faqs.map((faq,index) => {
                    let status = (<span className="label label-default">답변대기</span>)
                    if(faq.status == 1){
                        status = (<span className="label label-primary">답변완료</span>)
                    }
                    return <li key={`faq-${index}`}>
                    {status}

                    <span className="text"><Link style={{color:'#333'}} to={`/qna/${faq.id}/detail`}>{ faq.subject }</Link></span>
                    <span className="date">{ faq.created_at.substr(0,10) }</span>
                  </li> 
                })}
                
                </ul>
                
              </div>
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
          </main>
        );
    }
}

export default Qa;