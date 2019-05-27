import React, { Component } from 'react';
import { browserHistory } from 'react-router/lib';
import ReactPaginate from 'react-paginate';

class Alarm extends Component {
    constructor(props){
      super(props)

      this.state = {
          alarm:[],
          offset:0,
          limit: 5,
          pageCount:0,
      }

      this.handlePageClick = this.handlePageClick.bind(this)
      this.loadData = this.loadData.bind(this)
    }

    handleClose(){
      window.history.go(-1);
    }

    componentDidMount(){
      this.loadData()
    }
    
    loadData(){
      const {limit} = this.state
      const {offset} = this.state
  
      axios.get('/api/v1/alarms?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1')
      .then((res)  => {
        this.setAlarms(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  
    setAlarms(alarm) {   
        const {limit} = this.state 
        this.setState({ alarm:alarm['result'], total:alarm.meta.total_count, pageCount: Math.ceil(alarm.meta.total_count / limit)}); 
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

    renderAlarms(){
      const {alarm} = this.state
      if(!alarm.length) return <div className="item-notification">No Data</div>

      return <div>
        {alarm.map((mes,index) => {
            return <div key={`mes-${index}`} className="item-notification">
            <div className="photo">
              <a href="#"><img src="/html/images/media/img5.jpg" alt="img" /></a>
            </div>
            <div className="detail">
              <strong className="title"><a href="#">Comforting Chicken Stew 레시피가 등록 되 었습니다.</a></strong>
              <p className="date">2018/03/23</p>
            </div>
          </div>
        })}
        
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
    }
    render() {
        return (
            <main className="site-main">
            <div className="block-notification">
              <div className="block-title mypage-heading">
                <span className="title">알림</span>
                <a className="close" onClick={this.handleClose}  />
              </div>
              {/* <div className="block-notification-setting">
                <div className="block-title">
                  <strong className="title">알림설정</strong>
                </div>
                <div className="checkbox">
                  <label className="label">레시피봄 알림 동의</label>
                  <label className="label-checkbox">
                    <input type="checkbox" name />
                    <span />
                  </label>
                </div>
                <div className="checkbox">
                  <label className="label">작성 글 댓글 알림</label>
                  <label className="label-checkbox">
                    <input type="checkbox" name />
                    <span />
                  </label>
                </div>
              </div> */}
              <div className="block-recent-notification">
                <div className="block-title clearfix">
                  <strong className="title pull-left">최근 알림</strong>
                  <span className="pull-right">최근 20개의 알람</span>
                </div>
                <div className="block-content">

                  {this.renderAlarms()}
                 
                </div>
              </div>
            </div>
          </main>
        );
    }
}

export default Alarm;