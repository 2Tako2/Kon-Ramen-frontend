import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { PasswordInput, EmailInput, FormBtn } from '../components/formComponents.js';

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


export default function UserForm({setAuthenticated, setUser}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/users/register',{email, password}, {withCredentials: true})
            .then(res => {
                window.location = '/';
                setAuthenticated(true);
                setUser(res);
            })
            .catch(err => alert(err));
      }
      

    return (
        <Main>
            {/* <Header>{props.edit ? 'Edit Account Detail' : 'Create Account'}</Header> */}
            <Header>Create Account</Header>
            <Form onSubmit={handleSubmit}>

                <EmailInput
                    label='Email :'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='E.g. example@email.com'
                />

                <PasswordInput
                    label='Password :'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='(minimum of 6 characters)'
                />

                <FormBtn value='Submit' />
            </Form>
        </Main>
    )
}