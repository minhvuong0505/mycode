import React, { Component } from 'react';
import Difficult from './Difficult';


class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            options: [],
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
        this.handleClose = this.handleClose.bind(this)
        this.handleChangeDiff1 = this.handleChangeDiff1.bind(this)
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
        this.props.handleReset()
    }

    handleClose(){
      $(".sub-search").removeClass('active');
      $(".page-title .action-filter").removeClass('active');
      $(".sub-search .btn-search").removeClass("active");
      $("body").removeClass("search-open"); 
      return false;
    }

    handleDiff1(){
        $('ul#741').toggle('active');
      }
  
      handleChangeDiff1(value){
        const { diff } = this.state;
        $('ul#741').toggle('active');
        const name = 'difficulty';
        this.props.onChange({name,value});
        return $('#df1').html(diff[value]);
      }
    
    render() {
        const { options } = this.state
        return (
        <form method="post" ref={ (el) => this.myFormRef = el} onSubmit={this.props.onSubmit}>
        <div className="header-search sub-search">
        <div className="block-title">
          <strong className="title">상세검색</strong>
          <button className="btn-reset" onClick={this.handleReset}>초기화</button>
          <a href="#" onClick={this.handleClose} className="close-search" />
        </div>
        <div className="block-content">
          <ul className="items">
            <li className="item">
              <span className="label">크기별</span>
              <div className="value">                
                {options.map((option, index) => {
                    if(option.parent_id == 26)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="size" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } />
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
                            <input type="checkbox" value={option.id}  name="age" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
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
                            <input type="checkbox" value={option.id} name="dryness" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">기능별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 37)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="function" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">시간별</span>
              <div className="value">
              {options.map((option, index) => {
                    if(option.parent_id == 51)
                        return <label key={`option-${index}`}>
                            <input type="checkbox" value={option.id} name="cooking_time" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
                            <span>{option.title}</span>
                        </label> 
                })}
              </div>
            </li>
            <li className="item">
              <span className="label">난이도별</span>
              <div className="value" onClick={this.handleDiff1}><span id="df1"><Difficult diff="74" /></span> <img  style={{width:'1.75vw'}} src="/html/images/icon/arrow-select.png"/></div>
              <ul id="741" style={{paddingLeft:'16vw',display:'none'}}>
              {options.map((option, index) => {
                    if(option.parent_id == 69)
                        return <li className={`value vl1-${option.id}`} onClick={ e => this.handleChangeDiff1(option.id)} key={`option-${index}`}>                         
                            <Difficult diff={option.id} />          
                        </li> 
                }).reverse()}
              </ul>
            </li>
          </ul>
          <div className="actions">
            <button className="btn btn-search"  type="submit" >상세검색</button>
          </div>
        </div>
      </div>
      </form>
        );
    }
}

export default Search;