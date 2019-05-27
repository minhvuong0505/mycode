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
        const { limit } = this.state;
        let offset = Math.ceil(selected);
    
        this.setState({offset: offset}, () => {
          this.loadData();
        });
    };

    render() {
        const { recipes } = this.state;
        const { total } = this.state;
        return (
          <div>Empty</div>
        );
    }
}

export default Search;