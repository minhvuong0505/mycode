import React, { Component } from 'react';
import {IndexLink, Link, browserHistory} from "react-router"
import Phones from '../common/Phones';
import Emails from '../common/Emails';
import Dates from '../common/Dates';

class Join extends Component {
    constructor(props) {
        super(props)
          
        this.state = {
            user: {
                username: '',
                password: '',
                password_confirmation: '',
                name:'',
                birthday:'',
                gender:'m',
                email:'',
                email_id:'',
                email_host:'',
                phone:'',
                auth_type:'email',
				verify: false,
				auth_code:''
            },
            fl:true,
            socials:{},
            year:[],
            errors: {},
            hasError: false,
            message: null,
        }
          
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleVerify = this.handleVerify.bind(this)
        this.handleVerifyConfirm = this.handleVerifyConfirm.bind(this)
    }

    onChange({ name, value }) {
        const { user } = this.state

        user[name] = value

        if(value == 'direct' || name == 'direct_host'){
            // $('#direct_host').show();
            // $('#email_host').hide();
        }

        if(name == 'email_host') 
        {
            var _email_id = user['email_id'].split('@');
            if(value != "direct") {
                $('#div_input_email_select').addClass('col-x-6');
                $('#div_input_email_select').removeClass('col-xs-4');
                $('#div_input_email_id').addClass('col-xs-6');
                $('#div_input_email_id').removeClass('col-xs-3');
                $('#div_input_email_a').hide();
                $('#div_input_email_direct').hide();
                user['email_id'] = _email_id[0] + '@' + value;
                
            } else {
                // show @, direct. Change class
                user['email_id'] = _email_id[0];
                $('#div_input_email_id').removeClass('col-xs-5');
                $('#div_input_email_id').addClass('col-xs-3');
                $('#div_input_email_a').show();
                $('#div_input_email_direct').show();
                $('#div_input_email_select').removeClass('col-x-6');
                $('#div_input_email_select').addClass('col-xs-4');
            }
        }

        this.setState({ user });
        console.log(user);
    }

    componentDidMount(){
        const {user} = this.state
        const {year} = this.state
        let current_year = new Date().getFullYear()
        for(let i = 1929; i <= current_year; i++){
            year.push(i)
        }
        
        this.setState({year})

        //get login socials
        let socials = JSON.parse(localStorage.getItem('faces')) 

        if(socials){
          user.username = socials.data.id
          user.name = socials.data.last_name + ' ' + socials.data.first_name
          let email = socials.data.email.split('@')
          user.email_id = email[0]
          user.email_host = email[1]
          
          this.setState({user})
        } 
        console.log(user)
      }

   checkPassword(str)
    {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{3,}$/;
        return re.test(str);
    }

    onSubmit(e) {
        const { user } = this.state
        
        if(!user['username']){
            alert('아이디 정보 입력해주세요')
            return false
        }

        if(!user['password']){
                alert('비밀번호 정보 입력해주세요')
                return false
        }
        
        if(!user['password_confirmation']){
                alert('비밀번호 재확인 정보 입력해주세요')
                return false
            }

            if(!user['name']){
                alert('이름 정보 입력해주세요')
                return false
        }
        
        if(!user['year'] || !user['month'] || !user['date']){
                alert('생일 정보를 입력하십시오.')
                return false
            }

            if(!user['email_id'] || !user['email_host']){
                alert('이메일 정보 입력해주세요')
                return false
        }
        
        if(!user['phone_1'] || !user['phone_2']){
                alert('휴대 전화 정보를 입력하십시오.')
                return false
            }

        if(/^[a-zA-Z0-9- ]*$/.test(user['username']) == false) {
          alert('아이디 번호 또는 영어 이름');
          return false
        }

        if(user['password'] !== user['password_confirmation']){
            alert('일치하지 않는 암호')
            return false
        }

        if(e == 3 || e == 2){
          if(!user['auth_code']){
            alert('인증번호 정보 입력해주세요')
            return false
          }
        }
        

        //validate password format
        if(this.checkPassword(user['password']) != true){
          alert('암호가 유효한 형식이 아닙니다.')
          return false
        }

        if(user['email_host'] == 'direct')
        {
            user['email'] = user['email_id'] + '@' + user['direct_host'];
        } else {
            user['email'] = user['email_id'];
        }
        user['birthday'] = user['year'] + '-' + user['month'] + '-' + user['date']        
        user['phone'] = user['phone_1'] + user['phone_2'] 
        
        var _message = "등록하시겠습니까?";
        if(e == 1) {
            _message = "인증 받으시겠습니까?";
        }
        const con = confirm(_message)
        if(con !==true) return false


        const { verify } = this.state


        if(e == 3 && verify == true) {
            alert('귀하의 계정이 성공적으로 생성되었습니다.')
            window.location.href = "/login"
        }

        axios.post('/api/v3/register', user)
            .then(res => {
                console.log(res.status)
                if (res.status === 201) {
                    console.log(201);
                    if(e == 2){
                      alert('확인 완료'); //confirm verify code
                      this.setState({verify:true})
                      localStorage.setItem('register', JSON.stringify(res.data)); 
                      return false
                    } 

                    if(e == 3){
                      this.setState({ message: '귀하의 계정이 성공적으로 생성되었습니다.' })
                      alert('귀하의 계정이 성공적으로 생성되었습니다.'); //successfull
                      window.location.href = "/";
                    }
                    
                } else if(res.status === 200){
                    const errors = res.data
                    if(res.data == 'Sent verify code') alert('전자 메일로 코드를 확인하십시오.')
                    if(res.data.message == 'Wrong verify code') alert('잘못된 확인 코드.')
                    this.setState({ message: res.data || res.data.message})

                }else {
                    const errors = res.data
                    this.setState({ message: res.data, errors, hasError: true })
                    return res;
                }

                $('html, body').animate({
                    scrollTop: 100
                    }, "slow");
            })
            .catch(err => {
                if (e == 1 && err.response.status == 401) {
                    const errors = err.response.data;
                    if(errors.email != undefined) {
                        errors.email[0] = "이미 가입된 이메일입니다. 다른 이메일 주소를 입력해주세요.";
                    }
                    if(errors.username != undefined) {
                        errors.username[0] = "사용자 이름이 이미 사용되었습니다. 다른 사용자 이름을 입력하십시오.";
                    }
                    
                    console.log(errors);
                    this.setState({ errors, hasError: true });
                } else if (err.response) {
                    const errors = err.response.data
                    console.log(errors)
                    this.setState({ errors, hasError: true })
                }
                $('html, body').animate({
                    scrollTop: 100
                    }, "slow");
            })

        return false
    }
    
    resetErrors() {
        this.setState({
            errors: {},
            hasError: false,
        })
    }
    
    resetMessage() {
        this.setState({ message: null })
    }

    renderErrors() {
        const { errors, hasError } = this.state

        if (!hasError) return null
        return (
            <div className="alert alert-danger alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {_.map(_.forOwn(this.state.errors), (error, field) => (
                    <p key={`error-${field}`} >{_.head(error)}</p>
                ))}
            </div>
        )
    }
    
    renderMessage() {
        const { message } = this.state
        
        if (message) {
            return (
                <div className="alert alert-success alert-dismissible" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p><strong>Success!</strong> { message }</p>
                </div>
            )
        }
    }

    handleVerify(){ //send authentication
        const { user } = this.state
        const { fl } = this.state

        if(fl == false) {
            alert("너 이미 클릭 했어 이메일을 확인하십시오.");
            return false;
        }

        console.log(user['phone_1'])
        if(user['auth_type'] == 1){
            if(!user['phone_1'] || !user['phone_2']){
                alert('CellPhone 정보 입력해주세요')
                return false
            }
        }else if(user['auth_type'] == 2){
            if(!user['email_id'] || !user['email_host']){
                alert('이메일 정보 입력해주세요')
                return false
            }
        }
        
		  axios.post('/api/v3/user/find/pwd/get-auth', user)
            .then(res => {
                if (res.status === 200) {
                    this.setState({ code: res.data, fl:false })
                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response.status === 422) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
		})

    }

    handleVerifyConfirm(){ //confirm verify
		const { user } = this.state
		axios.post('/api/v1/auth/verify_confirm', user)
            .then(res => {
                if (res.status === 201) {
                    this.setState({ message: 'Verify successed' })
                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response.status === 422) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
		})
    }

    handleClose(){
      window.history.go(-1);
    }

    handleShow(id){
        console.log(id)
        if(id == 1) $('#ss').toggle()
        if(id == 2) $('#ll').toggle()
    }
    ShowTerm(_idx = 0) {
        $('#ShowTerm_'+_idx).slideToggle();
        if($('.icon_state_'+_idx + ' img').attr('src').indexOf("open-") >= 0) {
            $('.icon_state_'+_idx + ' img').attr('src', $('.icon_state_'+_idx + ' img').attr('src').replace("open-", "close-"));
        } else {
            $('.icon_state_'+_idx + ' img').attr('src', $('.icon_state_'+_idx + ' img').attr('src').replace("close-", "open-"));
        }
    }

    render() {
        const { user } = this.state

        return (
    <main className="site-main">
        
        <div className="container">
          <div className="block-gird-item">
            <div className="toobar">
              <strong className="title pull-left">회원가입 </strong>
            </div>
            <div className="block-myform block-jojn">
            {this.renderErrors()}
           {this.renderMessage()}
              <div className="form-group">
                <input type="text" placeholder="아이디" name="username" value={user.username || ''}  onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  className="form-control"  />                        
                <p className="note-control">영문/숫자로만 사용 가능 합니다</p>
              </div>
              <div className="form-group">
                <input type="password"  name="password" placeholder="비밀번호" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  className="form-control"  id="form2" />  
              </div>
              <div className="form-group">
              <input type="password" name="password_confirmation" placeholder="비밀번호 재확인" className="form-control"  onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  id="form3" />
                <p className="note-control">6~15자 영 대소문자, 숫자,특수문자 조합하여 사용 가능 합니다 </p>
              </div>
              <div className="form-group">
                <input type="text" name="name"  value={user.name || ''}  placeholder="이름" className="form-control" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="form4" />
              </div>
              <div className="form-group">
                <Dates onChange={this.onChange} />
              </div>
              <div className="form-group" style={{borderBottom: '1px solid #efefef'}}>
                <div className="row">
                  <div className="col-xs-2">
                    <label className="label" style={{margin: '8px 0 13px'}}>성별</label>
                  </div>
                  <div className="col-xs-2">
                    <label className="radio" style={{margin: '8px 0 13px'}}>
                        <input type="radio"  name="gender" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="optionsRadios1" value="m" defaultChecked />
                      <span>남자</span>
                    </label>
                  </div>
                  <div className="col-xs-2">
                    <label className="radio" style={{margin: '8px 0 13px'}}>
                      <input type="radio" name="gender" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="optionsRadios2" value="f" />
                      <span>여자</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <Emails onChange={this.onChange} email_id={user.email_id} email_host={user.email_host} />
              </div>
              <div className="form-group">
                <Phones onChange={this.onChange}/>
              </div>
              <div className="form-group">
                {/* <input name className="form-control" placeholder type="text" /> */}
              </div>
              <div style={{maxWidth: 360, margin: '30px auto'}}>
                <div className="text-center">
                  <label className="label">본인인증</label>
                  <label className="radio" style={{marginLeft: 12}}>
                    <input type="radio" name="auth_type" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="optionsRadios21" defaultValue="phone"  />
                    <span>핸드폰</span>
                  </label>
                  <label className="radio" style={{marginLeft: 12}}>
                  <input type="radio" name="auth_type" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="optionsRadios22" defaultValue="email" defaultChecked />
                    <span>이메일</span>
                  </label>
                  <label className="radio" style={{marginLeft: 12}}>
                  <input type="radio" name="auth_type" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } id="optionsRadios23" defaultValue="ipin" />
                    <span>아이핀</span>
                  </label>
                </div>
                <div className="form-group">
                  <button className="btn btn-outline" defaultValue="1" onClick={ e => this.onSubmit(1) }>인증 받기</button>
                </div>
                <div className="form-group">
                <input type="text" placeholder="인증번호" name="auth_code" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } className="form-control" id="form5" />                        
                </div>
                <div className="form-group">
                  <button className="btn btn-default"  defaultValue="2" onClick={ e => this.onSubmit(2) }>인증번호 확인</button>
                </div>
                <br />
              </div>
              <hr />
              <br />
              <div style={{maxWidth: 360, margin: '30px auto'}}>
                <div className="form-group">
                  <div className="form-control" onClick= {e => this.ShowTerm(0)} style={{cursor:"pointer",display:"none"}}>
                    <span>레시피봄 이용약관</span>
                    <span className="icon_state_0" style={{width: "12px", marginRight: "12px", float: "right"}} ><img src="/default/images/icon/open-collapsed.png" /></span>
                  </div>
                </div>
                <div id="ShowTerm_0" className="form-group" style={{display: "none"}}>
                    <p>레시피봄 이용약관 개인정보 수집 및 이용약관 개인정보 수집 및 이용약관 개인정보 수집 및 이용약관 개인정보 수집 및 이용약관 개인정보 수집 및 이용약관</p>
                </div>
                <div className="form-group">
                  <div className="form-control" onClick={e => this.ShowTerm(1)} style={{cursor:"pointer"}}>
                    <span>개인정보 수집 및 이용약관</span>
                    <span className="icon_state_1" style={{width: "12px", marginRight: "12px", float: "right"}} ><img src="/default/images/icon/open-collapsed.png" /></span>
                  </div>
                </div>
                <div id="ShowTerm_1" className="form-group" style={{display: "none"}}>
                    <p>레시피봄은 고객님의 개인정보를 중요시하며</p>
                    <p>"정보통신망 이용촉진 및 정보보호에 관한 법률"을 준수하고 있습니다.</p>
                    <br/>                
                    <p>개인정보의 수집,이용 목적</p>
                    <p>- 서비스 이용에 따른 본인식별, 가입의사 확인 서비스 이용</p>
                    <p>- 고지사항 전달, 불만처리 의사소통 경로 확보</p>
                    <p>- 신규 서비스 등 최신정보 안내 및 개인맞춤서비스 제공을 위한 자료</p>
                    <p>- 불량 회원 부정이용 방지 및 비인가 사용 방지</p>
                    <p>- 기타 원활한 양질의 서비스 제공 등</p>
                    <br/>
                    <p>수집하는 개인정보의 항목</p>
                    <p>- 기본 수집정보 : 성명, 아이디, 비밀번호, 생년월일, 이메일주소, 전화번호</p>
                    <br/>
                    <p>개인정보의 보유 및 이용기간</p>
                    <p>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 </p>
                    <p>지체 없이 파기합니다.</p>
                </div>
              </div>
              <br />
              <hr />
              {this.renderErrors()}
              {this.renderMessage()}
              <div style={{maxWidth: 360, margin: '30px auto'}}>
                <div className="form-group">
                  <button className="btn btn-default" defaultValue="3" onClick={ e => this.onSubmit(3) } >동의하고 가입하기</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
        );
    }
}

export default Join;