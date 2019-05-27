import React, { Component } from 'react';

class Dates extends Component {
    constructor(props){
        super(props)

        this.state = {
            years:[],
        }
    }

    componentDidMount(){
        const {years} = this.state
        let current_year = new Date().getFullYear()
        for(let i = 1929; i <= current_year; i++){
            years.push(i)
        }
        
        this.setState({years})
    }

    render() {
        const { years } = this.state
        return (
            <div className="row">
              <div className="col-xs-4">
                <div className="form-group">
                  <select className="form-control" value={this.props.year} name="year" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } >
                    <option value="">년</option>
                    { years.map((y,i) => {
                        return <option key={`i-${i}`} value={y}>{y}</option>
                    }).reverse()}
                  </select>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <select className="form-control" value={this.props.month} name="month" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } >
                  <option value="">월</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
              <div className="col-xs-4">
                <div className="form-group">
                  <select className="form-control" value={this.props.date} name="date" onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } >
                  <option value="">일</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>
                </div>
              </div>
            </div>
        );
    }
}

export default Dates;