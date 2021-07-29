import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MenuNav from '../components/menu/MenuNav.js';
import RenderItemCards from '../components/menu/RenderItemCards.js';
import OrderListModal from '../components/orderList/OrderListModal.js';

const Main = styled.div`
    margin-bottom: 50px;
`;

export default function OrderingPage() {
    const [menu, setMenu] = useState([])
    const [openOrderList, setOpenOrderList] = useState(false)
    
    const filteredMenu = menu.filter(category => (category.published === true) && (category.items.length > 0))
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/categories/`)
        .then(res => setMenu(res.data))
        .catch(err => console.log(err));
    },[])
    

    return (
            <Main>
                <MenuNav
                    menu={filteredMenu}
                    openModal={() => setOpenOrderList(true)} 
                />
                <RenderItemCards menu={filteredMenu}/>
                <OrderListModal
                    isOpen={openOrderList}
                    closeModal={() => setOpenOrderList(false)}
                    />
            </Main>
    )
}
