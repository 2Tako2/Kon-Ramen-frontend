
export const initialOrder = {
    takeAway: true,
    pickupTime: new Date(),
    orderTime: new Date(),
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