import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Difficult from '../recipes/Difficult';
import { browserHistory } from 'react-router/lib';
import { Link} from "react-router"


class MyHearts extends Component {
    constructor(props) {
        super(props);
        if(!PROFILES){
            window.location.href = "/login"
            return false
        } 
        this.state = {
            hearts:[],
            object_type:'Post',
            offset:0,
            limit: 5,
            pageCount:0,
            total:'',
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
            
        axios.get('/api/v1/reaction?embeds=post&filters=object_type=post,type=like,user_id='+user_id+',status=1&page_id='+offset+'&page_size='+limit+'&sorts=-id')
        .then((res)  => {
            this.sethearts(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onChange({value}){
        this.setState({ keyword: value })
    }

    sethearts(hearts) {   
        const {limit} = this.state 
        this.setState({ hearts:hearts['result'], total:hearts.meta.total_count, pageCount: Math.ceil(hearts.meta.total_count / limit)}); 
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

  
    checkedAll(){
      if($('#checkall').is(':checked') == true){
          console.log('checked')
          $('.item-recipes input').prop('checked',true)
      }else{
          console.log('unchecked')
          $('.item-recipes input').prop('checked',false)
      }
    }

    handleRemove(){
      const con = confirm('삭제하시겠습니까?')
      if(con !==true) return false

      let ids = ""
      $('.item-recipes input:checked').each(function(i,e){
          if(i == 0)
            ids += $(this).val()
            else 
            ids += ","+$(this).val()
        })

        if(ids.length == 0) {
        alert('아직 항목을 선택하지 않았습니다.')
        return false
      }


      //request new token
	  refreshToken()
      
      axios.delete('/api/v3/reactions/react',{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKENS}`
             }, 
             data: {
                object_id:ids, object_type:'Post', type: 'Like', action:0, author_id: 1
            }})
        .then(res => {
            if (res.status === 200) {
                this.setState({ message: '성공적으로' })
            } else {
                return res;
            }

            this.loadData()
        })
        .catch(err => {
            console.log(err.response)
            if (err.response) {
                const errors = err.response.data
                this.setState({ errors:errors, hasError: true })
            }

            if(err.response.data.status_code == 401){
                alert('다시 로그인해야합니다.')
                window.location.href = '/logout?redirect_url=my_hearts'
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
        const { hearts } = this.state
        if(!hearts.length) return (
            <div className="block-title mypage-heading">
                <label>No Data</label>
            </div>
        )

        return <div> {hearts.map((heart,index) => {
            let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
            if(heart.post.cooking_representation != undefined) {
                var cooking_representation = $.parseJSON(heart.post.cooking_representation);
                if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
                img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={heart.post.title} />);
                }
            }
            return  (<div key={`heart-${index}`} className="item item-recipes">
            <div className="box-check">
              <div className="action-check pull-left">
                <label>
                  <input type="checkbox" defaultValue={heart.post.id} data-id={heart.post.author_id} name="check" />
                  <span />
                </label>
              </div>
            </div>
            <div className="img">
                <Link to={`recipe/${heart.object_id}/detail`}>{img}</Link>
            </div>
            <div className="detail">
                <strong className="title"><Link to={`recipe/${heart.object_id}/detail`}>{heart.post.title}</Link></strong>
                <div className="info">
                <p><label>조리시간</label><span>{heart.post.cooking_time}분</span></p>
                <div>
                    <label>난이도</label>
                    <Difficult diff={heart.post.difficulty} />
                </div>
                </div>               
            </div>

             
          </div>)
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
        <div className="block-recipes">
          <div className="block-title mypage-heading">
            <span className="title">내가 본 레시피</span>
            <a className="close" onClick={this.handleClose} />
          </div>
          {this.renderErrors()}
            {this.renderMessage()}
          <div className="block-actions">
            <div className="action-check pull-left">
              <label>
                <input type="checkbox" name="checkall" id="checkall" onClick={this.checkedAll} />
                <span />
              </label>
            </div>
            <button className="btn btn-remove pull-right" onClick={this.handleRemove} >선택 삭제</button>
          </div>
          <div className="block-content">
           
           {this.renderLists()}
            
           
          </div>
        </div>
      </main>
        );
    }
}

export default MyHearts;