import React, { Component } from 'react';

class FindIdCompleted extends Component {
    render() {
        return (
            <main className="site-main">
        <div className="block-myform block-loginfind">
          <div className="block-title mypage-heading">
            <a href="#" className="back" />
            <span className="title">회원가입</span>
          </div>
          <div className="block-content">
            <ul className="nav" role="tablist">
              <li role="presentation" className="active"><a href="#tab1" role="tab" data-toggle="tab">아이디 찾기</a></li>
              <li role="presentation"><a href="#tab2" role="tab" data-toggle="tab">비밀번호 찾기</a></li>
            </ul>
            <div className="tab-content">
              <div role="tabpanel" className="tab-pane active" id="tab1">
                <div className="result-text">
                  <strong className="title">아이디 확인&lt;</strong>
                  <div className="subtitle">
                    아이디 확인 아이디 조회결과 입력하신 정보와 일치하는 정보는 아래와 같습 니다. 가입정책 변경으로 인하여 신규회원
                  </div>
                </div>
                <div className="form-group group-result">
                  <input name className="form-control" placeholder id="form2" type="text" defaultValue="ravinsto** (2005.11.12)" />
                </div>
                <div className="form-group group-result">
                  <input name className="form-control" placeholder id="form2" type="text" defaultValue="luvstagram110** (2017. 11. 09)" />
                </div>
                <button className="btn btn-default">확인</button>
              </div>
              <div role="tabpanel" className="tab-pane" id="tab2">
                <div className="text-center">
                  <label className="radio">
                    <input name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked type="radio" />
                    <span>핸드폰 정보로 찾기</span>
                  </label>
                  <label className="radio">
                    <input name="optionsRadios" id="optionsRadios2" defaultValue="option1" type="radio" />
                    <span>이메일 정보로 찾기</span>
                  </label>
                </div>
                <div className="form-group">
                  <input name className="form-control" placeholder="아이디" id="form2" type="text" />
                </div>
                <div className="form-group">
                  <input name className="form-control" placeholder="이름" id="form2" type="text" />
                </div>
                <div className="row">
                  <div className="col-xs-4">
                    <div className="form-group">
                      <select className="form-control">
                        <option>이름</option>
                        <option>이름</option>
                        <option>이름</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xs-8">
                    <div className="form-group">
                      <input name className="form-control" placeholder type="text" />
                    </div>
                  </div>
                </div>
                <button className="btn btn-default">확인</button>
              </div>
            </div>
          </div>
        </div>
      </main>
        );
    }
}

export default FindIdCompleted;