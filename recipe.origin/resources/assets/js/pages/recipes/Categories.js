import React, { Component } from 'react';

const Categories = ({onChange}) =>{
    return (
        <select className="form-control" name="cate" required={true}  onChange={ (e) => onChange({ name:e.target.name, value:e.target.value}) }>
            <option value="1">강아지/고양이 겸용</option>
            <option value="2">강아지/고양이 겸용</option>
            <option value="3">강아지/고양이 겸용</option>
        </select>
    );
}

export default Categories;