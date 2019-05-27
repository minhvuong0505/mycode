import React, { Component } from 'react';
import { getDateTime } from '../../helpers/Helpers';


class Sort extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
			sort:"id"
		};

    }
    
    onChange({name, value}){
		let {sort} = this.state
		sort = value
		this.setState({ sort })

		//sort 3 show list event close		
		let curr_date = getDateTime();
		console.log(sort);
    }
    
    render() {
        return (
            <select className="form-control _md pull-right" name="sort" onChange={(e) => this.onChange({ name: e.target.name, value: e.target.value })} >
                <option value="1">이벤트 전체보기</option>
                <option value="2">진행중 이벤트 보기</option>
                <option value="3">종료된 이벤트 보기</option>
            </select>
        );
    }
}

export default Sort;