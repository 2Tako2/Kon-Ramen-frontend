import React, {useReducer, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import axios from 'axios';

// Importing components
import Navbar from './components/navbar/Navbar.js';
import HomePage from './pages/HomePage.js'
import OrderingPage from './pages/OrderingPage.js';
import UserForm from './pages/UserForm.js';
import LoginForm from './pages/LoginForm.js';
import EditMenu from './pages/EditMenu.js';

import ReceiptPage from './pages/ReceiptPage';

// Importing reducers
import { initialOrder, orderReducer } from './useReducer/orderReducer.js';
import { initialCategory, categoryReducer } from './useReducer/categoryReducer';

// Exporting orderContext
export const OrderContext = React.createContext();
export const CategoryContext = React.createContext();

function App() {

  // Define order reducer
  const [order, orderDispatch] = useReducer(orderReducer, initialOrder);
  const [category, categoryDispatch] = useReducer(categoryReducer, initialCategory);

  ////////////////////////////// User ////////////////////////////////////
  
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState({'role': ''})
  
    useEffect(() => {
      axios.get('https://konramen.herokuapp.com/users/cookie', {withCredentials: true})
        .then(response => {
          setAuthenticated(true)
          setUser(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
      axios.get(`${process.env.REACT_APP_BACKEND}/users/logout`, {withCredentials: true})
        .then((res) => {
          window.location = '/';
          setAuthenticated(false);
          setUser({'role': ''});
          alert('Logged out');
        })
        .catch(err => alert(err))
    }
  /////////////////////// End of User ////////////////////////////////////
  
  return (
    <BrowserRouter className='App'>
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
          
          <OrderContext.Provider
          value={{ orderState: order, orderDispatch: orderDispatch }}
          >
            {/* Route for ordering */}
            <Route exact path='/order'>
                <OrderingPage />
            </Route>

            {/* Route for receipt */}
            <Route exact path='/receipt'>
              <ReceiptPage />
            </Route>
          </OrderContext.Provider>

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
            {
              (authenticated && user.role==='admin') ?
              <CategoryContext.Provider
                value={{ categoryState: category, categoryDispatch: categoryDispatch }}
              >
                <EditMenu />
              </CategoryContext.Provider>
              :
              <Redirect to='/' />
            }
          </Route>

          {/* Route for redirection */}
          <Route><Redirect to='/' /></Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
