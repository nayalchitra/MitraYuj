import './App.css';
import Users from './Components/Users';
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from './MyNavbar/index.jsx';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';
import Routing from './Components/Routing/index.jsx';

function App() {

  const [showComponent, setShowComponent] = useState(true);
  return (
    <div className="App">
    
   
           
      <BrowserRouter>
        <MyNavbar/>
        <Routes>
          <Route path='/' element={showComponent ? <Users/> : <></>}/>
          <Route path="/routing" element={<Routing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          
        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;
