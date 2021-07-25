import React, {useContext} from 'react';
import styled from 'styled-components'
import { MenuContext } from '../../App.js';
import ItemCard from '../item/ItemCard.js';

const CategoryTitle = styled.h1`
    text-align: center;
`;

const CategoryContainer = styled.div`
    display: flex;
    width: 95vw;
    max-width: 1100px;
    margin: auto;
    flex-wrap: wrap;
    justify-content: center;
`;

export default function RenderItemCards() {
    const menuContext = useContext(MenuContext)


    ///////////////
    //this filters out the categories with no items
    ///////////////
    // return menuContext.menuState.filter(category => category.items.length > 0).map((category) => (
    return menuContext.menuState.map((category) => (
        <div key={category._id}>
            <CategoryTitle id={category.name}>{category.name}</CategoryTitle>
            <CategoryContainer>
                {
                    category.items.filter(items => items.length > 0).map( item => (
                        <ItemCard
                            key={item._id}
                            itemId={item._id}
                            name={item.name}
                            unitPrice={item.unitPrice}
                            description={item.description}
                            thumbnail={item.thumbnail}
                        />
                    ))
                }
            </CategoryContainer>
        </div>
    ))
}