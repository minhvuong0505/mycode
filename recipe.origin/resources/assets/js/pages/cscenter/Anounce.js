import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router/lib';


class Anounce extends Component {
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
  
        axios.get('/api/v1/qna?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1,object_type=Announce,'+keyword)
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
        const { keyword } = this.state
        if(keyword == '') {
            alert('레시피 등록')
            return false
        }
  
        this.loadData()
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
        const {faqs} = this.state
        return (
            <main className="site-main">
        <div className="block-setting">
          <div className="block-title mypage-heading">
            <span className="title">공지사항</span>
            <Link to="/cscenter" className="close"> </Link>
          </div>
          <div className="block-content">
            <ul className="links notice">
              {faqs.map((faq,index) => {
                  return <li key={`faq-${index}`}>
                  <span className="text"><Link style={{color:'#333'}} to={`/anounce/${faq.id}/detail`}>{ faq.title }</Link></span>
                  <span className="date">{faq.created_at.substr(0,10)}</span>
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

export default Anounce;