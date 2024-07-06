'use client';

import styled, { css } from 'styled-components';
import { MessageProps } from './types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 723px;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #686868 #424243;
  background: #242526;
  padding: 20px;
  flex: 1;
`;

const receivedMixin = css`
  align-self: start;
  background: #303030;
`;

const sendedMixin = css`
  align-self: end;
  background: #0084ff;
`;

export const Message = styled.div<MessageProps>`
  ${({ $type }) => ($type === 'received' ? receivedMixin : sendedMixin)};
  color: #fff;
  line-height: 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 14px;
  width: fit-content;
`;
