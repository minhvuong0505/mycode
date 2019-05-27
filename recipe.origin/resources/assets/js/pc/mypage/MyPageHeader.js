import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Difficult from '../recipes/Difficult';
import { browserHistory } from 'react-router/lib';
import { Link} from "react-router";


class MyPageHeader extends Component {
    constructor(props) {
        super(props);
        
        if(!PROFILES) 
        {
            window.location.href = "/login";
            return false;
        } 

        this.state = {
            user: {
                name: '',
                username: '',
                slogan: '',
                birthday: '',
                gender: '',
                avatar: '/default/images/media/img2.jpg'
            },
            userId: '',
        };

        

    }

    componentDidMount(){
        this.getUser();
    }
    getUser() 
    {
        const {userId} = this.state;
        if(TOKENS) {
            refreshToken();
            axios.get(`/api/v3/authenticated_user`,{params:{'token': ` ${TOKENS}`}})
            .then(response => {
                this.setUsers(response);
            })
            .catch(error => {
                if(error.response.status == 401){
                    alert('다시 로그인해야합니다.');
                    window.location.href = '/logout?redirect_to=' + window.location.pathname.replace("/", "");
                }
            });
        }
    }

    setUsers(user)
    {
        this.setState({user:user.data})
    }

    render() 
    {
        const {user} = this.state;
        let _avatarImg = "/default/images/media/avatar_blank.png";
        
        let myRecipes_state = "";
        let mySaw_state = "";
        let myScraps_state = "";
        let myHearts_state = "";
        let myTalks_state = "";
        let myNotice_state = "";

        if(window.location.pathname == "/my_recipes") myRecipes_state = "active";
        else if (window.location.pathname == "/my_saw") mySaw_state = "active";
        else if (window.location.pathname == "/my_scraps") myScraps_state = "active";
        else if (window.location.pathname == "/my_hearts") myHearts_state = "active";
        else if (window.location.pathname == "/my_talks") myTalks_state = "active";
        else if (window.location.pathname == "/my_notice") myNotice_state = "active";
        if(user.avatar != "" && user.avatar != null) {
            if(user.avatar.includes("http") || user.avatar.includes("https")) {
                _avatarImg = user.avatar;
            } else {
                _avatarImg = CDN_URL + user.avatar;
            }
        }
        return (
            <div className="block-mypage-top">
                <div className="detail">
                    <div className="photo">
                        <div style={{backgroundImage: `url(${_avatarImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', width: '100px', height: '100px', display: 'block', borderRadius: '50%'}}></div>
                    </div>
                    <div className="info">
                        <div className="title">{user.name} <Link to={`/myinfo`}><label>정보 수정</label></Link> <span style={{color: "#f44d45"}}>포인트 현황: {user.total_point || '0'}</span></div>
                        <div className="subtitle">{user.slogan}</div>
                        <div className="meta">
                            <span className="view">{user.total_view}</span>
                            <span className="wishlist">{user.total_like}</span>
                        </div>
                    </div>
                </div>
                <ul className="actions">
                    <li className={myRecipes_state}>
                        <Link to="/my_recipes">내가 쓴 레시피</Link>
                    </li>
                    <li className={mySaw_state}>
                        <Link to="/my_saw">내가 본 레시피</Link>
                    </li>
                    <li className={myScraps_state}>
                        <Link to="/my_scraps">스크랩한 레시피</Link>
                    </li>
                    <li className={myHearts_state}>
                        <Link to="/my_hearts">하트 준 레시피</Link>
                    </li>
                    <li className={myTalks_state}>
                        <Link to="/my_talks">내가 쓴 토크</Link>
                    </li>
                    <li className={myNotice_state}>
                        <Link to="/my_notice">알림</Link>
                    </li>
                </ul>
            </div>

        );
    }
}

export default MyPageHeader;