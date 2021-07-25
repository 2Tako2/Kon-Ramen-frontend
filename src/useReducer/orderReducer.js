
export const initialOrder = {
    completed: false,
    takeAway: true,
    pickupTime: new Date(),
    instruction: '',
    userId: '',
    subTotal: 0,
    serviceCharge: 30,
    orderItems: []
}

export const ACTIONS = {
    TOGGLE_TAKEAWAY: 'TOGGLE_TAKEAWAY',
    ONCHANGE_PICKUP_TIME: 'ONCHANGE_PICKUP_TIME',
    ONCHANGE_INSTRUCTION: 'ONCHANGE_INSTRUCTION',
    ADD_ITEM_TO_ORDER: 'ADD_ITEM_TO_ORDER',
    REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER'
}


export const orderReducer = (order, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_TAKEAWAY:
            return { ...order, takeAway: !order.takeAway} 
        case ACTIONS.ONCHANGE_PICKUP_TIME:
            return {...order, pickupTime: action.value};
        case ACTIONS.ONCHANGE_INSTRUCTION:
            return {...order, instruction: action.value};
        // // action.value = { index, qty }
        // case ACTIONS.ADD_ITEM_BY_N: {
        //     let newList2 = order.orderItems.slice()
        //     let qty = action.value.qty
        //     console.log(newList2[action.value.index].qty)
        //     console.log(action.value.qty)
        //     newList2[action.value.index].qty += qty
        //     return {...order, orderItems: newList2}
        // }
        // // action.value = index
        // case ACTIONS.SUBTRACT_ITEM_BY_1: {
        //   let newList = order.orderItems.slice()
        //   newList[action.value].qty --
        //   return {...order, orderItems: newList}
        // }
        // action.value = { itemId, name, unitPrice}
        case ACTIONS.ADD_ITEM_TO_ORDER: {
            let newSubTotal = order.subTotal + action.value.unitPrice
            return ({
              ...order,
              orderItems: [
                ...order.orderItems,
                {
                  name: action.value.name,
                  unitPrice: action.value.unitPrice,
                  ready: false
                }
              ],
              subTotal: newSubTotal
            }
            )
        }
        case ACTIONS.REMOVE_ITEM_FROM_ORDER: {
            let newSubTotal = order.subTotal - order.orderItems[action.value].unitPrice
            console.log(newSubTotal)
            return {
              ...order,
              orderItems: order.orderItems.filter((item, index) => index !== action.value),
              subTotal: newSubTotal
            }
        }
        default:
            return order;
    }
}