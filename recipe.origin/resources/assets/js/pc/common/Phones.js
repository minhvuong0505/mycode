import React, { Component } from 'react';

class Phones extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <div>
                <div className="row phone">
                  <div className="col-xs-4">
                    <div className="form-group">
                    <select className="form-control" value={this.props.phone_1} name="phone_1" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } >
                    <option value="">번호</option>
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                    </div>
                  </div>
                  <div className="col-xs-8">
                    <div className="form-group">
                      <input  className="form-control" value={this.props.phone_2} onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } name="phone_2" type="text" />
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default Phones;