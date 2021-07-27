import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { TextInput, TextAreaInput, NumberInput, CheckBoxInput, FormBtn, SelectInput, FileUpload } from '../components/formComponents.js';
import axios from 'axios';

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

    const [item, setItem] = useState({
        published: true,
        name: '',
        unitPrice: 0,
        description: ''
    });

    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/categories/')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err));
    },[])

    const clearItem = () => {
        setItem({
            published: true,
            name: '',
            unitPrice: 0,
            description: ''
        })
    }

    const createItem = (e) => {
        e.preventDefault();
        let itemFormData = new FormData();
        itemFormData.append('published', item.published)
        itemFormData.append('name', item.name)
        itemFormData.append('unitPrice', item.unitPrice)
        itemFormData.append('description', item.description)
        itemFormData.append('thumbnail', thumbnail)
        itemFormData.append('category', item.category)

        axios.post('http://localhost:5000/items', itemFormData)
            .then( res => {
                clearItem();
                window.location = '/';
                alert(`Successfully created ${item.name} item`);
            })
            .catch(err => alert(err));
    }

    return (
        <Main>
            <Header>{props.editing ? 'Edit Item' : 'Create Item'}</Header>
            <Form onSubmit={createItem}>
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    onChange={(e) => setItem({...item, published: e.target.checked})}
                    value={item.published}
                />

                <TextInput
                    label='Item Name :'
                    name='itemName'
                    onChange={(e) => setItem({...item, name: e.target.value})}
                    value={item.name}
                    placeholder='Please insert item name'
                />

                <NumberInput
                    label='Unit Price :'
                    name='unitPrice'
                    onChange={(e) => setItem({...item, unitPrice: e.target.value})}
                    value={item.unitPrice}
                    placeholder='Please insert unit price'
                    step={0.05}
                />
                
                <SelectInput
                    label='Category :'
                    name='category'
                    onChange={(e) => setItem({...item, category: e.target.value})}
                    options={categories}
                    value={item.category}
                />

                <TextAreaInput
                    name='description'
                    label='Description :'
                    placeholder='Description of the item...'
                    onChange={(e) => setItem({...item, description: e.target.value})}
                    value={item.description}
                />

                <FileUpload
                    label='Upload thumbnail :'
                    name='thumbnail'
                    onChange={(e) => setThumbnail(e.target.files[0])}
                />

                <br />
                
                <FormBtn value='Submit'/>

            </Form>
        </Main>
    )
}