import React, { Component } from 'react';
import Difficult from './Difficult';
import ReactPaginate from 'react-paginate';


class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            recipes:{},
            offset:0,
            limit: 5,
            pageCount:0,
            total:''
        };

        this.loadData = this.loadData.bind(this)
    }

    componentDidMount(){
        this.loadData()
    }

    setRecipes(recipes) {   
        const {limit} = this.state 
        this.setState({ recipes:recipes['result'], total:recipes.meta.total_count, pageCount: Math.ceil(recipes.meta.total_count / limit)}); 
    }

    loadData(){
        const {limit} = this.state
        const {offset} = this.state

        axios.get('/api/v1/posts?page_id='+offset+'&page_size='+limit+'&sorts=-id&filters=status=1')
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
        let offset = Math.ceil(selected);
    
        this.setState({offset: offset}, () => {
          this.loadData();
        });
    };

    render() {
        const { recipes } = this.state
        const { total } = this.state
        return (
            <main className="site-main">
        <div className="block-search-result">
          <div className="block-title">
            <div className="title">검색 결과  <span>{total}건</span></div>
            <div className="sort">
              <select className="form-control">
                <option>조회순</option>
                <option>조회순</option>
                <option>조회순</option>
              </select>
            </div>
          </div>
          <div className="block-content">
          {recipes.map((recipe,index) => {
            return <div key={`recipe-${index}`} className="item item-recipes">
              <div className="img">
                <a href="#"><img src={CDN_URL+`${JSON.parse(recipe.cooking_representation)[0]['images']}`} alt="img" /></a>
              </div>
              <div className="detail">
                <strong className="title"><a href="#">{recipe.title}</a></strong>
                <div className="info">
                  <p><label>조리시간</label><span>{recipe.cooking_time}분</span></p>
                  <p>
                    <label>난이도</label>
                    <Difficult diff={recipe.difficulty}/>
                  </p>
                </div>               
              </div>
            </div>
            })} 
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
        );
    }
}

export default Search;