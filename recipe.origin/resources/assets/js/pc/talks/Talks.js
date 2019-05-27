import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Comments from '../Comments';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getDateTime, mydiff, isImage, time_result } from '../../helpers/Helpers';
import { Link } from 'react-router/lib';
import moment from 'moment';

class Talks extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			talks:{
				title:'',
				status:0,
				content:'',
				media:{},
				keyword: this.getUrlParameter('title')
			},
			object_type:'Talk',
			images:[],
			feeds:[],
			offset:0,
			limit: 5,
			pageCount:0,
			sort:'id',
			saving:{

			},
			talk_edit:{
				id: 0,
				title:'',
				status:0,
				content:'',
				media:{},
				keyword:''
			},
			current_edit_id: 0,
		};

		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.thumbImages = this.thumbImages.bind(this)
		this.handleAddWish = this.handleAddWish.bind(this)
	}

	getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	//onchange
	onChange({name,value}){
		const {talks} = this.state;
		if(!PROFILES && name != 'keyword'){
            alert('아직 로그인하지 않았습니다.')
            return false
		}

		talks[name] = value;
		this.setState({talks});

		console.log(talks)
	}

  	componentDidMount(){
      this.loadData()
    }

    handlePageClick(data){
		var {offset} = this.state;
		let selected = data.selected;
		offset = Math.ceil(selected);
		this.setState({offset}, () => {
			this.loadData();
		});
		
		$('html, body').animate({
			scrollTop: 0
		}, 0);
	};

   async loadData(){
		const { talks } = this.state;
		var {offset} = this.state;
		let keyword = talks.keyword
		if(keyword) keyword = ',content~'+keyword
		else keyword = ''

		//당신의 이야기를 들려주세요 :)
		if(PROFILES){
            $('textarea[name=content]').attr({'placeholder':'당신의 이야기를 들려주세요 :)'});
		}

		const {limit} = this.state
		const {sort} = this.state

		let user_id = ''
		if(PROFILES != undefined && sort == 'user_id'){
			user_id = PROFILES.id
		}else if(PROFILES == undefined&& sort == 'user_id'){
			user_id = 0
		}

		if(user_id) user_id = ',user_id='+user_id

		await axios.get('/api/v1/talk?embeds=user&filters=status=1'+user_id+keyword+'&sorts=-'+sort+'&page_id='+offset+'&page_size='+limit)
		.then(res => {
			if (res.status == 200) {
				this.setTalks(res.data)
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

   setTalks(feeds) {   
		const {limit} = this.state 
		this.setState({ feeds:feeds['result'], total:feeds.meta.total_count, pageCount: Math.ceil(feeds.meta.total_count / limit)}); 
	}

	handleSearch(){
		this.loadData()
	}

	removeImg(index){
		const { images } = this.state
		delete images[index]
		this.setState({ images })
	}

	thumbImages(e) {
		const { talks } = this.state  
		const { images } = this.state 

		if(!PROFILES && name != 'keyword'){
            alert('아직 로그인하지 않았습니다.')
            return false
		}

		let files = e.target.files;
		if(files.length > 5) {
			alert('업로드 제한 5 이미지')
			return false
		}
		
		for(let i= 0; i < files.length; i++){
			let file = files[i]

			//valid 
			if(isImage(file.name) !== true){
				alert('이미지 업로드하기');   
				return false;
			}
			//valid size
			if(file.size > 1024*1024*2){
				alert('파일 크기는 2MB를 초과 할 수 없습니다.');
				return false;
			}

			let reader = new FileReader();
			reader.onloadend = (e) => {            
				images.push(<span style={{position:'relative',display:'inline-block'}}><img onClick={ e => this.removeImg(i)} style={{position:'absolute',top:'5px',right:'20px',width:'1vw'}} src="/html/images/icon/close.png"/><img style={{height:'8vw', width:'8vw', marginRight:'1vw'}} src={reader.result} /></span>)
				var data = {'file': reader.result };

				this.setState({ images })
			    $.ajax({
					type: 'POST',
					url: '/api/v2/fileupload',
					data: data,
					async:false,
					success: function(response) {
						let index = images.length

						if(response){
							if(talks['media'][index] != undefined){
								talks['media'][index]['images'] = 'tmp/'+response.file
							}else{
								talks['media'][index] = {}
								talks['media'][index]['images'] = 'tmp/'+response.file
							}                        
						}            
						
					},
					error: function(response) {
						
					},
				});
			}
	
			this.setState({ talks })        
			reader.readAsDataURL(file)  
		}
	}


	async onSubmit(e){
        e.preventDefault();
		let { talks } = this.state;

		if(talks.content.length > 1000) {
			alert('제한 텍스트 <1000')
			return false
		}
		
		const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false

        if(!talks['content']){
            alert('당신의 이야기를 들려주세요 :)')
            return false
        }
		//request new token
		refreshToken()
        await axios.post('/api/v3/talks', talks,{headers:{
            'Authorization': `Bearer ${TOKENS}`
        }})
            .then(res => {
                if (res.status === 201) {
					talks.content = ''
					//clear form
					this.setState({ talks, images:[] }) 
					this.loadData()
                } else {
					if(res.status == 200){
						alert('다시 로그인해야합니다.')
                    	window.location.href = '/logout?redirect_url=talks'
					}
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

	handleAddWish(feed){ 
		if(!PROFILES) {
		  alert('아직 로그인하지 않았습니다.')
		  return false
		}
		
		const con = confirm(' 등록하시겠습니까?')
		if(con !== true) return false

		let action = 1
		if(feed.user.total_like > 0){
		  //unlike
		  action = 0
		  $('span.wish-'+feed.id).removeClass('active')
		}else{
			$('span.wish-'+feed.id).addClass('active')
		} 

		let data = {
			object_id: feed.id,
			type: 'Like',
			object_type:'Talk',
			action: action,
			author_id: feed.user_id
		}
  
		  const { recipeId } = this.state
		//request new token
		refreshToken()
		axios.put(`/api/v3/reactions/react`, data, {headers:{
		  'Authorization': `Bearer ${TOKENS}`
		}})
			.then(response => {
				if (response.status === 200) {
					this.loadData()
				}
			})
			.catch(error => {
				if(error.response.data.status_code == 401){
				  alert('다시 로그인해야합니다.')
				  window.location.href = '/logout?redirect_url=recipe/'+recipeId+'/detail'
				}
  
			  });
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
	}f
	
	async onSort(value){
		$('.talk-filter a').removeClass('active')
		$('.talk-filter a#'+value).addClass('active')
		let sort

		if(value == 'see') sort = 'id'
		else if(value == 'my-post') sort = 'user_id'
		else if(value == 'hart') sort = 'total_like'

		await this.setState({ sort })
		this.loadData()
	}

	handleClose(index){
		console.log(index)
		$('.block-comment-'+index).toggle('active')

	}

	onEditChange(value) 
	{
		const {talk_edit} = this.state;
		talk_edit["content"] = value;
		this.setState({talk_edit});
	}

	addEditImage(e) 
	{
		const {talk_edit} = this.state;
		var {current_upload_images} = this.state;

		let files = e.target.files;
		if(files.length > 5) 
		{
			alert('업로드 제한 5 이미지');
			window.location.href = '/login';
			return false;
		}
		
		
		for(let i= 0; i < files.length; i++)
		{
			let file = files[i]

			//valid 
			if(isImage(file.name) !== true)
			{
				alert('이미지 업로드하기');
				return false;
			}
			//valid size
			if(file.size > 1024*1024*2)
			{
				alert('파일 크기는 2MB를 초과 할 수 없습니다.');
				return false;
			}
			var _thisSetState = this;
			let reader = new FileReader();
			reader.onloadend = (e) => {
				var data = {'file': reader.result };
			    $.ajax({
					type: 'POST',
					url: '/api/v2/fileupload',
					data: data,
					async:false,
					success: function(response) {
						var index = Object.keys(talk_edit['media']).length;

						if(response){
							if(talk_edit['media'][index] != undefined){
								talk_edit['media'][index]['images'] = 'tmp/'+response.file;
							}else{
								talk_edit['media'][index] = {};
								talk_edit['media'][index]['images'] = 'tmp/'+response.file;
							}
							_thisSetState.setState({talk_edit});
						}
						
					},
					error: function(response) {
						
					},
				});
			}
	
			this.setState({ talk_edit });
			console.log(talk_edit); 
			reader.readAsDataURL(file)  
		}
	}

	removeEditImage(index)
	{
		const { talk_edit } = this.state;	
		console.log(talk_edit['media']);
		console.log(index);	
		delete talk_edit['media'][index];
		console.log(talk_edit['media']);
		this.setState({ talk_edit });
	}

	editMyTalk(id)
	{
		var {current_edit_id} = this.state;
		const {feeds} = this.state;
		var {talk_edit} = this.state;

		current_edit_id = id;
		for(var i = 0; i < feeds.length; i++) 
		{
			if(feeds[i].id == id) 
			{
				talk_edit = _.cloneDeep(feeds[i]);
				if(talk_edit['media'] == "[]") {
					talk_edit['media'] = "{}";
				}
				var _media = JSON.parse(talk_edit['media']);
				console.log("edit");
				console.log(_media);
				talk_edit['media'] = _media;
			}
		}
		console.log(talk_edit);
		this.setState({current_edit_id, talk_edit});
	}

	deleteMyTalk(id)
	{
		if(!confirm("이 게시물을 삭제 하시겠습니까?")) return;
		refreshToken();
        axios.delete('/api/v3/talks/'+id, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKENS}`
            }
        }).then(res => {
            if (res.status === 204) {
				alert("토크가 삭제되었습니다.");
				this.loadData();
            } else {
                return res;
            }
        })
        .catch(err => {
            if (err.response) {
				const errors = err.response.data;
				console.log(errors);
            }
        });
	}

	submitEditMyTalk(e)
	{
		e.preventDefault();
		let {talk_edit} = this.state;
		let {current_edit_id} = this.state;

		if(talk_edit.content.length > 1000) {
			alert('제한 텍스트 <1000')
			return false
		}
		
		const con = confirm('토크를 수정할까요?')
        if(con !==true) return false

        if(!talk_edit['content']){
            alert('당신의 이야기를 들려주세요 :)')
            return false
        }
		//request new token
		refreshToken();
		var _thisSetState = this;
		axios.put('/api/v3/talks/'+current_edit_id, talk_edit, {headers:{
			'Authorization': `Bearer ${TOKENS}`
		}})
		.then(res => {
			if (res.status == 201 || res.status == 200) {
				_thisSetState.setState({current_edit_id: 0});
				this.loadData();
			} else {
				console.log(res);
				return res;
			}
		})
		.catch(err => {
			if (err.response) {
				const errors = err.response.data
				this.setState({ errors, hasError: true })
			}
		});
	}


    render() {
		const { feeds } = this.state
		const { images } = this.state
		const { talks } = this.state
		const { sort } = this.state
		const {current_edit_id} = this.state;
		const {talk_edit} = this.state;
		let imgs
		let avatar = ''

		//new helper
		let curr_date = getDateTime()
		if(PROFILES){
			if(PROFILES.avatar) avatar = (<img style={{height:'8vw', width:'8vw'}} src={CDN_URL+PROFILES.avatar} />)
		}

        return (<main className="site-main">
		{this.renderErrors()}
		{this.renderMessage()}
		<div className="container">
		<div className="block-gird-item">
			<div className="toobar">
			<div className="title pull-left">
				멍냥TALK
			</div>
			<div className="search pull-right">
				<input type="text" name="keyword" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} placeholder="토크 검색" className="form-control" />
				<button className="btn btn-search" onClick={this.handleSearch}/>
			</div>
			</div>
			<div className="talk-top">
			<div className="photo">
			</div>
			<div className="detail">
			<p>
				{images.map((img,index) => {
					return <span key={`img-${index}`}>
						{img}
					</span>
				})}</p>
				<textarea className="form-control"  name="content" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} placeholder="당신의 이야기를 들려주세요." value={talks.content} />
			</div>
			<div className="actions">
				<form method="post" encType="multipart/form-data">
					<button className="btn btn-outline pull-left" type="button" style={{position:'relative'}} >
						<img src="./html/images/icon/up-image.png" alt="img" />사진 추가
						<input type="file" name="my_file[]" multiple onChange={(e)=>this.thumbImages(e,1)}  style={{position:'absolute',width:'10vw',height:'50px',opacity:'0',top:'1px'}} />
					</button>
				</form>
				<button className="btn btn-default pull-right" onClick={this.onSubmit} type="button">
					<img src="./html/images/icon/file.png" alt="img" />토크 등록하기
				</button>
			</div>
			</div>
			<div className="talk-filter">
				<a className="active first" id="see"  onClick={e => this.onSort('see')}>전체보기</a>
				<a id="my-post" onClick={e => this.onSort('my-post')}>내가 쓴 글</a>
				<a id="hart" onClick={e => this.onSort('hart')}>하트 준 글</a>
			</div>
			<div className="items-talk">
				{feeds.map((feed,index) => {

				// let time = time_result(feed.created_at, curr_date);
				moment.locale('ko'); 
				let time = moment(feed.created_at, "YYYY-MM-DD H:m:s").fromNow();
				let face
				let media = ''
				let active 

				let _avatarImg = "/html/images/media/img2.jpg";
				if(feed.user.avatar != "" && feed.user.avatar != null) {
					if(feed.user.avatar.includes("http") || feed.user.avatar.includes("https")) {
						_avatarImg = feed.user.avatar;
					} else {
						_avatarImg = CDN_URL + feed.user.avatar;
					}
				}
				var myTools = "";
				if(PROFILES != null) 
				{
					if(PROFILES.id == feed.user.id) {
						myTools = (
							<div className="item-detail-x" style={{textAlign:"right",padding: "5px"}}>
								<button className="btn btn-outline" onClick={(e) => this.editMyTalk(feed.id)} style={{padding:"5px", width:"66px", marginRight:"5px"}}>수정</button>
								<button className="btn btn-outline" onClick={(e) => this.deleteMyTalk(feed.id)} style={{padding:"5px", width:"66px"}}>삭제</button>
							</div>
						);
					}
				}

				if(feed.total_like > 0) active = 'active'
				var _mediaPhotoStyle = {display:"block"};

				if(feed.media){
					if(typeof(feed.media) == 'object') {
						media = (<Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
							{Object.keys(feed.media).map((media, index) => {
								return <div key={`media-${index}`}>
								<img src={CDN_URL+`${feed.media[media].images}`} alt="img" />
								</div>
							})}
						</Carousel>);
					} else if(typeof(feed.media) == 'string') {
						media = (<Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
							{Object.keys(JSON.parse(feed.media)).map((media, index) => {
								var _parsedMedia = JSON.parse(feed.media);
								var _imgUrl = "";
								if(_parsedMedia[media] != null) 
								{
									_imgUrl = _parsedMedia[media].images;
								}

								return <div key={`media-${index}`}>
								<img src={CDN_URL+`${_imgUrl}`} alt="img" />
								</div>
							})}
						</Carousel>)
					}else{
						media = '';
						_mediaPhotoStyle = {display:"none"};
					}
				} else {
					_mediaPhotoStyle = {display:"none"};
				}
				if(feed.media == "[]") {
					_mediaPhotoStyle = {display:"none"};	
				}
				console.log(media);
				var _editMedia = "";
				var _editStyle = {display: "none"};
				var _contentStyle = {};
				var _editTools = "";
				
				
				if(feed.id == current_edit_id) 
				{
					_editStyle = {display: "block"};
					_contentStyle = {display: "none"};
					if(talk_edit.media) 
					{
						media = (<div>
							{Object.keys(talk_edit.media).map((media, index) => {
								var _imgUrl = CDN_URL+`${talk_edit.media[media].images}`;
								var _id = Object.keys(talk_edit.media)[index];
								return (<span key={`media-${index}`} style={{display:"inline-block",position:"relative", marginRight: "2px"}}>
									<div style={{position:'absolute',top:'0',right:'0',padding: "2px", width:'15px', height: '15px', cursor: "pointer"}} >
										<img onClick={ e => this.removeEditImage(_id)} style={{width:"100%"}} src="/html/images/icon/close.png"/>
									</div>
									<div style={{backgroundImage: `url(${_imgUrl})`, backgroundSize: "cover",width: "120px", height: "120px", display:"block"}}></div>
								</span>);
							})}
						</div>);
					}
					// custom myTool
					// MyTool with Edit save button
					_editTools = (
						<div className="item-detail" style={{textAlign:"right",padding: "5px"}}>
							<button className="btn btn-outline pull-left" type="button" style={{position:'relative'}} >
								<img src="./html/images/icon/up-image.png" alt="img" style={{width: "20px", marginRight: "2.5px"}}/>사진 추가
								<input type="file" name="my_file[]" multiple onChange={(e)=>this.addEditImage(e,1)}  style={{position:'absolute',width:'10px',height:'10px',opacity:'0',top:'1px'}} />
							</button>
							<button className="btn btn-outline" onClick={(e) => this.deleteMyTalk(feed.id)} style={{padding:"5px", width: "60px"}}>삭제</button>
							<button className="btn btn-default " onClick={(e) => this.submitEditMyTalk(e)} style={{padding:"5px",margin:"0 5px", width: "auto"}}><img src="./html/images/icon/file.png" alt="img" style={{width:"14px",marginRight:"3px"}} />수정</button>
						</div>
					);
				}

				return	<div key={`feed-${index}`} className="item-talk">
				<div className="item-top" style={{position: "relative"}}>
					<div className="img">
						<div className="photo">
							<div style={{backgroundImage: "url("+_avatarImg+")", backgroundPosition: "center", backgroundRepeat: "no-repeat",backgroundSize: "cover", display: "block", width: "75px", height: "75px"}}></div>
						</div>
					</div>
					<div className="detail">
						<strong className="title"><a href="#">{feed.user.name} </a></strong>
						<span className="time">{time}</span>
					</div>
					<div className="info">
						<span className={`wishlist wish-${feed.id} ${active}`} onClick={e => this.handleAddWish(feed)}>{feed.total_like}</span>
						<Link to={`talk/${feed.id}/view`}><span className="comment">{feed.total_cmt}</span></Link>
					</div>
					<div style={{position:"absolute",right:"0px", bottom: "0px"}}>
						{myTools}
					</div>
				</div>
				
				<div className="item-detail" style={_contentStyle}>
					
						<div className="des" style={{width:"auto"}}>
						<Link to={`talk/${feed.id}/view`}>{feed.content}</Link>
						</div>
					
						<div className="photo owl-nav" style={_mediaPhotoStyle}>
							{media}
						</div>
				</div>
				<div dataeditid={feed.id} className="item-detail edit-item" style={_editStyle}>
					<div className="photo owl-nav">
						{media}
					</div>
					<div className="des" style={{width:"100%"}}>
						<textarea name="current_edit_content" 
							defaultValue={feed.content} 
							style={{height: '180px',width: '100%',border: '0px',borderRadius: '5px'}}
							onChange={(e) => this.onEditChange(e.target.value)}
						></textarea>
					</div>
					<div style={{display:"block"}}>{_editTools}</div>
				</div>
				

              </div>
			})}	  
			</div>
			<nav aria-label="Page navigation">
			<ReactPaginate previousLabel={"<"}
							nextLabel={">"}
							pageCount={this.state.pageCount}
							marginPagesDisplayed={0}
							pageRangeDisplayed={9}
							onPageChange={this.handlePageClick}
							containerClassName={"pagination"}
							subContainerClassName={"pages pagination"}
							activeClassName={"active"} />   
			</nav>
		</div>
		</div>
		</main>
        );
    }
}

export default Talks;