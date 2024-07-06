'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Lucida Sans Unicode;
   }

   body, html, #root  {
    height: 100%;
  }
`;
