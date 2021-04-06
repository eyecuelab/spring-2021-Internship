import React from 'react';
import styled from 'styled-components';

type ListProps = {
  title: string;
};

const Box = styled.div`
  background: pink;
  width: 20vw;
  height: 100vh;
  margin: 10px;
  padding: 5px;
  display: inline-block;

  @media screen and (max-width: 768px) {
    background: yellow;
  }
`;

const List = ({ title }: ListProps) => {
  return (
    <>
      <Box>
        <h1>{title}</h1>
      </Box>
    </>
  );
};

export default List;
