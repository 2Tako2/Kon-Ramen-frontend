import React, {useContext} from 'react';
import './FormModal.css';
import Modal from 'react-modal';
import axios from 'axios';
import { CheckBoxInput, TextInput, FormBtn } from './formComponents.js';
import { CategoryContext } from '../../App';
import { CATEGORY_ACTIONS } from '../../useReducer/categoryReducer.js';

export default function CategoryFormModal({isOpen, closeModal}) {
    const categoryContext = useContext(CategoryContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(categoryContext.categoryState.editingMode){
            axios.put(
                `http://localhost:5000/categories/${categoryContext.categoryState._id}`,
                {
                    "published": categoryContext.categoryState.published,
                    "name": categoryContext.categoryState.name
                }
            )
                .then( res => {
                    closeModal()
                    categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.RESET_CATEGORY
                    })
                    alert(`Successfully updated ${categoryContext.categoryState.name} category`);
                })
                .catch( err => alert(err))
        } else {
            axios.post(
                'http://localhost:5000/categories/',
                categoryContext.categoryState,
                { withCredential: true}
            )
                .then( res => {
                    closeModal()
                    categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.RESET_CATEGORY
                    })
                    alert(`Successfully created ${categoryContext.categoryState.name} category`);
                })
                .catch( err => alert(err))
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='form-modal'
            ariaHideApp={false}
        >   
            <button className='close-btn' onClick={closeModal}>x</button>
            <header className='modal-header'>{categoryContext.categoryState.editingMode ? 'Edit Category' : 'Create Category'}</header>
            <form onSubmit={handleSubmit}>
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_PUBLISHED,
                        value: e.target.checked
                    })}
                    value={categoryContext.categoryState.published}
                />
                <TextInput
                    label='Category Name :'
                    name='name'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_NAME,
                        value: e.target.value
                    })}
                    placeholder='Please insert category name'
                    value={categoryContext.categoryState.name}
                />
                <br />
                <FormBtn value='Submit'/>
            </form>
        </Modal>
    )
}