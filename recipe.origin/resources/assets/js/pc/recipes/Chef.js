import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {IndexLink, Link} from "react-router"


class Chef extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chefs:[],
			offset:0,
			limit: 5,
			pageCount:0,
			total:'',
			sort:'total_post',
			search:{
			}
		};

		this.loadData = this.loadData.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.SearchHandleKeyPress = this.SearchHandleKeyPress.bind(this);
	}

	componentDidMount(){
		this.loadData()
	}

	onSort(value){
		$('.tabs-filter li').removeClass('active')
		$('#'+value).addClass('active');
		
		this.setState({ sort: value}, function(){
			this.loadData()
		})
	}

	loadData(){
		const {limit} = this.state
		let {offset} = this.state
		const { sort } = this.state
		const { search } = this.state
		let keyword = search.keyword 
		
		if(keyword != undefined) keyword = 'name~'+keyword 
		else keyword = ''
  		let _url = '/api/v1/user?embeds=post&filters=status=1,'+keyword+'&sorts=-'+sort+'&page_id='+offset+'&page_size='+limit;
		if(sort == 'total_cmt') _url = '/api/v3/getpost?page='+(offset+1);
		axios.get(_url)
		.then((res)  => {
			this.setChefs(res.data)
		})
		.catch((err) => {
		})
	}

	setChefs(chefs) {   
		const {limit} = this.state;
		this.setState({ chefs:chefs['result'], total:chefs.meta.total_count, pageCount: Math.ceil(chefs.meta.total_count / limit)}); 
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

	onChange({name,value}){
		const {search} = this.state;

		search[name] = value;
		this.setState({search});
		
	}
	SearchHandleKeyPress(e) {
		if (e.key === 'Enter') {
			this.handleSearch();
		}
	}

	handleSearch(){
		this.loadData()
	}

    render() {
		const { chefs } = this.state;
        return (
			<main className="site-main chefs-list">
            	<div className="container">
					<div className="block-gird-item">
						<div className="toobar">
							<div className="search pull-left">
								<input type="text" name="keyword" placeholder="셰프 검색" className="form-control" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} onKeyPress={this.SearchHandleKeyPress}/>
          						<button className="btn btn-search" onClick={this.handleSearch} type="button"></button>
							</div>
							<ul className="sorby tabs-filter">
								<li className="active" id="total_post" onClick={ e => this.onSort('total_post')}>레시피 순</li>
								<li id="total_like" onClick={ e => this.onSort('total_like')}>하트 순</li>
								<li id="total_view" onClick={ e => this.onSort('total_view')}>클릭 순</li>
								<li id="total_cmt" onClick={ e => this.onSort('total_cmt')}>댓글 순</li>
							</ul>
						</div>
						{chefs.map((chef,index) => {
							let posts = [];
							posts = chef.post;
							let _img = "default/images/icon/img.png";
							let ls = "";
							if(chef.avatar != undefined && chef.avatar != "") {
								var reg = /(http)+/; 
								if(reg.test(chef.avatar) == true){ 
									_img = chef.avatar;
								}else{
									_img = CDN_URL + chef.avatar;
								}
							}
							if(posts.length > 0) { 
								ls = (<div className="block-bottom">
									<ul>
									{posts.map((ch,_idx) => {
										let _imagePost = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
										if(ch.cooking_representation != undefined) {
											var cooking_representation = $.parseJSON(ch.cooking_representation);
											if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
												_imagePost = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={ch.title} />);
											}
										}
										return (
											<div key={`ch-${_idx}`} className="col-sm-3 item ">
												<div className="item-fearture-product">
													<div className="photo">
													<Link to={`/recipe/${ch.id}/detail`}>{_imagePost}</Link>
													</div>
													<div className="detail">
														<h3 className="title"><Link to={`/recipe/${ch.id}/detail`}>{ch.title}</Link> </h3>
														<span className="subtitle" style={{display:"none"}}>by. {chef.name}</span>
													</div>
												</div>
											</div>)
									})}
									</ul>
								</div>);
							}
							let _chefSlogan = "";
							if(chef.slogan != null) {
								_chefSlogan = chef.slogan;
							}

							return (
								<div key={`chef-${index}`}>
									<div className="item-fearture">
										<div className="photo">
											<div style={{ backgroundImage: `url(${_img})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', borderRadius: "50%", display: "block", width: "160px", height: "160px", backgroundSize: "cover"}}></div>
										</div>
										<div className="detail">
											<strong className="title">{chef.name}</strong>
											<div className="des">
												{_chefSlogan}
											</div>
											<div className="meta">
												<span>등록한 레시피 <span>{chef.total_post}</span></span>
												<span>스크랩 받은 수 <span>{chef.total_view}</span></span>            
												<span>하트 받은 수 <span>{chef.total_like}</span></span>
											</div>
											<Link to={`chefs/${chef.id}/lists`} className="readmore">베스트셰프의 더 많은 레시피 보기</Link>
										</div>
									</div>
									<div className="items">
										{ls}
									</div>
								</div>
								);
						})}

						<ReactPaginate previousLabel={"<"}
							nextLabel={">"}
							pageCount={this.state.pageCount}
							marginPagesDisplayed={0}
							pageRangeDisplayed={9}
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

export default Chef;