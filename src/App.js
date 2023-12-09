/* eslint-disable array-callback-return */
import './App.css';
import { StudentDetails } from './components/StudentDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentData } from './components/StudentData';
import { AddStudent } from './components/addStudent';
import { DashBoard } from './components/DashBoard';
import { LandingLogin } from './components/landingLogin';
import { LandingDashBoard } from './components/LandingDashBoard';
import { Login } from './components/Login';
import AuthContext from './contextapi/auth-context';
import { Profile } from './components/Profile';
import { LoadData } from './components/loadData';
import { NewDashboard } from './components/newDashboard';
import { useState } from 'react';
function App() {
  const [authstatus, setauthstatus] = useState(false);
  const [token,setToken]=useState("");
  const [refresh,setRefresh]=useState("");
  const login = (value) => {
    setauthstatus(value);
  };
  const setAccessToken = (acc,ref) => {
    setToken(acc);
    setRefresh(ref);
  };
  const getToken =() =>{
    return {"token":token,
            "refresh":refresh}
  }
  return (
    <>
    <AuthContext.Provider value={{ status: authstatus,access:token,refresh:refresh, login: login, setAccessToken:setAccessToken, getToken:getToken }}>
        <Router>
        <Routes>

                <Route exact path='/usertype' element={< LandingLogin />}></Route>
                <Route exact path='/Stddetails' element={< StudentDetails />}></Route>
                <Route exact path='/profile' element={< Profile />}></Route>

                <Route exact path='/' element={<LoadData/>}></Route>
                <Route exact path='/newDashboard' element={<LoadData/>}></Route>
                <Route exact path='/dashboard' element={<DashBoard/>}></Route>
                <Route exact path='/home' element={<LandingDashBoard/>}></Route>
                <Route exact path='/Dashboard' element={< DashBoard />}></Route>
                <Route exact path='/studentDetails' element={< StudentData />}></Route>
                <Route exact path='/addstudentDetails' element={< AddStudent />}></Route>
                <Route exact path='/login' element={< Login />}></Route>
        </Routes>
    </Router>
    </AuthContext.Provider>
    </>
    
  );
}

export default App;
