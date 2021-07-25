import React, {useReducer, useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';

// Importing components
import Navbar from './components/navbar/Navbar.js';
import HomePage from './pages/HomePage.js'
import ItemMenu from './components/ItemMenu.js';
import ItemForm from './pages/ItemForm.js';
import CategoryForm from './pages/CategoryForm.js';
import UserForm from './pages/UserForm.js';
import LoginForm from './pages/LoginForm.js';

// Importing reducers
import { initialOrder, orderReducer } from './useReducer/orderReducer.js';
import { User } from './useReducer/userReducer.js';

import data1 from './data/data.js';

// Exporting orderContext
export const OrderContext = React.createContext();

function App() {
  const [order, orderDispatch] = useReducer(orderReducer, initialOrder);
  const [loggedIn, setLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setCategories(["Main", "Topping", "Side", "Drink"]);
    setItems(data1);
  },[])

  
  return (
    <OrderContext.Provider
      value={{ orderState: order, orderDispatch: orderDispatch}}
    >
      <BrowserRouter className='App'>
        <button onClick={() => setLoggedIn(!loggedIn)}>
          {loggedIn ? 'Log out' : 'Log in'}
        </button>
        <Navbar user={User} loggedIn={loggedIn}/>
        <Switch className='main-content'>

          {/* Route for home page */}
          <Route exact path='/'>
            <HomePage />
          </Route>
          
          {/* Route for ordering */}
          <Route exact path='/order'>
            <ItemMenu
              itemList={items}
              categories={categories}
            />
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
  );
}

export default App;


// https://reactrouter.com/web/guides/quick-start
