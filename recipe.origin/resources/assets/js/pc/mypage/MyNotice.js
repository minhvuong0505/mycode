import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Difficult from '../recipes/Difficult';
import { browserHistory } from 'react-router/lib';
import { Link} from "react-router";
import MyPageHeader from './MyPageHeader';

class MyNotice extends Component {
    constructor(props) {
        super(props);
        if(!PROFILES){
            window.location.href = "/login"
            return false
        } 
        this.state = {
            user:{
              name:'',
              username:'',
              slogan:'',
              birthday:'',
              gender:''
            },
            total: 0,
            userId:props.routeParams.id,
            errors: {},
            hasError: false,
            message: null,
            years:[],
            images:{ 1:{url:''}},
            alarm: [],
            offset:0,
            limit: 9,
            pageCount:0
        };

        this.handlePageClick = this.handlePageClick.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    handleClose() {
        window.history.go(-1);
    }
  
    componentDidMount() {
        this.loadData();
    }

    checkedAll() {
        var val = $('#checkall').attr('data-value');
        
        if(val == 'true') {
          $('#checkall').attr('data-value', 'false');
          $('#checkall').removeClass('active');
          $('.item-recipe input').prop('checked',false);
        } else {
          $('#checkall').attr('data-value', 'true');
          $('#checkall').addClass('active');
          $('.item-recipe input').prop('checked',true);
        }
    }

    handleRemove() {
        const {con} = confirm(' 등록하시겠습니까?');
        if(con !==true) return false;
  
        let ids = [];
        $('.item-recipe input:checked').each(function(i,e){
            if(i == 0)
              ids += $(this).val();
            else
              ids += ","+$(this).val();
        });
  
        if(ids.length == 0) {
            alert('아직 항목을 선택하지 않았습니다.');
            return false;
        }
  
        //request new token
        refreshToken();
        
        axios.delete('/api/v3/alarms/'+ids,{ headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKENS}`
        }}).then(res => {
            if (res.status === 204) {
                this.setState({ message: '성공적으로' })
            } else {
                return res;
            }
            this.loadData();
        }).catch(err => {
            console.log(err.response);
            if (err.response) {
                const {errors} = err.response.data;
                this.setState({ errors:errors, hasError: true });
            }

            if(err.response.data.status_code == 401) {
                alert('다시 로그인해야합니다.');
                window.location.href = '/logout?redirect_url=my_notice';
            }
        });
    }

    loadData() {
        const {limit} = this.state;
        const {offset} = this.state;
    
        axios.get('/api/v1/alarms?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1').then((res)  => {
            this.setAlarms(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    
    setAlarms(alarm) {   
        const {limit} = this.state 
        this.setState({ alarm:alarm['result'], total:alarm.meta.total_count, pageCount: Math.ceil(alarm.meta.total_count / limit)}); 
    }
    
    handlePageClick(data) {
        let selected = data.selected;
        const {limit} = this.state;
        let offset = Math.ceil(selected);
    
        this.setState({offset: offset}, () => {
            this.loadData();
        });

        $('html, body').animate({
            scrollTop: 0
        }, 0);
    }

    renderAlarms() {
        const {alarm} = this.state;
        if(!alarm.length) return (<div className="item-notification">No Data</div>);
  
        return (<div>
          {alarm.map((mes,index) => {
                return (
                    <div key={`mes-${index}`} className="item-arlam">
                        <div className="action-check">
                            <label>
                                <input type="checkbox" defaultValue={mes.id} name="check" />
                                <span />
                            </label>
                        </div>
                        <div className="img">                                
                            <a href="#"><img src="/html/images/media/home7.jpg" alt="img" /></a>                                
                        </div>
                        <div className="detail">
                            <strong className="title"><a href="#">Comforting Chicken Stew 레시피가 등록 되었습니다. </a></strong>
                            <span className="date">2018/03/23</span>
                        </div>
                    </div>
                );
          })}
        </div>);
    }

    render() {
        const {total} = this.state;
        return (
            <main className="site-main">
                <div className="container">
                    <MyPageHeader />
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title">알림</strong>
                            <div className="clearfix" />
                            <span className="total">총 <span>{total}개의</span> 알림이 있습니다</span>
                            <ul className="sorby">
                                <li data-value="false" id="checkall" onClick={this.checkedAll} style={{userSelect: "none"}}>전체 선택</li>
                                <li  onClick={this.handleRemove} style={{userSelect: "none"}}>선택 삭제</li>
                            </ul>
                        </div>
                        {this.renderAlarms()}
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

export default MyNotice;