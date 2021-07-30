import React from 'react';
import styled from 'styled-components'
import Background from '../imgs/background.jpg';

const Main = styled.main`
    width: 100vw;
    margin: auto;
    display: flex;
    flex-direction: column;
    background: url("../imgs/background.jpg");
`;

const Intro = styled.article`
    width: 95vw;
    max-width: 900px;
    margin: auto;
    padding: 40px 0;

    & header {
        text-align: center;
        font-size: 1.8rem;
        padding-bottom: 20px;
    }

    & p{
        text-align: center;
        margin: 10px 0;
    }
`;

const Section2 = styled.div`
    width: 100vw;
    min-height: 400px;
    height: calc( 100vh - 790px);
    background: url(${Background}) no-repeat fixed bottom;
    background-size: cover;
`;

const FindUs = styled.div`
    width: 100vw;
    background-color: rgb(68, 68, 68);
    padding-bottom: 50px;

    & h1 {
        text-align: center;
        color: #fff;
    }

    & .info{
        text-align: center;
        font-size: 1rem;
        color: #fff;
        margin: 10px 0;
    }
`;

export default function HomePage() {
    return (
        <Main>
            <Intro>
                <header>We are Kon Ramen</header>
                <p>魂 (Kon) is the Japanese word for soul</p>
                <p>Each bow of Kon ramen contains our hard work and most importantly our soul</p>
                <p>We prepared our broth everyday and slow cooked it with fresh ingredients for 20 hours+</p>
                <p>The result of that is an intense and deeply flavored broth</p>
                <p>We wish you enjoy every drop of our ramen</p>
                <p>Your enjoyment of Kon ramen will be the greatest compliment for us!</p>
            </Intro>
            <Section2>
            </Section2>
            <FindUs>
                <h1>Find Us</h1>
                <div>
                    <p className='info'>Shop 1, 234 Adelaide Street</p>
                    <p className='info'>Brisbane CBD, QLD, 4000, Australia</p>
                    <p className='info'>11am-9pm Mon-Sun</p>
                    <p className='info'>+61 7 5555 5555</p>
                </div>
            </FindUs>
        </Main>
    )
}
