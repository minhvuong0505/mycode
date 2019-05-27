import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Comments from '../Comments';
import Countdown from 'react-countdown-now';
import { Link } from 'react-router/lib';
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
          btn_edit: 'Edit'
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
          btn_edit: '수정'
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
          btn_edit: '编辑'
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
          languages:strings,
          type_lang:'it'
      };

	  this.getRecipe()
	  //this.pushView()

      this.handleAddWish = this.handleAddWish.bind(this)
      this.handleTime = this.handleTime.bind(this)
      this.handeReset = this.handeReset.bind(this)
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

      let header = ('')
      if(user_id != 0) header = {headers:{
        'Authorization': `Bearer ${TOKENS}`
      }}

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

    componentDidMount() {
      this.pushView();
      this.getRelatioship();
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
              return <div key={`banner-${index}`} className="">
              <img src={CDN_URL+`${banner.images}`} alt="img" />
              </div>
            }
          })}
      </Carousel>
    }

    renderSlideStep(steps){
        return <Carousel showArrows={false} showIndicators={false} showStatus={true} autoPlay={true} showThumbs={false}>
            {Object.keys(steps).map((step, index) => {
				let img 
				if(!steps[step].video) img = (<img style={{height:'80vw'}} src={CDN_URL+`${steps[step].images}`} alt="img" />)
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
      
      const con = confirm('레시피를 찜 하시겠습니까?')
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

    changeLang({name,value}){
      console.log(value)
      this.setState({type_lang:value});
      localStorage.setItem('lang', value); 
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
  
    render() {
		  const { detail } = this.state
		  const { time } = this.state
		  const { mins } = this.state
		  const { secs } = this.state
      const { recipeId } = this.state
      const { relations } = this.state
      const { options } = this.state;
      
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

      let avatar = (<img src="/html/images/media/img2.jpg" alt="img" />)  
      if(detail.user){
            if(detail.user.avatar) 
              if (detail.user.avatar.indexOf('http') > -1) avatar = (<img src={detail.user.avatar} alt="img" />)
              else avatar = (<img src={CDN_URL+detail.user.avatar} alt="img" />)
      }else{
        window.location.href = "/404"
      }
     
      //tags
      let tags = detail.tags.split(',') || [];
      //language
      const {languages} = this.state;
      let {type_lang} = this.state;
      let lang = localStorage.getItem('lang');
      if(lang) type_lang = lang;
      languages.setLanguage(type_lang);

      //video
      let video = "";
      var styleVideoBlock = {display:"block"};
      if(detail.videos != undefined && detail.videos != "[]") {
        video = (<a data-fancybox href={detail['videos']}>
          <div style={{position:"relative",backgroundImage: "url("+thumbVideo+")",backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", display:"block",width:"600px",height:"350px",margin:"auto"}}>
            <div style={{backgroundImage: "url('/default/images/icon/playbutton.jpg')",backgroundPosition: "center", backgroundRepeat: "no-repeat",width:"100%",height:"100%"}}></div>  
          </div>
        </a>);
      } else {
        styleVideoBlock = {display: "none"};
      }
      
      let _editButton = "";
      if(PROFILES != undefined && detail.user_id == PROFILES.id) 
      {
        _editButton = (<Link to={`/recipe/${detail.id}/edit`} className="pull-right btn btn-default btn-comment" >{languages.btn_edit}</Link>);
      }
      

      return (<main className="site-main">
        <div className="container">
          <div className="block-gird-item">
            <div className="toobar">
            {this.renderErrors()}
            {this.renderMessage()}
              <div className="title pull-left">
                {languages.title}
              </div>
              <select className="form-control pull-right" value={type_lang} name="lang" onChange={(e) => this.changeLang({ name: e.target.name, value: e.target.value })} style={{marginLeft: 12}}>
                <option value="it">한국어</option>
                <option value="en">English</option>
                <option value="cn">Chinese</option>
              </select>
              <label className="pull-right">{languages.lang}</label>
              {_editButton}
            </div>
            <div className="items-talk-detail block-view-detail clearfix">
              <br /><br />
              <div className="item-talk col-sm-8 col-sm-offset-2">
                <div className="photo">
                {this.renderSlideTop(bannerTop)}
                </div>
                <div className="item-top">
                  <div className="img">
                    <div className="photo">
                    {avatar}
                    </div>
                  </div>
                  <div className="detail">
                    <strong className="title">{ detail.user.name || ''}</strong>
                    <span>{ detail.desc || ''}</span>
                  </div>
                  
                </div>

                <div className="item-description">
                  <strong className="title">{ detail.title }</strong>
                  <div className="des">
                  { detail.content }
                  </div>
                  <div style={{display:"flex"}}>
                    <div className="item-top info">
                      <span className="view">{ detail.total_view}</span>
                      <span className="wishlist" onClick={this.handleAddWish}>{ detail.total_like }</span>
                      <span className="comment">{detail.total_cmt}</span>
                    </div>
                  </div>
                  <div className="link">
                    <Link to={_cateLink}>{this.getCateTitle()}</Link>
                    <Link to={`/searchs?function=${detail.op_function.id}`}>{this.getOptionTitle(detail.function)}</Link>
                    <Link to={`/searchs?difficulty=${detail.difficulty}`}><img src="/default/images/icon/icon1.png" style={{width: 20, marginRight: 4}} /> {this.getOptionTitle(detail.difficulty)}</Link>
                    <Link to={`/searchs?prepare_time=${detail.prepare_time}`}>{languages.label_sub_preparetime} <br /> {this.getOptionTitle(detail.prepare_time)}</Link>
                    <Link to={`/searchs?cooking_time=${detail.cooking_time}`}>{languages.label_sub_cookingtime} <br />{this.getOptionTitle(detail.cooking_time)}</Link>
                  </div>
                </div>

              </div>
            </div>
            <hr />
            <br />
            <div className="block-view-related">
              <div className="block-view-title">{languages.material}</div>
              <div className="items row">
              {Object.keys(materials).map((material,index) => {  
                let img = "";
                if(materials[material].images) img = (<img src={CDN_URL+`${materials[material].images}`} alt="img" />);
                var _link = `/searchs?material=${materials[material].name}`;
                // if(_matName.charCodeAt(0) > 255) {
                //   var _encodedKeyword = "";
                //   for(var _index = 0; _index < _matName.length; _index++) {
                //     _encodedKeyword += '\\\\u' + _matName.charCodeAt(_index).toString(16);
                //   }
                //   _encodedKeyword = _encodedKeyword.substr(2, _encodedKeyword.length);
                //   _link = _link+_encodedKeyword;
                // } else {
                //   _link = _link+_matName;
                // }
                return <div className="col-sm-3 item " key={`material-${index}`}>
                  <div className="item-fearture-product">
                    <div className="photo">
                      <Link to={`${_link}`} >{img}</Link>
                    </div>
                    <div className="detail">
                      <h3 className="title"><Link to={`${_link}`}>{materials[material].name} </Link> </h3>
                      <span className="subtitle">{materials[material].quantity} {this.getOptionTitle(materials[material].unit)}</span>
                    </div>
                  </div>
                </div>
              })}
              </div>
            </div>
            <hr />
            <br />
            <div className="block-view-video" style={styleVideoBlock}>
              <div className="block-view-title">{languages.video}</div>
              <div className="block-video-content">
              {video}
              </div>
            </div>
            <hr />
            <br />
            <div className="block-view-order">
              <div className="block-view-title">{languages.cook}</div>
              <div className="block-content">
                
              {Object.keys(steps).map((step,index) => {
                let img 
                if(steps[step].images) img = (<img src={CDN_URL+`${steps[step].images}`} alt="img" />)
                return <div className="row" key={`step-${index}`}>
                  <div className="col-sm-6">
                    <span className="stt">
                      {parseInt(index)+1}
                    </span>
                    <div className="des">
                    {steps[step].content}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    {img}
                  </div>
                </div>
              })}

              </div>
            </div>
            <div className="block-tag">
              <label>Tag</label>
              {tags.map((tag,index) =>{
                return <Link to={`/searchs?tag=${tag}`} key={`tag-${index}`} className="tag">#{tag}</Link>
              })}
            </div>
            <div className="block-view-related">
              <div className="block-view-title">{languages.relation}</div>
              <div className="items row">
                
              {relations.map((relate,index) => {
                let name = ''
                if(relate.user) name = relate.user.name
                return <div className="col-sm-4 item " key={`relate-${index}`}>
                  <div className="item-fearture-product">
                    <div className="photo">
                    <Link to={`/recipe/${relate.id}/detail`}>
                        <img src={CDN_URL+`${$.parseJSON(relate.cooking_representation)[0]['images']}`} alt="img" />  
                    </Link>
                    
                    </div>
                    <div className="detail">
                      <h3 className="title"><Link to={`/recipe/${relate.id}/detail`}>{relate.title} </Link> </h3>
                      <span className="subtitle"> {name} </span>
                    </div>
                  </div>
                </div>
               })}
               
              </div>
            </div>
            <hr />
            <br />
            <Comments object_type="Post" object_id={recipeId} total={detail.total_cmt} sort="id" redirect_url={`detail/${recipeId}/detail`} />
          </div>                                                          
        </div>
      </main>

    
        );
    }
}

export default RecipeDetail;