import React, {useContext} from 'react'
import './ItemModal.css';
import Modal from 'react-modal';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer';

export default function ItemModal(props) {
    const orderContext = useContext(OrderContext);

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            className='item-modal'
            ariaHideApp={false}
        >
            <button className='close-btn' onClick={props.closeModal}>x</button>
            <img className='item-thumbnail' src={props.thumbnail} alt={props.name} />
            <p className='item-name'>{props.name}</p>
            <p className='item-price'>AUD $ {(props.unitPrice/100).toFixed(2)}</p>
            <p className='item-description'>{props.description}</p>
            <div className="item-btn-container">
                <button
                    className="item-btn-add"
                    onClick={() => {
                        props.closeModal();
                        orderContext.orderDispatch({
                        type: ACTIONS.ADD_ITEM_TO_ORDER,
                        value: {
                            name: props.name,
                            unitPrice: props.unitPrice
                        }
                    })}}
                >
                    ADD +
                </button>

            </div>
        </Modal>
    )
}