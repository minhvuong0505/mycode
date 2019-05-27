// import libs
import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'


    import Layout from '../pages/Layout'
    import Register from '../pages/register'
    import Login from '../pages/Login'
    import Home from '../pages/Home'
    import Upload from '../pages/Upload'
    import Users from '../pages/users/Users'
    import Articles from '../pages/articles/Articles'
    import EditArticle from '../pages/articles/EditArticle'; 

    import Events from '../pages/events/Events'
    import Talks from '../pages/talks/Talks'
    import Catlists from '../pages/recipes/Catlists'
    import Chef from '../pages/recipes/Chef'
    import Rankings from '../pages/recipes/Rankings'
    import RecipeWrite from '../pages/recipes/RecipeWrite'
    import ViewComments from '../pages/recipes/ViewComments'
    import Search from '../pages/recipes/Search';   
    import Join from '../pages/register/Join';
    import Searchs from '../pages/Searchs';
    import EventAdd from '../pages/events/EventAdd';
    import Detail from '../pages/events/Detail';
    import Logout from '../pages/Logout';
    import Setting from '../pages/Setting';
    import NotFound from '../pages/NotFound';
    import Comments from '../pages/Comments';
    import Faq from '../pages/cscenter/Faq';
    import Qa from '../pages/cscenter/Qa';
    import Cscenter from '../pages/cscenter'
    import Alarm from '../pages/Alarm';
    import RecipeDetail from '../pages/recipes/RecipeDetail';
    import QnaView from '../pages/cscenter/QnaView';
    import Anounce from '../pages/cscenter/Anounce';
    import MyTalks from '../pages/mypage/MyTalks';
    import MyHearts from '../pages/mypage/MyHearts';
    import MyInfo from '../pages/mypage/MyInfo';
    import MyScraps from '../pages/mypage/MyScraps';
    import MySaw from '../pages/mypage/MySaw';
    import MyRecipes from '../pages/mypage/MyRecipes';
    import QnaWrite from '../pages/cscenter/QnaWrite';
    import FindId from '../pages/register/FindId';
    import FindIdCompleted from '../pages/register/FindIdCompleted';
    import Agreements from '../pages/term/Agreements';
    import AnounceDetail from '../pages/cscenter/AnounceDetail';
    import FaqView from '../pages/cscenter/FaqView';
    import NaverCallback from '../pages/Socials/NaverCallback';


const Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={ Layout }>
            <IndexRoute component={ Home }/>
            <Route path="/home" component={ Home }/>
            <Route path="/users" component={ Users }/>
            <Route path="/articles" component={ Articles }/>
            <Route path="/articles/:id/edit" component={ EditArticle }/>
            <Route path="/register" component={ Register }/>
            <Route path="/login" component={ Login }/>
            <Route path="/logout" component={ Logout }/>
            <Route path="/event" component={ Events }/>
            <Route path="/upload" component={ Upload } />
            <Route path="/talks" component={ Talks } />
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
            <Route path="/view_comment" component={ ViewComments } />
            <Route path="/event_add" component={ EventAdd } />
           
            <Route path="/event/:id/detail" component={ Detail } />
            <Route path="404" component={ NotFound } />

            <Route path="/login/naver" component={ NaverCallback } />
        </Route>
        <Route path="/searchs" component={ Searchs } />
        <Route path="/setting" component={ Setting } />
        <Route path="/comments" component={ Comments } />
        <Route path="/faq" component={ Faq } />
        <Route path="/qna" component={ Qa } />
        <Route path="/qna_write" component={ QnaWrite } />
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
        <Route path="/agreements" component={ Agreements } />
        <Route path="/policy" component={ Agreements } />


    </Router>
)

export default Routes
