import React, {useState} from 'react';
import './FormModal.css';
import Modal from 'react-modal';
import { TextInput, TextAreaInput, NumberInput, CheckBoxInput, FormBtn, SelectInput, FileUpload } from './formComponents.js';
import axios from 'axios';

export default function ItemFormModal(props) {

    const [item, setItem] = useState({
        published: true,
        name: '',
        unitPrice: 0,
        description: ''
    });
    const [thumbnail, setThumbnail] = useState('');

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
                props.closeModal();
                clearItem();
                alert(`Successfully created ${item.name} item`);
            })
            .catch(err => alert(err));
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            className='form-modal'
            ariaHideApp={false}
        >
            <button className='close-btn' onClick={props.closeModal}>x</button>
            <header className='modal-header'>{props.editing ? 'Edit Item' : 'Create Item'}</header>
            <form onSubmit={createItem}>
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
                    options={props.categories}
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

            </form>
        </Modal>
    )
}