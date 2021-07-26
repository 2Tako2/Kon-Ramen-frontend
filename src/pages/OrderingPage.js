import React, {useState} from 'react';
import styled from 'styled-components';
import MenuNav from '../components/menu/MenuNav.js';
import RenderItemCards from '../components/menu/RenderItemCards.js';
import OrderListModal from '../components/orderList/OrderListModal.js';

const Main = styled.div`
    margin-bottom: 50px;
`;


export default function OrderingPage() {
    // Toggle order list modal
    const [openOrderList, setOpenOrderList] = useState(false)
    return (
        <Main>
            <MenuNav openModal={() => setOpenOrderList(true)} />
            <RenderItemCards />
            <OrderListModal
                isOpen={openOrderList}
                closeModal={() => setOpenOrderList(false)}
            />
        </Main>
    )
}
