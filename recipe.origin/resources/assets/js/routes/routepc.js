// import libs
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import Layout from '../pc/Layout'
import Register from '../pc/register'
import Login from '../pc/Login'
import Home from '../pc/Main'
import Upload from '../pc/Upload'
import Users from '../pc/users/Users'

import Events from '../pc/event/Events'
import EventAdd from '../pc/event/EventAdd';
import Detail from '../pc/event/Detail';

import Talks from '../pc/talks/Talks'
import TalkView from '../pc/talks/TalkView'
import Catlists from '../pc/recipes/Catlists'
import Chef from '../pc/recipes/Chef'
import Rankings from '../pc/recipes/Rankings'
import RecipeWrite from '../pc/recipes/RecipeWrite'
import ViewComments from '../pc/recipes/ViewComments'
import Search from '../pc/recipes/Search';   
import Join from '../pc/register/Join';
import Searchs from '../pc/Searchs';

import Logout from '../pc/Logout';
import Setting from '../pc/Setting';
import NotFound from '../pc/NotFound';
import Comments from '../pc/Comments';
import Faq from '../pc/cscenter/Faq';
import Qa from '../pc/cscenter/Qa';
import Cscenter from '../pc/cscenter'
import Alarm from '../pc/Alarm';
import RecipeDetail from '../pc/recipes/RecipeDetail';
import QnaView from '../pc/cscenter/QnaView';
import Anounce from '../pc/cscenter/Anounce';
import AnounceWrite from '../pc/cscenter/AnounceWrite';

import MyTalks from '../pc/mypage/MyTalks';
import MyHearts from '../pc/mypage/MyHearts';
import MyInfo from '../pc/mypage/MyInfo';
import MyScraps from '../pc/mypage/MyScraps';
import MySaw from '../pc/mypage/MySaw';
import MyRecipes from '../pc/mypage/MyRecipes';
import MyNotice from '../pc/mypage/MyNotice';

import QnaWrite from '../pc/cscenter/QnaWrite';
import FindId from '../pc/register/FindId';
import FindIdCompleted from '../pc/register/FindIdCompleted';
import Agreements from '../pc/term/Agreements';
import AnounceDetail from '../pc/cscenter/AnounceDetail';
import FaqView from '../pc/cscenter/FaqView';
import NaverCallback from '../pc/socials/NaverCallback';
import About from '../pc/About';

const Routepc = (
    <Router history={browserHistory}>
        <Route path="/" component={ Layout }>
            <IndexRoute component={ Home }/>
            <Route path="/home" component={ Home }/>
            <Route path="/users" component={ Users }/>
            <Route path="/register" component={ Register }/>
            <Route path="/login" component={ Login }/>
            <Route path="/logout" component={ Logout }/>
            <Route path="/event" component={ Events }/>
            <Route path="/upload" component={ Upload } />
            <Route path="/talks" component={ Talks } />
            <Route path="/talk/:id/view" component={ TalkView } />
            <Route path="/search" component={ Search } />
            <Route path="/dogs" component={ Catlists } />
            <Route path="/cats" component={ Catlists } />
            <Route path="/chefs/:id/lists" component={ Catlists } />
            <Route path="/chefs" component={ Chef } />
            <Route path="/ranking" component={ Rankings } />
            <Route path="/best_heart" component={ Rankings } />
            <Route path="/best_view" component={ Rankings } />
            <Route path="/join" component={ Join } />
            <Route path="/recipe_write" component={ RecipeWrite } />
            <Route path="/recipe/:id/edit" component={ RecipeWrite } />
            <Route path="/edit_write/:id/edit" component={ RecipeWrite } />
            <Route path="/view_comment" component={ ViewComments } />
            <Route path="/event_add" component={ EventAdd } />
            <Route path="/event/:id/detail" component={ Detail } />
            <Route path="404" component={ NotFound } />
            
            <Route path="/login/naver" component={NaverCallback} />

            <Route path="/searchs" component={ Searchs } /> 
            <Route path="/setting" component={ Setting } />
            <Route path="/comments" component={ Comments } />
            <Route path="/faq" component={ Faq } />
            <Route path="/qna" component={ Qa } />
            <Route path="/qna_write" component={ QnaWrite } />
            <Route path="/anounce_write" component={ AnounceWrite } />
            <Route path="/anounce" component={ Anounce } />
            <Route path="/cscenter" component={ Cscenter } />
            <Route path="/alarm" component={ Alarm } />
            <Route path="/recipe/:id/detail" component={ RecipeDetail } />
            <Route path="/qna/:id/detail" component={ QnaView } />
            <Route path="/anounce/:id/detail" component={ AnounceDetail } />
            <Route path="/faq/:id/detail" component={ FaqView } />
            <Route path="/myinfo" component={ MyInfo } />
            <Route path="/find_id" component={ FindId } />
            <Route path="/find_password" component={ FindId } />
            <Route path="/find_completed" component={ FindIdCompleted } />
            <Route path="/my_talks" component={ MyTalks } />
            <Route path="/my_hearts" component={ MyHearts } />
            <Route path="/my_recipes" component={ MyRecipes } />
            <Route path="/my_scraps" component={ MyScraps } />
            <Route path="/my_saw" component={ MySaw } />
            <Route path="/my_notice" component={ MyNotice } />
            <Route path="/agreements" component={ Agreements } />
            <Route path="/policy" component={ Agreements } />
            <Route path="/about" component={ About } />
        </Route>
    </Router>

)

export default Routepc
