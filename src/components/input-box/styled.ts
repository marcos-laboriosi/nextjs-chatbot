'use client';

import styled from 'styled-components';

export const FieldWrapper = styled.div`
  background-color: #3a3b3c;
  position: relative;
  width: 100%;
`;

export const InputBox = styled.div`
  color: #e4e6eb;
  outline-style: none;
  overflow-y: auto;
  max-height: 120px;
  scrollbar-width: thin;
  scrollbar-color: #686868 #424243;
`;

export const Placeholder = styled.p`
  color: #b0b3b8;
  position: absolute;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  left: 0;
  top: 0;
`;

export const SpacingWrapper = styled.div`
  background-color: #3a3b3c;
  max-width: 520px;
  width: 100%;
  margin: 16px;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
`;
