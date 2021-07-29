import React, {useContext} from 'react';
import styled from 'styled-components';
import { OrderContext } from '../App';
import {format} from 'date-fns';


const Receipt = styled.div`
    width: 100vw;
    max-width: 350px;
    margin: 40px auto;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    padding: 20px;
`;

const Header = styled.h1`
    text-align: center;
    margin: 10px;
    font-size: 2.3rem;
`;

const OrderNumber = styled.h2`
    text-align: center; 
    font-size: 1.4rem;
    color: red;
    margin: 20px 0 5px 0;
`;

const TakeAway = styled.h3` text-align: center; margin: 10px 0;`;

const P = styled.p` margin: 0; padding: 0 10px; font-size: 0.9rem;`;

const BoldP = styled.p`
    margin: 10px 0;
    font-weight: bold;
    padding: 0 10px;
`;

const LightP = styled.p`
    margin: 0;
    font-size: 0.8rem;
    color: rgb(102, 102, 102);
    padding: 0 10px;
`;

const CenterP = styled.p`
    margin: 20px 0 10px 0;
    font-size: 0.8rem;
    text-align: center;
`;
const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Hr = styled.hr``;

export default function ReceiptPage() {
    const orderContext = useContext(OrderContext);
    return (
        <Receipt>
            <Header>Order Receipt</Header>
            <OrderNumber>Order Number : 101</OrderNumber>
            <TakeAway>-- TAKE AWAY --</TakeAway>
            <Row>
                <P>Ordered at</P>
                <P>{
                    format(
                        orderContext.orderState.orderTime,
                        "dd'-'MM'-'YYY' 'HH':'mm"
                    )}
                </P>
            </Row>
            <Row>
                <P>Pick up time :</P>
                <P>{
                    format(
                        orderContext.orderState.pickupTime,
                        "dd'-'MM'-'YYY' 'HH':'mm"
                    )}
                </P>

            </Row>
            <BoldP>ORDER SUMMERY</BoldP>
            { orderContext.orderState.orderItems.map(item => 
                <Row>
                    <P>{item.name}</P>
                    <P>AUD $ {(item.unitPrice/100).toFixed(2)}</P>
                </Row>  
            )}
            <Hr />
            <Row>
                <LightP>SUBTOTAL</LightP>
                <LightP>AUD $ {(orderContext.orderState.subTotal/100).toFixed(2)}</LightP>
            </Row>
            <Row>
                <LightP>SERVICE CHARGE</LightP>
                <LightP>AUD $ {(orderContext.orderState.serviceCharge/100).toFixed(2)}</LightP>
            </Row>
            <Row>
                <LightP>GST (INCL) 10%</LightP>
                <LightP>AUD $ {((orderContext.orderState.serviceCharge+orderContext.orderState.subTotal)/1000).toFixed(2)}</LightP>
            </Row>
            <Hr />
            <Row>
                <BoldP>TOTAL PAYMENT</BoldP>
                <BoldP>AUD $ {((orderContext.orderState.serviceCharge+orderContext.orderState.subTotal)/100).toFixed(2)}</BoldP>
            </Row>
            <CenterP>-- Please pay at the counter with this receipt--</CenterP>
        </Receipt>
    )
}
