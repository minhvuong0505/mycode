import React, { Component } from 'react';
import { Link } from 'react-router';
import {browserHistory} from 'react-router';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      counts: [],
      keyword: this.getUrlParameter('keyword')
    }

    this.SearchHandleKeyPress = this.SearchHandleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.SearchInputOnChange = this.SearchInputOnChange.bind(this);
  }

  getUrlParameter(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		var results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  
  componentDidMount() {
    var _keyword = $('.head-search [name="keyword"]').val();
    this.setState({keyword: _keyword});
    
    axios.get('/api/v1/post?filters=status=1&fields=count(*) as cnt')
      .then((res)  => {
          this.setCounts(res.data.result)
      })
      .catch((err) => {
          console.log(err)
      });

    axios.get('/api/v1/tags?page_id=0&page_size=4&filters=status=1,hot=1&sorts=-id')
      .then((res)  => {
          this.setState({tags: res.data.result});
      })
      .catch((err) => {
          console.log(err)
      });

  }
  
  setCounts(data) {        
    let arr = ('' + data[0]['cnt']).split('').map(function(digit)  {return +digit;});
    let { counts } = this.state
    counts = arr
    this.setState({ counts })
  }

  handleSearch()
  {
    const {keyword} = this.state;
    var _keyword = $('.head-search [name="keyword"]').val();
    this.setState({keyword: _keyword});
    browserHistory.push(`/searchs?keyword=${_keyword}`);
  }

  componentWillReceiveProps(nextProps) {
    const {keyword} = this.state;
    if(nextProps.location.query.keyword != undefined && nextProps.location.query.keyword != keyword) {
      this.setState({keyword: nextProps.location.query.keyword});
    }
  }

  SearchInputOnChange({ name, value}) {
    this.setState({ keyword: value});
  }

  rightMenuDropdown() {
    if($('.rightMenuDropdown').hasClass("open")) {
      $('.rightMenuDropdown').removeClass("open");
    } else {
      $('.rightMenuDropdown').addClass("open");
    }
  }

  SearchHandleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  }

  cookieReferer(data){
    var d = new Date();
    d.setTime(d.getTime() + (30*60*1000));
    
    var expires = "expires="+ d.toUTCString();
    document.cookie = "findrefer=" + window.location.url + ";" + expires + ";domain=.bom.co.kr;path=/";
    alert('통합로그인을 위해 스토어봄 페이지로 이동됩니다.');
    window.location.href = data;
  } 
renderHotTags()
{
  const {tags} = this.state;
  if(tags.length == 0) {
	  return (
		<ul className="link-search">
			<li className="active"><a href="#">hot</a></li>
			<li><a href="/searchs?keyword=수제간식">수제간식</a></li>
			<li><a href="/searchs?keyword=케이크">케이크</a></li>
			<li><a href="/searchs?keyword=젤리">젤리</a></li>
			<li><a href="/searchs?keyword=치킨스프">치킨스프</a></li>
		</ul>
	  );
  }
  return (
    <ul className="link-search">
		<li className="active"><a href="#">hot</a></li>
		{tags.map((tag, index) => {
			return (
			<li key={`tag-${index}`}><Link to={`/searchs?keyword=${tag.name}`}>#{tag.name}</Link></li>
			);                                        
      	})}
    </ul>
  );
}

  render() {
      const { counts } = this.state;
      const {keyword} = this.state;
      
      let _path = window.location.pathname;
      let _mHome_state = "";
      let _mEvent_state = "";
      let _mTalk_state = "";
      let _mChefs_state = "";
      let _mRanking_state = "";
      let _mDogs_state = "";
      let _mCats_state = "";

      
      if(_path.includes("/event")) _mEvent_state = "active";
      else if(_path.includes("/talks")) _mTalk_state = "active";
      else if(_path.includes("/ranking")) _mRanking_state = "active";
      else if(_path.includes("/chefs")) _mChefs_state = "active";
      else if(_path.includes("/dogs")) _mDogs_state = "active";
      else if(_path.includes("/cats")) _mCats_state = "active";
      else _mHome_state = "active";
      
      var rightTopHeaderHtml = (
        <ul className="pull-right">
          {/* <li><Link to="/register"  title="회원가입">회원가입</Link></li>
          <li><Link to="/login"  title="로그인">로그인</Link></li> */}
          <li><a href='#' onClick = {() => this.cookieReferer('http://store.bom.co.kr/member/join_method.php')} title="회원가입">회원가입</a></li>
          <li><a href = '#'onClick = {() => this.cookieReferer('http://store.bom.co.kr/member/login.php')}  title="로그인">로그인</a></li>
          <li><Link to="/my_recipes" title="마이레시피">마이레시피</Link></li>
        </ul>
      );
      var rightMenuDropdownButtonHTML = (
        <div className="dropdown-top">
          <Link to="/login" className="active">로그인</Link>
          <Link to="/register">회원가입</Link>
        </div>
      );
        
      if(PROFILES) {
      
        rightTopHeaderHtml = (
          <ul className="pull-right">
            <li><Link to="/logout" title="로그아웃">로그아웃</Link></li>
            <li><Link to="/my_recipes" title="마이레시피">마이레시피</Link></li>
          </ul>
        );
        rightMenuDropdownButtonHTML = (
          <div className="dropdown-top">
            <Link to={`/myinfo`} className="active">내 정보</Link>
            <Link to="/logout" >로그아웃</Link>
          </div>
        );

      }

      return (
        <div>
          <header className="site-header">
         
          <div className="header-content">
            <div className="container">
              <strong className="logo">
                <Link to="/"><img src="/default/images/logo.png" alt="logo" /></Link>
              </strong>
              <div className="head-search">
                <div className="form-search">
                  <input type="text" name="keyword" className="form-control" onKeyPress={this.SearchHandleKeyPress} value={keyword} onChange={(e)=> this.SearchInputOnChange({ name:e.target.name, value:e.target.value})} />
                  <button className="btn btn-search" type="button" onClick={this.handleSearch}><span>search</span></button>
                </div>
                {this.renderHotTags()}
              </div>
              <div className="time">
                <span className="title">반려동물 맞춤 레시피</span>
                <ul className="countdown-time">
                  { counts.map((count,index) => {
                    return <li key={`count-${index}`} style={{margin:"0 2px"}}>{count}</li>
                  }) }
                </ul>
              </div>
              <ul className="links">
                <li>
                  <Link to="/recipe_write">
                    <span className="img img1" />
                    <span className="text">레시피 등록</span>
                  </Link>
                </li>
                <li className="dropdown rightMenuDropdown " onClick={this.rightMenuDropdown} style={{display: "none"}}>
                  <Link to="/register" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="img img2" />
                    <span className="text">우리 애기 전용</span>
                  </Link>
                  <div className="dropdown-menu">
                    {rightMenuDropdownButtonHTML}
                    <ul>
                      <li><a href="#">오늘 본 상품</a></li>
                      <li><a href="#">찜한 상품</a></li>
                      <li><a href="#">관심 브랜드</a></li>
                      <li><a href="#">내 쿠폰함</a></li>
                      <li><Link to="/cscenter">고객행복센터</Link></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-bottom">
            <div className="container">
              <ul className="nav-menu">
                <li className={_mHome_state}><Link to="/">홈</Link></li>
                <li className={_mDogs_state}><Link to="/dogs">멍키친</Link></li>
                <li className={_mCats_state}><Link to="/cats">냥키친</Link></li>
                <li className={_mChefs_state}><Link to="/chefs">멍냥셰프</Link></li>
                <li className={_mRanking_state}><Link to="/ranking">레시피 랭킹</Link></li>
                <li className={_mEvent_state}><Link to="/event">이벤트</Link></li>
                <li className={_mTalk_state}><Link to="/talks">멍냥 TALK</Link></li>
              </ul>
            </div>
          </div>
          <div className="header-top">
            <div className="container">
              <ul className="pull-left" style={{marginTop:'-7px'}}>
                {/* <li>세계최초 반려동물의 건강한 식생활, <strong>레시피봄</strong></li> */}
                <li className='drop recipe' style={{marginRight:0}}>
                  <a href='http://recipe.bom.co.kr/'>
                  <img  className='icon-banner' src = 'http://recipe.bom.co.kr/default/images/common/recipebom/recipebom.png'/></a>
                  <div className="meCont recipe">
                    <div className="bnCont" style={{background:'#f44d45'}}>
                      <div>
                        <a href="http://recipe.bom.co.kr/">
                        <img src="http://recipe.bom.co.kr/default/images/common/recipebom/banner.png"/></a>

                      </div>
                    </div>
                    <div className="tab" style={{marginTop: '30px'}}>
                      <div>
                        <p>
                          <a href="http://recipe.bom.co.kr/dogs">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu01.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu01_hover.png" alt="마우스하버시" className="over"/>
                          </a></p>
                        <p>
                          <a href="http://recipe.bom.co.kr/cats">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu02.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu02_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://recipe.bom.co.kr/chefs">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu03.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu03_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                      </div>
                      <div className="last">
                        <p>
                          <a href="http://recipe.bom.co.kr/ranking">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu04.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu04_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://recipe.bom.co.kr/event">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu05.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu05_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://recipe.bom.co.kr/talks">
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu06.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/recipebom/menu06_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                      </div>
                    </div>
                  </div>

                </li>
                
                <li className="drop store" style={{marginRight:0}}>
                  <a href='http://store.bom.co.kr/'>
                  <img className='icon-banner'src="http://recipe.bom.co.kr/default/images/common/storebom/storebom.png"/></a>
                    
                      <div className="meCont store">
                        <div className="bnCont" style={{background:'#67b1e7'}}>
                          <div>
                              <a href="https://store.bom.co.kr/board/view.php?&bdId=bomdelivery&sno=1">
                              <img src="http://recipe.bom.co.kr/default/images/common/storebom/banner.png"/></a>
                          </div>
                        </div>
                        <div className="tab" style={{marginTop: '30px'}}>
                          <div>
                            <p>
                              <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=006">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu01.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu01_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                            <p>
                              <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=001">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu02.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu02_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                            <p>
                              <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=002">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu03.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu03_hover.png" alt="마우스하버시" className="over"/>
                                </a></p>
                          </div>
                          <div className="last">
                            <p>
                              <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=003">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu04.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu04_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                            <p>
                              <a href="http://store.bom.co.kr/goods/goods_list.php?cateCd=004">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu05.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu05_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                            <p>
                              <a href="http://store.bom.co.kr/main/html.php?htmid=goods/dictionary.html">
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu06.png"/>
                                <img src="http://recipe.bom.co.kr/default/images/common/storebom/menu06_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                          </div>
                        </div>
                      </div>

                    </li>
                  
                
                <li className='drop find'>
                  <a href='http://find.bom.co.kr/main/index'>
                  <img className='icon-banner' src = 'http://recipe.bom.co.kr/default/images/common/findbom/findbom.png'/></a>
                  <div className="meCont find">
                    <div className="bnCont" style={{background:'#ffd200'}}>
                      <div>
                        <a href="http://find.bom.co.kr/main/index">
                        <img src="http://recipe.bom.co.kr/default/images/common/findbom/banner.png"/></a>
                      </div>
                    </div>
                    <div className="tab" style={{marginTop: '30px'}}>
                      <div>
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_find">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu01.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu01_hover.png" alt="마우스하버시" className="over"/>
                          </a></p>
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_protection">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu02.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu02_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_witness">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu03.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu03_hover.png" alt="마우스하버시" className="over"/>
                            </a></p>
                      </div>
                      <div className="last">
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_petout">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu04.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu04_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_petin">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu05.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu05_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                        <p>
                          <a href="http://find.bom.co.kr/board/lists/animal_finded">
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu06.png"/>
                            <img src="http://recipe.bom.co.kr/default/images/common/findbom/menu06_hover.png" alt="마우스하버시" className="over"/>
                        </a></p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {rightTopHeaderHtml}
            </div>
          </div>
        </header>

          <div className="container" style={{paddingTop: "40px"}}>
                <div className="block-home-section1" style={{marginBottom: 0,padding: 0, background: "none"}}>
                <img src="http://recipe.bom.co.kr/default/images/banner/w_banner.gif" useMap="#map"/>

                  <map name="map">
                  <area href="https://play.google.com/store/apps/details?id=com.recipebom.byapps" coords="638,3,857,98" shape="rect"/>
                  <area href="https://itunes.apple.com/kr/app/id1449439370?mt=8" coords="859,2,1096,99" shape="rect"/>
                  </map>
                </div>
          </div>
        </div>
        );
    }
}

export default Navigation;