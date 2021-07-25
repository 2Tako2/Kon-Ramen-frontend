
export const initialOrder = {
    _id: '',
    completed: false,
    takeAway: true,
    pickupTime: new Date(),
    instruction: '',
    userId: '',
    subTotal: 0,
    serviceCharge: 0.3,
    orderItems: []
}

export const ACTIONS = {
    TOGGLE_STATUS: 'TOGGLE_STATUS',
    TOGGLE_TAKEAWAY: 'TOGGLE_TAKEAWAY',
    ONCHANGE_PICKUP_TIME: 'ONCHANGE_PICKUP_TIME',
    ONCHANGE_INSTRUCTION: 'ONCHANGE_INSTRUCTION',
    UPDATE_SUB_COST: 'UPDATE_SUB_COST',
    ADD_ITEM_BY_N: 'ADD_ITEM_BY_1',
    SUBTRACT_ITEM_BY_1: 'SUBTRACT_ITEM_BY_1',
    ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
    REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER',
    ADD_ITEM: 'ADD_ITEM',
    SUBTRACT_ITEM: 'SUBTRACT_ITEM'
}


export const orderReducer = (order, action) => {
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
            return {...order, subTotal: action.value};
        // action.value = { index, qty }
        case ACTIONS.ADD_ITEM_BY_N:
            let newList2 = order.orderItems.slice()
            let qty = action.value.qty
            console.log(newList2[action.value.index].qty)
            console.log(action.value.qty)
            newList2[action.value.index].qty += qty
            return {...order, orderItems: newList2}
        
        // action.value = index
        case ACTIONS.SUBTRACT_ITEM_BY_1:
          let newList = order.orderItems.slice()
          newList[action.value].qty --
          return {...order, orderItems: newList}

        // action.value = { itemId, name, unitPrice}
        case ACTIONS.ADD_ITEM_TO_ORDER:
            return {
              ...order,
              orderItems: [
                ...order.orderItems,
                {
                  name: action.value.name,
                  qty: action.value.qty,
                  unitPrice: action.value.unitPrice,
                  ready: false
                }
              ]
            }
        // action.value = index
        case ACTIONS.REMOVE_ITEM_FROM_ORDER:
            return {
              ...order,
              orderItems: order.orderItems.filter((item, index) => index !== action.value)
            }




        case ACTIONS.ADD_ITEM:{
            const index = order.orderItems.findIndex(item => item.name === action.value.name)
            if(index===-1){
                console.log('adding item to list')
                return {...order, orderItems: [...order.orderItems, {
                    name: action.value.name,
                    qty: 1,
                    unitPrice: action.value.unitPrice,
                    ready: false
                }]}
            } else {
                console.log('adding qty')
                let newItem = order.orderItems[index]
                return {...order, orderItems: [newItem]};
            }
        }
        case ACTIONS.SUBTRACT_ITEM: {
            if(order.orderItems[action.value].qty <= 1){
                console.log("removing")
                return {
                    ...order,
                    orderItems: order.orderItems.filter((item, index) => index !== action.value)
                }
            } else {
                console.log("subtracting")
                let newList = order.orderItems.slice()
                newList[action.value].qty--
                return {...order, orderItems: newList}
            }
        }




        default:
            return order;
    }
}