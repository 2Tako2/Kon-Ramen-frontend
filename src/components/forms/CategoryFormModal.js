import React, {useState, useEffect} from 'react';
import './FormModal.css';
import Modal from 'react-modal';
import axios from 'axios';

import { CheckBoxInput, TextInput, FormBtn } from './formComponents.js';

export default function CategoryFormModal({isOpen, closeModal, editingMode, selectedCategory}) {

    const [category, setCategory] = useState({ "_id": "", "name": selectedCategory.name, "published": false })    

    const clearCategory = () => {
        setCategory({ "name": "", "published": false })
    }
    
    const postCategory = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/categories/', category, {
            withCredential: true,
        })
        .then( res => {
            closeModal()
            clearCategory();
            alert(`Successfully created ${category.name} category`);
        })
        .catch( err => alert(err))
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='form-modal'
            ariaHideApp={false}
        >   
            <button className='close-btn' onClick={closeModal}>x</button>
            <header className='modal-header'>{editingMode ? 'Edit Category' : 'Create Category'}</header>
            <form onSubmit={postCategory}>
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
                    value={category.name}
                />
                <br />
                <FormBtn value='Submit'/>
            </form>
        </Modal>
    )
}