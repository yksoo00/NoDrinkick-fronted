import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';
import myPage from './pages/myPage';
import LoginForm from './pages/loginform';
import AddMemberForm from './pages/addMemberForm';
import Main from './pages/main';
import AddEmergency from './pages/addEmergency';
import notice from './pages/notice';
import use from './pages/use';
import Payment from './pages/payment'; // 수정된 부분
import PaymentResult from './pages/success';
import Fail from './pages/fail';
import NoticeDetail from './pages/NoticeDetail'; 

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
        <Route path="/NoticeDetail/:noticeId" component={NoticeDetail} /> 
        <Route path="/use" component={use} />
        <Route path="/Emergency" component={Emergency} />
        <Route path="/Bluetooth" component={Bluetooth} />
        <Route path="/payment" component={Payment} /> {/* 수정된 부분 */}
        <Route path="/success" component={PaymentResult} />
        <Route path="/fail" component={Fail} />
        <Route path="/detail/:deviceId" component={BluetoothDetail} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
