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

    ////////// This filters out the not published categories with no items  
    return menuContext.menuState.filter(category => (category.published === true) && (category.items.length > 0)).map((category) => (
        <div key={category._id}>
            {console.log(category)}
            <CategoryTitle id={category.name}>{category.name}</CategoryTitle>
            <CategoryContainer>
                {
                    category.items.map( item => (
                        <ItemCard
                            key={item._id}
                            itemId={item._id}
                            name={item.name}
                            unitPrice={item.unitPrice}
                            description={item.description}
                            thumbnail={item.thumbnailUrl}
                        />
                    ))
                }
            </CategoryContainer>
        </div>
    ))
}