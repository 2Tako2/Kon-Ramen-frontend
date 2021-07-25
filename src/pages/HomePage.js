import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom';

const Main = styled.main`
    width: 100vw;
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
`;

export default function HomePage() {
    return (
        <Main>
            <h1>Home Page</h1>
            <Link to='/order'>ORDER NOW</Link>
            <Link to='/user'>User</Link>
            <Link to='/item'>Item (not working)</Link>
            <Link to='/category'>Category</Link>
        </Main>
    )
}
