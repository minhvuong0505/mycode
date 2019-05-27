import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Difficult from './recipes/Difficult';
import MainSearch from './MainSearch';
import { Link} from "react-router"

class Searchs extends Component {
    constructor(props) {
        super(props);
        
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
            recipes:[],
            offset:0,
            limit: 5,
            pageCount:0,
            total:'',
            searchs: _searchObj,
			      sort:'id',
			      params:'',
            keyword:this.getUrlParameter('keyword'),
            key:'',
            tag: this.getUrlParameter('tag')
        };

        this.handlePageClick = this.handlePageClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSort = this.onSort.bind(this)
        this.handleSearchBnt = this.handleSearchBnt.bind(this)
        this.loadingResult = this.loadingResult.bind(this)
    }

	getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	//Get Nav Url
	getNavUrl() {
		//Get Url
		return decodeURI(window.location.search.replace("?", ""))
	};

	getParameters(url) {
		//Params obj
		var params = {};
		//To lowercase
		url = url.toLowerCase();
		//To array
		url = url.split('&');

		//Iterate over url parameters array
		var length = url.length;
		for(var i=0; i<length; i++) {
			//Create prop
			var prop = url[i].slice(0, url[i].search('='));
			//Create Val
			var value = url[i].slice(url[i].search('=')).replace('=', '');
			//Params New Attr
			params[prop] = value;
		}
		return params;
	}

	componentWillReceiveProps(){
    this.loadingResult()
    
	}

	componentDidMount(){
		this.loadingResult()
	}

	loadingResult(){
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

	handleSearch(e){
		$('.action-filter').toggleClass('active');
		$(".header-search").toggleClass("active");
		$("body").toggleClass("search-open");
		return false;
	}

	onSort({name, value}){
		this.setState({ sort : value })
		this.loadingResult()
	}

    handleClose(){
      $(".header-search").removeClass('active');
      $(".page-title .action-filter").removeClass('active');
      $(".head-search .btn-search").removeClass("active");
      $("body").removeClass("search-open");
      return false;
    }

    handleSearch(e){
      $('.action-filter').toggleClass('active');
      $(".header-search").toggleClass("active");
      $("body").toggleClass("search-open");
      return false;
    }

    setRecipes(recipes) {   
        const {limit} = this.state 
        this.setState({ recipes:recipes['result'], total:recipes.meta.total_count, pageCount: Math.ceil(recipes.meta.total_count / limit)}); 
    }

    handlePageClick(data){
        let selected = data.selected;
        const { limit } = this.state
        let offset = Math.ceil(selected);
    
        this.setState({offset: offset}, () => {
          this.loadingResult();
        });
        $('html, body').animate({
          scrollTop: 0
        }, 0);
    };

    handleSearchBnt(){
        this.loadingResult()
    }

    onChangeSearch({value}){
      this.setState({ key: value })
    }

    onChangeSearch2({value}){
      this.setState({ link: '/searchs?keyword='+value });
    }

    handleBack(){
      window.history.back();
    }

    handleClose(){
      $(".main-search").removeClass('active');
      $(".action-filter").removeClass('active');
      $("body #cl").removeClass("active");
      $("body").removeClass("search-open"); 
      return false;
    }

    renderSearch(){
      const { recipes } = this.state
      if(!recipes.length) return (
        <div className="item item-recipes">
            <div className="detail"> No Data </div>
        </div>
      )
      return <div>
      {recipes.map((recipe,index) => {
        let _imagePost = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
				if(recipe.cooking_representation != undefined) {
					var cooking_representation = $.parseJSON(recipe.cooking_representation);
					if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
					_imagePost = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={recipe.title} />);
					}
        }
        
        return <div key={`recipe-${index}`} className="item item-recipes">
          <div className="img">
            <Link to={`recipe/${recipe.id}/detail`}>{_imagePost}</Link>
          </div>
          <div className="detail">
            <strong className="title"><Link to={`recipe/${recipe.id}/detail`}>{recipe.title}</Link></strong>
            <div className="info">
              <p><label>조리시간</label><span>{recipe.cooking_time}분</span></p>
              <div>
                <label>난이도</label>
                <Difficult diff={recipe.difficulty} />
              </div>
            </div>               
          </div>
        </div>
        })}  
      </div>
    }

    render() {
        const { total } = this.state
        const { keyword } = this.state

        return ( <div className="wrapper ">
        <header className="site-header">
        <div className="site-header-search">
          <Link to="/" className="back" />
          <div className="form-search">
            <input type="text" className="form-control" name="keyword" onKeyUp={(e) => this.onChangeSearch2({ value: e.target.value })} />
            <Link id="cl" className="btn btn-sarch" style={{paddingLeft:'0px'}} to={`${this.state.link}`} />
          </div>
          <a href="#" className="action-filter" onClick={this.handleSearch} data-action="filter">상세검색</a>
        </div>
      </header>
            <main className="site-main">
            {/* search */}
          <MainSearch handleClose={this.handleClose}/>
        <div className="block-search-result">
          <div className="block-title">
            <div className="title">검색 결과  <span>{total}건</span></div>
            <div className="sort">
              <select className="form-control" name="sort" onChange={(e) => this.onSort({ name: e.target.name, value: e.target.value })}> 
                <option value="id">조회순</option>
                <option value="total_save">스크랩 순</option>
                <option value="total_like">하트 순</option>
              </select>
            </div>
          </div>
          <div className="block-content">
          {this.renderSearch()}
          
          </div><ReactPaginate previousLabel={"<"}
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
      </div>
        );
    }
}

export default Searchs;