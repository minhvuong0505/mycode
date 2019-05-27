//import libs
import React, { Component } from 'react'
import axios from 'axios'
import MainCarousel from './slider/MainCarousel'
import MainTags from './tags/MainTags'
import MainVideo from './videos/MainVideo'
import NewRecipes from './slider/NewRecipes';
import { Link } from "react-router"


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      chef:[],		
    }
	}

	componentDidMount(){
		axios.get('/api/v1/user?embeds=post&filters=status=1&sorts=-total_view&page_size=1')
            .then((res)  => {
                this.setChef(res.data)
            })
            .catch((err) => {
                // console.log(err)
            })

            // var popup = this.getCookie('popupCode_layer_17')
            // if(popup === undefined || popup == '')
            //     $('#popupCode_layer_17').css('display','');
	}

	setChef(chef) {       
		this.setState({ chef: chef['result'][0] }); 
  }
  
  popup_cookie() {
		setTimeout("$('#popupCode_layer_17').hide()");
		var d = new Date();
		d.setTime(d.getTime() + (24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		
		document.cookie = 'popupCode_layer_17=true; expires=' + expires +'; path=/' +'; domain=.bom.co.kr' ;
		
	}
	getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
    }
    
	closep()
	{
		$('#popupCode_layer_17').hide();
	} 

    render(){
		const { chef } = this.state
		let posts = []
		if(chef.post != undefined){
			posts = chef.post
		}

        return(
        <main className="site-main">
          <div className="block-home1">
              <MainCarousel ></MainCarousel>
          </div>

          <div className="block-home2" style={{display: "none"}}>
                <strong>우리 아이 등록하고 </strong>
                <span>맞춤 레시피를 받아보세요</span>
          </div>

          <MainTags ></MainTags>

          <MainVideo ></MainVideo>
          <div className="block-home5">
          <div className="block-title">
            <span><strong>BEST</strong> chef</span>
          </div>
          <div className="block-content">
            <div className="item-chef">
              <div className="img">
                <img src="/html/images/media/home3.jpg" alt="img" />
              </div>
              <div className="detail">
                <strong className="tile">{chef.name}</strong>
                <p>구리를 위한 수제 간식 전문 셰프</p>
                <div className="info">
                  <span className="view">{chef.total_view}</span>
                  <span className="wishlist">{chef.total_like}</span>
				          <Link to={`chefs/${chef.id}/lists`}><span className="add" /></Link>                  
                </div>
              </div>
              <div className="block-bottom">
                <ul>
                {posts.map((ch,index) => {
                  let img = (<img src="https://freetalk.info/default/images/media/home-img1.jpg" />);
                  if(ch.cooking_representation != undefined) {
                    var cooking_representation = $.parseJSON(ch.cooking_representation);
                    if(cooking_representation[0] != undefined && cooking_representation[0]['images'] != undefined) {
                      img = (<img src={CDN_URL+`${cooking_representation[0]['images']}`} alt={ch.title} />);
                    }
                  }
					        return ( 
                    <li key={`ch-${index}`}>
                      <Link to={`recipe/${ch.id}/detail`}>
                        {img}
                        <span>{ch.title}</span>
                      </Link>
                    </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

          {/* new recipes */}
          <div className="block-home6">
        <div className="block-title">
          <span><strong>NEW </strong> RECIPE</span>
        </div>
        <div className="block-content">
          <div className="owl-carousel">
            <NewRecipes></NewRecipes>
          </div>
        </div>
      </div>
          
          <div className="m_linkin">
            <ul>
                <li><a href="http://store.bom.co.kr/main/index.php"><img src="/default/images/m_storebom.jpg" alt="STOREBOM" /></a></li>
                <li><a href="http://find.bom.co.kr/main/index"><img src="/default/images/m_findbom.jpg" alt="FINDBOM" /></a></li>
            </ul>
          </div>
          

          <div id="popupCode_layer_17" style={{display:"none"}} >
				<div id="popupCode_layer_17_form" className="sys-pop">
					<div className="box">
						<div className="view">
							<div className="adpic1">
								<div className="adpic1_1x">
									<a href="https://store.bom.co.kr/board/view.php?&bdId=notice&sno=23">
									
										<img src="/uploads/popup/popup_034.jpg" title="통합로그인시행안내" className="js-smart-img" useMap="#ImgMap156513" />
									</a>
									<a href="https://store.bom.co.kr/member/join_method.php">
										
										<img src="/uploads/popup/popup_04.jpg" title="통합로그인시행안내" className="js-smart-img" useMap="#ImgMap156512" />
									</a>
								</div>  
							</div>
						</div>
						<div className="check">
							<span className="form-element">
								<label htmlFor="todayUnSee_popupCode_layer_17" className="check-s">오늘 하루 보이지 않음</label>
								<input type="checkbox" id="todayUnSee_popupCode_layer_17" style={{display:'none'}} className="checkbox" onClick={()=>this.popup_cookie()} />
							</span>
						</div>
									
								<button type="button" className="close" title="닫기" onClick={()=> this.closep()}>닫기</button>
					</div>
				</div>
			</div>

        </main>
        );
    }
}

export default Home
