import React, {useReducer} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import ItemMenu from './components/ItemMenu.js';
import data1 from './data/data.js';

export const OrderContext = React.createContext();

  const categories = ["Main", "Topping", "Side", "Drink"];
  const itemList = data1;
  ///////////////// useReducer setup //////////////////
  const initialOrder = {
    orderId: 123,
    status: false,
    takeAway: true,
    pickupTime: new Date(),
    instruction: '',
    userId: 99999,
    subCost: 0.00,
    serviceCharge: 0.3,
    orderedItems: []
  }
  
  export const ACTIONS = {
      TOGGLE_STATUS: 'TOGGLE_STATUS',
      TOGGLE_TAKEAWAY: 'TOGGLE_TAKEAWAY',
      ONCHANGE_PICKUP_TIME: 'ONCHANGE_PICKUP_TIME',
      ONCHANGE_INSTRUCTION: 'ONCHANGE_INSTRUCTION',
      UPDATE_SUB_COST: 'UPDATE_SUB_COST',
      ADD_ITEM_BY_1: 'ADD_ITEM_BY_1',
      SUBTRACT_ITEM_BY_1: 'SUBTRACT_ITEM_BY_1',
      ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
      REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER'
  }

  const reducer = (order, action) => {
      switch (action.type) {
          case ACTIONS.TOGGLE_STATUS:
              return order;
          // Currently bound with the make payment button in orderListModal
          case ACTIONS.TOGGLE_TAKEAWAY:
              return { ...order, takeAway: !order.takeAway} 
          case ACTIONS.ONCHANGE_PICKUP_TIME:
              return {...order, pickupTime: action.value};
          case ACTIONS.ONCHANGE_INSTRUCTION:
              return {...order, instruction: action.value};
          case ACTIONS.UPDATE_SUB_COST:
              return order;
          case ACTIONS.ADD_ITEM_BY_1:
              return {...order, orderedItems: action.value};
          case ACTIONS.SUBTRACT_ITEM_BY_1:
              return order;
          // Would be great to create an orderedItem object later
          case ACTIONS.ADD_ITEM_TO_ORDER:
              return {
                ...order,
                orderedItems: [
                  ...order.orderedItems,
                  {
                    itemId: action.value.id,
                    name: action.value.name,
                    qty: 1,
                    unitPrice: action.value.unitPrice
                  }
                ]
              }
          case ACTIONS.REMOVE_ITEM_FROM_ORDER:
              return order;
          default:
              return order;
      }
  }

  ///////////////// end of useReducer setup //////////////////

function App() {
  const user = {
    email: "example@email.com",
    firstName: "Bob",
    lastName: "Smith",
    membershipPoints: 15
  }

  const [order, dispatch] = useReducer(reducer, initialOrder);

  // const findItem = (itemName, targetList) => {
  //   let selectedItem = null
  //   targetList.forEach( item => {
  //     if(item.name === itemName) {
  //       return selectedItem = item
  //     }
  //   })
  //   return selectedItem;
  // }

  // const containItem = (item) => {
  //   order.
  // }

  return (
    <OrderContext.Provider value={{ orderState: order, orderDispatch: dispatch}}>

      {console.log(order)}
      <div className="App">
        <Navbar user={user}/>
        <ItemMenu
          itemList={itemList}
          categories={categories}
        />
      </div>
    </OrderContext.Provider>
  );
}

export default App;
