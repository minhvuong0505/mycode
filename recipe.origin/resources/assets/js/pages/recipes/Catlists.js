import React, { Component } from 'react';
import Search from './Search';
import { Link } from "react-router"
import Difficult from './Difficult';
import ReactPaginate from 'react-paginate';

class Catlists extends Component {
    constructor(props) {
        super(props)

        let _cate = 3; // Default cate = 3 (Dog)
        if(window.location.pathname == '/cats') _cate = 20;

        this.state = {
            recipes: [],
            options: [],
            searchs:{
            },
            user_id:props.routeParams.id,
            cate: _cate,
            offset:0,
            pageCount:2,
            limit:5,
            sort: '-id',
            cooking_time:[],
        }        

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.loadData = this.loadData.bind(this)        
    }

    componentWillReceiveProps(){
      this.loadData();
    }

    loadData(){
      let { cate } = this.state
      let path = window.location.pathname
      const {limit} = this.state
      var {offset} = this.state
      const { user_id } = this.state
      const {sort} = this.state;
      let _id = ''
      
      if(this.props.location.pathname != this.props.router.location.pathname) {
        // console.log("Changed path, reset offset!");
        offset = 0;
        this.setState({offset: 0 });
      }

      if(path == '/cats') cate = 20
      else cate = 3 

      this.setState({ cate });
      if(window.location.pathname == "/cats" || window.location.pathname == "/dogs") {
        cate = 'cate='+cate;
        _id = '';
      } else {
        if(user_id != undefined && user_id != ""){
          cate = '';
          _id = 'user_id='+user_id;
        }else{
          cate = 'cate='+cate;
          _id = '';
        }
      }
      

      axios.get('/api/v1/post?page_id='+offset+'&page_size='+limit+'&sorts='+sort+'&filters=status=1,'+cate+','+_id)
      .then((res)  => {
          this.setRecipes(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
    }

    componentDidMount() {
        this.loadData()
        
        axios.get('/api/v1/options?filters=parent_id=37')
            .then((res)  => {
                this.setOptions(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

            axios.get('/api/v1/options?filters=parent_id=51')
            .then((res)  => {
                this.setOptions1(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    setRecipes(recipes) {   
      const {limit} = this.state
      this.setState({ recipes:recipes['result']})       
      this.setState({ pageCount: Math.ceil(recipes.meta.total_count / limit)}); 
    }

    setOptions(options) {   
      let i = 0
      const new_options = {}

      for(i = 0; i < options['result'].length; i++){
        new_options[options['result'][i]['id']] = options['result'][i]['title']     
        
        if(options['result'][i]['id'] == 38)
          new_options[options['result'][i]['type']] = 'label-danger'    
        else if(options['result'][i]['id'] == 39)
          new_options[options['result'][i]['type']] = 'label-info'
        else if(options['result'][i]['id'] == 40)
          new_options[options['result'][i]['type']] = 'label-warning'
        else if(options['result'][i]['id'] == 41)
          new_options[options['result'][i]['type']] = 'label-danger'
        else
          new_options[options['result'][i]['type']] = 'label-info'
        
      }
      //console.log(new_options)
      this.setState({ options:new_options})      
    }

    setOptions1(cooking_time) {   
      let i = 0
      const new_options = {}

      for(i = 0; i < cooking_time['result'].length; i++){
        new_options[cooking_time['result'][i]['id']] = cooking_time['result'][i]['title']     
      }
      console.log(new_options)
      this.setState({ cooking_time:new_options})      
    }

    onChange({name, value}){
      const { searchs } = this.state

      if(searchs[name] == undefined){
        searchs[name] = []
        searchs[name].push(value)
      }else{
        if(searchs[name].includes(value)) 
        {
          if(!$(`[name="${name}"][value="${value}"]`).is(":checked")) 
          {
            // Remove value out of search[name]
            let _idx = searchs[name].indexOf(value);
            if(_idx > -1) {
              searchs[name].splice(_idx, 1);
            }
          }
        } else {
          searchs[name].push(value);
        }
      }

      this.setState({ searchs })
      console.log(searchs)
    }

    onSubmit(e){
        e.preventDefault()       
        //set searchs again
        const{ searchs } = this.state
        let params = "";
        $.each(searchs, function(i,e){
            params += ","+i+"={"+e.join(';')+"}"
        })

        const { cate } = this.state;
        const { limit } = this.state;
        const {sort} = this.state;

        axios.get('/api/v1/post?page_id=0&page_size='+limit+'&sorts='+sort+'&filters=status=1,cate='+cate+params)
            .then((res)  => {
                this.setRecipes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        this.handleClose()
    }

    handleReset(){
      const { searchs } = this.state;
      const {cate} = this.state;
      const {sort} = this.sort;
      this.setState({ searchs:{} })   
      
      axios.get('/api/v1/post?page_id=0&page_size=10&sorts='+sort+'&filters=status=1,cate='+cate)
            .then((res)  => {
                this.setRecipes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onSort(value){
      $('.tabs-filter a').removeClass('active');
      $('#'+value).addClass('active');
      if(value == "lastest") value = '-id';
      this.setState({ sort: value}, function(){
        this.loadData()
      })
    }

    handleSearch(){
      $('.page-title .action-filter1').toggleClass('active');
      $(".sub-search").toggleClass("active");
      $("body").toggleClass("search-open");
      return false;
    }

    handleClose(){
      $(".sub-search").removeClass('active');
      $(".page-title .action-filter").removeClass('active');
      $(".head-search .btn-search").removeClass("active");
      $("body").removeClass("search-open");
      return false;
    }

    handlePageClick(data){
      let selected = data.selected;
      const { limit } = this.state
      //console.log(selected)
      let offset = Math.ceil(selected);
  
      this.setState({offset: offset}, () => {
        this.loadData();
      });

      $('html, body').animate({
        scrollTop: 0
      }, 0);
    };

    renderLists(){
      const { recipes } = this.state
      const { options } = this.state
      const { cooking_time } = this.state
      const { cate } = this.state

      let label_img;
      if(cate == 3) label_img = '강아지용'
      else label_img = '고양이용'

      if(!recipes.length) return (
        <div className="item item-recipes">
            <div className="detail"> No Data </div>
        </div>
      )
      return <div>
      {recipes.map((recipe,index) => {
          let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
          if(recipe.cooking_representation != undefined) {
            var cooking_representation = $.parseJSON(recipe.cooking_representation);
            if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
              img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={recipe.title} />);
            }
          }
              return (<div key={`recipe-${index}`} className="cat-item">
                <div className="photo">
                  <Link to={`/recipe/${recipe.id}/detail`}>
                    {img}
                  </Link>
                  <span className="cat">{label_img}</span>
                </div>
                <div className="detail">
                  <div className="fearture">
                      <span className={`label ${options['type']}`}>{options[recipe.function]}</span>                    
                  </div>
                  <strong className="title"><Link to={`/recipe/${recipe.id}/detail`}>{recipe.title}</Link></strong>
                  <div className="info">
                    <span>조리시간 <span>{cooking_time[recipe.cooking_time]}</span></span>
                    <span>
                      난이도
                      <Difficult diff={recipe.difficulty}/>
                    </span>
                  </div>
                </div>
              </div>)
            })} 
      </div>
    }

    render() {
      const { cate } = this.state

        let label_img;
        if(cate == 3) label_img = '멍키친'
        else label_img = '냥키친'

        return (
            <main className="site-main">
            {/* search */}
            <Search onChange={this.onChange} onSubmit={this.onSubmit} {...this.state} handleReset={this.handleReset} />
            <div className="page-title">
              <h1 className="title">{label_img}</h1>
              <Link className="btn btn-default" style={{'marginLeft':'30vw', 'lineHeight':'7vw'}} to="/recipe_write">
              레시피 등록
                  </Link>
              <a href="#" className="action-filter action-filter1" onClick={this.handleSearch}>상세검색</a>
            </div>
            <div className="tabs-filter filter-dark">
                <a className="active" id="lastest" onClick={ e => this.onSort('lastest')}>최신순</a>
                <a id="total_view" onClick={ e => this.onSort('total_view')}>클릭순</a>
                <a id="total_save" onClick={ e => this.onSort('total_save')}>스크랩순</a>
                <a id="total_like" onClick={ e => this.onSort('total_like')}>하트순</a>
            </div>
            <div className="cat-list">
            {this.renderLists()}
            <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={3}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} 
                       forcePage={this.state.offset} />             
            </div>
          </main>
        );
    }
}

export default Catlists;