import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Comments from '../Comments';
import { browserHistory } from 'react-router/lib';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
      if($('#checkall').is(':checked') == true){
          console.log('checked')
          $('.item-talk input').prop('checked',true)
      }else{
          console.log('unchecked')
          $('.item-talk input').prop('checked',false)
      }
    }

    handleRemove(){
      const con = confirm('삭제하시겠습니까?')
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

    renderLists(){
        const { talks } = this.state
        let curr_date = this.getDateTime()

        if(!talks.length) return (
            <div className="block-title mypage-heading">
                <label>No Data</label>
            </div>
        )

        
    
        return   <div className="items-talk">
        {talks.map((talk,index) => {
            let avatar 
            if(talk.user.avatar) avatar = (<img src={CDN_URL+talk.user.avatar} alt="img" />)
            else avatar = (<img src="./html/images/media/img2.jpg" alt="img" />
          )

          let mins = this.mydiff(talk.created_at, curr_date, 'minutes')
          
          let media = ''
          console.log(talk)
          if(talk.media){
            if(typeof JSON.parse(talk.media) == 'object'){
                media = (<Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
                    {Object.keys(JSON.parse(talk.media)).map((media, index) => {
                        return <div key={`media-${index}`}>
                        <img style={{height:'53vw'}} src={CDN_URL+`${JSON.parse(talk.media)[media].images}`} alt="img" />
                        </div>
                    })}
                </Carousel>)
            }
          } 
            return <div key={`talk-${index}`} className="item-talk">
            <div className="item-top">
              <div className="action-check">
                <label>
                  <input type="checkbox" id={`chk_${index}`} name="check" defaultValue={talk.id} />
                  <span />
                </label>
              </div>
              <div className="img">
                <div className="photo">
                  {avatar}
                </div>
              </div>
              <div className="detail">
                {talk.user.name}
              </div>
              <div className="time">
                {mins}분전
              </div>
            </div>
            <div className="item-detail">
            <div className="photo">
                {media}
            </div>
              <div className="des">
                {talk.content}
              </div>
            </div>
            <div className="item-bottom">
              <div className="info">
                <span className="wishlist">{talk.total_like}</span>
                <span className="comment">{talk.total_cmt}</span>
              </div>
              <a href="javascript:;" className="viewmore" onClick={e => this.handleShow(talk.id)} >전체 댓글 보기</a>

            </div>
            <div className={`cmt-${index}`}>
                <Comments object_type={this.state.object_type} object_id={talk.id} redirect_url="my_talks"/>
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
        const { talks } = this.state
        let curr_date = this.getDateTime()
        

        return (
            <main className="site-main">
            <div className="block-recipes">
            {this.renderErrors()}
            {this.renderMessage()}
              <div className="block-title mypage-heading">
                <span className="title">내가 쓴 토크</span>
                <a className="close" onClick={this.handleClose} />
              </div>
              <div className="block-actions actions-talk">
                <div className="action-check pull-left">
                  <label>
                    <input type="checkbox" name="checkall" id="checkall" onClick={ this.checkedAll } />
                    <span />
                  </label>
                </div>
                <button className="btn btn-remove pull-right" onClick={ this.handleRemove } >선택 삭제</button>
              </div>
              {this.renderLists()}

            </div>
          </main>
        );
    }
}

export default MyTalks;