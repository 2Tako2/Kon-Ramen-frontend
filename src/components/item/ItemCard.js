import React, {useState, useContext} from 'react';
import Button from '../buttons/Button';
import styled from 'styled-components';
import ItemModal from './ItemModal.js';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer.js';


const ItemCardContainer = styled.div`
    background-color: #fff;
    border: none;
    width: 250px;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    box-shadow: 0 5px 10px rgba(154,160,185,1), 0 15px 40px rgba(166,173,201,0.5);
`;

const ItemThumbnailBtn = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const ItemThumbnail = styled.img`
    width: 150px;
    height: 150px;
    margin: 10px auto;
`;

const ItemName = styled.p`
    margin: 5px;
    font-size: 1.3rem;
    font-weight: bold; 
    
`;

const ItemPrice = styled.p`
    margin: 5px;
    font-size: 1.2rem;
`;

export default function ItemCard({name, unitPrice, thumbnail, description}) {
    const orderContext = useContext(OrderContext);
    const [itemModal, setItemModal] = useState(false);

    return (
        <ItemCardContainer>
            <ItemModal
                isOpen={itemModal}
                closeModal={() => setItemModal(false)}
                name={name}
                unitPrice={unitPrice}
                thumbnail={thumbnail}
                description={description}
            />
            <ItemThumbnailBtn onClick={() => setItemModal(true)}>
                <ItemThumbnail src={thumbnail} alt='item thumbnail'/>
            </ItemThumbnailBtn>
            <ItemName>{name}</ItemName>
            <ItemPrice>AUD $ {(unitPrice/100).toFixed(2)}</ItemPrice>
            <Button 
                content="ADD +"
                onClick={() => orderContext.orderDispatch({
                    type: ACTIONS.ADD_ITEM_TO_ORDER,
                    value: {
                        name: name,
                        unitPrice: unitPrice
                    }
                })}
            />
        </ItemCardContainer>
    )
}