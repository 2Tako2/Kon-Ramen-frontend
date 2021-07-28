import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import CategoryFormModal from '../components/forms/CategoryFormModal.js';
import ItemFormModal from '../components/forms/ItemFormModal.js';
import {BiEdit, BiTrash} from 'react-icons/bi';
import { CategoryContext } from '../App.js';
import { CATEGORY_ACTIONS } from '../useReducer/categoryReducer.js';

const Main = styled.div`
    width: 100vw;
    max-width: 1000px;
    margin: auto;
    margin-bottom: 50px;
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const H1 = styled.h1`
    text-align: center;
`;

const Table = styled.ul`
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    padding: 20px 20px;
    margin: 20px auto;
    list-style: none;
    width: 95%;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }

    & .category-row{
        font-size: 1.7rem;
        text-align: center;
        padding: 15px 0;
        justify-content: center;
        background-color: rgb(206, 46, 46);
        color: white;
        font-weight: bold;

    }

    & .category-status{ font-size: 1rem; padding: 0 10px; }

    & .header-row{
        display: flex;
        background-color: rgb(206, 46, 46);
        padding: 0 0 25px 0;
        margin-bottom: 10px;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
    }

    & .item-row{
        display: flex;
        margin-bottom: 25px;
        justify-content: space-between;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        padding: 5px 0;
        overflow: hidden;
    }

    & .item-row:hover{ background: rgb(187, 187, 187); }
    & .thumbnail{margin-left: auto; margin-right: auto; height: 100px; max-width: 120px}
    & .col-1-header{ width: 220px; text-align: center;}
    & .col-1{
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 220px;
        text-align: center;
    }
    & .col-2{ min-width: 100px; text-align: center; }
    & .col-3{ min-width: 80px; text-align: center; }
    & .col-4{ min-width: 100px; text-align: center; }
    & .col-5{ min-width:30%; text-align: center; }
    & .header{ color: white; }
    & .empty-row{ text-align: center; font-size: 1.3rem; }
    
    & .category-edit-btn{
        background: transparent;
        border: none;
        font-size: 2rem;
        color: #fff;
        align-items: center;
        cursor: pointer;
    }

    & .item-edit-btn{
        background: transparent;
        border: none;
        font-size: 2rem;
        align-items: baseline;
        cursor: pointer;
    }
`;

const BtnContainer = styled.div`
    margin: auto;
    width: 500px;
    display: flex;
    justify-content: space-around;
`;

const CreateBtn = styled.button`
    background: #000;
    height: 40px;
    border-radius: 20px;
    color: #fff;
    padding: 0 30px;
    
`;

export default function EditMenu() {
    const categoryContext = useContext(CategoryContext);
    const [menu, setMenu] = useState([])
    const [categoryModal, setCategoryModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/categories/all`)
            .then(res => setMenu(res.data))
            .catch(err => console.log(err));
    },[categoryContext])

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:5000/categories/${id}`)
            .then(res => {
                window.location = '/admin/menu';
                alert(res.data);
            })
            .catch(err => console.log(err));
    }

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/items/${id}`)
            .then(res => {
                window.location='/admin/menu';
                alert(res.data);
            })
    }
    return (
        <Main>
            <CategoryFormModal 
                isOpen={categoryModal}
                closeModal={() => {
                    setCategoryModal(false)
                    categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.RESET_CATEGORY
                    })
                }}
            />
            <ItemFormModal
                isOpen={itemModal}
                closeModal={() => {
                    setItemModal(false)
                    categoryContext.categoryDispatch({
                        type: CATEGORY_ACTIONS.RESET_CATEGORY
                    })
                }}
            />

            <H1>Edit Menu</H1>
            <BtnContainer>
                <CreateBtn
                    onClick={() => setCategoryModal(true)}
                >
                    Create New Category +
                </CreateBtn>
                <CreateBtn
                    onClick={() => {
                        categoryContext.categoryDispatch({
                            type: CATEGORY_ACTIONS.LOAD_CATEGORIES,
                            value: menu
                        })
                        setItemModal(true)
                    }}
                >
                    Create New Item +
                </CreateBtn>
            </BtnContainer>
            {menu.map(category =>                    
                <Table key={category._id}>
                    <li className='category-row'>
                        {category.name}
                        <span className='category-status'>
                            {category.published ? ' ( Published )' : ' ( Hidden )'}
                        </span>
                        <button
                            className='category-edit-btn'
                            onClick={() => {
                                categoryContext.categoryDispatch({
                                    type: CATEGORY_ACTIONS.SELECT_CATEGORY,
                                    value: {
                                        _id: category._id,
                                        published: category.published,
                                        name: category.name
                                    }
                                });
                                setCategoryModal(true);
                            }}
                        >
                            <BiEdit />
                        </button>
                        <button
                            className='category-edit-btn'
                            onClick={() => deleteCategory(category._id)}
                        >
                            <BiTrash />
                        </button>
                    </li>
                    <li className='header-row'>
                        <div className='col-1-header header'>Thumbnail</div>
                        <div className='col-2 header'>Item Name</div>
                        <div className='col-3 header'>Published?</div>
                        <div className='col-4 header'>Unit Price AUD (cent)</div>
                        <div className='col-5 header'>Description</div>
                    </li>
                    {(category.items.length === 0) ?
                    (<li className='empty-row'>-- No item in this category --</li>)
                    :
                    (category.items.map( item => 
                        <li className='item-row' key={item._id}>
                            <div className='col-1'>
                                <button
                                    className='item-edit-btn'
                                    onClick={() => {
                                        categoryContext.categoryDispatch({
                                            type: CATEGORY_ACTIONS.SELECT_ITEM,
                                            value: {
                                                _id: item._id,
                                                published: item.published,
                                                name: item.name,
                                                unitPrice: item.unitPrice,
                                                description: item.description,
                                                category: item.category,
                                                categories: menu
                                            }
                                        })
                                        setItemModal(true)
                                    }}
                                >
                                    <BiEdit />
                                </button>
                                <button
                                    className='item-edit-btn'
                                    onClick={() => deleteItem(item._id)}
                                >
                                    <BiTrash />
                                </button>
                                <img className='thumbnail' src={item.thumbnailUrl} alt="thumbnail"/>
                            </div>
                            <div className='col-2'>{item.name}</div>
                            <div className='col-3'>
                                {item.published ? 'Published' : 'Hidden'}
                            </div>
                            <div className='col-4'>{item.unitPrice}</div>
                            <div className='col-5'>{item.description}</div>
                        </li>
                    ))}
                </Table>
            )}

        </Main>
    )
}
