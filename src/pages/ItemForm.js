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

    // const [form, setForm] = useState({
    //     published: true,
    //     itemName: '',
    //     unitPrice: 0,
    //     description: ''
    // });

    const [categories, setCategories] = useState('');
    // const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        //fetch categories 
        axios.get('http://localhost:5000/categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <Main>
            <Header>{props.editing ? 'Edit Item' : 'Crete Item'}</Header>
            <Form>
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    // value={props.item.published}
                />

                <TextInput
                    label='Item Name :'
                    name='itemName'
                    onChange={() => console.log('itemName')}
                    // value={props.item.itemName}
                    placeholder='Please insert item name'
                />

                <NumberInput
                    label='Unit Price :'
                    name='unitPrice'
                    onChange={() => console.log('unitPrice')}
                    // value={props.item.unitPrice}
                    placeholder='Please insert unit price'
                    step={0.05}
                />
                
                <SelectInput
                    label='Category :'
                    name='category'
                    onChange={() => console.log('category')}
                    options={[
                        {name: "1",
                        _id: 123},
                        {name: "3",
                        _id: 34},
                        {name: "2",
                        _id: 113}
                    ]}
                />
                {console.log(categories)}

                <TextAreaInput
                    name='description'
                    label='Description :'
                    placeholder='Description of the item...'
                    // value={props.item.description}
                />

                <FileUpload
                    label="Upload thumbnail :"
                    // value={props.item.value}
                />

                <br />
                
                <FormBtn value='Submit'/>

            </Form>
        </Main>
    )
}