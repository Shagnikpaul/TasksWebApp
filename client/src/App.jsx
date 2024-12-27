
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';
import SignIn from './pages/SignIn'

import { Route } from "wouter";
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch(); //show logout and dp when user id is there in session storage
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
  },[]);

  return (
    <>

      <Route path="/home" component={HomePage}>
      </Route>

      <Route path="/" component={SignIn}>
      </Route>

      <Route path="/register" component={RegisterPage}>
      </Route>



      {/* <HomePage>
      
      </HomePage> */}
    </>
  )
}

export default App
