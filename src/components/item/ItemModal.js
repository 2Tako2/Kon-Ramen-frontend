import React, {useContext} from 'react'
import './ItemModal.css';
import Modal from 'react-modal';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer';

export default function ItemModal({isOpen, closeModal, thumbnail, unitPrice, description, name}) {
    const orderContext = useContext(OrderContext);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='item-modal'
            ariaHideApp={false}
        >
            <button className='close-btn' onClick={closeModal}>x</button>
            <img className='item-thumbnail' src={thumbnail} alt={name} />
            <p className='item-name'>{name}</p>
            <p className='item-price'>AUD $ {(unitPrice/100).toFixed(2)}</p>
            <p className='item-description'>{description}</p>
            <div className="item-btn-container">
                <button
                    className="item-btn-add"
                    onClick={() => {
                        closeModal();
                        orderContext.orderDispatch({
                        type: ACTIONS.ADD_ITEM_TO_ORDER,
                        value: {
                            name: name,
                            unitPrice: unitPrice
                        }
                    })}}
                >
                    ADD +
                </button>

            </div>
        </Modal>
    )
}