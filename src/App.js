import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/home';
import MyPage from './component/myPage';
import LoginForm from './component/loginform';
import AddMemberForm from './component/addMemberForm';
import Main from './component/main'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/mypage" component={MyPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/members/add" component={AddMemberForm} />
        <Route path="/main" component={Main} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
