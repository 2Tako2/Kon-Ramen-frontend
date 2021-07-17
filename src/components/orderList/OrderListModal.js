import React, {useContext} from 'react';
import './OrderListModal.css';
import {OrderContext, ACTIONS} from '../../App.js';

import Modal from 'react-modal';
import PickupTime from './PickupTime.js';
import OrderListItem from './OrderListItem.js';
import PaymentSummary from './PaymentSummary';
import SpecialInstruction from './SpecialInstruction';

export default function OrderListModal(props) {
    const orderContext = useContext(OrderContext)

    const addItemBy1 = (target, list) => {
        return(
            list.map( item => {
                if(item.itemId === target){
                    console.log(item.itemId)
                    console.log(item.qty)
                }
                return item
            })
        )
    }

    const renderItems = orderContext.orderState.orderedItems.map((item, index) =>
            <OrderListItem
                key={index}
                index={index}
                name={item.name}
                unitPrice={item.unitPrice}
                qty={item.qty}
                // addHandler={}
                // subtractHandler={() => orderContext.orderDispatch({
                //     type: ACTIONS.REMOVE_ITEM_FROM_ORDER,
                //     value: index
                // })}
            />
    )

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            className='orderList-modal'
            ariaHideApp={false}
        >
            <button className='close-btn' onClick={props.closeModal}>x</button>

            <div className="orderList-topSection">
                <h1 className='orderList-header'>Confirm Order</h1>
                <PickupTime />
                {renderItems}  
            </div>

            <div className="orderList-bottomSection">
                <SpecialInstruction />
                <div className="orderList-sub-bottomSection">
                    <PaymentSummary />
                    <button
                        className='confirm-btn'
                        onClick={() =>
                            orderContext.orderDispatch({
                                type: ACTIONS.TOGGLE_TAKEAWAY  
                            })
                        }
                    >MAKE PAYMENT</button>
                </div>
            </div>
        </Modal>
    )
}
