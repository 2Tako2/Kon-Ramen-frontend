import React, {useContext} from 'react';
import './FormModal.css';
import Modal from 'react-modal';
import { TextInput, TextAreaInput, NumberInput, CheckBoxInput, FormBtn, SelectInput, FileUpload } from './formComponents.js';
import axios from 'axios';

import { CategoryContext } from '../../App';
import { CATEGORY_ACTIONS } from '../../useReducer/categoryReducer';

export default function ItemFormModal(props) {
    const categoryContext = useContext(CategoryContext);

    const createItem = (e) => {
        e.preventDefault();
        let itemFormData = new FormData();
        itemFormData.append('published', categoryContext.categoryState.published)
        itemFormData.append('name', categoryContext.categoryState.name)
        itemFormData.append('unitPrice', categoryContext.categoryState.unitPrice)
        itemFormData.append('description', categoryContext.categoryState.description)
        itemFormData.append('category', categoryContext.categoryState.category)
        itemFormData.append('thumbnail', categoryContext.categoryState.thumbnail)
        
        axios.post(`${process.env.REACT_APP_BACKEND}/items`, itemFormData)
            .then( res => {
                props.closeModal();
                alert(`Successfully created ${categoryContext.categoryState.name} item`);
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
            <header className='modal-header'>{categoryContext.categoryState.editingMode ? 'Edit Item' : 'Create Item'}</header>
            <form onSubmit={createItem}>
                <CheckBoxInput
                    name='published'
                    labelLeft='Hidden'
                    labelRight='Publish'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_PUBLISHED,
                        value: e.target.checked
                    })
                    }
                    value={categoryContext.categoryState.published}
                />

                <TextInput
                    label='Item Name :'
                    name='itemName'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_NAME,
                        value: e.target.value
                    })}
                    value={categoryContext.categoryState.name}
                    placeholder='Please insert item name'
                />

                <NumberInput
                    label='Unit Price :'
                    name='unitPrice'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_UNIT_PRICE,
                        value: e.target.value
                    })}
                    value={categoryContext.categoryState.unitPrice}
                    placeholder='Please insert unit price'
                    step={0.05}
                />
                
                <SelectInput
                    label='Category :'
                    name='category'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_CATEGORY,
                        value: e.target.value
                    })}
                    options={categoryContext.categoryState.categories}
                    value={categoryContext.categoryState.category}
                />

                <TextAreaInput
                    name='description'
                    label='Description :'
                    placeholder='Description of the item...'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_DESCRIPTION,
                        value: e.target.value
                    })}
                    value={categoryContext.categoryState.description}
                />

                <FileUpload
                    label='Upload thumbnail :'
                    name='thumbnail'
                    onChange={(e) => categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.ONCHANGE_THUMBNAIL,
                        value: e.target.files[0]
                    })}
                />

                <br />
                
                <FormBtn value='Submit'/>

            </form>
        </Modal>
    )
}