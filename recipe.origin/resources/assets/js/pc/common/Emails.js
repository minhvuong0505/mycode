import React, { Component } from 'react';

class Emails extends Component {
    constructor(props){
        super(props)
    }

    render() {
        var _disabled = {};
        if(this.props.disable_input != null || this.props.disable_input != undefined && this.props.disable_input == "disabled") {
            _disabled['disabled'] = 'disabled';
        }
        return (
            <div>
                <div className="row">
                    <div id="div_input_email_id" className="col-xs-6">
                        <div className="form-group">
                        <input type="text" 
                            name="email_id" 
                            value={this.props.email_id}
                            onChange={ e => this.props.onChange({ name:e.target.name, value:e.target.value}) } 
                            className="form-control" {..._disabled} />
                        </div>
                    </div>
                    <div id="div_input_email_a" className="col-xs-1" style={{textAlign:"center", display: "none"}}><span className="or" style={{lineHeight:"50px"}}>@</span></div>
                    <div id="div_input_email_direct" className="col-xs-4" style={{display: "none"}}>
                        <input type="text" className="form-control" id="direct_host" name="direct_host" required={true} onChange={ (e) => this.props.onChange({ name:e.target.name, value:e.target.value}) } />
                    </div>
                    <div id="div_input_email_select" className="col-xs-6">
                        <div className="form-group">
                        <select className="form-control" value={this.props.email_host} id="email_host" name="email_host" required={true} onChange={ (e) => this.props.onChange({ name:e.target.name, value:e.target.value}) }  {..._disabled} >
                            <option value="">선택</option>
                            <option value="hanmail.net">한메일</option>
                            <option value="daum.net">다음</option>
                            <option value="naver.com">네이버</option>
                            <option value="hotmail.com">핫메일</option>
                            <option value="nate.com">네이트</option>
                            <option value="yahoo.co.kr">야후코리아</option>
                            <option value="yahoo.com">야후</option>
                            <option value="gmail.com">Gmail</option>
                            <option value="paran.com">파란</option>
                            <option value="hanmir.com">한미르</option>
                            <option value="dreamwiz.com">드림위즈</option>
                            <option value="empal.com">엠팔</option>
                            <option value="korea.com">코리아닷컴</option>
                            <option value="sayclub.com">세이클럽</option>
                            <option value="freechal.com">프리첼</option>
                            <option value="netian.com">네티앙</option>
                            <option value="hanafos.com">하나포스</option>
                            <option value="msn.com">MSN</option>
                            <option value="nexon.com">넥슨닷컴</option>
                            <option value="lycos.co.kr">라이코스코리아</option>
                            <option value="direct">직접입력</option>
                        </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Emails;