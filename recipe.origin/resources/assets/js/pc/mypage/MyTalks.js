import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Comments from '../Comments';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getDateTime, mydiff, isImage } from '../../helpers/Helpers';
import { Link } from 'react-router/lib';
import MyPageHeader from './MyPageHeader';


class MyTalks extends Component {
    constructor(props) {
        super(props);
        if(!PROFILES){
            window.location.href = "/login"
            return false
        } 
        this.state = {
            talks:[],
            object_type:'Talk',
            offset:0,
            limit: 5,
            pageCount:0,
            errors: {},
            hasError: false,
            message: null,
            feeds:[],
        };

        this.loadData = this.loadData.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    componentDidMount(){
        this.loadData()
    }


    async loadData(){
        const {limit} = this.state
        const {offset} = this.state
    
        let user_id = ''
        if(PROFILES != undefined){
            user_id = PROFILES.id
        }else{
            window.location.href = "/login"
        }
    
        if(user_id) user_id = ',user_id='+user_id
    
        await axios.get('/api/v1/talk?embeds=user&filters=status=1'+user_id+'&sorts=-id&page_id='+offset+'&page_size='+limit)        
        .then((res)  => {
            this.setTalks(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onChange({value}){
        this.setState({ keyword: value })
    }

    setTalks(talks) {   
        const {limit} = this.state 
        this.setState({ talks:talks['result'], total:talks.meta.total_count, pageCount: Math.ceil(talks.meta.total_count / limit)}); 
    }

    handleClose(){
        window.history.go(-1);
    }

    handlePageClick(data){
        let selected = data.selected;
        let offset = Math.ceil(selected);

        this.setState({offset: offset}, () => {
            this.loadData();
        });
        $('html, body').animate({
            scrollTop: 0
            }, 0);
    };

    handleShow(index){
      $('.block-comment-'+index).toggle('active')
    }

    getDateTime() {
      var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {
         month = '0'+month;
      }
      if(day.toString().length == 1) {
         day = '0'+day;
      }   
      if(hour.toString().length == 1) {
         hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
         minute = '0'+minute;
      }
      if(second.toString().length == 1) {
         second = '0'+second;
      }   
      var dateTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;   
       return dateTime;
    }

    mydiff(date1,date2,interval) {
      var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
      date1 = new Date(date1);
      date2 = new Date(date2);
      var timediff = date2 - date1;
      if (isNaN(timediff)) return NaN;
      switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
          ( date2.getFullYear() * 12 + date2.getMonth() )
          -
          ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
      }
    }

    checkedAll(){
      if($('#checkall').hasClass('active') == true){
        console.log('unchecked')
        $('#checkall').removeClass('active');
        $('.item-talk input').prop('checked',false)
      }else{
        console.log('checked')
        $('#checkall').addClass('active');
        $('.item-talk input').prop('checked',true)
          
      }
    }

    handleRemove(){
      const con = confirm('정말 삭제하시겠습니까?')
      if(con !==true) return false

      let ids = ""
      $('.items-talk .item-talk input:checked').each(function(i,e){
          if(i == 0)
            ids += $(this).val()
            else 
            ids += ","+$(this).val()
      })
      console.log(ids)
      if(ids.length == 0) {
        alert('아직 항목을 선택하지 않았습니다.')
        return false
      }


      //request new token
		  refreshToken()
      
      axios.delete('/api/v3/talks/'+ids, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKENS}`
        }      
      }).then(res => {
            if (res.status === 204) {
                this.setState({ message: '성공적으로 삭제되었습니다.' })
                this.loadData()
            } else {
                return res;
            }
        })
        .catch(err => {
            if (err.response) {
                const errors = err.response.data
                this.setState({ errors:errors, hasError: true })
            }
        })
    }

    resetErrors() {
      this.setState({
          errors: {},
          hasError: false,
      })
  }

  resetMessage() {
      this.setState({ message: null })
  }

  renderErrors() {
      const { errors, hasError } = this.state

      if (!hasError) return null
      return (
          <div className="alert alert-danger alert-dismissible" role="alert">
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>                
              <p>{errors.message}</p>
          </div>
      )
  }

  renderMessage() {
      const { message } = this.state
      
      if (message) {
          return (
              <div className="alert alert-success alert-dismissible" role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                  <p><strong>Success!</strong> { message }</p>
              </div>
          )
      }
}


    render() {
        const { talks } = this.state
        let curr_date = this.getDateTime()
        const {total} = this.state;
        

        return (
            <main className="site-main">
            <div className="container">
          <MyPageHeader />
          
          <div className="block-gird-item">
            <div className="toobar">
              <strong className="title">내가 쓴 토크</strong>
              <div className="clearfix" />
              <span className="total">총 <span>{total}개의</span> 내가 쓴 토크가 있습니다</span>
              <ul className="sorby">
                <li id="checkall" onClick={this.checkedAll}>전체 선택</li>
                <li onClick={ this.handleRemove }>선택 삭제</li>
              </ul>
            </div>
            <div className="items-talk">
            {talks.map((feed,index) => {
				let mins = mydiff(feed.created_at, curr_date, 'minutes')
				let face
				let media = ''
				let active 

				if(feed.user.avatar){
					face = (<img src={CDN_URL+feed.user.avatar} alt="img" />)
				}else{
					face = (<img src="./html/images/media/img2.jpg" alt="img" />)
				}

				if(feed.total_like > 0) active = 'active'

				if(feed.media){
					if(typeof JSON.parse(feed.media) == 'object'){
						media = (<Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
							{Object.keys(JSON.parse(feed.media)).map((media, index) => {
								return <div key={`media-${index}`}>
								<img src={CDN_URL+`${JSON.parse(feed.media)[media].images}`} alt="img" />
								</div>
							})}
						</Carousel>)
					}else{
						media = ''
					}
				} 

				return	<div key={`feed-${index}`} className="item-talk">
				<div className="item-top">
                <div className="action-check">
                    <label>
                    <input type="checkbox" id={`chk_${index}`} name="check" defaultValue={feed.id} />  
                    <span></span>
                    </label>
                </div>
				<div className="img">
					<div className="photo">
					{face}
					</div>
				</div>
				<div className="detail">
					<strong className="title"><a href="#">{feed.user.name} </a></strong>
					<span className="time">{mins}분전</span>
				</div>
				<div className="info">
				<span className={`wishlist wish-${feed.id} ${active}`} onClick={e => this.handleAddWish(feed)}>{feed.total_like}</span>
					<span className="comment">{feed.total_cmt}</span>
				</div>
				</div>
				
				<div className="item-detail">
					
						<div className="des">
						<Link to={`talk/${feed.id}/view`}>{feed.content}</Link>
						</div>
					
						<div className="photo">
							{media}
						</div>
				</div>
			
              </div>
			})}	  
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
        </div>
      </main>
        );
    }
}

export default MyTalks;