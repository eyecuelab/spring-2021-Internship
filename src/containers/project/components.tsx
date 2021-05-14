import React from 'react';
import styled from 'styled-components';
import { RenderProps } from '../../components/inlineEdit';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
const Input = styled.input`
  background: none;
  color: inherit;
  border: none;
  border-bottom: 2px dashed;
  padding-bottom: 3px;
  width: 100%;
  padding: 0;
  font: inherit;
  outline: inherit;
  text-align: inherit;
  position: inherit;
`;

export const Display = ({ handleOnClick, valueState }: RenderProps): React.ReactNode => {
  return (
    <div>
      <Button onClick={handleOnClick}>{valueState}</Button>
    </div>
  );
};

export const Edit = ({
  valueState,
  handleOnBlur,
  handleOnKeyDown,
  handleOnChange,
}: RenderProps): React.ReactNode => {
  return (
    <div>
      <Input
        defaultValue={valueState}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
      />
    </div>
  );
};
