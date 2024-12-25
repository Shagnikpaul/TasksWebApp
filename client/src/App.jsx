
import './App.css'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';
import SignIn from './pages/SignIn'

import { Route } from "wouter";
function App() {


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
