import React, { Component } from 'react';
import axios from 'axios'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router/lib';
import {browserHistory} from 'react-router';

class Main extends Component {
  	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			chefs:[],
			newRecipes:[],
			videos: [],
			materialsHot: [],
			material_keyword: ''
		}

		this.SearchMaterialHandleKeyPress = this.SearchMaterialHandleKeyPress.bind(this);
		// this.SearchMaterialOnChange = this.SearchMaterialOnChange.bind(this);
		this.handleSearchMaterial = this.handleSearchMaterial.bind(this);
		
  	}

  	componentDidMount() {
    	axios.get('/api/v1/post?embeds=user&page_id=0&page_size=3&sorts=-total_view&filters=status=1')
            .then((res)  => {
                this.setRecipes(res.data.result)
            })
            .catch((err) => {
                console.log(err)
			})
			
		//two chefs
		axios.get('/api/v1/user?embeds=post&filters=status=1&sorts=-total_view&page_size=2')
            .then((res)  => {
                this.setChef(res.data)
            })
            .catch((err) => {
                console.log(err)
			})
			
		//new recipes
		axios.get('/api/v1/post?embeds=user&page_id=0&page_size=8&sorts=-id&filters=status=1')
            .then((res)  => {
                this.setNewRecipes(res.data.result)
            })
            .catch((err) => {
                console.log(err)
			})
		// Get Videos
		axios.get('/api/v1/videos?&page_size=3&sorts=-id&filters=status=1')
		.then((res) => {

			this.setState({videos: res.data.result});
		}).catch((err) => {
			console.log(err);
		});

		//
		axios.get('/api/v1/material?filters=hot=1&page_size=6').then((res) => {
			this.setState({ materialsHot: res.data.result });
		})

		// var popup = this.getCookie('popupCode_layer_17')
		// if(popup === undefined || popup == '')
        // $('#popupCode_layer_17').css('display','');
	}

	setChef(chefs) {       
		this.setState({ chefs: chefs['result'] }); 
	}

	setNewRecipes(newRecipes) {   
        this.setState({ newRecipes })        
    }
	  
	setRecipes(recipes) {   
        this.setState({ recipes })        
	}

	SearchMaterialOnChange({ name, value}) {
		this.setState({ material_keyword: value});
	}
	
	SearchMaterialHandleKeyPress(e) {
		if (e.key === 'Enter') {
			this.handleSearchMaterial();
		}
	}
	
	handleSearchMaterial() {
		const {material_keyword} = this.state;
		var _keyword = $('[name="material_keyword"]').val();
		this.setState({material_keyword: _keyword});
		browserHistory.push(`/searchs?material=${_keyword}`);
	}

	popup_cookie() {
		setTimeout("$('#popupCode_layer_17').hide()");
		var d = new Date();
		d.setTime(d.getTime() + (24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		
		document.cookie = 'popupCode_layer_17=true; expires=' + expires +'; path=/' +'; domain=.bom.co.kr' ;
		
	}
	getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
		}
	closep()
	{
		$('#popupCode_layer_17').hide();
	} 

    render() {
		const {recipes} = this.state;
		const {chefs} = this.state;
		const {newRecipes} = this.state;
		const {material_keyword} = this.state;
		const {materialsHot} = this.state;
		const {videos} = this.state;
		var _videoRender = "";
		if(videos.length > 0) {
			_videoRender = videos.map((video, index) => {
				var videoThumb = "/default/images/media/home-img1.jpg";
				if(video.images != undefined && video.images != ""){
					videoThumb = CDN_URL+`${video.images}`;
				}
				return (
					<div key={`video-${index}`} className="col-sm-4">
						<div className="item item-fearture-product">
						<div className="photo video">
							<a data-fancybox href={video.embed_link}><img style={{height:'242px'}} src={videoThumb} alt={video.title} /></a>
						</div>
						<div className="detail">
							<h3 className="title">{video.title}</h3>
							<span className="subtitle" style={{display:"none"}}>by. 구리 셰프</span>
						</div>
						</div>
					</div>
				);
			});
		} else {
			_videoRender = (<p className="text-warning">No video</p>);
		}
		//if(!recipes.length) return <p className="text-warning">No recipes</p>
        return (
            <main className="site-main">
			<div className="container">
			<div className="block-home-section1">
				<div className="box box1">
				<div className="block-title">아이들에게 지금 필요한 건?</div>
				<div className="block-content">
					<Link to="/searchs?function=39" className="item">다이어트</Link>
					<Link to="/searchs?function=38" className="item">모질개선</Link>
					<Link to="/searchs?function=40" className="item">구강개선</Link>
					<Link to="/searchs?function=41" className="item">신장관련</Link>
					<Link to="/searchs?function=42" className="item">관절관련</Link>
					<Link to="/searchs?function=43" className="item">장관련</Link>
				</div>
				</div>
				<div className="line" />
				<div className="box box2">
				<div className="block-title">만드는 시간은?</div>
				<div className="block-content">
					<Link to="/searchs?cooking_time=52" className="item">10분</Link>
					<Link to="/searchs?cooking_time=53" className="item">30분</Link>
					<Link to="/searchs?cooking_time=55" className="item">1시간~</Link>
					<Link to="/searchs?cooking_time=57" className="item">2시간~</Link>
				</div>
				</div>
			</div>
			<div className="block-fearture-product popular-recipes">
				<div className="block-title">
				<strong className="title">인기 레시피</strong>
				<Link to="/dogs" className="readmore">더 많은 레시피 보기</Link>
				</div>
				<div className="block-content row">
					{recipes.map((re,i) => {
						let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
						let display_style = {}
						let name = ''
						if(re.cooking_representation != undefined) {
							var cooking_representation = $.parseJSON(re.cooking_representation);
							if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
								img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt="img" />);
							}
						}
						if(re.user == undefined) {
							display_style = { display: 'none'};
						} else {
							name = re.user.name;
						}
						return (
							<div key={`recipe-${i}`} className="col-sm-4">
								<div className="item item-fearture-product">
									<div className="photo">
										<Link to={`recipe/${re.id}/detail`} style={{display:'block'}}>{img}</Link>
									</div>
									<div className="detail">
										<h3 className="title"><Link to={`recipe/${re.id}/detail`}>{re.title}</Link></h3>
										<span className="subtitle" style={display_style}>by. {name}</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div className="block-fearture-product new-recipes">
				<div className="block-title">
				<strong className="title">신규 레시피</strong>
				<Link to="/dogs" className="readmore">더 많은 레시피 보기</Link>
				</div>
				<div className="block-content row">
					{newRecipes.map((re,i) => {
							let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
							let title_full = '';
							let title = re.title;
							if(re.cooking_representation != undefined) {
								var cooking_representation = $.parseJSON(re.cooking_representation);
								if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
									img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt="img" />);
								}
								if(re.title.length > 32)
								{
									title_full = re.title;
									title = re.title.substr(0,32) + '...';
								}
									
							}
							return (
							<div key={`recipe-${i}`} className="col-sm-3">
								<div className="item item-fearture-product">
									<div className="photo">
										<Link to={`recipe/${re.id}/detail`} style={{display:'block'}} >{img}</Link>
									</div>
									<div className="detail">
										<h3 className="title"><Link to={`recipe/${re.id}/detail`} title={title_full} >{title}</Link> </h3>
										<span className="subtitle">by. {re.user.name}</span>
									</div>
								</div>
							</div>);
					})}
				
				</div>
			</div>
			<div className="block-fearture-product">
				<div className="block-title">
				<strong className="title">레시피봄 TV</strong>
				<a href="#" className="readmore" style={{display : "none"}}>더 많은 영상레시피 보기</a>
				</div>
				<div className="block-content row">
				{_videoRender}
				</div>
			</div>
			</div>
			<div className="block-newsletter">
			<div className="container">
				<div className="title">내가 가진 재료로 레시피 추천 받기</div>
				<div className="form-group">
				<input type="text" name="material_keyword" className="form-control" placeholder="재료명으로 검색해보세요" onKeyPress={this.SearchMaterialHandleKeyPress} value={material_keyword} onChange={(e)=> this.SearchMaterialOnChange({ name:e.target.name, value:e.target.value})} />
				<button className="btn btn-newsletter" onClick={this.handleSearchMaterial} />
				</div>
				<div className="link">
					{materialsHot.map((material, idx) => {
						return (<Link key={`material-${idx}`} to={`/searchs?material=${material.name}`}>#{material.name}</Link>);
					})}
				</div>
			</div>
			</div>
			<div className="container">
			<div className="block-fearture">
				<div className="block-title">베스트 셰프</div>
				<div className="block-content">
				
				{chefs.map((chef,index) => {
					return <div key={`chef-${index}`}  className="item item-fearture">
						<div className="photo">
						<img src="/default/images/icon/img.png" alt="img" />
						</div>
						<div className="detail">
						<strong className="title">{chef.name}</strong>
						<div className="des">
							{chef.slogan || ''}
						</div>
						<div className="meta">
							<span className="view">{chef.total_view}</span>
							<span className="wishlist">{chef.total_like}</span>
						</div>
						<Link to={`/chefs/${chef.id}/lists`} className="readmore">베스트셰프의 더 많은 레시피 보기</Link>
						</div>
					</div>
				})}
				
				</div>
			</div>
			</div>
			<div style={{backgroundImage: "url('/default/images/recipebom_bg.jpg')",backgroundPosition: "center center"}}>
				<div className="container">
					<ul className="linkin">
						<li className="text-right" style={{display:"inline-block"}}><a href="http://store.bom.co.kr/main/index.php"><img src="/default/images/storebom.png" alt="STOREBOM" /></a></li>
						<li className="text-left" style={{display:"inline-block"}}><a href="http://find.bom.co.kr/main/index"><img src="/default/images/findbom.png" alt="FINDBOM" /></a></li>
					</ul>
				</div>
			</div>

			<div id="popupCode_layer_17" style={{display:"none"}} >
				<div id="popupCode_layer_17_form" className="sys-pop">
					<div className="box">
						<div className="view">
							<div className="adpic1">
								<div className="adpic1_1x">
									<a href="https://store.bom.co.kr/board/view.php?&bdId=notice&sno=23">
										
										<img src="/uploads/popup/popup_034.jpg" title="통합로그인시행안내" className="js-smart-img" useMap="#ImgMap156513" />
									</a>
									<a href="https://store.bom.co.kr/member/join_method.php">
										
										<img src="/uploads/popup/popup_04.jpg" title="통합로그인시행안내" className="js-smart-img" useMap="#ImgMap156512" />
									</a>
								</div>  
							</div>
						</div>
						<div className="check">
							<span className="form-element">
								<label htmlFor="todayUnSee_popupCode_layer_17" className="check-s">오늘 하루 보이지 않음</label>
								<input type="checkbox" id="todayUnSee_popupCode_layer_17" style={{display:'none'}} className="checkbox" onClick={()=>this.popup_cookie()} />
							</span>
						</div>
									
								<button type="button" className="close" title="닫기" onClick={()=> this.closep()}>닫기</button>
					</div>
				</div>
			</div>
		</main>
        );
    }
}

export default Main;