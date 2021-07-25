import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { TextInput, FormBtn } from '../components/formComponents.js';

const Main = styled.main`
    width: 100vw;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

const Header = styled.h2`
    text-align: center;
`

const Form = styled.form`
    width: 100%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    margin: auto;
`;

export default function ItemForm(props) {

    const [category, setCategory] = useState({ "name": "" })
    
    const postCategory = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/categories/', category)
            .then( res => console.log(`Successfully created ${category.name} category`))
            .catch( err => console.log(err))
    }

    return (
        <Main>
            <Header>{props.editing ? 'Edit Category' : 'Crete Category'}</Header>
            <Form onSubmit={postCategory}>
                <TextInput
                    label='Category Name :'
                    name='name'
                    onChange={(e) => setCategory({[e.target.name]: e.target.value})}
                    placeholder='Please insert category name'
                />
                <br />
                <FormBtn value='Submit'/>
            </Form>
        </Main>
    )
}