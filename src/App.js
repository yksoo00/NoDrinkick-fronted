import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import myPage from './pages/myPage';
import LoginForm from './pages/loginform';
import AddMemberForm from './pages/addMemberForm';
import Main from './pages/main';
import AddEmergency from './pages/addEmergency';
import notice from './pages/notice';
import use from './pages/use';

import Emergency from './pages/Emergency';
import Bluetooth from './pages/Bluetooth';
import BluetoothDetail from './pages/BluetoothDetails';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Switch>

        <Route path="/myPage" component={myPage} />
        <Route path="/main" component={Main} />
        <Route path="/home" component={Home} />
        <Route path="/LoginForm" component={LoginForm} />
        <Route path="/AddMemberForm" component={AddMemberForm} />
        <Route path="/AddEmergency" component={AddEmergency} />
        <Route path="/notice" component={notice} />
        <Route path="/use" component={use} />
        <Route path="/Emergency" component={Emergency} />
        <Route path="/Bluetooth" component={Bluetooth} />
        <Route path="/detail/:deviceId" component={BluetoothDetail} />
        <Route path="/" component={Home} />

      </Switch>
    </Router>
  );
}

export default App;
