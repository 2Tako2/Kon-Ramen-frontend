import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, FormBtn } from '../components/formComponents';
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

const Hr = styled.hr`
    width: 90%;
    max-width: 300px;
`;

const P = styled.p`
    text-align: center;
    margin: 0;
`;

export default function LoginForm({setAuthenticated, setUser}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault()

        axios.post(
            'http://localhost:5000/users/login',
            {email, password},
            {withCredentials: true}
        )
            .then(res => {
                if (res.status === 200) {
                    window.location = '/'
                    setAuthenticated(true)
                    setUser(res.data)
                }
            })
            .catch(err => console.log(err))

        // fetch("http://localhost:5000/users/login", {
        //   method: "POST",
        //   credentials: 'include',
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify({email, password})
        // })
        // .then(result => {
        //   if (result.status === 200) {
        //     setAuthenticated(true)
        //     return result.json()
        //   }})
        //   .then(user => {
        //     setUser(user)
        //   }) 
        // .catch(err => console.log(err))
    }


    return (
        <Main>
            <Header>Welcome back !</Header>
            <Form onSubmit={handleSubmit}>
                <EmailInput
                    name='email'
                    label='Email :'
                    placeholder='Please enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    name='password'
                    label='Password :'
                    placeholder='Please enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    min={6}
                />
                <br />
                <FormBtn value='Submit' />
            </Form>
            <Hr />
            <P>Don't have an account?</P>
            <P><Link to='/users/register'>Join us here!</Link></P>
        </Main>
    )
}
