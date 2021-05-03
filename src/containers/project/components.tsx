import React from 'react';
import styled from 'styled-components';
import { RenderProps, Props } from '../../components/inlineEdit';

const Button = styled.button``;
const Input = styled.input``;

// type RenderProps = {
//   valueState: string | number;
//   handleOnClick?: () => void;
//   handleOnBlur?: () => void;
//   handleOnKeyDown?: (e: React.KeyboardEvent) => void;
//   handleOnChange?: (e: any) => void;
// };

// type Props = {
//   valueState: string | number;
// };

// type DisplayProps = {
//   handleOnClick: () => void;
// };

// type EditProps = {
//   handleOnBlur: () => void;
//   handleOnKeyDown: (e: React.KeyboardEvent) => void;
//   handleOnChange: (e: any) => void;
// };

export const Display = ({ handleOnClick, valueState }: RenderProps): React.ReactNode => {
  return (
    <div>
      <Button onClick={handleOnClick}>{valueState}</Button>
    </div>
  );
};

// Display.defaultProps = {
//   handleOnClick: null,
//   handleOnBlur: null,
//   handleOnKeyDown: null,
//   handleOnChange: null,
// };

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

// Edit.defaultProps = {
//   handleOnClick: null,
//   handleOnBlur: null,
//   handleOnKeyDown: null,
//   handleOnChange: null,
// };
