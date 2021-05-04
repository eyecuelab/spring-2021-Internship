import React from 'react';
import styled from 'styled-components';
import { RenderProps, Props } from '../../components/inlineEdit';

const Button = styled.button``;
const Input = styled.input``;

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
