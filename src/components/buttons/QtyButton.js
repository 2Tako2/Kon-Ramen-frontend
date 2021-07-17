import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Btn = styled.button`
    background: #000;
    border: none;
    color: #fff;
    font-weight: bold;
    height: 25px;
    width: 25px;
    font-size: 1.2rem;
    padding: 0;
    cursor: pointer;
`;

const Qty = styled.p`
    width: 50px;
    border: none;
    text-align: center;
    height: 25px;
    padding: 0;
    margin: 1px;
    font-size: 1.2rem;
`;

export default function QtyButton(props) {

    return (
        <Container>
            <Btn onClick={(props.qty > props.minimum) ? props.minus : null}>-</Btn>
            <Qty>{props.qty}</Qty>
            <Btn onClick={props.add}>+</Btn>
        </Container>
    )
}
