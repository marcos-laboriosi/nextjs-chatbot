'use client';

import { ChangeEvent, useState } from 'react';
import type { KeyboardEvent } from 'react';
import * as Styled from './styled';
import { InputBoxProps } from './types';

export const InputBox = ({
  submit,
  onInput,
  id,
  value,
  placeholder = 'Digite uma mensagem',
}: InputBoxProps) => {
  const handleInput = (event: ChangeEvent<HTMLDivElement>) =>
    onInput(event.currentTarget.innerText);

  const handleEnterPress = (event: KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    submit();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEnterKeyPressed = event.key === 'Enter';
    const isShiftKeyPressed = event.shiftKey;

    if (isEnterKeyPressed && !isShiftKeyPressed) handleEnterPress(event);
  };

  return (
    <Styled.SpacingWrapper>
      <Styled.FieldWrapper>
        <Styled.InputBox
          id={id}
          contentEditable='plaintext-only'
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        {!value && <Styled.Placeholder>{placeholder}</Styled.Placeholder>}
      </Styled.FieldWrapper>
    </Styled.SpacingWrapper>
  );
};
