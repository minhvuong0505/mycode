import React, { Component } from 'react';
import { Link } from 'react-router/lib';
import Phones from '../common/Phones';
import Emails from '../common/Emails';

class FindId extends Component {
    constructor(props){
        super(props)

        this.state = {
            user:{
                auth_type:'phone'
            },
            pass:{
                auth_type:'phone',
                token:''
            },
            results:[],
            errors: {},
            hasError: false,
            message: null,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangePass = this.onChangePass.bind(this);
        this.onSubmitPass = this.onSubmitPass.bind(this);

        this.authCode = this.authCode.bind(this)
        this.confirmVerify = this.confirmVerify.bind(this)

        this.changePassword = this.changePassword.bind(this)
    }

    //onchange
    onChange({name,value}, e){
        const {user} = this.state;
        if(e != null) {
            e.preventDefault();
        }
        user[name] = value;
        this.setState({user});
        if(user[name] == 'email'){
            $('.email').show()
            $('.phone').hide()
        } 
        else if(user[name] =='phone'){
            $('.phone').show()
            $('.email').hide()
        } 
    }

    onChangePass({name,value}){
        const {pass} = this.state;

        pass[name] = value;
        this.setState({pass});
        if(pass[name] == 'email'){
            $('.pass_email').show()
            $('.pass_phone').hide()
        } 
        else if(pass[name] =='phone'){
            $('.pass_phone').show()
            $('.pass_email').hide()
        } 
    }

    componentDidMount(){
        let url = window.location.pathname
        
        if(url == '/find_id'){
            $('ul li a#t1').click()
        }else{
            $('ul li a#t2').click()
        }
    }

    onSubmit() {
      const { user } = this.state
      
      if(!user['name']){
          alert('아이디 정보 입력해주세요')
          return false
      }

      if(user['auth_type'] == 'phone'){
        if(!user['phone_1'] || !user['phone_2']){
            alert('CellPhone 정보 입력해주세요')
            return false
          }
          user['phone'] = user['phone_1'] + user['phone_2'] 
      }else{
        if(!user['email_id'] || !user['email_host']){
            alert('이메일 정보 입력해주세요')
            return false
        }
        user['email'] = user['email_id'] + '@' + user['email_host']
      }
      
      const con = confirm(' 등록하시겠습니까?')
      if(con !==true) return false

      console.log(user)

      axios.post('/api/v3/user/find/id', user)
          .then(res => {
              if (res.status === 200) {
                  this.setState({ message: res.data.message })   
                  //if found redirect to completed page
                  if(res.data.message != "Not found id"){
                    $('.completed').show()
                    $('.find').hide()
  
                    //set two record 
                    this.setResults(res.data)
                  }
                 
              } else {
                  return res;
              }
          })
          .catch(err => {
                
              if (err.response) {
                  const errors = err.response.data
                  
                  this.setState({ errors, hasError: true })
              }
          })

      return false
  }

  onSubmitPass() {
    const { pass } = this.state
    
    if(!pass['name']){
        alert('아이디 정보 입력해주세요')
        return false
    }

    if(pass['auth_type'] == 'phone'){
      if(!pass['phone_1'] || !pass['phone_2']){
          alert('CellPhone 정보 입력해주세요')
          return false
        }
        pass['phone'] = pass['phone_1'] + pass['phone_2'] 
    }else{
      if(!pass['email_id'] || !pass['email_host']){
          alert('이메일 정보 입력해주세요')
          return false
      }
      pass['email'] = pass['email_id'] + '@' + pass['email_host']
    }
    
    const con = confirm(' 등록하시겠습니까?')
    if(con !==true) return false

    console.log(pass)

    axios.post('/api/v3/user/find/pwd', pass)
        .then(res => {
            if (res.status === 200) {
                this.setState({ message: res.data.message })   
                //set token
                pass['token'] = res.data.token
                this.setState({pass})
                
                //if found redirect to completed page
                if(res.data.message != "User not found"){
                  $('.result_pass').show()
                  $('.find_pass').hide()      
                }
               
            } else {
                return res;
            }
        })
        .catch(err => {
            if (err.response) {
                const errors = err.response.data
                
                this.setState({ errors, hasError: true })
            }
        })

        return false
    }

    setResults(results){
        console.log(results)
        this.setState({ results: results })
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
                <p>{this.state.errors.message}</p>
            </div>
        )
    }

    authCode(){
        const { pass } = this.state

        if(pass['auth_type'] == 'phone'){
            if(!pass['phone_1'] || !pass['phone_2']){
                alert('CellPhone 정보 입력해주세요')
                return false
                }
                pass['phone'] = pass['phone_1'] + pass['phone_2'] 
            }else{
            if(!pass['email_id'] || !pass['email_host']){
                alert('이메일 정보 입력해주세요')
                return false
            }
            pass['email'] = pass['email_id'] + '@' + pass['email_host']
        }
        
        const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false
    
        console.log(pass)
        axios.post('/api/v3/user/find/pwd/get-auth', pass, {headers:{
            'Authorization': `Bearer ${pass['token']}`
        }})
            .then(res => {
                if (res.status === 200) {
                    this.setState({ message: res.data.message })   
                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
            })
    }

    confirmVerify(){
        const { pass } = this.state
        
        if(!pass['auth_code']){
            alert('인증번호 입력')
            return false
        }

        const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false
    
        console.log(pass)
        axios.post('/api/v3/user/find/pwd/auth', pass, {headers:{
            'Authorization': `Bearer ${pass['token']}`
        }})
            .then(res => {
                if (res.status === 200) {
                    this.setState({ message: '성공을 확인하다' })  //verify successfully
                    
                    pass['token'] = res.data.token
                    this.setState({pass})

                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
            })
    }

    changePassword(){
        const { pass } = this.state
        
        if(!pass['password']){
            alert('비밀번호 정보 입력해주세요')
            return false
        }
        
        if(!pass['password_confirmation']){
                alert('비밀번호 재확인 정보 입력해주세요')
                return false
        }
        const con = confirm(' 등록하시겠습니까?')
        if(con !==true) return false
    
        console.log(pass)
        axios.post('/api/v3/user/find/pwd/change', pass, {headers:{
            'Authorization': `Bearer ${pass['token']}`
        }})
            .then(res => {
                if (res.status === 200) {
                    this.setState({ message: res.data.message })   
                } else {
                    return res;
                }
            })
            .catch(err => {
                if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
            })
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

    showChangePass(){
        $('.change_password').show()
        $('.result_pass').hide()
    }

    render() {
        const { results } = this.state
        const { pass } = this.state
        let res 
        if(pass.auth_type == 'phone'){
            res = (
                <div className="row res_phone">
                    <Phones onChange={this.onChangePass} phone_1={pass.phone_1} phone_2={pass.phone_2}/> 
                    <div className="col-xs-4">
                        <button className="btn btn-second btn-sm" type="button" onClick={this.authCode}>인증 받기</button>
                    </div>
                </div>
                
            )
        }else{
            res = (
                <div className="row res_email">
                    <div className="col-xs-8"><input className="form-control" value={ pass.email } /></div>
                    <div className="col-xs-4">
                        <button className="btn btn-second btn-sm" type="button" onClick={this.authCode}>인증 받기</button>
                    </div>
                </div>
            )
        }    

        return (
            <main className="site-main">
        <div className="block-myform block-loginfind">
          <div className="block-title mypage-heading">
            <Link to="/login" className="back"></Link>
            <span className="title">회원가입</span>
          </div>
          {this.renderErrors()}
          {this.renderMessage()}
          <div className="block-content">
            <ul className="nav" role="tablist">
              <li role="presentation" className="active"><a id="t1" href="#tab1" role="tab" data-toggle="tab">아이디 찾기</a></li>
              <li role="presentation"><a href="#tab2" id="t2" role="tab" data-toggle="tab">비밀번호 찾기</a></li>
            </ul>
            <div className="tab-content find">
              <div role="tabpanel" className="tab-pane active" id="tab1">
                <div className="text-center">
                  <label className="radio" style={{display: "none"}}>
                    <input name="auth_type" id="optionsRadios1" defaultValue="phone" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}, e) } type="radio" />
                    <span>핸드폰 정보로 찾기</span>
                  </label>
                  <label className="radio">
                    <input name="auth_type" id="optionsRadios2" defaultValue="email" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}, e) } type="radio" defaultChecked />
                    <span>이메일 정보로 찾기</span>
                  </label>
                </div>
                <div className="form-group">
                  <input name="name" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="이름" type="text" />
                </div>
                <Phones onChange={this.onChange} displayStyle="none" />
                {/* email find */}
                <div className="" >
                    <Emails onChange={this.onChange}/>
                </div>
                <button className="btn btn-default" onClick={ this.onSubmit }>확인</button>
              </div>

           
            {/* find password */}
              <div role="tabpanel" className="tab-pane find_pass" id="tab2">
              <div className="text-center">
                  <label className="radio" style={{display:"none"}}>
                    <input name="auth_type2" id="optionsRadios1" defaultValue="phone" onChange={ e => this.onChangePass({ name: "auth_type", value:e.target.value}) } type="radio" disabled />
                    <span>핸드폰 정보로 찾기</span>
                  </label>
                  <label className="radio">
                    <input name="auth_type2" id="optionsRadios2" defaultValue="email" onChange={ e => this.onChangePass({ name: "auth_type", value:e.target.value}) } defaultChecked type="radio" />
                    <span>이메일 정보로 찾기</span>
                  </label>
                </div>
                <div className="form-group">
                  <input name="username" onChange={ e => this.onChangePass({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="아이디" id="form2" type="text" />
                </div>
                <div className="form-group">
                  <input name="name" onChange={ e => this.onChangePass({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="이름" type="text" />
                </div>
                <div className="pass_phone" style={{display:'none'}}>
                    <Phones onChange={this.onChangePass}/>
                </div>
                <div className="pass_email">
                    <Emails onChange={this.onChangePass} />
                </div>
                <button className="btn btn-default" onClick={ this.onSubmitPass } >확인</button>
              </div>
            </div>
            {/* result search pw */}
            <div role="tabpanel" className="tab-pane active result_pass" id="tab2" style={{display:'none'}}>
                <div className="result-text">
                <strong className="title">아이디 확인&lt;</strong>
                <div className="subtitle">
                    아이디 확인 아이디 조회결과 입력하신 정보와 일치하는 정보는 아래와 같습 니다. 가입정책 변경으로 인하여 신규회원
                </div>
                </div>
                {res}
                <div className="row">
                <div className="col-xs-8">
                    <div className="form-group">
                    <input name="auth_code" onChange={ e => this.onChangePass({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="인증번호 입력" type="text" />
                    </div>
                </div>
                <div className="col-xs-4">
                    <button className="btn btn-default btn-sm" type="button" onClick={this.confirmVerify} >확인</button>
                </div>
                </div>
                <button className="btn btn-default" onClick={this.showChangePass}>로그인</button>
            </div>

            {/* change pass form */}
            <div role="tabpanel" className="tab-pane active change_password" id="tab2" style={{display:'none'}}>
                <div className="result-text">
                <strong className="title">아이디 확인&lt;</strong>
                <div className="subtitle">
                    아이디 확인 아이디 조회결과 입력하신 정보와 일치하는 정보는 아래와 같습 니다. 가입정책 변경으로 인하여 신규회원
                </div>
                </div>
                
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                        <input type="password" name="password" onChange={ e => this.onChangePass({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="인증번호 입력" type="text" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                        <input type="password" name="password_confirmation" onChange={ e => this.onChangePass({ name:e.target.name, value:e.target.value}) } className="form-control" placeholder="인증번호 입력" type="text" />
                        </div>
                    </div>
                </div>
                <button className="btn btn-default" onClick={this.changePassword}>로그인</button>
            </div>

            {/* result find id */}
            <div className="tab-content completed" style={{display:'none'}}>
                <div role="tabpanel" className="tab-pane active" id="tab1">
                <div className="result-text">
                    <strong className="title">아이디 확인&lt;</strong>
                    <div className="subtitle">
                    아이디 확인 아이디 조회결과 입력하신 정보와 일치하는 정보는 아래와 같습 니다. 가입정책 변경으로 인하여 신규회원
                    </div>
                </div>
                {results.map((res,index) => {
                    return <div key={`res-${index}`} className="form-group group-result">
                    <p className="form-control"> {res.username}({res.created_at.substr(0,10)}) </p>
                </div>
                })}

                <button className="btn btn-default">확인</button>
                </div>
                <div role="tabpanel" className="tab-pane" id="tab2">
                    
                <Link to="/login" style={{lineHeight:'10vw'}} className="btn btn-default">로그인</Link>
                </div>
            </div>
          </div>
        </div>
      </main>
        );
    }
}

export default FindId;