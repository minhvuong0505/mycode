import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Comments from '../Comments';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { getDateTime, mydiff, isImage, time_result } from '../../helpers/Helpers';
import moment from 'moment';

class TalkView extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			talks:{
				title:'',
				status:0,
				content:'',
				media:{},
				keyword:''
            },
            talkId: props.routeParams.id,
			object_type:'Talk',
			images:[],
			feeds:[],
			offset:0,
			limit: 5,
			pageCount:0,
			sort:'id',
			saving:{

			}
		};

		this.onChange = this.onChange.bind(this)
        this.handleAddWish = this.handleAddWish.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
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
		let selected = data.selected;
		let offset = Math.ceil(selected);

		this.loadData(offset);
		$('html, body').animate({
			scrollTop: 0
		}, 0);
	};

   async loadData(){
        const { talkId } = this.state

		await axios.get('/api/v1/talk?embeds=user&filters=status=1,id='+talkId)
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
		this.setState({ feeds:feeds['result'] }); 
	}

    handleSearch(){
        const {talks} = this.state;
        window.location.href = "/talks?title="+talks.keyword;
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
	

    render() {
        const { feeds } = this.state
        const { sort } = this.state
		let imgs
		let avatar = ''

		//new helper
		let curr_date = getDateTime()
		if(PROFILES){
			if(PROFILES.avatar) avatar = (<img style={{height:'8vw', width:'8vw'}} src={CDN_URL+PROFILES.avatar} />)
		}

        return (<main className="site-main">
		
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
			
            <div className="items-talk">
				{feeds.map((feed,index) => {
				moment.locale('ko'); 
				let time = moment(feed.created_at, "YYYY-MM-DD H:m:s").fromNow();
				// let time = time_result(feed.created_at, curr_date);
				let face
				let media = ''
				let active 

				if(feed.user.avatar){
					face = (<img style={{height:'100%'}} src={CDN_URL+feed.user.avatar} alt="img" />)
				}else{
					face = (<img style={{height:'100%'}} src="/html/images/media/img2.jpg" alt="img" />)
				}

				if(feed.total_like > 0) active = 'active'

				if(feed.media){
					if(typeof JSON.parse(feed.media) == 'object'){
						media = (<Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
							{Object.keys(JSON.parse(feed.media)).map((media, index) => {
								return <div key={`media-${index}`}>
								<img style={{height:'22vw'}} src={CDN_URL+`${JSON.parse(feed.media)[media].images}`} alt="img" />
								</div>
							})}
						</Carousel>)
					}else{
						media = ''
					}
				} 

				return	<div key={`feed-${index}`}>
                <div key={`feed-${index}`} className={`item-talk item-id-${feed.id}`}>
                    <div className="item-top">
                    <div className="img">
                        <div className="photo">
                        {face}
                        </div>
                    </div>
                    <div className="detail">
                        <strong className="title"><a href="#">{feed.user.name} </a></strong>
                        <span className="time">{time.toString()}</span>
                    </div>
                    <div className="info">
                    <span className={`wishlist wish-${feed.id} ${active}`} onClick={e => this.handleAddWish(feed)}>{feed.total_like}</span>
                        <span className="comment">{feed.total_cmt}</span>
                    </div>
                    </div>
                    <div className="item-detail">
                        <div className="des">
                        {feed.content}
                        </div>
                        <div className="photo">
                                {media}
                            </div>
                    </div>
                </div>
                <div className={`cmt-${index}`}>
                    <Comments object_type={this.state.object_type} total={feed.total_cmt} object_id={feed.id} sort={sort} redirect_url="talks"/>
                </div>
              </div>
			})}	  
			</div>
			
		</div>
		</div>
		</main>
        );
    }
}

export default TalkView;