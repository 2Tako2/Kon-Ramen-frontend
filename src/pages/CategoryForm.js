import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { CheckBoxInput, TextInput, FormBtn } from '../components/formComponents.js';

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

    const [category, setCategory] = useState({ "name": "", "published": false })
    
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
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    onChange={(e) => setCategory({...category, published: e.target.checked})}
                    value={category.published}
                />
                <TextInput
                    label='Category Name :'
                    name='name'
                    onChange={(e) => setCategory({...category, name: e.target.value})}
                    placeholder='Please insert category name'
                />
                <br />
                <FormBtn value='Submit'/>
            </Form>
        </Main>
    )
}