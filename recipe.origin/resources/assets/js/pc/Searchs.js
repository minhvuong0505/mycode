import React, {
	Component
} from 'react';
import ReactPaginate from 'react-paginate';
import Difficult from './recipes/Difficult';
import Search from './recipes/Search';
import {
	Link
} from "react-router";

class Searchs extends Component {
	constructor(props) {
		super(props)
		var _keyword = this.getUrlParameter("keyword");
		var _tag = this.getUrlParameter('tag');

		var _searchObj = {};
		var _funcSearch = this.getUrlParameter("function");	// function=39
		var _cookTimeSearch = this.getUrlParameter("cooking_time");	// cooking_time=52
		var _prepareTimeSearch = this.getUrlParameter("prepare_time"); // prepare_time
		var _difficultySearch = this.getUrlParameter("difficulty"); // difficulty=

		if(_funcSearch != "") {
			_searchObj.function = [_funcSearch];
		}

		if(_cookTimeSearch != "") {
			_searchObj.cooking_time = [_cookTimeSearch];
		}

		if(_prepareTimeSearch != "") {
			_searchObj.prepare_time = [_prepareTimeSearch];
		}

		if(_difficultySearch != "") {
			_searchObj.difficulty = [_difficultySearch];
		}

		this.state = {
			recipes: [],
			options: [],
			searchs: _searchObj,
			total_count: 0,
			user_id: props.routeParams.id,
			offset: 0,
			pageCount: 2,
			limit: 9,
			sort: '-id',
			keyword: _keyword,
			tag: _tag
		}

		
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
		this.loadData = this.loadData.bind(this);
		this.getUrlParameter = this.getUrlParameter.bind(this);
	}

	getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	componentWillReceiveProps(nextProps) {
		const {keyword} = this.state;
		const {searchs} = this.state;
		const {tag} = this.state;

		if(nextProps.location.query.keyword != keyword) 
		{
			this.setState({searchs: {}});
			this.loadData();	
		}

		var _searchObj = {};
		var _funcSearch = this.getUrlParameter("function");	// function=39
		var _cookTimeSearch = this.getUrlParameter("cooking_time");	// cooking_time=52
		var _prepareTimeSearch = this.getUrlParameter("prepare_time"); // prepare_time
		var _difficultySearch = this.getUrlParameter("_difficultySearch"); // difficulty
		if(_funcSearch != "") {
			_searchObj.function = [_funcSearch];
		}
		if(_cookTimeSearch != "") {
			_searchObj.cooking_time = [_cookTimeSearch];
		}
		if(_prepareTimeSearch != "") {
			_searchObj.prepare_time = [_prepareTimeSearch];
		}
		if(_difficultySearch != "") {
			_searchObj.difficulty = [_difficultySearch];
		}
		
		this.setState({searchs: _searchObj});
	}

	loadData() {
		let {cate} = this.state;
		let path = window.location.pathname;
		const {limit} = this.state;
		let {offset} = this.state;
		const {user_id} = this.state;
		const {sort} = this.state;
		var {keyword} = this.state;
		const {searchs} = this.state;
		
		var _keyword = this.getUrlParameter("keyword");
		var _tag = this.getUrlParameter("tag");
		var _material = this.getUrlParameter("material");

		var _searchKeyword = ",title~"+_keyword;
		if(_keyword == "" && _tag != "") {
			_keyword = _tag;
			_searchKeyword = ",tags~"+_tag;
		} else if (_keyword == "" && _material != "") {
			if(_material.charCodeAt(0) > 255) {
				var _encodedKeyword = "";
				for(var _index = 0; _index < _material.length; _index++) {
					_encodedKeyword += '\\\\u' + _material.charCodeAt(_index).toString(16);
				}
				_encodedKeyword = _encodedKeyword.substr(2, _encodedKeyword.length);
				_searchKeyword = ",materials~" + _encodedKeyword;
			} else {
				_searchKeyword = ",materials~" + _material;
			}
		}

		let params = "";
		$.each(searchs, function (i, e) {
			if (searchs[i].length > 0) {
				params += "," + i + "={" + e.join(';') + "}";
			}
		});

		let _id = '';
		this.setState({keyword: _keyword});
		if (user_id != undefined) {
			cate = '';
			_id = 'user_id=' + user_id;

		} else {
			cate = 'cate=' + cate;
			_id = '';
		}

		axios.get('/api/v1/post?embeds=user&page_id=' + offset + '&page_size=' + limit + '&sorts=' + sort + '&filters=status=1'+_searchKeyword + params)
			.then((res) => {
				this.setRecipes(res.data);

			})
			.catch((err) => {
				console.log(err)
			})
	}

	componentDidMount() {
		var _keyword = this.getUrlParameter("keyword");
		
		this.loadData();

		axios.get('/api/v1/options?filters=parent_id=37')
			.then((res) => {
				this.setOptions(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	setRecipes(recipes) {
		const {limit} = this.state;
		this.setState({recipes: recipes['result']});
		this.setState({total_count: recipes.meta.total_count});
		this.setState({pageCount: Math.ceil(recipes.meta.total_count / limit)});
	}

	setOptions(options) {
		let i = 0;
		const new_options = {};

		for (i = 0; i < options['result'].length; i++) {
			new_options[options['result'][i]['id']] = options['result'][i]['title'];

			if (options['result'][i]['id'] == 38)
				new_options[options['result'][i]['type']] = 'label-danger';
			else if (options['result'][i]['id'] == 39)
				new_options[options['result'][i]['type']] = 'label-info';
			else if (options['result'][i]['id'] == 40)
				new_options[options['result'][i]['type']] = 'label-warning';
			else if (options['result'][i]['id'] == 41)
				new_options[options['result'][i]['type']] = 'label-danger';
			else
				new_options[options['result'][i]['type']] = 'label-info';

		}
		this.setState({ options: new_options });
	}

	onChange({name,value}) {
		const {searchs} = this.state;

		if (searchs[name] == undefined) {
			searchs[name] = []
			searchs[name].push(value);
		} else {
			if (searchs[name].includes(value)) {
				if (!$(`[name="${name}"][value="${value}"]`).is(":checked")) {
					// Remove value out of search[name]
					let _idx = searchs[name].indexOf(value);
					if (_idx > -1) {
						searchs[name].splice(_idx, 1);
					}
				}
			} else {
				searchs[name].push(value);
			}
		}

		this.setState({searchs});
		console.log(searchs);
	}

	onSubmit(e) {
		e.preventDefault()
		//set searchs again
		const {searchs} = this.state;
		let params = "";
		$.each(searchs, function (i, e) {
			if (searchs[i].length > 0) {
				params += "," + i + "={" + e.join(';') + "}";
			}
		})

		const {cate} = this.state;
		const {limit} = this.state;
		const {user_id} = this.state;
		const {sort} = this.state;
		const {keyword} = this.state;
		
		var _keyword = this.getUrlParameter("keyword");
		var _tag = this.getUrlParameter("tag");
		var _material = this.getUrlParameter("material");

		var _searchKeyword = ",title~"+_keyword;
		if(_keyword == "" && _tag != "") {
			_keyword = _tag;
			_searchKeyword = ",tags~"+_tag;
		} else if (_keyword == "" && _material != "") {
			_keyword = _material;
			_searchKeyword = ",materials~" + _material;
		}

		axios.get('/api/v1/post?embeds=user&page_id=0&page_size=' + limit + '&sorts=' + sort + '&filters=status=1' + _searchKeyword + params)
			.then((res) => {
				this.setRecipes(res.data)
			})
			.catch((err) => {
				console.log(err)
			})

		this.handleClose()
	}

	handleReset() {
		const {searchs} = this.state;
		const {cate} = this.state;
		const {sort} = this.state;
		this.setState({
			searchs: {}
		})

		axios.get('/api/v1/post?embeds=user&page_id=0&page_size=10&sorts=' + sort + '&filters=status=1,cate=' + cate)
			.then((res) => {
				this.setRecipes(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	onSort(value) {
		$('.tabs-filter li').removeClass('active')
		$('#' + value).addClass('active');
		if (value == "lastest") value = '-id';
		this.setState({sort: value}, function () {
			this.loadData()
		})
	}

	handleSearch() {
		$('.page-title .action-filter1').toggleClass('active');
		$(".sub-search").toggleClass("active");
		$("body").toggleClass("search-open");
		return false;
	}

	handleClose() {
		$(".sub-search").removeClass('active');
		$(".page-title .action-filter").removeClass('active');
		$(".head-search .btn-search").removeClass("active");
		$("body").removeClass("search-open");
		return false;
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
	};

	renderLists() {
		const { recipes } = this.state
		const { options } = this.state
		const { cate } = this.state

		let label_img;
		if(cate == 3) label_img = '강아지용';
		else label_img = '고양이';
		if(!recipes.length) return (
			<div className="item item-recipes">
				<div className="detail"> No Data </div>
			</div>
		);
		return (
			<div className="items">
				{recipes.map((re,index) => {
				let name = '';
				let display_style = {};
				if(re.user == undefined) {
					display_style = { display: 'none'};
				} else {
					name = re.user.name;
				}
				let _imagePost = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
				if(re.cooking_representation != undefined) {
					var cooking_representation = $.parseJSON(re.cooking_representation);
					if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
					_imagePost = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={re.title} />);
					}
				}

				return (
					<div key={`recipe-${index}`} className="col-sm-4 item ">
					<div className="item-fearture-product">
						<div className="photo">
						<Link to={`/recipe/${re.id}/detail`}>{_imagePost}</Link>
						</div>
						<div className="detail">
						<h3 className="title"><Link to={`/recipe/${re.id}/detail`}>{re.title}</Link></h3>
						<span className="subtitle" style={display_style}>by. {name}</span>
						</div>
					</div>
					</div>
					);
				})} 
			</div>  
			);
		}

		render() {
			const {cate} = this.state;
			const {recipes} = this.state;
			const {total_count} = this.state;

			let label_img;
			if (cate == 3) label_img = '강아지용'
			else label_img = '고양이'

			return ( 
				<main className="site-main cat-list search-page-result">
					<div className="container">
					<Search onChange={this.onChange} onSubmit={this.onSubmit} {...this.state} searchFilters={this.state.searchs} handleReset={this.handleReset} />
						<div className="block-gird-item">
						<div className="toobar">
							<span className="total">총 <span>{total_count}개의</span> 건강한 레시피가 있습니다</span>
							<ul className="sorby tabs-filter">
							<li className="active" id="lastest" onClick={ e => this.onSort('lastest')}>최신순</li>
							<li id="total_save" onClick={ e => this.onSort('total_save')}>클릭순</li>
							<li id="total_view" onClick={ e => this.onSort('total_view')}>스크랩순</li>
							<li id="total_like" onClick={ e => this.onSort('total_like')}>하트순</li>
							</ul>
						</div>
						
							{this.renderLists()}
						
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

	export default Searchs;