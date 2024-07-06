import { GlobalStyle } from '@/components';
import { RootLayoutProps } from './types';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata = {
  title: 'PDF Reader Chat',
  description: 'Upload a PDF file and ask questions',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <main>{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
