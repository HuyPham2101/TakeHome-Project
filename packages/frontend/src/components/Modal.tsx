import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';

const ModalHolder = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
`;
export const ModalMask = styled.div`
  border-radius: 8px;
  padding: 20px 16px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.075);
  background-color: #25475c;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 384px;
  width: 375px;
  line-height: 25.2px;
`;
export const ModalMaskHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
`;
const ModalHeader = styled.div`
  display: flex;
  width: 100%;
`;

const ModalTitle = styled.h3`
  flex: 1;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  all: unset;
  color: #000;
  cursor: pointer;
`;

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

export const Modal = (props: { children: React.ReactNode; title: string; onCancel: () => void }) => {
  return ReactDOM.createPortal(
    <ModalHolder>
      <ModalMaskHolder>
        <ModalMask>
          <ModalHeader>
            <ModalTitle>{props.title}</ModalTitle>
            <ModalCloseButton onClick={props.onCancel}>X</ModalCloseButton>
          </ModalHeader>
          {props.children}
        </ModalMask>
      </ModalMaskHolder>
    </ModalHolder>,
    modalRoot!,
  );
};
