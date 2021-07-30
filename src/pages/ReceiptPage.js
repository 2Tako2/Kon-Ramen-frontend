import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {format, parseISO} from 'date-fns';
import axios from 'axios';

import { useParams } from 'react-router';


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
    const {id} = useParams();
    const [order, setOrder] = useState({
        instruction: '',
        serviceCharge: 0,
        subTotal: 0,
        _id: '',
        pickupTime: [],
        createdAt: [],
        orderItems: []
    })
    
    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_BACKEND}/orders/${id}`, {withCredentials: true})
            .then(res => setOrder(res.data))
            .catch(err => alert(err))
            
        // eslint-disable-next-line
    }, [])


    return (
        <Receipt>
            <Header>Order Receipt</Header>
            <OrderNumber>Order Number : {order._id.slice(1,5)}</OrderNumber>
            <TakeAway>-- TAKE AWAY --</TakeAway>
            <Row>
                <P>Ordered at :</P>
                <P>
                    {format(parseISO(`${order.createdAt}`.slice(0,-1)), "dd'-'MM'-'YYY' 'HH':'mm")}
                </P>
            </Row>
            <Row>
                <P>Pick up time :</P>
                <P>
                    {format(parseISO(`${order.pickupTime}`.slice(0,-1)), "dd'-'MM'-'YYY' 'HH':'mm")}
                </P>

            </Row>
            <BoldP>ORDER SUMMERY</BoldP>

            { order.orderItems.map(item => 
                <Row key={item._id}>
                    <P>{item.name}</P>
                    <P>AUD $ {(item.unitPrice/100).toFixed(2)}</P>
                </Row>  
            )}
            <Hr />
            <Row>
                <LightP>SUBTOTAL</LightP>
                <LightP>AUD $ {(order.subTotal/100).toFixed(2)}</LightP>
            </Row>
            <Row>
                <LightP>SERVICE CHARGE</LightP>
                <LightP>AUD $ {(order.serviceCharge/100).toFixed(2)}</LightP>
            </Row>
            <Row>
                <LightP>GST (INCL) 10%</LightP>
                <LightP>AUD $ {((order.serviceCharge + order.subTotal)/1000).toFixed(2)}</LightP>
            </Row>
            <Hr />
            <Row>
                <BoldP>TOTAL PAYMENT</BoldP>
                <BoldP>AUD $ {((order.serviceCharge + order.subTotal)/100).toFixed(2)}</BoldP>
            </Row>

            <BoldP>Special Instruction:</BoldP>
            <P>{order.instruction}</P>
            <Hr />
            <CenterP>-- Please pay at the counter with this receipt--</CenterP>
        </Receipt>
    )
}
