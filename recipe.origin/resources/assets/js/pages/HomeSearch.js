import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import Difficult from './recipes/Difficult';

class HomeSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [],
            searchs:{},
            link:'',
            diff:{
              70:['<img src="./html/images/icon/icon2.png" alt="img" />'],
              71:['<img src="./html/images/icon/icon2.png" alt="img" />',
              '<img src="./html/images/icon/icon2.png" alt="img" />'],
              72:[
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />'
              ],
              73:[
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />'   
              ],
              74:[
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />',
                  '<img src="./html/images/icon/icon2.png" alt="img" />'
              ]
          }
        }

        this.handleReset = this.handleReset.bind(this)
        this.handleChangeDiff = this.handleChangeDiff.bind(this)
    }

    handleReset(e){
        e.preventDefault()
        this.myFormRef.reset()
      }

    onChange({name, value}){
      const { searchs } = this.state
      const { link } = this.state

      if(searchs[name] == undefined){
        searchs[name] = []
        searchs[name].push(value)
      }else{
        searchs[name].push(value)
      }

      let params = '/searchs?';
      $.each(searchs, function(i,e){
        params += encodeURI(","+i+"={"+e.join(';')+"}")
      })

      params = params.slice(1)

      this.setState({ link: params, searchs })    
    }

    handleDiff(){
      $('ul#74').toggle('active');
    }

    handleChangeDiff(value){
      const { diff } = this.state;
      $('ul#74').toggle('active');
      const name = 'difficulty';
      this.onChange({name,value});
      return $('#df').html(diff[value]);
    }

    
    render() {
        const { options } = this.state
        return (
        <form method="post" ref={ (el) => this.myFormRef = el}>
        <div className="header-search main-search">
        <div className="block-title">
          <strong className="title">상세검색</strong>
          <button className="btn-reset" onClick={this.handleReset}>초기화</button>
          <a href="#" onClick={this.props.handleClose} className="close-search " />
        </div>
        <div className="block-content">
          <ul className="items">
            <li className="item" id="inputsearch">
              <input type="text" name="input" className="form-control" />
            </li>
          </ul>
          <div className="actions">
            <Link className="btn btn-search" style={{lineHeight:'9.5vw'}} onClick={this.handleClose}  to={`${this.state.link}`} >상세검색</Link>
          </div>
        </div>
      </div>
      </form>
        );
    }
}

export default HomeSearch;