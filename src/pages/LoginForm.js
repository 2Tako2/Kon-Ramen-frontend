import React, {useState} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextInput, EmailInput, PasswordInput, FormBtn } from '../components/formComponents';
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

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        fetch("http://localhost:5000/users/login", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username, password})
        })
        .then(result => {
          if (result.status === 200) {
            setAuthenticated(true)
            return result.json()
          }})
          .then(user => {
            setUser(user)
            alert(user)         /////////////remove this later
          }) 
        .catch(err => console.log(err))
    }


    return (
        <Main>
            <Header>Welcome back !</Header>
            <Form onSubmit={handleSubmit}>
                {/* <EmailInput */}
                <TextInput
                    name='username'
                    label='Email :'
                    placeholder='Please enter your email'
                    onChange={(e) => setUsername(e.target.value)}
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
