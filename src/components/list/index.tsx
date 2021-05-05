import React from 'react';
import styled from 'styled-components';

type ListProps = {
  title: string;
  children?: JSX.Element;
};

const ColumnTitle = styled.p`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-left: 10px;
`;

const List = ({ title, children }: ListProps): JSX.Element => {
  return (
    <>
      <div>
        <ColumnTitle>{title}</ColumnTitle>
        {children}
      </div>
    </>
  );
};

export default List;

List.defaultProps = {
  children: null,
};
