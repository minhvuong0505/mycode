import React, { PropTypes } from 'react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { Link} from "react-router"

const displayName = 'Recipes From'

const Form = ({showTempList, deleteTemporaryRecipe, changeLang, type_lang,languages,recipes, temp_recipe_list, temp_recipe_list_cnt,title, desc, materialsPreviewImageList, todos, limits, cates, options, renderDefault, number_trash, 
    renderRespectation, renderUploads, uploadAdd, onChange, register, ToggleBlockDisplay, MaterialThumbImages, MaterialThumbImageClick, registerTerm ,handleAdd, handleDel}) => {
    //language
    let lang = localStorage.getItem('lang');
    if(lang) type_lang = lang;
    languages.setLanguage(type_lang);    
    var _listItem = (<li style={{textAlign:"center",  paddingTop: "24vh"}}><p>{languages.no_temporay_recipe}</p></li>);
    var _buttonDeleteAll = "";
    if(temp_recipe_list.length > 0) 
    {
        _buttonDeleteAll = (<button className="btn btn-outline pull-right" onClick={(e) => deleteTemporaryRecipe(-1)}><i className="glyphicon glyphicon-trash" aria-hidden="true"></i> {languages.modal_temp_delete}</button>);
        _listItem = temp_recipe_list.map((recipe, index) => {
            return (
                <li key={`recipe-${index}`} datarecipeid={recipe['id']} className="temporary-recipe">
                    <div className="left-info">
                        <span><Link to={`/recipe/${recipe['id']}/edit`}>{recipe['title']}</Link></span>
                        <span style={{display:"block",color:"#888"}}>{recipe['created_at'].substr(0, 16)}</span>
                    </div>
                    <div className="right-info">
                        <button className="btn btn-outline pull-right" onClick={(e) => deleteTemporaryRecipe(recipe['id'])}><i className="glyphicon glyphicon-trash" aria-hidden="true"></i> {languages.modal_temp_delete_single}</button>
                    </div>
                </li>
            );
        });
    }

    return (
        <div>
            <div id="temporary_list_modal" className="recipe_write modal fade" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={showTempList} aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">{languages.modal_temp_title}</h4>
                            {_buttonDeleteAll}
                            <a className="pull-right" style={{lineHeight: "34px", marginRight: "8px"}}> {languages.modal_temp_cnt_left} <span>{temp_recipe_list_cnt}</span> {languages.modal_temp_cnt_right}</a>
                        </div>
                        <div className="modal-body">
                            <ul>
                                {_listItem}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <form name="frmRecipe">
                <input type="hidden" value="1" name="user_id" />
                <div className="page-title">
                    <h1 className="title">레시피 등록</h1>
                    <div className="actions">
                        <a className="btn btn-outline pull-right" style={{width:"auto", padding:"0"}}>
                            <button className="btn special-btn" onClick={register} value={2} style={{color:"#888"}}>{languages.draft}</button> 
                            <span onClick={showTempList} style={{padding: "1.8vw 3.2vw", float: "right", borderLeft: "1px solid #ccc"}}>{temp_recipe_list_cnt}</span>
                        </a>
                        <button className="btn btn-default" onClick={register} type="button" style={{color:"#fff"}}>{languages.submit}</button>
                    </div>
                    <div style={{width:"97vw", float: "right", marginTop: "2vw"}}>
                        <div style={{width:"27vw", float:"right", marginRight:"3vw"}}>
                            <select className="form-control pull-left" value={type_lang} name="lang" onChange={(e) => changeLang({ name: e.target.name, value: e.target.value })} style={{marginLeft: 12}}>
                                <option value="it">한국어</option>
                                <option value="en">English</option>
                                <option value="cn">Chinese</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="block-registration">
                    <div className="box-group panel">
                        <div className="panel-collapse collapse in" id="collapse1">
                        <div className="panel-body">
                            <div className="form-group">
                            <label>{languages.title}</label>
                            <div className="control">
                                <input 
                                    ref={input => { this.title = input; }}
                                    type="text" 
                                    name="title" 
                                    value={recipes['title']} 
                                    required={true} 
                                    onChange={ e => onChange({ name:e.target.name, value:e.target.value}) } 
                                    className="form-control" placeholder={languages.pl_title} autoFocus />
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.desc}</label>
                            <div className="control">
                                <textarea 
                                    name="desc" 
                                    value={recipes['desc']} 
                                    required={true}  
                                    onChange={ e => onChange({ name:e.target.name, value:e.target.value}) } 
                                    className="form-control" placeholder={languages.pl_desc} />
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.cate}</label>
                            <div className="control">                            
                                {/* categories */}
                                <select value={recipes['cate']} className="form-control" name="cate" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                    {cates.map((cate, index) => {
                                        var _text = cate.title;
                                        if (type_lang == "en") {
                                            _text = (cate.title_en != null) ? cate.title_en : cate.title;
                                        } else if (type_lang == "cn") {
                                            _text = (cate.title_cn != null) ? cate.title_cn : cate.title;
                                        }
                                        return <option key={`cate-${index}`} value={cate.id}>{_text}</option>
                                    })}     
                                </select>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* size */}
                    <div className="box-group panel ">
                        <div className="panel-heading">
                            <a role="button" data-toggle="collapse" href="#collapse6" aria-expanded="false">
                                <span className="title">{languages.s1}</span> <span className="close" onClick={(e) => ToggleBlockDisplay('collapse6')}>{languages.close}</span>
                            </a>
                        </div>
                        <div className="panel-collapse collapse in" id="collapse6">
                        <div className="panel-body">
                            <div className="form-group">
                            <label>{languages.size}</label>
                            <div className="control">
                                <select value={recipes['size']} className="form-control" name="size" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 26)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.age}</label>
                            <div className="control">
                                <select value={recipes['age']} className="form-control" name="age" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 30)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.dryness}</label>
                            <div className="control">
                                <select value={recipes['dryness']} className="form-control" name="dryness" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 34)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.function}</label>
                            <div className="control">
                                <select value={recipes['function']} className="form-control" name="function" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 37)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.tags}</label>
                            <div className="control">
                                <input type="text" value={recipes['tags']} name="tags" onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder={languages.cook_pl} />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="box-group panel ">
                        <div className="panel-heading">
                        <a role="button" data-toggle="collapse" href="#collapse2" aria-expanded="false">
                            <span className="title">{languages.s2}</span> <span className="close" onClick={(e) => ToggleBlockDisplay('collapse2')}>{languages.close}</span>
                        </a>
                        </div>
                        <div className="panel-collapse collapse in" id="collapse2">
                        <div className="panel-body">
                            <div className="form-group">
                            <label>{languages.pre_time}</label>
                            <div className="control">
                                <select value={recipes['prepare_time']} className="form-control" name="prepare_time" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 44)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.cooking_time}</label>
                            <div className="control">
                                <select value={recipes['cooking_time']} className="form-control" name="cooking_time" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 51)
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.difficulty}</label>
                            <div className="control">
                                <select value={recipes['difficulty']} className="form-control" name="difficulty" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
                                {options.map((option, index) => {
                                    if(option.parent_id == 69) 
                                    {
                                        var _text = option.title;
                                        if (type_lang == "en") {
                                            _text = (option.title_en != null) ? option.title_en : option.title;
                                        } else if (type_lang == "cn") {
                                            _text = (option.title_cn != null) ? option.title_cn : option.title;
                                        }
                                        return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                    }
                                })}
                                </select>
                            </div>
                            </div>
                            <div className="form-group">
                            <label>{languages.cooking_utensils}</label>
                            <div className="control">
                                <input type="text" value={recipes['cooking_utensils']} name="cooking_utensils" onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder={languages.cook_pl} />
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* material */}
                    <div className="box-group panel ">
                        <div className="panel-heading">
                            <a role="button" data-toggle="collapse" href="#collapse3" aria-expanded="false">
                                <span className="title">{languages.s3}</span> <span className="close" onClick={(e) => ToggleBlockDisplay('collapse3')}>{languages.close}</span>
                            </a>
                        </div>
                        <div className="panel-collapse collapse in" id="collapse3">
                        <div className="panel-body">
                            <div className="form-group text-right">
                            <button className="btn btn-outline" onClick={handleDel} type="button">{languages.delete}</button>
                            <button className="btn btn-default" onClick={handleAdd} type="button">{languages.add}</button>
                            </div>
                            {
                                
                                
                            }
                            {todos.map((todo, index) => {
                                let name
                                let quantity
                                let unit                        
                                
                                if(recipes['materials'][todo] == undefined){
                                    name = ''  
                                    quantity = ''
                                    unit = ''                              
                                }else{
                                    name = recipes['materials'][todo]['name']
                                    quantity = recipes['materials'][todo]['quantity']
                                    unit = recipes['materials'][todo]['unit']
                                }                            
                                
                                
                                return  (<div key={`todo-${index}`}>
                                            <div className="form-group">
                                                <label>{languages.name} {todo}</label>
                                                <div className="control">
                                                <input type="text" name="name" value={name} onChange={ e => onChange({ name:e.target.name, value:e.target.value, index}) } className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>{languages.qty} {todo}</label>
                                                <div className="control">
                                                <input type="text" name="quantity" value={quantity} onChange={ e => onChange({ name:e.target.name, value:e.target.value, index}) } className="form-control" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>{languages.unit} {todo}</label>
                                                <div className="control">
                                                    <select className="form-control" value={unit} name="unit" onChange={ e => onChange({ name:e.target.name, value:e.target.value, index}) } >
                                                    {options.map((option, index) => {
                                                        if(option.parent_id == 58)
                                                        {
                                                            var _text = option.title;
                                                            if (type_lang == "en") {
                                                                _text = (option.title_en != null) ? option.title_en : option.title;
                                                            } else if (type_lang == "cn") {
                                                                _text = (option.title_cn != null) ? option.title_cn : option.title;
                                                            }
                                                            return <option value={option.id} key={`option-${index}`}>{_text}</option>
                                                        }
                                                    })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>{languages.pt} {todo}</label>
                                                <div className="btn btn-outline" id={`material-preview-${index}`} onClick={(e) => MaterialThumbImageClick(e,index)} style={{ width: "9.25vw", height: "9.25vw", padding: "0px", float:"right"}}>
                                                    <div style={{height:'100%', width:'100%', borderRadius: "5px", display: "block", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${materialsPreviewImageList[todo]})`}} ></div>
                                                </div>
                                                <button className="btn btn-outline" style={{position:"relative", marginLeft: "0", height: "9.25vw",  float:"right"}}>
                                                    <input type="file" id={`material-${index}`} onChange={(e)=> MaterialThumbImages(e,index)} style={{position:"absolute",top:"0px",left:"0px",width:"100%",height: "100%", opacity: "0"}}/>{languages.sl_img}
                                                </button>
                                            </div>
                                            <div className="form-group">
                                            
                                            </div>
                                            
                                            <hr />
                                        </div>)
                            })}
                        </div>
                        </div>
                    </div>

                    <div className="steps">
                        <div className="step-content">                    
                        
                        {limits.map((step, index) => {
                            return renderUploads(step)
                        })}
    
                        <div className="actions-add">  
                        <button className="btn btn-default" type="button" onClick={uploadAdd}>{languages.addmore}</button>    
                        <button className="btn btn-second" type="button">{languages.s4}</button>
                        </div>
                        
                        {renderRespectation(20)}

                        <div className="actions-bottom text-center">
                            <a className="btn btn-outline" style={{width:"auto", padding:"0"}}>
                                <button className="btn special-btn bottom-btn-specical" onClick={register} value={2} style={{height:"8.5vw !important", color:"#888",}}>{languages.draft}</button> 
                                <span onClick={showTempList} style={{padding: "2.7vw 3.2vw", float: "right", borderLeft: "1px solid #ccc"}}>{temp_recipe_list_cnt}</span>
                            </a>
                            <button className="btn btn-default" onClick={register} type="button" style={{color:"#fff"}}>{languages.submit}</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </form>
        </div>
    )
}

Form.displayName = displayName

export default Form;