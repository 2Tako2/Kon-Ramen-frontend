import React, {useReducer, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect, Link} from 'react-router-dom'
import './App.css';
import axios from 'axios';

// Importing components
import Navbar from './components/navbar/Navbar.js';
import HomePage from './pages/HomePage.js'
// import ItemMenu from './components/ItemMenu.js';
import OrderingPage from './pages/OrderingPage.js';
import ItemForm from './pages/ItemForm.js';
import CategoryForm from './pages/CategoryForm.js';
import UserForm from './pages/UserForm.js';
import LoginForm from './pages/LoginForm.js';

// Importing reducers
import { initialOrder, orderReducer } from './useReducer/orderReducer.js';
import { menuReducer, MENU_ACTIONS } from './useReducer/menuReducer';
import { User } from './useReducer/userReducer.js';

// Exporting orderContext
export const OrderContext = React.createContext();
export const MenuContext = React.createContext();

function App() {

  // Define reducers
  const [order, orderDispatch] = useReducer(orderReducer, initialOrder);
  
  ////////////////////////////// Order ////////////////////////////////////
  const [menu, menuDispatch] = useReducer(menuReducer, []);
  
  useEffect(() => {
    axios.get('http://localhost:5000/categories/')
    .then(res => 
      menuDispatch({
        type: MENU_ACTIONS.LOAD_MENU,
        value: res.data
      })
      )
    },[])
  ///////////////////////// End of Order //////////////////////////////////
    

  ////////////////////////////// User ////////////////////////////////////
    const [loggedIn, setLoggedIn] = useState(false);
  
    const [authenticate, setAuthenticate] = useState(false)
    const [user, setUser] = useState(null)
  
    useEffect(() => {
      axios.get('http://localhost:5000/user', {
        credentials: 'include'
      })
        .then(data => data.json())
        .then(user => {
          setAuthenticate(true)
          setUser(user)
        })
        .catch(err => alert(err))
    }, [])

    const handleLogout = () => {
      axios.get('http://localhost:5000/logout', {
        credentials: 'include'
      })
        .then(() => {
          setAuthenticate(false);
          setUser(null);
          alert('Logged out')
        })
        .catch(err => alert(err))
    }
  /////////////////////// End of User ////////////////////////////////////
  
  return (
    <MenuContext.Provider
      value={{ menuState: menu, menuDispatch: menuDispatch}}
    >
      <OrderContext.Provider
        value={{ orderState: order, orderDispatch: orderDispatch}}
      >
        <BrowserRouter className='App'>

          <button onClick={() => setLoggedIn(!loggedIn)}>
            {loggedIn ? 'Log out' : 'Log in'}
          </button>
          <Link to='/user'>User</Link>
          <br />
          <Link to='/item'>Item</Link>
          <br />
          <Link to='/category'>Category</Link>


          <Navbar user={User} loggedIn={loggedIn}/>
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
            <Route exact path='/user/login'>
              <LoginForm />
            </Route>

            {/* Route for editing user */}
            <Route exact path='/user/edit'>
              <UserForm
                edit={loggedIn}
              />
            </Route>

            {/* Route for editing user */}
            <Route exact path='/user/create'>
              <UserForm
                edit={loggedIn}
              />
            </Route>

            {/* Route for editing item */}
            <Route path='/item'>
              <ItemForm />
            </Route>
            
            {/* Route for editing or creating category */}
            <Route path='/category'>
              <CategoryForm />
            </Route>

            {/* Route for redirection */}
            <Route><Redirect to='/' /></Route>
          </Switch>
        </BrowserRouter>
      </OrderContext.Provider>
    </MenuContext.Provider>
  );
}

export default App;
