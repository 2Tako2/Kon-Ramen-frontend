import React from 'react';
import styled from 'styled-components';
import {AiOutlineShoppingCart} from 'react-icons/ai';

const MenuContainer = styled.div`
    width: 97vw;
    max-width: 900px;
    display: flex;
    margin: auto;
    justify-content: space-around;
    align-items: center;
    padding: 30px 0;
`;

const Categories = styled.ul`
    display: flex;
    width: 80%;
    justify-content: space-around;
    box-shadow: 0 1px 10px rgba(154,160,185,1), 0 10px 10px rgba(166,173,201,0.5);
    padding: 10px;
    margin: 0;
    background-color: #fff;
`;

const Category = styled.li`
    list-style: none;
    font-size: 1.3rem;
    
    & a{
        text-decoration: none;
        color: #000;
    }
`;

const ShoppingCartIcon = styled.button`
    font-size: 2.7rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export default function MenuNav({menu, openModal}){

    return(
        <MenuContainer>
            {/* Rendering categories */}
            <Categories>
                {menu.map(category => (
                    <Category key={category._id}>
                        <a href={`#${category.name}`}>
                            {category.name}
                        </a>
                    </Category>
                ))}
            </Categories>

            {/* Rendering shopping cart */}
            <ShoppingCartIcon onClick={openModal}>
                <AiOutlineShoppingCart />
            </ShoppingCartIcon>
        </MenuContainer>
    )
};