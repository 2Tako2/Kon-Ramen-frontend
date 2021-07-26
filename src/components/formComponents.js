import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    margin: 5px;
    font-size: 0.9rem;
`;

const Error = styled.span`

`;


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const CenterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;


const TextField = styled.input`
    font-size: 0.8rem;
    margin: 0 5px 10px 5px;
    width: 95%;
    max-width: 250px;
    border: none;
    border-bottom: 2px solid #000;
`;

const CheckBoxField = styled.input`
    position: relative;
    width: 50px;
    height: 26px;
    -webkit-appearance: none;
    background: #c6c6c6;
    outline: none;
    border-radius: 18px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &:checked {
        background: #90EE90;
    }

    &:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 15px;
        top: 4px;
        left: 4px;
        background: #fff;
        transform: scale(1);
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: 0.3s;
    }

    &:checked:before {
        left: 27px;
    }
`;

const Button = styled.input`
    border: none;
    background: #000;
    color: #fff;
    height: 25px;
    border-radius: 15px;
    font-size: 1rem;
    width: 90%;
    max-width: 150px;
    margin: 5px auto;
`;

const Select = styled.select`
    width: 200px;
    padding: 3px;
    margin: 0 5px 10px 5px;
    font-size: 0.8rem;
    text-align: center;
`;

const Option = styled.option`
    text-align: center;
`;

const TextArea = styled.textarea`
    padding: 3px;
    margin: 0 5px 10px 5px;
    font-size: 0.8rem;
    height: 100px;
`;

const Upload = styled.input`
    margin: 0 5px 10px 5px;
`;

export function TextInput(props){
    return (
        <Wrapper>
            <Label>{props.label}</Label>
            <Error>{props.errorMsg}</Error>
            <TextField 
                type='text'
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                required
            />
        </Wrapper>
    )
}

export function PasswordInput(props){
    return (
        <Wrapper>
            <Label>{props.label}</Label>
            <Error>{props.errorMsg}</Error>
            <TextField 
                type='password'
                name={props.name}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required
            />
        </Wrapper>
    )
}

export function NumberInput(props){
    return(
        <Wrapper>
            <Label>{props.label}</Label>
            <Error>{props.errorMsg}</Error>
            <TextField
                type='number'
                name={props.number}
                onChange={props.onChange}
                value={props.value}
                min={props.min}
                max={props.max}
                step={props.step}
                placeholder={props.placeholder}
                required
            />
        </Wrapper>
    )
}

export function EmailInput(props){
    return (
        <Wrapper>
            <Label>{props.label}</Label>
            <Error>{props.errorMsg}</Error>
            <TextField 
                type='email'
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required
            />
        </Wrapper>
    )
}

export function CheckBoxInput(props){
    return (
        <CenterWrapper>
            <Label>{props.labelLeft}</Label>
            <CheckBoxField 
                type='checkbox'
                name={props.name}
                onChange={props.onChange}
                value={true}
                />
            <Label>{props.labelRight}</Label>
        </CenterWrapper>
    )
}

export function FormBtn(props){
    return (
        <Button 
            type='submit'
            value={props.value}
            onClick={props.onClick}
        />
    )
}

export function SelectInput(props){
    const options = props.options.map( option => 
        <Option key={option._id} value={option._id}>{option.name}</Option>    
    )
    
    return(
        <Wrapper>
            <Label>{props.label}</Label>
            <Error>{props.errorMsg}</Error>
            <Select
                name={props.name}
                value={props.value ? props.value : '-- Select --'}
                onChange={props.onChange}
            >
                <option disabled>-- Select --</option>
                {options}
            </Select>
        </Wrapper>
    )
}

export function TextAreaInput(props){
    return(
        <Wrapper>
            <Label>{props.label}</Label>
            <TextArea 
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </Wrapper>
    )
}

export function FileUpload(props){
    return(
        <Wrapper>
            <Label>{props.label}</Label>
            <Upload
                type="file"
                name={props.name}
                onChange={props.onChange}
            />
        </Wrapper>
    )
}