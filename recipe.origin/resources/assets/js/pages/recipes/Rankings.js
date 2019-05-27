import React, { Component } from 'react';
import {IndexLink, Link} from "react-router"
import Difficult from './Difficult';
import ReactPaginate from 'react-paginate';
import {browserHistory} from 'react-router';

class Rankings extends Component {
    constructor(props) {
      super(props)
      var _page = this.getUrlParameter("page");
      var _offset = 0;
      if(_page != "") 
      {
        _offset = parseInt(_page) - 1;
        if(_offset < 0) _offset = 0;
      }

      this.state = {
          recipes: [],
          options: [],
          cate: 'total_save',
          months : [1,2,3,4,5,6,7,8,9,10,11,12],
          years : [2019,2018,2017,2016],
          conditions:{
            year:'',
            month:''
          },
          offset:_offset,
          pageCount:0,
          limit:5,
          cooking_time:[]
      }   
      
      this.onChange = this.onChange.bind(this)
      this.handlePageClick = this.handlePageClick.bind(this)
    }

    componentWillReceiveProps(nextProps){
      let { cate } = this.state
      let path = window.location.pathname
      console.log(nextProps.location);
      if(nextProps.location.query.page != undefined) 
      {
        var _offset = nextProps.location.query.page - 1;
        this.setState({offset: _offset}, () => {
          this.getResult();
        });
      }
      if(path == '/best_heart') cate = 'total_like'
      else if(path == '/best_view') cate = 'total_view'
      else cate = 'total_save'

      this.setState({cate}, function(){
          this.getResult()
      })
    }

    componentDidMount() {   
      // Return today's date and time
      var currentTime = new Date()

      // returns the month (from 0 to 11)
      var month = currentTime.getMonth() + 1

      // returns the day of the month (from 1 to 31)
      var day = currentTime.getDate()

      // returns the year (four digits)
      var year = currentTime.getFullYear()

      let { conditions } = this.state
      conditions['year'] = year
      conditions['month'] = month


      this.setState({ conditions })

      this.getResult()
      //options
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
      this.setState({ recipes:recipes['result'], pageCount: Math.ceil(recipes.meta.total_count / limit)})        
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
        const { conditions } = this.state
        conditions[name] = value
        
        this.setState({conditions})
        this.getResult()
    }
    
    getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    getResult(){
      let { cate } = this.state
      const { conditions } = this.state
      const {limit} = this.state
      let {offset} = this.state

      let month
      if(conditions['month'] < 10) month = '0'+conditions['month']
      else month = conditions['month']
      let time = conditions['year'] + '-' + month
      
      axios.get('/api/v1/post?page_id='+offset+'&page_size='+limit+'&sorts=-'+cate+'&filters=status=1,created_at~'+time)
          .then((res)  => {
              this.setRecipes(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
    }

    handlePageClick(data){
      let selected = data.selected;
      const { limit } = this.state
      //console.log(selected)
      let offset = Math.ceil(selected);
      browserHistory.push(window.location.pathname + "?page="+(offset + 1));
      this.setState({offset: offset}, () => {
        this.getResult();
      });
      $('html, body').animate({
        scrollTop: 0
      }, 0);
    };


    renderRanking(){
      const { recipes } = this.state
      const { options } = this.state
      const { cooking_time } = this.state

      if(!recipes.length) return (
        <div className="item item-recipes">
            <div className="detail"> No Data </div>
        </div>
      )
      return <div>
        {recipes.map((recipe,index) => {
          let label_img;
          let rank;
          if(recipe.cate == 3) label_img = '강아지용'
          else label_img = '고양이' 

          if(index == 0) rank = (<span className="ranking">1</span>)
          else if(index == 1) rank = (<span className="ranking">2</span>)
          else rank = ''

          return <div key={`recipe-${index}`} className="cat-item">
            <div className="photo">
            <Link to={`recipe/${recipe.id}/detail`}>
                <img src={CDN_URL+`${JSON.parse(recipe.cooking_representation)[0]['images']}`} alt="img" />
              </Link>
              <span className="cat">{label_img}</span>
              {rank}
            </div>
            <div className="detail">
              <div className="fearture">
                  <span className={`label ${options['type']}`}>{options[recipe.function]}</span>                    
              </div>
              <strong className="title"><Link to={`recipe/${recipe.id}/detail`}>{recipe.title}</Link></strong>
              <div className="info">
                <span>조리시간 <span>{cooking_time[recipe.cooking_time]}분</span></span>
                <span>
                  난이도
                  <Difficult diff={recipe.difficulty}/>
                </span>
              </div>
            </div>
          </div>
      })}
      </div>
    }

    render() {
      const { recipes } = this.state
      const { options } = this.state

      const { cate } = this.state
      const { months } = this.state
      const { years } = this.state
      const { conditions } = this.state
      const { offset } = this.state;
      var _selectedPage = offset;
      
      //scrap
      let status_1 
      if(cate == 'total_save') status_1 = 'active'
      else status_1 = '' 

      //heart
      let status_2 
      if(cate == 'total_like') status_2 = 'active'
      else status_2 = '' 

      //view
      let status_3
      if(cate == 'total_view') status_3 = 'active'
      else status_3 = '' 

        return (
            <main className="site-main">
            <div className="page-title">
              <h1 className="title">레시피랭킹</h1>
              <div className="sortby">
                <select className="form-control" value={conditions['year']} name="year" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }>
                  {years.map((m,i) => {
                    return <option value={m} key={`i-${i}`}>{m}년</option>
                  })}
                </select>
                <select className="form-control" value={conditions['month']} name="month" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }>                  
                {months.map((m,i) => {
                    return <option value={m} key={`i-${i}`}>{m}월</option>
                  })}
                </select>
              </div>
            </div>
            <div className="tabs-filter flex-end">
              <Link to="/ranking" className={status_1}>스크랩 순</Link>
              <Link to="/best_view" className={status_3}>클릭 순</Link>
              <Link to="/best_heart" className={status_2}>하트 순</Link>
            </div>
            <div className="cat-list">
              
            {this.renderRanking()}  
            
            <ReactPaginate previousLabel={"<"}
                      nextLabel={">"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={0}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      forcePage={_selectedPage}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"} />
            </div>
          </main>
        );
    }
}

export default Rankings;