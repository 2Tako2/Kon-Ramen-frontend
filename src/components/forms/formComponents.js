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

export function TextInput({label, name, onChange, value, placeholder}){
    return (
        <Wrapper>
            <Label>{label}</Label>
            <TextField 
                type='text'
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                required
            />
        </Wrapper>
    )
}

export function PasswordInput({label, name, min, onChange, placeholder}){
    return (
        <Wrapper>
            <Label>{label}</Label>
            <TextField 
                type='password'
                name={name}
                min={min}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </Wrapper>
    )
}

export function NumberInput({label, number, onChange, value, min, max, step, placeholder}){
    return(
        <Wrapper>
            <Label>{label}</Label>
            <TextField
                type='number'
                name={number}
                onChange={onChange}
                value={value}
                min={min}
                max={max}
                step={step}
                placeholder={placeholder}
                required
            />
        </Wrapper>
    )
}

export function EmailInput({label, name, value, onChange, placeholder}){
    return (
        <Wrapper>
            <Label>{label}</Label>
            <TextField 
                type='email'
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </Wrapper>
    )
}

export function CheckBoxInput({labelLeft, labelRight, value, name, onChange}){
    return (
        <CenterWrapper>
            <Label>{labelLeft}</Label>
            {value ? 
                <CheckBoxField 
                    type='checkbox'
                    name={name}
                    onChange={onChange}
                    checked
                />
                :
                <CheckBoxField 
                    type='checkbox'
                    name={name}
                    onChange={onChange}
                />
            }
            <Label>{labelRight}</Label>
        </CenterWrapper>
    )
}

export function FormBtn({value, onClick}){
    return (
        <Button 
            type='submit'
            value={value}
            onClick={onClick}
        />
    )
}

export function SelectInput({options, label, name, value, onChange}){
    const renderOptions = options.map( option => 
        <Option key={option._id} value={option._id}>{option.name}</Option>    
    )
    
    return(
        <Wrapper>
            <Label>{label}</Label>
            <Select
                name={name}
                value={value ? value : '-- Select --'}
                onChange={onChange}
            >
                <option disabled>-- Select --</option>
                {renderOptions}
            </Select>
        </Wrapper>
    )
}

export function TextAreaInput({label, name, placeholder, value, onChange}){
    return(
        <Wrapper>
            <Label>{label}</Label>
            <TextArea 
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Wrapper>
    )
}

export function FileUpload({label, name, onChange}){
    return(
        <Wrapper>
            <Label>{label}</Label>
            <Upload
                type="file"
                name={name}
                onChange={onChange}
            />
        </Wrapper>
    )
}