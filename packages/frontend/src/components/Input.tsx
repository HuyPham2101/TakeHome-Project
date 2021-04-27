import React from 'react';
import styled from 'styled-components';

const InputSuround = styled.div`
   {
    background-color: #25475c;
    border-radius: 4px;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
  }
`;
const Inputfield = styled.input`
   {
    background-color: #25475c;
    height: 70px;
    border-radius: 7px;
    color: white;
  }
`;
const Inputlabel = styled.label`
   {
    background-color: #25475c;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;

export const InputContainer = (props: React.ComponentPropsWithoutRef<'input'>) => {
  return (
    <InputSuround>
      <Inputlabel htmlFor="name">{props.name}</Inputlabel>
      <Inputfield
        data-testid="inputField"
        id="name"
        placeholder={props.name}
        onChange={props.onChange}
        name={props.name}
        required={true}
      />
    </InputSuround>
  );
};
