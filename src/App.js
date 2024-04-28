import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import myPage from './pages/myPage';
import LoginForm from './pages/loginform';
import AddMemberForm from './pages/addMemberForm';
import Main from './pages/main'








function App() {
  return (
    <Router>
      <Switch>
       
        <Route path="/myPage" component={myPage} />
        <Route path="/main" component={Main} />
        <Route path="/home" component={Home} />
        <Route path="/LoginForm" component={LoginForm} />
        <Route path="/AddMemberForm" component={AddMemberForm} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
