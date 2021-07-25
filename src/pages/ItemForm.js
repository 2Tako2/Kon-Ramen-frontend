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

    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState('');


    // Fetching Categories options from database
    useEffect(() => { 
        axios.get('http://localhost:5000/categories/')
            .then(res => setCategories(...categories, res.data))
    }, [])

    const createItem = (e) => {
        e.preventDefault();
        let itemFormData = new FormData();
        itemFormData.append('published', form.published)
        itemFormData.append('name', form.name)
        itemFormData.append('unitPrice', form.unitPrice)
        itemFormData.append('description', form.description)
        itemFormData.append('thumbnail', thumbnail)
        itemFormData.append('category', form.category)
        console.log(itemFormData.entries())
        fetch('http://localhost:5000/items/', {
            method: "POST",
            body: itemFormData
        })
        .then(res => res.json())
        // axios.post('http://localhost:5000/items', itemFormData)
        //     .then( res => console.log(`Successfully created ${form.name} item`))
        //     .catch(err => console.log(err));
    }

    return (
        <Main>
            <Header>{props.editing ? 'Edit Item' : 'Crete Item'}</Header>
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
                    name={thumbnail}
                    onChange={(e) => setThumbnail(e.target.files[0])}
                />

                <br />
                
                <FormBtn value='Submit'/>

            </Form>
        </Main>
    )
}