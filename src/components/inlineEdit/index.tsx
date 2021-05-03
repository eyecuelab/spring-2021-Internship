import React, { useState, useEffect } from 'react';

export type RenderProps = {
  valueState: Props['value'];
  handleOnClick?: () => void;
  handleOnBlur?: () => void;
  handleOnKeyDown?: (e: React.KeyboardEvent) => void;
  handleOnChange?: (e: any) => void;
};

export type Props = {
  value: string | number;
  updateValue: (value: string | number) => void;
  renderDisplay: (props: RenderProps) => React.ReactNode;
  renderEdit: (props: RenderProps) => React.ReactNode;
};

const InlineEdit = ({ value, updateValue, renderDisplay, renderEdit }: Props): JSX.Element => {
  const [isEditingState, setIsEditingState] = useState(false);
  const [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const handleOnChange = (e: any) => {
    setValueState(e.currentTarget.value);
  };

  const handleOnClick = () => {
    setIsEditingState(!isEditingState);
  };

  const handleOnBlur = React.useCallback(() => {
    setIsEditingState(!isEditingState);
    setValueState(valueState);
    updateValue(valueState);
  }, [updateValue, valueState, isEditingState]);

  const handleOnKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsEditingState(!isEditingState);
        setValueState(valueState);
        updateValue(valueState);
      }
    },
    [updateValue, valueState, isEditingState]
  );

  if (isEditingState === false) {
    return <div>{renderDisplay({ handleOnClick, valueState })}</div>;
  }
  return <div>{renderEdit({ valueState, handleOnBlur, handleOnKeyDown, handleOnChange })}</div>;
};
export default InlineEdit;
