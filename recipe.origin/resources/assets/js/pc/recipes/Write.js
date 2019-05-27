import React, { Component } from 'react';

class Write extends Component {
    render() {
        return (
            <main className="site-main">
            <div className="page-title">
              <h1 className="title">레시피 등록</h1>
              <div className="actions">
                <button className="btn btn-outline" type="button">임시저장 <span>4</span></button>
                <button className="btn btn-default" type="button">등록</button>
              </div>
            </div>
            <div className="block-registration">
              <div className="box-group panel">
                <div className="panel-collapse collapse in" id="collapse1">
                  <div className="panel-body">
                    <div className="form-group">
                      <label>제목</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder="레시피 제목을 입력해주세요" /> 
                      </div>
                    </div>
                    <div className="form-group">
                      <label>간단설명</label>
                      <div className="control">
                        <textarea className="form-control" defaultValue={"100자 내외의 간단한 레시피 설명을 입력해주세요"} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>분류</label>
                      <div className="control">
                        <select className="form-control">
                          <option>강아지/고양이 겸용</option>
                          <option>강아지/고양이 겸용</option>
                          <option>강아지/고양이 겸용</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>                     
              </div>  
              <div className="box-group panel ">
                <div className="panel-heading">
                  <a role="button" data-toggle="collapse" href="#collapse2" aria-expanded="false">
                    <span className="title">레시피 정보 설정</span> <span className="close">닫기</span>
                  </a>
                </div>
                <div className="panel-collapse collapse in" id="collapse2">
                  <div className="panel-body">
                    <div className="form-group">
                      <label>준비 시간</label>
                      <div className="control">
                        <select className="form-control">
                          <option>전체</option>
                          <option>전체</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>조리 시간</label>
                      <div className="control">
                        <select className="form-control">
                          <option>전체</option>
                          <option>전체</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>난이도</label>
                      <div className="control">
                        <select className="form-control">
                          <option>easy</option>
                          <option>easy</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>조리기구</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder="1개 이상의 태그는 , 로 구분해주세요" /> 
                      </div>
                    </div>
                  </div>
                </div>                     
              </div> 
              <div className="box-group panel ">
                <div className="panel-heading">
                  <a role="button" data-toggle="collapse" href="#collapse3" aria-expanded="false">
                    <span className="title">재료 정보</span> <span className="close">닫기</span>
                  </a>
                </div>
                <div className="panel-collapse collapse in" id="collapse3">
                  <div className="panel-body">
                    <div className="form-group text-right">
                      <button className="btn btn-outline" type="button">삭제</button>
                      <button className="btn btn-default" type="button">추가입력</button>
                    </div>
                    <div className="form-group">
                      <label>재료 1</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder /> 
                      </div>
                    </div>
                    <div className="form-group">
                      <label>용량 1</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder /> 
                      </div>
                    </div>
                    <div className="form-group">
                      <label>단위 1</label>
                      <div className="control">
                        <select className="form-control">
                          <option>g</option>
                          <option>g</option>
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group">
                      <label>재료 2</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder /> 
                      </div>
                    </div>
                    <div className="form-group">
                      <label>용량 2</label>
                      <div className="control">
                        <input type="text" name className="form-control" placeholder /> 
                      </div>
                    </div>
                    <div className="form-group">
                      <label>단위 2</label>
                      <div className="control">
                        <select className="form-control">
                          <option>g</option>
                          <option>g</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>                     
              </div>     
              <div className="steps">
                <div className="step-title">STEP 1</div>
                <div className="step-content">
                  <div className="action-photo">
                    <a href="#" className="action camera" />
                    <a href="#" className="action images" />
                    <a href="#" className="action video" />
                  </div>
                  <div className="add-photo">
                    <div className="photo">
                      <div className="img" />
                      <button className="btn btn-outline" type="button">사진 삭제</button>
                    </div>
                    <div className="recipe">
                      <textarea className="form-control" defaultValue={"레시피를 입력해주세요"} />
                    </div>
                  </div>
                  <div className="actions-add">
                    <button className="btn btn-default" type="button">+ 순서 추가</button>
                    <button className="btn btn-second" type="button">요리 완성</button>
                  </div>
                  <div className="action-photo">
                    <a href="#" className="action camera" />
                    <a href="#" className="action images" />
                    <a href="#" className="action video" />
                  </div>
                  <div className="add-photo photo-grid">
                    <div className="list-photo">
                      <div className="photo">
                        <div className="img">
                          <button className="btn btn-default btn-remove" type="button">대표 사진</button>
                        </div>
                        <button className="btn btn-outline" type="button">사진 삭제</button>
                      </div>
                      <div className="photo">
                        <div className="img" />
                        <button className="btn btn-outline" type="button">사진 삭제</button>
                      </div>
                      <div className="photo">
                        <div className="img" />
                        <button className="btn btn-outline" type="button">사진 삭제</button>
                      </div>
                    </div>
                    <div className="recipe">
                      <textarea className="form-control" defaultValue={"요리 완성에 대한 내용을 등록 해 주세요   "} />
                    </div>
                  </div>
                  <div className="actions-bottom text-center">
                    <button className="btn btn-outline" type="button">임시저장 <span>4</span></button>
                    <button className="btn btn-default" type="button">등록</button>
                  </div>
                </div>
              </div>                            
            </div>
          </main>
        );
    }
}

export default Write;