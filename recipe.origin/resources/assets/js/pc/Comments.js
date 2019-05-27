import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Comments extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comments:{
                content: ""
            },
            lists:[],
            subComments:[],
            subOff:{},
            object_type: this.props.object_type || 'Post',
            object_id:this.props.object_id || 47, //post_id,talk_id
            sort:this.props.sort, //type sort
            redirect_url:this.props.redirect_url,
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
        this.onSubmit = this.onSubmit.bind(this)
        this.handleShowComments = this.handleShowComments.bind(this)
        this.handleRemoveComment = this.handleRemoveComment.bind(this)
        this.loadingMore = this.loadingMore.bind(this)
        this.renderSubComments =  this.renderSubComments.bind(this)
    }

     //onchange
     onChange({name,value, options}){
        if(!PROFILES){
            alert('아직 로그인하지 않았습니다.')
            return false
        }
        const {comments} = this.state;

        comments[name] = value;
        comments['parent_id'] = options['parent_id']
        comments['object_id'] = options['object_id']
        comments['object_type'] = options['object_type']
        this.setState({comments});
    }

    componentDidMount(){
        this.loadData()
	}

    componentWillReceiveProps(nextProps){
        this.setState({ object_id : nextProps.object_id }, () => {
            this.loadData()
        })
    }

	
	async loadData(){
		const {limit} = this.state
        const {offset} = this.state
        const {object_type} = this.state
        const {object_id} = this.state

		await axios.get('/api/v1/comment?embeds=user%2Cchilds&page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1,parent_id=0,object_type='+object_type+',object_id='+object_id)
		.then((res)  => {
			this.setComments(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
    }
    
    loadingMore(parent_id){
        const {limit} = this.state
        const {object_type} = this.state
        const {object_id} = this.state
        const {subOff} = this.state
        if(subOff[parent_id] == undefined)
            subOff[parent_id] = 1
        else
            subOff[parent_id] = subOff[parent_id] + 1 
        this.setState({ subOff })

        let offset = subOff[parent_id] 

		axios.get('/api/v1/comment?embeds=user%2Cchilds&page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1,parent_id='+parent_id+',object_type='+object_type+',object_id='+object_id)
		.then((res)  => {
			this.setSubComments(res.data)
		})
		.catch((err) => {
			console.log(err)
		})
    
    }

    setSubComments(subComments) {  
        this.setState({subComments:subComments['result']}) 
        this.renderSubComments(subComments['result'])
    }

	setComments(lists) {   
        const {limit} = this.state 
        this.setState({ lists:lists['result'], total:lists.meta.total_count, pageCount: Math.ceil(lists.meta.total_count / limit)}); 
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
                <p>{this.state.errors.message}</p>
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

    onSubmit(e){
        e.preventDefault();
        const { comments } = this.state;
        const { redirect_url } = this.state
        const {object_id} = this.state;

        if(!comments['content']){
            alert('댓글을 입력해주세요')
            return false
        }

        if(comments['content'].length > 100){
            alert('제한 텍스트 < 100')
            return false
        }

        const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false

        //request new token
		refreshToken()
        
        axios.post('/api/v3/comments', comments, {headers:{
            'Authorization': `Bearer ${TOKENS}`
        }})
            .then(res => {
                if (res.status === 201) {
                    // this.setState({ message: '성공적으로 생성됨' })
                    this.loadData();
                    console.log(object_id);
                    var _cntComment = parseInt($('.item-id-'+object_id+' .item-top .info .comment').text()) + 1;
                    $('.item-id-'+object_id+' .item-top .info .comment').text(_cntComment);

                    comments['content'] = "";
                    var _total = parseInt(this.state.total) + 1;
                    total = _total;
                    this.setState({comments, total });
                    $('.form-comment-top').hide();
                    
                } else {
                    if(res.status == 200){
						alert('다시 로그인해야합니다.')
                    	window.location.href = '/logout?redirect_url='+redirect_url
					}
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }

                if(err.response.data.status_code == 401){
                    alert('다시 로그인해야합니다.')
                    window.location.href = '/logout?redirect_url='+redirect_url
                }
            })
    }

    handleShowComments(index){
        $('#form-comment-'+index).toggle('active')
        
    }

    showReply(index){
        $('#reply-'+index).toggle('active')
        if($('.count span.down-'+index).hasClass('view')){
            $('.count span.down-'+index).addClass('active')
            $('.count span.down-'+index).removeClass('view')
        }else if($('.count span.down-'+index).hasClass('active')){
            $('.count span.down-'+index).addClass('view')
            $('.count span.down-'+index).removeClass('active')
        }
    }


    handleRemoveComment(id, object_id, object_type){
        const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false

        //request new token
		refreshToken()

        axios.delete('/api/v3/comments/'+id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKENS}`
            },
            data: {object_id:object_id, object_type:object_type}
          })
            .then(res => {
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
                    this.setState({ errors, hasError: true })
                }
                
            })
    }

    renderSubComments(list){
        return <div>
            {list.map((child,i) => {
                let btn_close_sub = ''
                if(PROFILES){
                    if(PROFILES.id == list.user_id) btn_close_sub = (<button className="btn btn-remove" onClick={ (e) => this.handleRemoveComment(child.id, child.object_id, child.object_type)} type="button" />)
                }

                return <li key={`child-${i}`} className="item-reply">
                    <div className="item-info">
                        <div className="comment">
                            {child.content}
                        </div>
                        <div className="info">
                            <img src="/default/images/icon/icon8.png" alt="img" />
                            <span className="name">{child.name}</span>   
                            <span className="date">{child.created_at.substring(0,10)} </span>
                        </div>
                        {btn_close_sub}
                </div>
            </li>
            })}
        </div>
    }

    handleClose(index){
        $('.block-comment-'+index).toggle('active')
    }
    

    render() {
        const { lists } = this.state
        const { total } = this.state
        let { subComments } = this.state
        let { comments } = this.state

        let frmComent 
        let style_class = '';    
        
        style_class = {padding:'0vw'}

        if(!lists.length){
            return <main className="site-main">
            <div className="block-comment">
            {this.renderErrors()}
            {this.renderMessage()}
            <div className="form-comment-top">
              <input type="text" name="content" value={comments.content}
                     onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value, options:{parent_id:0,object_type:this.state.object_type,object_id:this.state.object_id} })} className="form-control" placeholder="댓글을 입력해주세요" />
              <button id="all" onClick={this.onSubmit} className="btn btn-default btn-comment" type="button">등록</button>
            </div>
            </div>
            </main>
        }

        return (<main className="site-main">
        <div className="block-comment">
        {this.renderErrors()}
        {this.renderMessage()}
        <div className="form-comment-top">
          <input type="text" name="content" value={comments.content}
                 onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value, options:{parent_id:0,object_type:this.state.object_type,object_id:this.state.object_id} })} className="form-control" placeholder="댓글을 입력해주세요" />
          <button id="all" onClick={this.onSubmit} className="btn btn-default btn-comment" type="button">등록</button>
        </div>
        <div className="block-title">
          <strong className="title">총 댓글 <span>{this.state.total || ''}개</span></strong>
        </div>
        <ul className="list-comment">
          {lists.map((list,index) => {
                    let btn_close = ''
                    if(PROFILES){
                        if(PROFILES.id == list.user_id) btn_close = (<button className="btn btn-remove" onClick={ (e) => this.handleRemoveComment(list.id, list.object_id, list.object_type)} type="button" />)
                    } 

                    let count = ''
                    let _class
                    let load_more = ''
                    let pagination = ''
                    if(list.childs.length > 0){
                        count = list.childs.length
                        _class = 'view'
                        load_more = (<div className="item-info"><div className="comment"><button className="btn" id="all" onClick={e => this.loadingMore(list.id)} >Load More...</button></div></div>)
                        pagination = (<ReactPaginate previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={this.state.pageCount}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />     )
                    } 

                    //set subcoments
                    if(subComments[0] != undefined){
                        if(list.id == subComments[0].parent_id){
                            list.childs = list.childs.concat(subComments)
                        }
                    }

                    if(count >= list.childs.length) load_more = ''

                   return <li key={`lists-${index}`} className="item-comment">
                   <div className="item-info">
                    <div className="comment">
                    {list.content}
                    </div>
                    <div className="info">
                       <span className="name">{list.user.name || ''}</span>   
                       <span className="date">{list.created_at.substring(0,10)} </span>
                     </div>
                    <div className="count"><span className={`down-${index} ${_class}`} onClick={e => this.showReply(index)}>답글 {count}</span></div>
                    
                    <div className="actions">
                            {btn_close}
                            <button className="btn btn-reply" onClick={e => this.handleShowComments(index)} id={`rep-${index}`} type="button" />
                        </div>
                    </div>

                    <div id={`form-comment-${index}`} className="form-comment" style={{display:'none'}} >
                        <input type="text" name="content" value={comments.content}  onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value, options:{parent_id:list.id, object_type:list.object_type ,object_id:list.object_id} })} className="form-control" placeholder="댓글을 입력해주세요" />
                        <button className="btn btn-comment" onClick={this.onSubmit} type="button">등록</button>
                    </div>

                   <ul className="list-reply" id={`reply-${index}`} >
                        {this.renderSubComments(list.childs)}
                        <li className={`load_more_${index}`}>{load_more}</li>
                   </ul>
                 </li>
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
      </main>
        );
    }
}

export default Comments;