import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  justify-content: center;
  z-index: 9;
  background: white;
  display: block;
  margin-left: 30vw;
  margin-right: 30vw;
  width: 40vw;
`;

const NewTaskModal = () => {
  return (
    <>
      <Wrapper>
        <h1>new Task</h1>
      </Wrapper>
    </>
  );
};

export default NewTaskModal;
