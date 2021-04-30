import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button``;

// const Input = styled.input``;

interface Props {
  text: string;
  updateText: (text: string) => void;
}

const InlineEdit = ({ text, updateText }: Props) => {
  const [isEditingState, setIsEditing] = useState(false);
  const [textState, setText] = useState(text);

  useEffect(() => {
    setText(text);
  }, [text]);

  const onChange = (e: any) => {
    setText(e.currentTarget.value);
  };

  const handleOnClick = () => {
    setIsEditing(!isEditingState);
  };

  const handleKeyDown = (e: any) => {
    setText(textState);
    updateText(textState);
    setIsEditing(!isEditingState);
  };

  if (isEditingState === false) {
    return (
      <div>
        <Button onClick={handleOnClick}>{textState}</Button>
      </div>
    );
  }
  return (
    <div>
      <input
        defaultValue={textState}
        onBlur={() => {
          setIsEditing(!isEditingState);
          setText(textState);
          updateText(textState);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleKeyDown(e);
          }
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default InlineEdit;
