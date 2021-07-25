import React, {useContext} from 'react'
import './ItemModal.css';
import Modal from 'react-modal';
// import QtyButton from '../buttons/QtyButton.js';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer';

export default function ItemModal(props) {
    const orderContext = useContext(OrderContext);
    // const [qty, setQty] = useState(1);

    // const addAction = (n) =>{
    //     props.closeModal()
    //     let index = orderContext.orderState.orderItems.findIndex( item =>
    //         item.itemId === props.itemId
    //     )

    //     if (index === -1) {
    //         return orderContext.orderDispatch({
    //             type: ACTIONS.ADD_ITEM_TO_ORDER,
    //             value: {
    //                 itemId: props.itemId,
    //                 name: props.name,
    //                 unitPrice: props.unitPrice,
    //                 qty: n
    //             }
    //         })
    //     } else {
    //         return orderContext.orderDispatch({
    //             type: ACTIONS.ADD_ITEM_BY_N,
    //             value: {
    //                 index: index,
    //                 qty: n
    //             }
    //         })
    //     }

    // }

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
                {/* <QtyButton 
                    qty={qty}
                    add={() => setQty(qty + 1)}
                    subtract={() => {
                        if(qty>1){
                            setQty(qty - 1)
                        }
                    }}
                /> */}
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