import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Comments from '../Comments';
import Countdown from 'react-countdown-now';
import { Link } from 'react-router/lib';
import {FacebookShareButton} from 'react-share';
import LocalizedStrings from 'react-localization';

// Random component
const Completionist = () => <span>00:00</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {

  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span> {minutes} : {seconds}</span>; 
  }
};


class RecipeDetail extends Component {
    constructor(props) {
      super(props);
      let strings = new LocalizedStrings({
        en:{
          title:'View recipes',
          lang:'Languages',
          pumkin:'Homemade pumpkin cookies',
          material:'Material infomation',
          video:'recipe video',
          cook:'Cooking order',
          relation: 'Relationship products',
          label_sub_preparetime: 'Ready Time',
          label_sub_cookingtime: 'Cook Time',
          recipe_video_text: 'Recipe video'
        },
        it: {
          title:'레시피 보기',
          lang:'언어 선택',
          pumkin:'수제 호박 쿠키',
          material:'재료안내',
          video:'레시피 영상',
          cook:'조리순서',
          relation:'이 레시피와 비슷해요',
          label_sub_preparetime: '준비시간',
          label_sub_cookingtime: '조리시간',
          recipe_video_text: '레시피 영상'
        },
        cn: {
          title:'食谱视图',
          lang:'选择语言',
          pumkin:'自制南瓜饼干',
          material:'材料指南',
          video:'食谱视频',
          cook:'烹饪顺序',
          relation: '这与食谱相似',
          label_sub_preparetime: '准备时间',
          label_sub_cookingtime: '烹饪时间',
          recipe_video_text: '食谱视频'
        }
      });

      this.state = {   
          detail:{
            user: {
                avatar:''
            },
            cate_detail:{
              title:''
            },
            op_function:{
              title:''
            },
            tags:'',

          },
          optionsCount: 0,
          options: {},
          time:0,
          mins : [1,2,3,4,5,6,7,8,9,10],
          secs : [0,1,2,3,4,5,6,7,8,9,10],
          saving:false,
          recipeId: props.routeParams.id,
          relations:[],
          collapsed: true,
          profiles: PROFILES,
          userId:'',
          user:'',
          count_talk:0,
          count_heart:0,
          languages:strings,
          type_lang:'it'
      };

	  this.getRecipe()
	  //this.pushView()
    this.getUser();
      this.handleAddWish = this.handleAddWish.bind(this)
      this.handleTime = this.handleTime.bind(this)
      this.handeReset = this.handeReset.bind(this)
      this.toggleDeviceAwake = this.toggleDeviceAwake.bind(this);
    }

    pushView(){
      const { detail } = this.state
      const { recipeId } = this.state
      let user_id = 0
      if(PROFILES) user_id = PROFILES.id

      let data = {
          object_id: recipeId,
          type: 'View',
          object_type:'Post',
          author_id: user_id,
          user_id: user_id,
          action: 1
      }

      let header
      if(user_id != 0) header = {headers:{
        'Authorization': `Bearer ${TOKENS}`
      }}
      else header = ('')
	    console.log(data) 

      //refreshToken()
      axios.put(`/api/v3/reactions/view`, data, header)
          .then(response => {
              if (response.status === 200) {
				this.getRecipe()
              }
              this.setState({saving: true});
          })
          .catch(error => {
            if(error.response.data.message == '토큰이 블랙리스트에 올랐습니다.'){
				      console.log('black list')
              // localStorage.removeItem('tokens')
            } 
			    if(error.response.data.status_code == 401 || error.response.data.status_code == 500){
                alert('다시 로그인해야합니다.')
                window.location.href = '/logout?redirect_url=recipe/'+recipeId+'/detail'
            }
          });
    }

    componentDidMount(){
      this.pushView();
      this.getRelatioship();
      this.getUser();
      axios.get('/api/v1/options')
      .then((res)  => {
          this.setState({ 
            optionsCount: res.data.meta.total_count,
            options: res.data.result 
          });
      })
      .catch((err) => {
          console.log(err)
      });
      window.scrollTo(0, 0);
      this.loadScript("nosleep_js", "/default/js/NoSleep.min.js");
      
      $(document).ready(function(){
        if(typeof(NoSleep) == "function")
        { 
          window.noSleep = new window.NoSleep();
          window.isEnableNoSleep = false;
          window.noSleep.disable();
        } else {
          setTimeout(() => {
            window.noSleep = new window.NoSleep();
            window.isEnableNoSleep = false;
            window.noSleep.disable();
          }, 1000);
        }
      });
    }
    
    getCateTitle()
    {
      const {detail} = this.state;
      const {languages} = this.state;
      let {type_lang} = this.state;
      let lang = localStorage.getItem('lang');
      if(lang) type_lang = lang;
      languages.setLanguage(type_lang);

      var _text = detail.cate_detail.title;
      if (type_lang == "en") {
          _text = (detail.cate_detail.title_en != null) ? detail.cate_detail.title_en : detail.cate_detail.title;
      } else if (type_lang == "cn") {
          _text = (detail.cate_detail.title_cn != null) ? detail.cate_detail.title_cn : detail.cate_detail.title;
      }
      return _text;
    }

    toggleDeviceAwake()
    {
      console.log("Call toggleDeviceAwake");
      if(typeof(window.noSleep) != "undefined") 
      {
        if(window.isEnableNoSleep) {
          window.noSleep.disable();
          $('.toggleAwake.messenger').removeClass("enable");
        } else {
          window.noSleep.enable();
          $('.toggleAwake.messenger').addClass("enable");
        }
        window.isEnableNoSleep = !window.isEnableNoSleep;
      }
    }

    loadScript(id, url) 
    {
        const existingScript = document.getElementById(id);

        if (!existingScript) {
            var date = new Date();
            var timestamp = date.getTime();
            const script = document.createElement('script');
            script.src = url+"?v="+timestamp;
            script.id = id; 
            document.body.appendChild(script);
        }
    }

    componentWillReceiveProps(nextProps) {
      const {recipeId} = this.state;
      if(recipeId != nextProps.params.id) {
        this.setState({recipeId: nextProps.params.id});
        this.pushView();
        this.getRelatioship();
        $('html, body').animate({
          scrollTop: 0
        }, 0);
      }

    }

    getRelatioship(){
      const { recipeId } = this.state
      const { detail } = this.state
      console.log(detail)

       axios.get(`/api/v3/recipes/relation/`+recipeId)
          .then(response => {
              this.setRelation(response.data);
          })
          .catch(error => {
              console.log(error);
          });
    }

    setRelation(relations) {   
        this.setState({ relations:relations['result'] });
    }

    async getRecipe(){
      const { recipeId } = this.state;

      await axios.get(`/api/v1/post?embeds=user%2Ccate_detail%2Cop_function%2Cop_difficulty&filters=status=1,id=${recipeId}`)
          .then(response => {
              this.setDetail(response.data);
          })
          .catch(error => {
              console.log(error);
          });
    }

    setDetail(detail) {   
        this.setState({ detail:detail['result'][0] });
        this.getRelatioship();
    }

    renderSlideTop(banners){
      let bannerss = [];
      banners.map((banner, index) => {
        if(banners[index].images){
          if(bannerss[index] == undefined){
            bannerss[index] = {}
          }
          bannerss[index]['images'] = banners[index].images;
        }
      })

      return <Carousel showArrows={true} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
          {bannerss.map((banner, index) => {
            if(banners[index].images){
              return <div key={`banner-${index}`}>
              <img src={CDN_URL+`${banner.images}`} alt="img" />
              </div>
            }
          })}
      </Carousel>

    }

    changeLang({name,value}){
      console.log(value)
      this.setState({type_lang:value});
      localStorage.setItem('lang', value); 
    }

    renderSlideStep(steps){
        return <Carousel showArrows={false} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
            {Object.keys(steps).map((step, index) => {
				let img 
				if(steps[step].images) img = (<img src={CDN_URL+`${steps[step].images}`} alt="img" />)
                return <div key={`step-${index}`} className="item">
					{img}
                </div>
            })}
        </Carousel>
      }

    handleBack(){
      window.history.go(-1);
    }

    handleAddWish(){ 
      if(!PROFILES) {
        alert('아직 로그인하지 않았습니다.')
        return false
      }
      
      const con = confirm('레시피를 찜하시겠습니까?')
      if(con !== true) return false

      const { detail } = this.state
	    const { saving } = this.state
	  
      let action = 1
      if(saving === true){
        //unlike
        action = 0
	    } 
      //if(saving === true) action = 0 
      let data = {
          object_id: detail.id,
          type: 'Like',
          object_type:'Post',
          action: action,
          author_id: detail.user.id
	    }

	    const { recipeId } = this.state
      //request new token
      refreshToken()
      axios.put(`/api/v3/reactions/react`, data, {headers:{
        'Authorization': `Bearer ${TOKENS}`
      }})
          .then(response => {
              if (response.status === 200) {
                //alert(response.data.message)
                this.getRecipe()
              }
              if(saving == false)
                this.setState({saving: true});
              else
              this.setState({saving: false});
          })
          .catch(error => {
			  if(error.response.data.status_code == 401){
                alert('다시 로그인해야합니다.')
                window.location.href = '/logout?redirect_url=recipe/'+recipeId+'/detail'
              }

			});
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


    handleTime(){
    this.setState({ time: 300000 })
    }

    handeReset(){
    this.setState({ time: 0 })
    this.handleTime()
    }

    shareFaceBook(url, img, title){
      var link = 'https://facebook.com/sharer/sharer.php?u=' + encodeURI(url) + '&picture=' + img + '&t=' + title;
      window.open(link, '_blank', 'menubar=no,toolbar=no,resizable=no,scrollbars=no, width=600,height=600');
    }

    shareTw(url, img, title){
      var link = 'https://twitter.com/intent/tweet?source=webclient&url=' + encodeURI(url) + '&text=' + title;
      window.open(link, '_blank', 'menubar=no,toolbar=no,resizable=no,scrollbars=no, width=600,height=600');
    }

    getOptionTitle(_id)
    {
      const {optionsCount} = this.state;
      const {options} = this.state;
      const _optionsArray = Object.values(options);
      const {languages} = this.state;
      let {type_lang} = this.state;
      let lang = localStorage.getItem('lang');
      if(lang) type_lang = lang;
      languages.setLanguage(type_lang);

      for(var i = 0; i < optionsCount; i++) {
        if(_optionsArray[i].id == _id) {
          var _text = _optionsArray[i].title;
          if (type_lang == "en") {
              _text = (_optionsArray[i].title_en != null) ? _optionsArray[i].title_en : _optionsArray[i].title;
          } else if (type_lang == "cn") {
              _text = (_optionsArray[i].title_cn != null) ? _optionsArray[i].title_cn : _optionsArray[i].title;
          }
          return _text;
        }
      }
      return "";
    }

    getUser() {
      const { profiles } = this.state
     
  
      let userId
      if(profiles)
       userId = profiles.id || ''
      else
       userId = ''
  
      axios.get(`/api/v1/user?filters=status=1,id=${userId}`)
          .then(response => {
              this.setUser(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  
          if(userId){
            axios.get('/api/v1/talk?metric=count&filters=status=1,user_id='+userId)        
            .then((res)  => {
                this.setCountTalk(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
  
            axios.get('/api/v1/post?metric=count&filters=status=1,user_id='+userId)        
            .then((res)  => {
                this.setCountHeart(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
          }
    }
    
    setCountTalk(count_talk) {   
      this.setState({ count_talk:count_talk['result']}); 
    }
    
    setCountHeart(count_heart) {   
      this.setState({ count_heart:count_heart['result']}); 
    }
    
    setUser(user) {   
      this.setState({ user:user['result'][0]}); 
    }
    
    handleLogin(){
      alert('please login!')
      return false
    }
  
    handleMenu(){
      $( '.toggle-menu' ).toggleClass('active');
      $(".header-nav").toggleClass("active");
      $("body").toggleClass("menu-open");
      return false;
    }
  
    handleCl(){
      $("[data-action='toggle-nav']").removeClass('active');
      $(".header-nav").removeClass("active");
      $("body").removeClass("menu-open");
      return true;   
    }
  
    handelSetting(){
      $("[data-action='toggle-setting']").toggleClass('active');
      $(".header-setting").toggleClass("active");
      $("body").toggleClass("menu-open");
      return false;
    }
  
    handleSearch(e){
      $('#cl').toggleClass('active');
      $(".main-search").toggleClass("active");
      //$("body").toggleClass("search-open");
      return false;
    }
  
    handleClNav(){
      $("[data-action='toggle-nav']").removeClass('active');
      $(".header-nav").removeClass("active");
      $("body").removeClass("menu-open");
      return false;
      
    }
  
    handleClose(){
      $(".main-search").removeClass('active');
      $(".header-search1 .action-filter").removeClass('active');
      $("body #cl").removeClass("active");
      $("body").removeClass("search-open"); 
      return false;
    }
  
    render() {
		  const { detail } = this.state
		  const { time } = this.state
		  const { mins } = this.state
		  const { secs } = this.state
      const { recipeId } = this.state
      const { relations } = this.state

      const {languages} = this.state;
      let {type_lang} = this.state;
      let lang = localStorage.getItem('lang');
      if(lang) type_lang = lang;
      languages.setLanguage(type_lang);

      let shareUrl = window.location.href;
      let img = "https://cdn.freetalk.info/uploads/posts/images/20181004/5bb55a2de27c6.jpeg";
      let title = "test page";

		  if(detail ==  undefined) window.location.href = "/404"
      var _cateLink = "/cats"; // cat id = 20  
      if(detail.cate_detail.id == 3) {
        // dog id = 3
        _cateLink = "/dogs";
      }
        let materials
        if(detail.materials != undefined){
            materials = JSON.parse(detail.materials)
        }else{
            materials = {}
        }

        let steps
        if(detail.steps != undefined){
            steps = JSON.parse(detail.steps)
        }else{
            steps = {}
        }


      let bannerTop = []
      var thumbVideo = "";
      
      if(detail.cooking_representation){
        bannerTop = JSON.parse(detail.cooking_representation)
        if(bannerTop[0].images != null || bannerTop[0].images != undefined) {
          thumbVideo = "/uploads/"+bannerTop[0].images;
        }
      }

      let _avatarImg = "/html/images/media/img2.jpg";
        
      if(detail.user.avatar != "" && detail.user.avatar != null) {
          if(detail.user.avatar.includes("http") || detail.user.avatar.includes("https")) {
              _avatarImg = detail.user.avatar;
          } else {
              _avatarImg = CDN_URL + detail.user.avatar;
          }
      }
      let tags = detail.tags.split(',') || [];

      //video
      let video = "";
      let videoStyle = {display:"none"};
      if(detail['videos'] != undefined && detail['videos'] != "[]") {
        video = (<a data-fancybox href={detail['videos']}>
          <div style={{position:"relative",backgroundImage: "url("+thumbVideo+")",backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", display:"block",width:"96vw",height:"60vw",margin:"auto"}}>
            <div style={{backgroundImage: "url('/default/images/icon/playbutton.jpg')",backgroundPosition: "center", backgroundRepeat: "no-repeat",width:"100%",height:"100%"}}></div>  
          </div>
        </a>);
        videoStyle = {display:"block",paddingBottom:"2vw"};
      }
      //
      const { profiles } = this.state
      const { user } = this.state
      const {count_talk} = this.state
      const {count_heart} = this.state
      let block;
      let setting
      let avatar = (<img src="/default/images/media/avatar_blank.png" alt="img" />) 
      if(profiles){
         if(profiles.avatar) {
           if(profiles.avatar.includes("http")) {
            avatar = (<img src={`${profiles.avatar}`} alt="img" />);
           } else {
            avatar = (<img src={CDN_URL+`${profiles.avatar}`} alt="img" />);
           }
          }
      } 

      if(PROFILES != undefined){
        console.log(PROFILES);
        // var _profileName = "";
        // if(profiles )
        block = (<div className="nav-top">
            <div className="photo">
              {avatar}
            </div>
            <div className="content">
              <div className="title">
                <span>{PROFILES.name ? PROFILES.name : ""}</span>
                <Link to={`/myinfo`} style={{marginLeft: "1vw"}}>
                  <span className="label">정보수정</span>
                </Link>
                <Link to={`/logout`} style={{marginLeft: "1vw"}}>
                  <span className="label">로그아웃</span>
                </Link>
              </div>
              <div className="subtitle">{PROFILES.slogan || ''}</div>
              <div className="info">
                <span className="view">{user.total_view || 0}</span>
                <span className="wishlist">{user.total_like || 0}</span>
              </div>
            </div>
          </div>)

          setting = (<Link to="/setting">
            <img src="/html/images/icon/nav7.png"  alt="img" />
            <span>설정</span>
          </Link>)
      }else{
        block = (<div className="nav-top">
          <div className="title">
              <Link to="/login">
                <span className="label" >Login</span>
              </Link>
            
              <Link to="/register" style={{marginLeft:'10px'}}>
                <span className="label" >Join</span>
              </Link>

              </div>
          </div>)

        setting = (
            <Link><img src="/html/images/icon/nav7.png" alt="img"  />
            <span>설정</span></Link>
          )
      }
      //
      return (
            
      <main className="site-main">
        <nav className="header-nav" onClick={this.handleCl} > 
          <a href="#" className="close-nav" onClick={this.handleClNav} data-action="close-nav" />
          
          {block}
          <ul className="nav-gird">
            <li>
              <div className="info">
                <Link to="/dogs">
                  <img src="/html/images/icon/gird1.png" alt="img" />
                  <span>강아지용</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="info">
                <Link to="/cats">
                  <img src="/html/images/icon/gird2.png" alt="img" />
                  <span>고양이용</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="info">
                <Link to="/chefs">
                  <img src="/html/images/icon/gird3.png" alt="img" />
                  <span>멍냥셰프</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="info">                    
                <Link to="ranking"><img src="/html/images/icon/gird4.png" alt="img" />
                  <span>랭킹</span></Link>
              </div>
            </li>
            <li>
              <div className="info">
                <Link to="event"><img src="/html/images/icon/gird5.png" alt="img" />
                  <span>이벤트</span></Link>
              </div>
            </li>
            <li>
              <div className="info">
                <Link to="/talks">
                  <img src="/html/images/icon/gird6.png" alt="img" />
                  <span>멍냥토크</span>
                </Link>
              </div>
            </li>
          </ul>
          <ul className="nav-list">
            <li>
              <Link to="my_saw">
                <img src="/html/images/icon/nav1.png" alt="img" />
                <span>내가 본 레시피</span>
              </Link>
            </li>
            <li>
              <Link to="/my_recipes">
                <img src="/html/images/icon/nav2.png" alt="img" />
                <span>스크랩한 레시피</span>
                <span className="badge">{count_heart}</span>
              </Link>
            </li>
            <li>
              <Link to="/my_hearts">
                <img src="/html/images/icon/nav3.png" alt="img" />
                <span>하트 준 레시피</span>
              </Link>
            </li>
            <li>
              <Link to="/my_talks">
                <img src="/html/images/icon/nav4.png" alt="img" />
                <span>내가 쓴 토크</span>
                <span className="badge">{count_talk}</span>
              </Link>
            </li>
            <li>
            <Link to="/alarm">
                <img src="/html/images/icon/nav5.png" alt="img" />
                <span>알림</span>
                </Link>
            </li>
            <li>
            <Link to="/cscenter">
                <img src="/html/images/icon/nav6.png" alt="img" />
                <span>고객센터</span>
                </Link>
            </li>
            <li>
              {setting}
            </li>
          </ul>
        </nav>
        
        <div className="block-top1">
          {this.renderErrors()}
          {this.renderMessage()}
          <div className="img owl-carousel">
            {this.renderSlideTop(bannerTop)}
          </div>
          <a href="javascript:history.go(-1)"   />
          <a href="javascript:history.go(-1)" className="close" />
          {Object.keys(bannerTop).map((step, index) => {
            let img 
            if(bannerTop[step].video) img = (<a data-fancybox href={CDN_URL+`${bannerTop[step].video}`} className="video"><span>동영상</span></a>)
            return <div key={`step-${index}`} className="item">
              {img}
            </div>
          })}
          
          {/* <div className="pagination">2/5</div> */}
        </div>
        <div style={{position:"relative"}}>
            <div style={{position:"absolute", top: "2vw", right:"2vw"}}>
              <select className="form-control pull-right" value={type_lang} name="lang" onChange={(e) => this.changeLang({ name: e.target.name, value: e.target.value })} style={{marginLeft: 12}}>
                <option value="it">한국어</option>
                <option value="en">English</option>
                <option value="cn">Chinese</option>
              </select>
            </div>
            <div className="block-view2">
              <div className="img">
                <img src={_avatarImg} />
              </div>
              <div className="content">
                <div className="title">
                  <span>{ detail.user.name || ''}</span>
                  <strong>{ detail.desc || ''}</strong>   
                </div>
                
              </div>
            </div>
        </div>
        <div className="block-view3 block-view2" style={{display:'block'}}>
          <h2 className="title">{ detail.title }</h2>
          <div className="des">
            { detail.content }
          </div>
          <div className="info" style={{textAlign:'center',background:'#f4f4f4', margin:'5vw auto 0 auto', width:'40vw', padding:'6px',borderRadius:'30px'}}>
              <span className="view">{ detail.total_view}</span>
              <span className="wishlist" onClick={this.handleAddWish}>{ detail.total_like }</span>
              <span className="comment">{ detail.total_cmt || 0 }</span>
            </div>
        </div>
        <div className="block-view4">
          <ul>
            <li>
              <div className="info">
                <Link to={_cateLink} style={{color:"#fff"}}>{this.getCateTitle()}</Link>
              </div>
            </li>
            <li>
              <div className="info">
              <Link to={`/searchs?function=${detail.op_function.id}`} style={{color: "#fff"}}>{this.getOptionTitle(detail.function)}</Link>
              </div>
            </li>
            <li>
              <div className="info">
                <span className="icon"><img src="/html/images/icon/icon1.png" alt="img" /></span>{this.getOptionTitle(detail.difficulty)}
              </div>
            </li>
            <li>
              <div className="info">
              {languages.label_sub_preparetime} {this.getOptionTitle(detail.prepare_time)}
              </div>
            </li>
            <li>
              <div className="info">
              <Link to={`/searchs?cooking_time=${detail.cooking_time}`} style={{color:"#fff"}}>{languages.label_sub_cookingtime} {this.getOptionTitle(detail.cooking_time)}</Link>
              </div>
            </li>
          </ul>
        </div>
        

      {/* view 1 end */}

        <div className="block-view6">
          <div className="block-title">{languages.material}</div>
          <div className="block-content">
          {Object.keys(materials).map((material,index) => {
            let img = "";
            if(materials[material].images) img = (<img src={CDN_URL+`${materials[material].images}`} alt="img" />)

              return <div className="item" key={`material-${index}`}>
                    <a href="#">
                    {img}
                    <strong className="title">{materials[material].name}</strong>
                    <span className="subtitle"> {materials[material].quantity} {this.getOptionTitle(materials[material].unit)}</span>
                    </a>
                </div>
            })}
            </div>
        </div>

        {/* view 2 end */}
        <div className="block-view6" style={videoStyle}>
          <div className="block-title">{languages.recipe_video_text}</div>
          <div className="block-content">
            {video}
          </div>
        </div>
        <div className="block-top1" style={{display:"none"}}>
        <div className="img owl-carousel">
          {/* {this.renderSlideStep(steps)} */}
        </div>
        {/* <a href="#" className="back" />
        <a href="#" className="close" />
        <a href="#" className="messenger" /> */}
        
      </div>
      <div className="block-view6">
        <div className="block-title" style={{paddingBottom: "0px"}}>레시피 순서</div>
      </div>
        {Object.keys(steps).map((step,index) => {
          let img;
          if(steps[step].images) img = (<img src={CDN_URL+`${steps[step].images}`} alt="img" />);
          return <div key={`step-${index}`} className="block-view7"  style={{paddingBottom:'5vw'}}>
            <div className="block-title">{steps[step].name}</div>
              <div className="block-content">
                  <p>{img}</p>
                  {steps[step].content}
              </div>
            </div>
        })}

        <button className="btn btn-settime" style={{zIndex:'101'}} type="button" data-toggle="modal" data-target="#myModal"><span /></button>
       
        {/* view 3 end */}
        <div>
        <div className="block-top1 no-image" >
          <a href="javascript:history.go(-1)"  className="back" />
          <a className="close" href="#" />
          <a className="toggleAwake messenger" onClick={this.toggleDeviceAwake}/>
        </div>
        <div className="block-view8">
          <strong className="title">{detail.title}</strong>
          <span className="subtitle">By. {detail.user.name}</span>
          <div className="info">
              {tags.map((tag,index) =>{
                return  <span key={`tag-${index}`} ><Link to={`/searchs?tag=${tag}`} className="tag">#{tag}</Link></span>
              })} 
          </div>
        </div>
        <div className="block-view9">
          <div className="block-title">이 레시피와 비슷해요 :)</div>
          <div className="block-content">
            {relations.map((relate,index) => {
              let name = ''
              if(relate.user) name = relate.user.name
              return <div className="item" key={`relate-${index}`}>
              <Link to={`/recipe/${relate.id}/detail`}>
                <img src={CDN_URL+`${$.parseJSON(relate.cooking_representation)[0]['images']}`} alt="img" />  
                <strong className="title">{relate.title}</strong>
                <span className="subtitle">By. {name}</span>
              </Link>
            </div>
            })}
          </div>
        </div>

		{/* comment */}
        
      </div>
      <div className="">
        <div className="block-view5">
          <a href="#" className="gird toggle-menu" data-action="toggle-nav"></a>
          <div className="info">
            <span className="view">{ detail.total_view || 0}</span>
            <span className="wishlist" onClick={this.handleAddWish}>{ detail.total_like  || 0} </span>
            <span className="comment">{ detail.total_cmt || 0 }</span>
          </div>
          <span className="share" onClick={ e => this.shareFaceBook(shareUrl, img, title)}  />

          {/* <FacebookShareButton className="share" url={shareUrl} /> */}

        </div>
      </div>
	<div style={{paddingBottom:'30vw'}} >	<Comments object_type="Post" object_id={recipeId} total={detail.total_cmt} sort="id" redirect_url={`detail/${recipeId}/detail`}/>
</div>

      <div className="modal fade popup-settime in" id="myModal" tabIndex={-1} role="dialog" style={{display: 'none'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
                <h4 className="modal-title">쿠킹 타이머</h4>
              </div>
              <div className="modal-body">
                <div className="settime">
				  {/* <span id="minutes">{timer.min}</span><span>:</span><span id="seconds">{timer.sec}</span> */}
				  {/* <span>
					  <select className="form-control"  name="min" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }>                  
						{mins.map((m,i) => {
							return <option value={m} key={`i-${i}`}>{m}월</option>
						})}
					</select> : 
					<select className="form-control"  name="min" onChange={ e => this.onChange({ name:e.target.name, value:e.target.value}) }>                  
						{mins.map((m,i) => {
							return <option value={m} key={`i-${i}`}>{m}월</option>
						})}
					</select>
				</span> */}
				  <Countdown
				  		zeroPadLength={2}
						date={Date.now() + time}
						renderer={renderer}
					/>
                </div>
                <div className="actions">
                  <button className="btn btn-set" onClick={this.handleTime} type="button" />
                  <button className="btn btn-resert" onClick={this.handeReset} type="button" />
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>

    
        );
    }
}

export default RecipeDetail;