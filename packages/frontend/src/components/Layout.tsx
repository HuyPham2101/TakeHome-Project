import React from 'react';
import styled from 'styled-components';
import { blue } from '@material-ui/core/colors';
export const Layout: React.FC = (props) => {
  const headerheight = '85px';
  const footerheight = '50px';
  const Header = styled.header`
     {
      height: ${headerheight};
      width: 100%;
      padding: 0 25px;
      background-color: #009879;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      font-size : 25px;
    }
  `;
  const Main = styled.main`
    {
        min-height: calc(100vh - ${headerheight} - ${footerheight}) 
        margin-top : 20px;   
        padding: 0 250px;
    }
    `;
  const Footer = styled.footer`
     {
      height: ${footerheight};
      padding: 0 25px;
    }
  `;
  return (
    <>
      <Header>
        <span>Get it DONE</span>
      </Header>
      <Main>{props.children}</Main>
      <Footer />
    </>
  );
};
