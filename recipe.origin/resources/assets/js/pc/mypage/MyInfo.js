import React, { Component } from 'react';
import Dates from '../common/Dates';
import Emails from '../common/Emails';
import Phones from '../common/Phones';
import { browserHistory } from 'react-router';

class MyInfo extends Component {
    constructor(props) {
        super(props);
        var user_id = "";
        if(!PROFILES){
            window.location.href = "/login";
            // browserHistory.push("/login");
            return false;
        } else {
            user_id = PROFILES.id;
        }

        this.state = {
            user:{
              name:'',
              username:'',
              slogan:'',
              birthday:'',
              gender:'',
              email: ''
            },
            userId:user_id,
            errors: {},
            hasError: false,
            message: null,
            years:[],
            images:{ 1:{url:''}},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getUser = this.getUser.bind(this)
        this.setUsers = this.setUsers.bind(this)
        this.thumbImages = this.thumbImages.bind(this)
        this.removeAvatar = this.removeAvatar.bind(this);
        this.addAvatar = this.addAvatar.bind(this);
        this.getUser()
    }

    getUser() {
    $('body').removeClass('menu-open')
      const { userId } = this.state;
      if(TOKENS){
        refreshToken()
        axios.get(`/api/v3/authenticated_user`,{params:{'token': ` ${TOKENS}`}})
            .then(response => {
                this.setUsers(response);
            })
            .catch(error => {
                if(error.response.status == 401){
                    alert('다시 로그인해야합니다.')
                    window.location.href = '/logout'
                }
            });
      }
    }

    setUsers(user){
        var _avatar = "";
        if(user.data.avatar != null) {
            if(user.data.avatar.includes("http")) {
                _avatar = user.data.avatar;
            } else {
                _avatar = CDN_URL + user.data.avatar;
            }
        }
        var _imgUrl = (<div className="preview_avatar" style={{borderRadius:'50%',height:'120px', width: '120px', position:'absolute',top:'-20px',left: '-20px', backgroundImage: `url(${_avatar})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}} />);
        this.setState({
            user: user.data,
            images: { 1:{url: _imgUrl }}
        });
    }
    
    //onchange
    onChange({name,value}){
        const {user} = this.state;
        user[name] = value;
        if(name == "year" || name == "month" || name == "date") {
            if(user.birthday != null || user.birthday != undefined) {
                var _birthday = user.birthday.split('-');
                if(name == "year") {
                    _birthday[0] = value;
                } else if (name == "month") {
                    _birthday[1] = value;
                } else if (name == "date") {
                    _birthday[2] = value;
                }
                user["birthday"] = `${_birthday[0]}-${_birthday[1]}-${_birthday[2]}`;
            }
        } else if (name == "phone_1" || name == "phone_2") {
            if(user.phone != null || user.phone != undefined) {
                var _phone1 = user.phone.substr(0, 3);
                var _phone2 = user.phone.substr(3, 10);
                if(name == "phone_1") {
                    _phone1 = value;
                } else if (name == "phone_2") {
                    _phone2 = value;
                }
                user["phone"] = _phone1+_phone2;
            }
        }
        this.setState({user});
    }

    onSubmit(e, isAvatarOnly = false) {
      const { user } = this.state;
      //validate password format
        if(user['new_password'] && user['new_password'].length > 0) 
        {
            if(!user['password']) {
                alert('비밀번호 정보 입력해주세요');
                $('[name="password"]').focus();
                return false;
            }

            if(this.checkPassword(user['password']) != true){
                // alert('3~15자 영 대소문자, 숫자,특수문자 조합하여 사용 가능 합니다 ');
                alert('암호가 유효한 형식이 아닙니다.')
                $('[name="password"]').focus();
                return false;
            }

            if(!user['new_password']) {
                alert('비밀번호 확인 정보 입력해주세요');
                $('[name="new_password"]').focus();
                return false;
            }

            if(user['new_password'] !== user['password_confirmation']) {
                alert('일치하지 않는 암호');
                $('[name="password_confirmation"]').focus();
                return false;
            }

            if(this.checkPassword(user['new_password']) != true){
                // alert('6~15자 영 대소문자, 숫자,특수문자 조합하여 사용 가능 합니다 ');
                alert('암호가 유효한 형식이 아닙니다.')
                $('[name="new_password"]').focus();
                return false;
            }
        }
        
        if(user['year'] || user['month'] || user['date']) 
        {
            if(user['birthday'] == null || user['birthday'] == undefined) 
            {
                if(!user['year']) {
                    alert('당신의 생일을 입력하십시오.');
                    return false;
                }
                if(!user['month']) {
                    alert('당신의 생일을 입력하십시오.');
                    return false;
                }
                if(!user['date']) {
                    alert('당신의 생일을 입력하십시오.');
                    return false;
                }
            }
        }

        if(user['phone_1'] || user['phone_2']) 
        {
            if(user['phone'] == null || user['phone'] == undefined) 
            {
                if(!user['phone_1']) {
                    alert('전화 번호를 입력하십시오.');
                    return false;
                }
                if(!user['phone_2']) {
                    alert('전화 번호를 입력하십시오.');
                    return false;
                }
            }
        }

        if(!isAvatarOnly) {
            const con = confirm('등록하시겠습니까?');
            if(con !==true) return false;
        }

      const { userId } = this.state

      axios.post('/api/v3/profile/'+userId, user, {headers:{
        'Authorization': `Bearer ${TOKENS}`
    }})
          .then(res => {
              if (res.status == 200) {
                  if(isAvatarOnly) {
                    this.setState({ message: '프로필 사진 등록이 완료되었습니다.' });
                    alert("프로필 사진 등록이 완료되었습니다.");
                  } else {
                    this.setState({ message: '정보수정이 완료되었습니다' });
                    alert("정보수정이 완료되었습니다");
                  }
                  $('html, body').animate({scrollTop: $('.block-gird-item').offset().top - 40}, 500);
                  localStorage.setItem('users', JSON.stringify(res.data)); 
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

    componentDidMount(){
        $(document).on('click', '.preview_avatar', function(){
            $('#avatar_preview_input').click();
        });
    }

    checkPassword(str)
    {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{3,}$/;
        return re.test(str);
    }

    verifyPhone(){

    }

    changeUser(){

    }

    addAvatar(){
        this.onSubmit(null, true);
    }

    removeAvatar(){
        var {images} = this.state;
        const { user } = this.state;

        images[1]['url'] = ""; 
        this.setState({images });
        user['avatar'] =  "";
        this.setState({user});
    }

    isImage(filename) {
      var ext = this.getExtension(filename);
      switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
      case 'jpeg':
          //etc
          return true;
      }
      return false;
  }

  handleClose(){
      window.history.go(-1);
  }

  //upload
  getExtension(filename) {
      var parts = filename.split('.');
      return parts[parts.length - 1];
  }

  thumbImages(e, index) {
      let reader = new FileReader();
      let file = e.target.files[0];
      //valid 
      if(this.isImage(file.name) !== true){
          alert('이미지 업로드하기');   
          return false;
      }
      //valid size
      if(file.size > 1024*1024*2){
          alert('파일 크기는 2MB를 초과 할 수 없습니다.');
          return false;
      }

      const { user } = this.state  
      const { images } = this.state     
      var _thisMyInfo = this;

      reader.onloadend = (e) => {            
            images[index]['url'] = (<div className="preview_avatar" style={{borderRadius:'50%',height:'120px', width: '120px', position:'absolute',top:'-20px',left: '-20px', backgroundImage: `url(${reader.result})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}} />)
            this.setState({ images });
            
            var data = {'file': reader.result };
            $.ajax({
                type: 'POST',
                url: '/api/v2/fileupload',
                data: data,
                success: function(response) {
                    if(response){
                        user['avatar'] =  'tmp/'+response.file;
                        _thisMyInfo.setState({user});
                        // _thisMyInfo.onSubmit(null);
                    } 
                },
                error: function(err) {
                    if (err.response) {
                    const errors = err.response.data
                    this.setState({ errors, hasError: true })
                }
                },
            });
      }

      this.setState({ user })        
      reader.readAsDataURL(file)   
  }
    
    render() {
        const { user } = this.state
        const { years } = this.state
        const { images} = this.state
        let avatar 
        let email 
        let email_id
        let email_host
        let phone
        let phone_1
        let phone_2
        let birthday
        let year
        let month
        let date
        if(user.email != undefined) {
          email = user.email.split('@')

          if(user.email_id) email_id = user.email_id
          else email_id = email[0]
          
          if(user.email_host) email_host = user.email_host
          else email_host = email[1]
        }
        if(user.phone){
            if(user.phone_1) phone_1 = user.phone_1
            else phone_1 = user.phone.substr(0,3)
          
            if(user.phone_2) phone_2 = user.phone_2
            else phone_2 = user.phone.substr(3,10)
        } 

        if(user.birthday){
          birthday = user.birthday.split('-')
          if(user.year) year = user.year
          else year = birthday[0] 

          if(user.month) month=user.month
          else month = birthday[1]
          
          if(user.date) date = user.date
          else date = birthday[2]
        }
        
        if(user.avatar != null) {
            if(user.avatar.includes("http")) {
                avatar = (<div className="preview_avatar" style={{borderRadius:'50%',height:'120px', width: '120px', position:'absolute',top:'-20px',left: '-20px', backgroundImage: `url(${user.avatar})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}} />)
            } else {
                avatar = (<div className="preview_avatar" style={{borderRadius:'50%',height:'120px', width: '120px', position:'absolute',top:'-20px',left: '-20px', backgroundImage: `url(${CDN_URL+user.avatar})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize:'cover'}} />)
            }
        } else {
            avatar = "";
        }

        if(images[1].url != "") { 
            avatar = images[1].url;
        } else {
            avatar = "";
        }

        
        return (
            <main className="site-main">
                <div className="container"> 
                    <div className="block-gird-item">
                        <div className="toobar">
                            <strong className="title pull-left">내 정보 관리</strong>
                        </div>
                        <div className="block-write">
                            {this.renderErrors()}
                            {this.renderMessage()}
                            <div className="block-title">
                                <span className="title">기본 정보 수정</span>
                                <span style={{display:"none"}} className="subtitle pull-right">닫기</span>
                            </div>
                            <div className="block-content">
                                <div className="row form-group">
                                    <div className="col-xs-2">
                                        <label className="label">닉네임</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input 
                                            type="text" 
                                            value={user.name || ''} 
                                            name="name" 
                                            className="form-control" 
                                            onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } autoFocus />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-xs-2">
                                        <label className="label">아이디</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" name="username" value={user.username || ''} className="form-control" disabled />
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-xs-2">
                                        <label className="label">성별</label>
                                    </div>
                                    <div className="col-xs-5">
                                        <label className="radio">
                                            <input type="radio" name="gender" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } value="m" checked={user.gender == "m"} />
                                            <span>남자</span>
                                        </label>
                                    </div>
                                    <div className="col-xs-5">
                                        <label className="radio">
                                            <input type="radio" name="gender" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } value="f" checked={user.gender == "f"} />
                                            <span>여자</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    {/* date */}
                                    <Dates onChange={this.onChange} year={year} month={month} date={date} />
                                </div>
                                <div className="row form-group">
                                    {/* email */}
                                    <Emails onChange={this.onChange} email_id={email_id} email_host={email_host} disable_input="disabled" />
                                </div>
                                <div className="row form-group">
                                    <Phones onChange={this.onChange} phone_1={phone_1} phone_2={phone_2} />
                                </div>
                                <div className="row form-group">
                                    <div className="col-xs-2">
                                        <label className="label">포인트 적립 현황</label>
                                    </div>
                                    <div className="col-xs-10">
                                        <input type="text" name="total_point" value={user.total_point || '0'} className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="block-title">
                                <span className="title">프로필 사진 변경</span>
                                <span style={{display:"none"}} className="subtitle pull-right">닫기</span>
                            </div>
                            <div className="block-content">
                                <div className="row form-group">
                                    <div className="addphoto">
                                        <div className="photo" >
                                                <input id="avatar_preview_input" type="file" name="file" onChange={(e)=>this.thumbImages(e,1)} style={{opacity:0,position:'absolute',width:'120px',height:'120px',top: '-20px', left:'-20px'}}/>
                                                {avatar}
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-inline btn-sm" onClick={this.removeAvatar} >기존 사진 삭제</button>
                                            <button className="btn btn-default btn-sm" onClick={this.addAvatar} >사진 저장</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="block-title">
                                <span className="title">한 줄 소개</span>
                                <span style={{display:"none"}} className="subtitle pull-right">닫기</span>
                            </div>
                            <div className="block-content">
                                <div className="row form-group">
                                    <input             
                                        type="text" 
                                        name="slogan" 
                                        value={user.slogan || ''} 
                                        placeholder="한 줄 소개를 입력해주세요"
                                        required={true} 
                                        onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } 
                                        className="form-control" />
                                </div>
                            </div>
                            <div className="block-title">
                            <a  href="https://store.bom.co.kr/mypage/my_page_password.php">
                                <span className="title">비밀번호 변경을 위해 여기를 눌러주세요</span>
                            </a>
                            </div>

                             {/* <div className="block-title">
                                <span className="title">비밀번호 변경</span>
                                <span style={{display:"none"}} className="subtitle pull-right">닫기</span>
                            </div>
                            <div className="block-content">
                                <div className="row form-group">
                                    <input type="password" name="password" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } className="form-control" id="form7" placeholder="기존 비밀번호" />                        
                                </div>
                                <div className="row form-group">
                                    <input type="password" name="new_password" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) } className="form-control" id="form8" placeholder="신규 비밀번호" />                        
                                </div>
                                <div className="row form-group">
                                    <input type="password" name="password_confirmation" className="form-control" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }  id="form9" placeholder="비밀번호 확인" />                        
                                </div>
                                <p className="note">6~15자 영 대소문자, 숫자,특수문자 조합하여 사용 가능 합니다 </p>
                            </div> */}
                            <div className="block-content">
                                <div className="row form-group">
                                    <div className="col-xs-12 text-center">
                                        <button className="btn btn-default" onClick={this.onSubmit} type="button">정보 수정</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default MyInfo;