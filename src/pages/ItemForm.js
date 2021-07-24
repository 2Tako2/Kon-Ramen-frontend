import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { TextInput, TextAreaInput, NumberInput, CheckBoxInput, FormBtn, SelectInput, FileUpload } from '../components/formComponents.js';

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

    const [form, setForm] = useState({
        published: true,
        name: '',
        unitPrice: 0,
        description: ''
    });

    const [categories, setCategories] = useState([
        {name: "Main", _id: "60fbabcf0deddc060ef4ba12"},
        {name: "Topping", _id: "60fbb0c00deddc060ef4ba25"},
        {name: "Side", _id: "60fbb0c50deddc060ef4ba27"},
        {name: "Drink", _id: "60fbb0c90deddc060ef4ba29"},
    ]);
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        //fetch categories 
        // axios.get('http://localhost:5000/categories/')
        //     .then(res => setCategories(res.data))
        //     .catch(err => console.log(err))
    }, [])

    const createItem = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/items', form)
            .then( res => console.log(`Successfully created ${form.name} item`))
            .catch(err => console.log(err));
    }

    return (
        <Main>
            <Header>{props.editing ? 'Edit Item' : 'Crete Item'}</Header>
            {console.log(form)}
            <Form onSubmit={createItem}>
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    onChange={(e) => setForm({...form, published: e.target.checked})}
                    value={form.published}
                />

                <TextInput
                    label='Item Name :'
                    name='itemName'
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    value={form.name}
                    placeholder='Please insert item name'
                />

                <NumberInput
                    label='Unit Price :'
                    name='unitPrice'
                    onChange={(e) => setForm({...form, unitPrice: e.target.value})}
                    value={form.unitPrice}
                    placeholder='Please insert unit price'
                    step={0.05}
                />
                
                <SelectInput
                    label='Category :'
                    name='category'
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    options={categories}
                />

                <TextAreaInput
                    name='description'
                    label='Description :'
                    placeholder='Description of the item...'
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    value={form.description}
                />

                <FileUpload
                    label="Upload thumbnail :"
                />

                <br />
                
                <FormBtn value='Submit'/>

            </Form>
        </Main>
    )
}