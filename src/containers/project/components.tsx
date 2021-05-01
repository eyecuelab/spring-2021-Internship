import React from 'react';
import styled from 'styled-components';

const Button = styled.button``;
const Input = styled.input``;

type Props = {
  valueState: string | number;
};

type DisplayProps = {
  handleOnClick: () => void;
};

type EditProps = {
  handleOnBlur: () => void;
  handleOnKeyDown: (e: React.KeyboardEvent) => void;
  handleOnChange: (e: any) => void;
};

export const Display = ({ valueState, handleOnClick }: Props & DisplayProps) => {
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
}: Props & EditProps) => {
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
