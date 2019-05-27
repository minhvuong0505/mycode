import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router/lib';
import CsCenterPageHeader from './CsCenterPageHeader';


class Faq extends Component {
    constructor(props) {
      super(props);
      
      this.state = { 
        faqs:[],
        offset:0,
        limit: 10,
        pageCount:0,
        keyword:''
      };

      this.loadData = this.loadData.bind(this)
      this.handlePageClick = this.handlePageClick.bind(this)
      this.onChange = this.onChange.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount(){
      this.loadData()
    }

    
    loadData(){
      const {limit} = this.state
      const {offset} = this.state
      let {keyword} = this.state

      if(keyword) keyword = 'title~'+keyword

      axios.get('/api/v1/qna?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1,object_type=Faq,'+keyword)
      .then((res)  => { 
        this.setFaqs(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }

    onChange({value}){
      this.setState({ keyword: value })
    }

    handleSearch(){
      const { keyword } = this.state;
      if(keyword == '') {
            alert('키워드를 입력하십시오.');
            return false;
        }

      this.loadData();
    }

    setFaqs(faqs) {   
          const {limit} = this.state 
          this.setState({ faqs:faqs['result'], total:faqs.meta.total_count, pageCount: Math.ceil(faqs.meta.total_count / limit)}); 
      }

    handleClose(){
        window.location.href = window.referrer || "/cscenter"
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
      const {faqs} = this.state;
        return (
            <main className="site-main">
                <div className="container">
                    <CsCenterPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">자주하는 질문</strong>
                            <button className="btn btn-default pull-right" onClick={ this.handleSearch } type="button">검색</button>
                            <input type="text" name="keyword" onChange={ e => this.onChange({value:e.target.value})} placeholder="레시피등록" className="form-control pull-right" />
                        </div>
                        <ul className="items-notice">
                            {faqs.map((faq,index) => {
                                return (
                                    <li key={`faq-${index}`} className="item-notice">
                                        <Link to={`/faq/${faq.id}/detail`} className="info">
                                            <span className="title">{ faq.title }</span>
                                            <span className="time" style={{width:"10%"}}>2018/03/23</span>
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

export default Faq;