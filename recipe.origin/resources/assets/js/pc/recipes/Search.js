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

        this.handleReset = this.handleReset.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeDiff1 = this.handleChangeDiff1.bind(this);
        this.handleDiff1 = this.handleDiff1.bind(this);
    }

    componentDidMount() {        
        axios.get('/api/v1/options')
            .then((res)  => {
                this.setOptions(res.data)
            })
            .catch((err) => {
                console.log(err)
            });
        
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
        $('.search_dropdown .dropdown-menu').toggle();
    }
  
    handleChangeDiff1(value){
        const { diff } = this.state;
        $('.search_dropdown .dropdown-menu').toggle();
        const name = 'difficulty';
        this.props.onChange({name,value});
        return $('#search_dropdown').html(diff[value]);
    }
    
    render() {
        const { options } = this.state;   
        var _defaultDifficulty = 74;
        if(this.props.searchFilters != undefined && this.props.searchFilters.difficulty != undefined && this.props.searchFilters.difficulty.length > 0) {
            if(this.props.searchFilters.difficulty[0] != "") {
                _defaultDifficulty = this.props.searchFilters.difficulty[0];
            }
        }
        return (
        <form method="post" ref={ (el) => this.myFormRef = el} onSubmit={this.props.onSubmit}>
            <div className="block-search">
                <div className="block-content">
                    <div className="item">
                        <label className="item-title">크기별</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 26)
                                    return <label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id} name="size" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } />
                                        <span>{option.title}</span>
                                    </label> 
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">나이별</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 30)
                                    return <label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id}  name="age" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
                                        <span>{option.title}</span>
                                    </label> 
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">건조별</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 34)
                                    return <label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id} name="dryness" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) }  />
                                        <span>{option.title}</span>
                                    </label> 
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">기능별</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 37) {
                                    var _checked = false;
                                    if(this.props.searchFilters != undefined && this.props.searchFilters.function != undefined && this.props.searchFilters.function.length > 0) {
                                        if(this.props.searchFilters.function[0] == option.id) {
                                            _checked = true;
                                        }
                                    } 
                                    return (<label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id} name="function" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } defaultChecked={_checked} />
                                        <span>{option.title}</span>
                                    </label>);
                                }
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">준비 시간</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 44) {
                                    var _checked = false;
                                    if(this.props.searchFilters != undefined && this.props.searchFilters.prepare_time != undefined && this.props.searchFilters.prepare_time.length > 0) {
                                        if(this.props.searchFilters.prepare_time[0] == option.id) {
                                            _checked = true;
                                        }
                                    } 
                                    return (<label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id} name="prepare_time" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } defaultChecked={_checked} />
                                        <span>{option.title}</span>
                                    </label>); 
                                }
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">시간별</label>
                        <div className="item-content">
                            {options.map((option, index) => {
                                if(option.parent_id == 51) {
                                    var _checked = false;
                                    if(this.props.searchFilters != undefined && this.props.searchFilters.cooking_time != undefined && this.props.searchFilters.cooking_time.length > 0) {
                                        if(this.props.searchFilters.cooking_time[0] == option.id) {
                                            _checked = true;
                                        }
                                    } 
                                    return (<label key={`option-${index}`} className="checkbox">
                                        <input type="checkbox" value={option.id} name="cooking_time" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } defaultChecked={_checked} />
                                        <span>{option.title}</span>
                                    </label>); 
                                }
                            })}
                        </div>
                    </div>
                    <div className="item">
                        <label className="item-title">난이도별</label>
                        <div className="item-content">
                            <div className="dropdown search_dropdown">
                                <a className="dropdown-toggle" id="search_dropdown" style={{cursor: "pointer"}} onClick={ e => this.handleDiff1()}>
                                    <Difficult diff={_defaultDifficulty} /> 
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="search_dropdown" style={{marginTop: "-1px"}}>
                                    {options.map((option, index) => {
                                        if(option.parent_id == 69)
                                            return <li className={`value vl1-${option.id}`} onClick={ e => this.handleChangeDiff1(option.id)} key={`option-${index}`}>                         
                                                <Difficult diff={option.id} />          
                                            </li> 
                                    }).reverse()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-bottom">
                    <button onClick={this.handleReset} className="btn btn-reset">초기화</button>
                    <button type="submit" className="btn btn-search">상세검색</button>
                </div>
            </div>
      </form>
        );
    }
}

export default Search;