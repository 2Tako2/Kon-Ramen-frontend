import React, {useContext} from 'react';
import styled from 'styled-components';
import { OrderContext } from '../../App';
import { ACTIONS } from '../../useReducer/orderReducer.js';

const Container = styled.div`
    margin: 0px 20px 10px 20px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    padding: 10px 20px;
    background: #fff;
`;

const P = styled.p`
    margin: 0 0 5px 0;
    font-size: 1rem;
    font-weight: bold;
`;

const TextField = styled.input`
    width: 100%;
    height: 30px;
    font-size: 1rem;
`;

export default function SpecialInstruction() {
    const orderContext= useContext(OrderContext);

    return (
        <Container>
            <P>SPECIAL INSTRUCTION :</P>
            <TextField
                type='text'
                placeholder="Anything we could do for you?"
                onChange={(e) => orderContext.orderDispatch({
                    type: ACTIONS.ONCHANGE_INSTRUCTION,
                    value: e.target.value
                })}
                defaultValue={orderContext.orderState.instruction} />
            
        </Container>
    )
}
