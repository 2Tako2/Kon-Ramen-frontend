
export const initialOrder = {
    orderId: 123,
    status: false,
    takeAway: true,
    pickupTime: new Date(),
    instruction: '',
    userId: 99999,
    subCost: 0.00,
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
    REMOVE_ITEM_FROM_ORDER: 'REMOVE_ITEM_FROM_ORDER'
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
            return order;

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
        default:
            return order;
    }
}






        // case ACTIONS.ADD:
        //       let index = order.orderItems.findIndex(item => item.itemId === action.value)
        //       if (index === -1){
        //         let item = itemList.find( o => o.id === action.value)
        //         return {
        //           ...order,
        //           orderItems: [
        //             ...order.orderItems,
        //             {
        //               itemId: item.id,
        //               name: item.name,
        //               qty: 1,
        //               unitPrice: item.unitPrice
        //             }
        //           ]
        //         }
        //       } else{
        //         let newList1 = order.orderItems.slice()
        //         newList1[index].qty ++
        //         return {...order, orderItems: newList1}
        //       }

        //   case ACTIONS.SUBTRACT:
        //       // let itemIndex = order.orderItem.findIndex(item => item.itemId === action.value)
        //       console.log(action.value)
        //       if (order.orderItem[action.value].qty <= 1){
        //         return {
        //           ...order,
        //           orderItems: order.orderItems.filter((item, index) => index !== action.value)
        //         }
        //       } else {
        //         let newList = order.orderItems.slice()
        //         newList[action.value].qty --
        //         return {...order, orderItems: newList}
        //       }