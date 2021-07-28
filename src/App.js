import React, {useReducer, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';

// Importing components
import Navbar from './components/navbar/Navbar.js';
import HomePage from './pages/HomePage.js'
import OrderingPage from './pages/OrderingPage.js';
import UserForm from './pages/UserForm.js';
import LoginForm from './pages/LoginForm.js';
import EditMenu from './pages/EditMenu.js';

// Importing reducers
import { initialOrder, orderReducer } from './useReducer/orderReducer.js';

// Exporting orderContext
export const OrderContext = React.createContext();

function App() {

  // Define order reducer
  const [order, orderDispatch] = useReducer(orderReducer, initialOrder);
    

  ////////////////////////////// User ////////////////////////////////////
  
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
  
    useEffect(() => {
      axios.get('http://localhost:5000/users/cookie', {withCredentials: true})
        .then(response => {
          setAuthenticated(true)
          setUser(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
      axios.get('http://localhost:5000/users/logout', {withCredentials: true})
        .then((res) => {
          window.location = '/';
          setAuthenticated(false);
          setUser(null);
          alert('Logged out');
        })
        .catch(err => alert(err))
    }
  /////////////////////// End of User ////////////////////////////////////
  
  return (
      <OrderContext.Provider
        value={{ orderState: order, orderDispatch: orderDispatch}}
      >
        <BrowserRouter className='App'>
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          <p>email: admin@admin.com pw:000000 *6x0s*</p>
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          
          <Navbar
            authenticated={authenticated}
            handleLogout={handleLogout}
            user={user}
          />
          <Switch className='main-content'>

            {/* Route for home page */}
            <Route exact path='/'>
              <HomePage />
            </Route>
            
            {/* Route for ordering */}
            <Route exact path='/order'>
              <OrderingPage />
            </Route>
            
            {/* Route for login */}
            <Route exact path='/users/login'>
              <LoginForm
                setAuthenticated={setAuthenticated}
                setUser={setUser}
              />
            </Route>

            {/* Route for creating user */}
            <Route exact path='/users/register'>
              <UserForm
                setAuthenticated={setAuthenticated}
                setUser={setUser}
              />
            </Route>

            <Route exact path='/admin/menu'>
              <EditMenu />
            </Route>

            {/* Route for redirection */}
            <Route><Redirect to='/' /></Route>
          </Switch>
        </BrowserRouter>
      </OrderContext.Provider>
  );
}

export default App;
