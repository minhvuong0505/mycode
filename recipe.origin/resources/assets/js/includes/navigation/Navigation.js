import React, { Component, PropTypes } from "react"
import { Link} from "react-router"
import MainSearch from "../../pages/MainSearch";
import {browserHistory} from 'react-router';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      profiles: PROFILES,
      userId:'',
      user:'',
      count_talk:0,
      count_heart:0,
      pathname : this.props.location.pathname,
      link: ''
	  };
	
    this.getUser()
    this.handelSetting = this.handelSetting.bind(this)

    var Android = navigator.userAgent.match(/Android/i);
    var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
	}
	
	componentDidAmount(){
    this.getUser();


    $(document).ready(function(){
      
      if ( Android == null && iOS == null) 
      {
        $('.header-content').css('margin-top',0); 
        $('.wrapper').css('padding-top',0); 
        
      }
      else
      {
        if (navigator.userAgent.match("Byapps"))
        {
          $('.header-content').css('margin-top',0); 
          $('.wrapper').css('padding-top',0); 
        }
        else
        {
          $('.header-content').css('margin-top','13vw');
          $('.wrapper').css('padding-top',"13vw"); 
          $('.banner-top').css('display','inline'); 
        }
        
      }

       
		
      });
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

  handleSearch(){
    $('#cl').toggleClass('active');
    $(".main-search").toggleClass("active");
    return false;
  }

  onChangeSearch({value}){
    this.setState({ link: '/searchs?keyword='+value });
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
  cookieReferer(data){
    var d = new Date();
    d.setTime(d.getTime() + (30*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "findrefer=" + window.location.url + ";" + expires + ";domain=.bom.co.kr;path=/";
    alert('통합로그인을 위해 스토어봄 페이지로 이동됩니다.');
    window.location.href = data;
  }
  
  SearchHandleKeyPress(e){
    var _v = $('#jmainsearch').val();
    if (e.key === 'Enter') {
      browserHistory.push(`/searchs?keyword=`+_v);
    }
  }

  linktoStore(){
    
      var Android = navigator.userAgent.match(/Android/i);
      var iOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
      if(Android != null) window.location.href = 'http://play.google.com/store/apps/details?id=com.recipebom.byapps';
      if(iOS != null) window.location.href = 'http://itunes.apple.com/kr/app/id1449439370?mt=8';
     
     
  }
  closeBanner()
  {
    $('.header-content').css('margin-top',0); 
    $('.banner-top').hide();
    $('.wrapper').css('padding-top',0); 
    
  }

  closeBannerLink()
			{
				$('.content_menu').fadeOut(400);
				$('#link-banner li').removeClass("active");
				$('#link-banner .icon-banner').each(function(v, i){
						var _src = $(this).attr('src');
						_src = _src.replace("hover","");
						$(this).attr('src', _src);
					});	
      }
      
  onclickBannerLink(name)
  {
      $('.content_menu').each(function(v, i){
        $(this).fadeOut(50);
      });
      
      $('#link-banner .icon-banner').each(function(v, i){
        var _src = $(this).attr('src');
        _src = _src.replace("hover","");
        $(this).attr('src', _src);       
      });
      $('#link-banner li').removeClass("active");
      
      $(this).addClass("active");
      var link = name + "hover.png";
      $('.'+ name +' img').attr('src','http://recipe.bom.co.kr/uploads/common/topmenu/'+name +"/"+ link );
      $("."+ name+"_content" ).fadeTo(500,1);
      
                
    
  }
  render() {
      const navClass = this.state.collapsed ? "collapse" : "";
	    const { profiles } = this.state
      const { user } = this.state
      const {count_talk} = this.state
      const {count_heart} = this.state
      let block, setting;
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
      var _userTotalView = 0;
      var _userTotalLike = 0;
      if(user != null && user.total_view != null) _userTotalView = user.total_view;
      if(user != null && user.total_like != null) _userTotalLike = user.total_like;
      if(PROFILES != undefined){
        block = (<div className="nav-top">
            <div className="photo">
              {avatar}
            </div>
            <div className="content">
              <div className="title">
                <p>{profiles.name}</p>
                <Link to={`/myinfo`} style={{marginLeft: "1vw"}}>
                  <span className="label">정보수정</span>
                </Link>
                <Link to={`/logout`} style={{marginLeft: "1vw"}}>
                  <span className="label">로그아웃</span>
                </Link>
              </div>
              <div className="subtitle">{profiles.slogan || ''}</div>
              <div className="info">
                <span className="view">{_userTotalView}</span>
                <span className="wishlist">{_userTotalLike}</span>
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
              {/* <Link to="/login"> */}
              <a href ='#' onClick= {() => this.cookieReferer('http://store.bom.co.kr/member/login.php')}>
                <span className="label"  >Login</span>
              </a>
              {/* </Link> */} 
            
              {/* <Link to="/register"  style={{marginLeft:'10px'}}> */}
              <a href='#' onClick= {() => this.cookieReferer('http://store.bom.co.kr/member/join_method.php')} style={{marginLeft:'10px'}}>
                <span className="label"  >Join</span>
              </a>
              {/* </Link> */}

              </div>
          </div>)

        setting = (
            <Link><img src="/html/images/icon/nav7.png" alt="img"  />
            <span>설정</span></Link>
          )
      }
      
        return (
            <div>
            <header className="site-header">
            <div className ="banner-top" style ={{display : 'none',width: "20vw", position: "fixed",  height: "13vw", backgroundColor:"#f44c44",zIndex: "199"}}>
              <img src="http://recipe.bom.co.kr/default/images/banner/m_close_icon.png" onClick={()=> this.closeBanner()} style={{ marginLeft : "2vw" ,position: "fixed",zIndex: "213",width: "8vw",  height: "16vw", backgroundColor: "#f44d45", top: "-0.9vw", right : "2vw"}}/>
              <img src="http://recipe.bom.co.kr/default/images/banner/m_banner.gif" onClick={()=>this.linktoStore()} style={{position: "fixed", zIndex: "200"}}/>
            </div>
            
              <div className="header-content" style={{marginTop:"0"}}>
                <strong className="logo">
                  <Link to="/"><img src="/html/images/logo.png" alt="logo" /></Link>
                </strong>
                { this.state.pathname == '/' ?
                (<div className="wrapsearch" style={{float: 'left', width:'38%', paddingLeft:'15px'}}>
                    <input type="text" className="form-control" id="jmainsearch" name="keyword" onKeyPress={this.SearchHandleKeyPress} onKeyUp={(e) => this.onChangeSearch({ value: e.target.value })} />
                </div>) : '' }
                <a href="#" className="toggle-menu" onClick={this.handleMenu} data-action="toggle-nav" />
                <div className="header-search1" style={{padding:'0px', border:'0px'}}>
                  { this.state.pathname != '/' ?
                      (<Link id="cl" className="action-filter btn-search" style={{paddingLeft:'0px'}} onClick={this.handleSearch()} />)
                    : (<Link id="cl" className="action-filter btn-search" style={{paddingLeft:'0px'}} to={`${this.state.link}`} />)
                  }
                </div>
              </div>

              <div className="header-content" style={{  marginTop: "15vw",position: "absolute",paddingLeft: 0,zIndex:1}}> 
                <div id="link-banner">
                    <nav>
                       <ul style={{display:"inline-flex"}}>
                      <li onClick={()=> this.onclickBannerLink('storebom')} className="storebom"><img className="icon-banner" src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/storebom.png"/>
                      </li>
                      <li onClick={()=> this.onclickBannerLink('recipebom')} className="recipebom"><img className="icon-banner" src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/recipebom.png"/>
                      </li>
                      <li onClick={()=> this.onclickBannerLink('findbom')} className="findbom" style={{marginRight: "0px"}}><img className="icon-banner" src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/findbom.png"/>
                      </li>
                    </ul>
                    </nav>
                  </div>
                </div>
                
                <div className="content_menu storebom_content " style={{display:"none",height: "100%",zIndex: "10",background: "white",marginTop:"26.9vw",position: "absolute"}}>
                    <div className="content_banner">
                    <span className="close_banner"> <img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/close.jpg" onClick={()=> this.closeBannerLink()}/> </span>
                            <a href="http://store.bom.co.kr/">	
                    <img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/banner.jpg" style={{width: "100%"}}/></a></div>
                      <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=006"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu01.jpg"/></a>
                      <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=001"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu02.jpg"/></a>
                      <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=002"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu03.jpg"/></a>
                      <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=003"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu04.jpg"/></a>
                      <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=004"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu05.jpg"/></a>
                      <a href="http://store.bom.co.kr/main/html.php?htmid=goods/dictionary.html"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/storebom/menu06.jpg"/></a>
                </div>
              
              <div className="content_menu findbom_content " style={{display:"none" ,height: "100%",zIndex: "10",background: "white",marginTop:"26.9vw",position: "absolute"}}>
                  <div className="content_banner">
                    <span className="close_banner"> <img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/close.jpg" onClick={()=> this.closeBannerLink()}/> </span>
                      <a href="http://find.bom.co.kr/">	
                      <img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/banner.jpg" style={{width: "100%"}}/></a></div>
                      <a href="http://find.bom.co.kr/board/lists/animal_find"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu01.jpg"/></a>
                      <a href="http://find.bom.co.kr/board/lists/animal_protection"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu02.jpg"/></a>
                      <a href="http://find.bom.co.kr/board/lists/animal_witness"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu03.jpg"/></a>
                      <a href="http://find.bom.co.kr/board/lists/animal_petout"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu04.jpg"/></a>
                      <a href="http://find.bom.co.kr/board/lists/animal_petin"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu05.jpg"/></a>
                      <a href="http://find.bom.co.kr/board/lists/animal_finded"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/findbom/menu06.jpg"/></a>
              </div>

              <div className="content_menu recipebom_content" style={{display:"none" ,height: "100%",zIndex: "10",background: "white",marginTop:"26.9vw",position: "absolute"}}>
               <div className="content_banner">
                    <span className="close_banner"> <img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/close.jpg" onClick={()=> this.closeBannerLink()}/> </span>
                    <a href="http://recipe.bom.co.kr/">	
                    <img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/banner.jpg" style={{width: "100%"}}/></a></div>
                      <a href="http://recipe.bom.co.kr/dogs"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu01.jpg"/></a>
                      <a href="http://recipe.bom.co.kr/cats"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu02.jpg"/></a>
                      <a href="http://recipe.bom.co.kr/chefs"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu03.jpg"/></a>
                      <a href="http://recipe.bom.co.kr/ranking"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu04.jpg"/></a>
                      <a href="http://recipe.bom.co.kr/event"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu05.jpg"/></a>
                      <a href="http://recipe.bom.co.kr/talks"><img src="http://recipe.bom.co.kr/uploads/common/topmenu/recipebom/menu06.jpg"/></a>
                
              </div>
            </header>
            
            {this.state.pathname != '/' ? (<MainSearch handleClose={this.handleClose}/>) : ''}

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
          </div>
        );
    }
}

export default Navigation
