import React from 'react';
import styled from 'styled-components';

const Inputfield = styled.input `
    height: 40px;
    width: 250px;
    border-radius : 8px;
`

export const SearchBox = (props:any)  => {
  return (
    <Inputfield type = 'search' 
    className = 'search'
    placeholder = {props.placeholder}
    onChange = {props.handleChange}
    />
  );
};
