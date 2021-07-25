import React, {useContext} from 'react';
import './OrderListModal.css';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer.js';


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
                qty={item.qty}
                addHandler={() => orderContext.orderDispatch({
                        type: ACTIONS.ADD_ITEM_BY_N,
                        value: {
                            index: index,
                            qty: 1
                        }
                    })}
                subtractHandler={() => orderContext.orderDispatch({
                    type: ACTIONS.SUBTRACT_ITEM_BY_1,
                    value: index
                })}
                removeHandler={() => orderContext.orderDispatch({
                    type: ACTIONS.REMOVE_ITEM_FROM_ORDER,
                    value: index
                })}

                addItem={() => orderContext.orderDispatch({
                    type: ACTIONS.ADD_ITEM,
                    value: {
                        name: item.name,
                        qty: 1
                    }
                })}
                subtractItem={() => orderContext.orderDispatch({
                    type: ACTIONS.SUBTRACT_ITEM,
                    value: index
                })}
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
