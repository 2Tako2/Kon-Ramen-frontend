import React from 'react';
import styled from 'styled-components'
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

export default function RenderItemCards({menu}) {

    return menu.map(category =>
        <div key={category._id}>
            <CategoryTitle id={category.name}>{category.name}</CategoryTitle>
            <CategoryContainer>
                {
                    category.items.map(item => (
                        <ItemCard
                            key={item._id}
                            name={item.name}
                            unitPrice={item.unitPrice}
                            thumbnail={item.thumbnailUrl}
                            description={item.description}
                        />
                    ))
                }
            </CategoryContainer>
        </div>
    )
}