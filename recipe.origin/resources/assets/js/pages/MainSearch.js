import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import Difficult from './recipes/Difficult';

class MainSearch extends Component {
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

    componentDidMount() {        
        axios.get('/api/v1/options')
            .then((res)  => {
                this.setOptions(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    setOptions(options) {   
      this.setState({ options:options['result']})    
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
            <li className="item">
              <span className="label">크기별</span>
              <div className="value">                
                {options.map((option, index) => {
                    if(option.parent_id == 26)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="size" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">나이별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 30)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id}  name="age" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">건조별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 34)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="dryness" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">기능별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 37) {
                          var _checked = false;
                          if(this.props.searchFilters != undefined && this.props.searchFilters.function != undefined && this.props.searchFilters.function.length > 0) {
                              if(this.props.searchFilters.function[0] == option.id) {
                                  _checked = true;
                              }
                          }
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="function" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } defaultChecked={_checked}  />
                            <span>{option.title}</span>
                        </label>
                    }
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">시간별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 51) {
                        var _checked = false;
                        if(this.props.searchFilters != undefined && this.props.searchFilters.cooking_time != undefined && this.props.searchFilters.cooking_time.length > 0) {
                            if(this.props.searchFilters.cooking_time[0] == option.id) {
                                _checked = true;
                            }
                        } 
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="cooking_time" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } defaultChecked={_checked}  />
                            <span>{option.title}</span>
                        </label>
                    }
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">난이도별</span>
              <div className="value" ><span id="df"><Difficult diff="74" /></span> <img onClick={this.handleDiff} style={{width:'1.75vw'}} src="/html/images/icon/arrow-select.png"/></div>
              <ul id="74" style={{paddingLeft:'16vw',display:'none'}}>
              {options.map((option, index) => {
                    if(option.parent_id == 69)
                        return <li className={`value vl-${option.id}`} onClick={ e => this.handleChangeDiff(option.id)} key={`option-${index}`}>                         
                            <Difficult diff={option.id} />          
                        </li> 
                }).reverse()}
              </ul>
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

export default MainSearch;