import React, {useState} from 'react';
import Button from './Button';
import styled from 'styled-components';
import OverlayItem from './OverlayItem.js';

const ItemCardContainer = styled.div`
    background-color: #fff;
    border: none;
    width: 250px;
    height: 300px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
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

export default function ItemCard(props) {
    const [overlay, setOverlay] = useState(false)

    return (
        <ItemCardContainer onClick={() => console.log("outside")}>
            {overlay && <OverlayItem
                thumbnail={props.thumbnail}
                name={props.name}
                price={props.price}
                description={props.description}
                closeOverlay={() => setOverlay(false)}
            />}
            <ItemThumbnailBtn onClick={() => setOverlay(true)}>
                <ItemThumbnail src={props.thumbnail} alt='item thumbnail'/>
            </ItemThumbnailBtn>
            <ItemName>{props.name}</ItemName>
            <ItemPrice>AUD $ {props.price}</ItemPrice>
            <Button content="ADD +" onClickHandler={() => console.log("clicked")} />
        </ItemCardContainer>
    )
}


// http://reactcommunity.org/react-modal/