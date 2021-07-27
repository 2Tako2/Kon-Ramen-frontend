import axios from 'axios';
import React, {useState} from 'react';
import styled from 'styled-components';
import { TextInput, PasswordInput, EmailInput, FormBtn } from '../components/formComponents.js';

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


export default function UserForm({setAuthenticated}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:5000/testing')
            .then(res => alert(res.data))
            .catch(err => alert(err))
    //     fetch("http://localhost:5000/users/register", {
    //       method: "POST",
    //       credentials: 'include',
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({username, password})
    //     })
    //     .then(result => setAuthenticated(true))
    //     .catch(err => console.log("err"))
      }
      

    return (
        <Main>
            {/* <Header>{props.edit ? 'Edit Account Detail' : 'Create Account'}</Header> */}
            <Header>Create Account</Header>
            <Form onSubmit={handleSubmit}>
                {/* <TextInput
                    label='First Name :'
                    name='firstName'
                    onChange={() => console.log('firstName')}
                    defaultValue=''
                    placeholder='Please insert your first name'
                />

                <TextInput
                    label='Last Name :'
                    name='lastName'
                    onChange={() => console.log('lastName')}
                    defaultValue=''
                    placeholder='Please insert your last name'
                /> */}

                {/* <EmailInput */}
                <TextInput
                    label='Email :'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='E.g. example@email.com'
                />

                <PasswordInput
                    label='Password :'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='(minimum of 6 characters)'
                />

                {/* <PasswordInput
                    label='Confirm password :'
                    name='confirmPassword'
                    onChange={() => console.log('confirmPw')}
                    placeholder='Confirm Password'
                /> */}

                <FormBtn
                    value='Submit'
                />

            </Form>
        </Main>
    )
}