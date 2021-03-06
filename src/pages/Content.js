import React from "react";
import { HashRouter, Route} from "react-router-dom";
import Main from './Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Council from './components/council/Council';
import Vote from './components/vote/Vote';
import Search from './components/Search';
import Notice from './components/notice/Notice';
import NoticeEditor from './components/notice/NoticeEditor';
import NoticeDetail from './components/notice/NoticeDetail';
import CouncilEditor from "./components/council/CouncilEditor";
import CouncilDetail from "./components/council/CouncilDetail";
import CouncilList from "./components/council/CouncilList";
import CandidateSet from './components/vote/CandidateSet';
import VoteAdmin from './components/vote/VoteAdmin';
import CouncilTotalEditor from './components/council/CouncilTotalEditor';

const Content = () => {
 
    return(
        <div style={{marginTop:"57px"}}>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/search" component={Search}/>
            <Route path="/council" component={Council}/>
            <Route path="/council_detail/:index" component={CouncilDetail} />
            <Route path="/council_list/:college/:major" component={CouncilList} />
            <Route path="/council_totaleditor/:college/:major" component={CouncilTotalEditor} />
            <Route path="/councileditor/:college/:major" component={CouncilEditor}/>
            <Route path="/vote" component={Vote}/>
            <Route path="/notice" component={Notice}/>
            <Route exact path="/editor" component={NoticeEditor}/>
            <Route exact path="/editor/update/:id" component={NoticeEditor}/>
            <Route path="/notice_detail/:id" component={NoticeDetail}/>
            <Route path="/candidateSet/:collegeCode/:majorCode" component={CandidateSet}/>
            <Route path="/voteadmin" component={VoteAdmin}/>
        </div>
    )
}
export default Content;