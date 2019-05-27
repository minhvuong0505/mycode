import React, { PropTypes } from 'react';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.
import { Link} from "react-router"

const displayName = 'Recipes From'

const Form = ({showTempList, deleteTemporaryRecipe, changeLang, type_lang,languages,recipes, temp_recipe_list, temp_recipe_list_cnt, title, desc, todos, materialsPreviewImageList, limits, cates, options, renderDefault, number_trash, 
    renderRespectation, renderUploads, uploadAdd, onChange, register, MaterialThumbImages, ToggleBlockDisplay, MaterialThumbImageClick, registerTerm ,handleAdd, handleDel, ShowInputVideo}) => {
    //language
      let lang = localStorage.getItem('lang');
      if(lang) type_lang = lang;
      languages.setLanguage(type_lang);

      let classification = {
          it:{
            3:'멍키친',
            20:'냥키친',
          },
          en:{
            3:'Cat kitchen',
            20:'Dog kitchen',
          },
          cn:{
            3:'멍키친',
            20:'냥키친',
          }
      }
      var _listItem = (<li style={{textAlign:"center", paddingTop: "24vh"}}><p>{languages.no_temporay_recipe}</p></li>);
      var _buttonDeleteAll = "";
      if(temp_recipe_list.length > 0) 
      {
        _buttonDeleteAll = (<button className="btn btn-outline pull-right" onClick={(e) => deleteTemporaryRecipe(-1)}><i className="glyphicon glyphicon-trash" aria-hidden="true"></i> {languages.modal_temp_delete}</button>);
        _listItem = temp_recipe_list.map((recipe, index) => {
            return (<li key={`recipe-${index}`} datarecipeid={recipe['id']} className="temporary-recipe">
                <div className="left-info">
                    <span><Link to={`/recipe/${recipe['id']}/edit`}>{recipe['title']}</Link></span>
                    <span style={{display:"block",color:"#888"}}>{recipe['created_at'].substr(0, 16)}</span>
                </div>
                <div className="right-info">
                    <button className="btn btn-outline pull-right" onClick={(e) => deleteTemporaryRecipe(recipe['id'])}><i className="glyphicon glyphicon-trash" aria-hidden="true"></i> {languages.modal_temp_delete_single}</button>
                </div>
            </li>);
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
                <div className="toobar">
                    <strong className="title pull-left">{languages.reg} </strong>
                    <select className="form-control pull-left" value={type_lang} name="lang" onChange={(e) => changeLang({ name: e.target.name, value: e.target.value })} style={{marginLeft: 12}}>
                        <option value="it">한국어</option>
                        <option value="en">English</option>
                        <option value="cn">Chinese</option>
                    </select>
                    <a className="btn btn-outline pull-right" style={{padding: "0px"}}>
                        <button className="btn special-btn" onClick={register} value={2} style={{color:"#888"}}>{languages.draft}</button> 
                        <span onClick={showTempList} style={{padding: "7px 12px", float: "right", borderLeft: "1px solid #ccc"}}>{temp_recipe_list_cnt}</span>
                    </a>
                    <button className="btn btn-default pull-right" onClick={register}>{languages.submit}</button>
                </div>
                <div className="block-write">
                    <div className="block-content">
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.title}</label>
                                
                            </div>
                            <div className="col-xs-10">
                                <input 
                                    ref={input => { this.title = input; }}
                                    type="text" 
                                    name="title" 
                                    value={recipes['title']} 
                                    required={true} 
                                    onChange={ e => onChange({ name:e.target.name, value:e.target.value}) } 
                                    className="form-control" placeholder={languages.pl_title} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.desc}</label>
                            </div>
                            <div className="col-xs-10">
                                <textarea 
                                    name="desc" 
                                    value={recipes['desc']} 
                                    required={true}  
                                    onChange={ e => onChange({ name:e.target.name, value:e.target.value}) } 
                                    className="form-control" placeholder={languages.pl_desc} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.cate}</label>
                            </div>
                            <div className="col-xs-10">
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
                    <div className="block-title">
                        <span className="title">{languages.s1}</span>
                        <span className="subtitle pull-right" onClick={(e) => ToggleBlockDisplay('block_1')} style={{cursor:"pointer"}}>{languages.close}</span>
                    </div>
                    <div id="block_1" className="block-content">
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.size}</label>
                            </div>
                            <div className="col-xs-4">
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
                            <div className="col-xs-2">
                                <label className="label">{languages.age}</label>
                            </div>
                            <div className="col-xs-4">
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
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.dryness}</label>
                            </div>
                            <div className="col-xs-4">
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
                            <div className="col-xs-2">
                                <label className="label">{languages.function}</label>
                            </div>
                            <div className="col-xs-4">
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
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.tags}</label>
                            </div>
                            <div className="col-xs-10">
                                <input type="text" value={recipes['tags']} name="tags" onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder={languages.cook_pl} />
                            </div>
                        </div>
                    </div>
                    {/* size */}
                    <div className="block-title">
                        <span className="title">{languages.s2}</span>
                        <span className="subtitle pull-right" onClick={(e) => ToggleBlockDisplay('block_2')} style={{cursor:"pointer"}}>{languages.close}</span>
                    </div>
                    <div id="block_2" className="block-content">
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.pre_time}</label>
                            </div>
                            <div className="col-xs-10">
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
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.cooking_time}</label>
                            </div>
                            <div className="col-xs-10">
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
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.difficulty}</label>
                            </div>
                            <div className="col-xs-10">
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
                        <div className="row form-group">
                            <div className="col-xs-2">
                                <label className="label">{languages.cooking_utensils}</label>
                            </div>
                            <div className="col-xs-10">
                                <input type="text" value={recipes['cooking_utensils']} name="cooking_utensils" onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder={languages.cook_pl} />
                            </div>
                        </div>
                    </div>
                    {/* material */}
                    <div className="block-title">
                        <span className="title">{languages.s3}</span>
                        <span className="subtitle pull-right" onClick={(e) => ToggleBlockDisplay('block_3')} style={{cursor:"pointer"}}>{languages.close}</span>
                    </div>
                    <div id="block_3" className="block-content">
                        <div className="row form-group">
                            <div className="col-xs-12 text-right">                                    
                                <button className="btn btn-outline btn-sm" onClick={handleDel} type="button">{languages.delete}</button>
                                <button className="btn btn-default btn-sm" onClick={handleAdd} type="button">{languages.add}</button>
                            </div>
                        </div>
                        {todos.map((todo, index) => {
                            let name;
                            let quantity;
                            let unit;
                            
                            if(recipes['materials'][todo] == undefined) {
                                name = '';
                                quantity = '';
                                unit = '';
                            } else {
                                name = recipes['materials'][todo]['name'];
                                quantity = recipes['materials'][todo]['quantity'];
                                unit = recipes['materials'][todo]['unit'];
                            }

                            var _style = {display:"none"};
                            var _text = languages.select_material_img;
                            if(materialsPreviewImageList[todo] != undefined) 
                            {
                                _style = {display: "inline-block"};
                                _text = languages.select_material_img_2;
                            }

                            return (
                                <div key={`todo-${index}`} className="group-flex">
                                    <div className="form-group">
                                        <label className="label">{languages.name} {todo}</label>
                                        <input type="text" name="name" value={name} onChange={ e => onChange({ name:e.target.name, value:e.target.value, index}) } className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">{languages.qty} {todo}</label>
                                        <input type="text" name="quantity" value={quantity} onChange={ e => onChange({ name:e.target.name, value:e.target.value, index}) } className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label className="label">{languages.unit} {todo}</label>
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
                                    <div className="form-group" style={_style}>
                                        <div className="btn btn-outline" id={`material-preview-${index}`} onClick={(e) => MaterialThumbImageClick(e,index)} style={{minWidth: "50px", width: "50px", padding: "0px"}}>
                                            <div style={{height:'48px', width:'48px', borderRadius: "5px", display: "block", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: `url(${materialsPreviewImageList[todo]})`}} ></div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-outline" style={{position:"relative"}}>
                                        <img src="/default/images/icon/images.png" /><input type="file" id={`material-${index}`} onChange={(e)=> MaterialThumbImages(e,index)} style={{position:"absolute",top:"0px",left:"0px",width:"100%",height: "100%", opacity: "0"}}/>{_text}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="step-list">
                        {limits.map((step, index) => {
                            return renderUploads(step)
                        })}
                    </div>
                    <div className="block-content">
                        <div className="row form-group">
                            <div className="col-xs-12">                                    
                                <button className="btn btn-default btn-block" onClick={uploadAdd}>{languages.addmore}</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="block-title _gray">
                        <span className="title">{languages.s4}</span>
                    </div>
                    <div className="block-content">
                        {renderRespectation(20)}
                        <br /><br />
                        <div className="row form-group">
                            <div className="col-xs-12 text-center">       
                                <button className="btn btn-default" style={{height:"auto"}} onClick={register}>{languages.submit}</button>  
                                <a className="btn btn-outline" style={{padding: "0px",height:"auto"}}>
                                    <button className="btn special-btn" onClick={register} value={2} style={{color:"#888"}}>{languages.draft}</button> 
                                    <span onClick={showTempList} style={{padding: "7px 12px", float: "right", borderLeft: "1px solid #ccc"}}>{temp_recipe_list_cnt}</span>
                                </a>
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