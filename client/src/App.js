import './App.css';
import Users from './Components/Users';
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from './MyNavbar/index.jsx';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useEffect, useState } from 'react';
import Routing from './Components/Routing/index.jsx';
import Counter from './counter/index.js';
import Toast from './Toast/toast.js';
import LoadingComponent from './LoadingComponent/index.js';
import { Logout } from './Components/Logout/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithCookieActionCreator } from './reducers/userReducer.js';
import ProtectedRoute from './ProtectedRoute.js';


function App() {


  const [showComponent, setShowComponent] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(loginWithCookieActionCreator());
  },[])
  
  const {isLoggedIn, loading} = useSelector(({users})=>users);
  
  
  return (
    <div className="App">
    
   
           
      <BrowserRouter>
        <MyNavbar/>
        <Toast/>
        <LoadingComponent/>
        <Routes>
          
          {loading === false ? 
            (<Route path='/' element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Users/>
            </ProtectedRoute>
          }/>):

            <></>
          }
          




          <Route path='/counter' element={<Counter/>}/>
          <Route path="/routing" element={<Routing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          {/* <Route path='/logout' element={<Logout/>}/> */}
          
        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;
