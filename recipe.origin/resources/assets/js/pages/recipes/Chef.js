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

		this.loadData = this.loadData.bind(this)
		this.handlePageClick = this.handlePageClick.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
	}

	componentDidMount(){
		this.loadData()
	}

	onSort(value){
		$('.tabs-filter a').removeClass('active')
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
			console.log(err)
		})
	}

	setChefs(chefs) {   
		const {limit} = this.state 
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
		console.log(search)
	}

	handleSearch(){
		this.loadData()
	}

    render() {
		const { chefs } = this.state
        return (<main className="site-main">
      <div className="page-title"> 
        <h1 className="title">멍냥셰프</h1>
        <div className="box-search">
          <input type="text" name="keyword" placeholder="셰프 색검" className="form-control" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} />
          <button className="btn-search" onClick={this.handleSearch} type="button"><span>search</span></button>
        </div>
      </div>
      <div className="tabs-filter filter-dark">
        <a href="#" className="active first" id="total_post" onClick={ e => this.onSort('total_post')}>레시피 순</a>
        <a href="#" id="total_like" onClick={ e => this.onSort('total_like')}>하트 순</a>
        <a href="#" id="total_view" onClick={ e => this.onSort('total_view')}>클릭 순</a>
        <a href="#" id="total_cmt" onClick={ e => this.onSort('total_cmt')} >댓글 순</a>
      </div>
      <div className="items-chef">
		{chefs.map((chef,index) => {
			let posts = []
			posts = chef.post
			let ls = ""
			let _img = "";
			let _src = chef.avatar;
			if( _src == "" || _src == null){ 
				_img = (<img src="/default/images/icon/about2.png" alt={chef.name} />);
			}else{
				var reg = /(http)+/; 
				if(reg.test(_src) == true){ 
					_img = (<img src={_src} alt={chef.name} />);
				}else{
					_img = ( <img src={CDN_URL+_src} alt={chef.name} />);
				}
			}
			if(posts.length > 0) ls = (<div className="block-bottom">
			<ul>
			{posts.map((ch,index) => {
				let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
				if(ch.cooking_representation != undefined) {
					var cooking_representation = $.parseJSON(ch.cooking_representation);
					if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
						img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={ch.title} />);
					}
				}
				return (<li key={`ch-${index}`}>
						<Link to={`/recipe/${ch.id}/detail`}>
							{img}
							<span>{ch.title}</span>
						</Link>
					</li>);
			})}
			</ul></div>)
			let _chefSlogan = "";
			if(chef.slogan != null) {
				_chefSlogan = chef.slogan;
			}

			return (<div key={`chef-${index}`} className="item-chef">
			<div className="img">{_img}</div>
			<div className="detail">
			  <strong className="tile">{chef.name}</strong>
			  <p>{_chefSlogan}</p>
			  <div className="info">
				<span className="view">{chef.total_view}</span>
				<span className="wishlist">{chef.total_like}</span>
				<Link to={`chefs/${chef.id}/lists`}><span className="add" /></Link>                  
			  </div>
			</div>
				{ls}
		  </div>)
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
    </main>
        );
    }
}

export default Chef;