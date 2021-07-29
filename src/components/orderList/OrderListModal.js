import React, {useContext} from 'react';
import './OrderListModal.css';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer.js';
import axios from 'axios';


import Modal from 'react-modal';
import PickupTime from './PickupTime.js';
import OrderListItem from './OrderListItem.js';
import PaymentSummary from './PaymentSummary';
import SpecialInstruction from './SpecialInstruction';

export default function OrderListModal(props) {
    const orderContext = useContext(OrderContext)

    const renderItems = orderContext.orderState.orderItems.map((item, index) =>
            <OrderListItem
                key={index}
                index={index}
                name={item.name}
                unitPrice={item.unitPrice}
                addHandler={() => orderContext.orderDispatch({
                        type: ACTIONS.ADD_ITEM_TO_ORDER,
                        value: {
                            name: item.name,
                            unitPrice: item.unitPrice
                        }
                    })}
                removeHandler={() => orderContext.orderDispatch({
                    type: ACTIONS.REMOVE_ITEM_FROM_ORDER,
                    value: index
                })}
            />
    )


    const handleConfirm = () => {
        if(orderContext.orderState.orderItems.length === 0){
            alert('Order list is empty')
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND}/orders/`, orderContext.orderState)
                .then(res => {
                    window.location=`/receipt/${res.data}`
                })
                .catch(err => alert(err));
        }
    }
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
                        onClick={handleConfirm}
                    >MAKE PAYMENT</button>
                </div>
            </div>
        </Modal>
    )
}
