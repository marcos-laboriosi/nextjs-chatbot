import { MessageLogProps } from './types';
import * as Styled from './styled';

export const MessageLog = ({ messages }: MessageLogProps) => {
  return (
    <Styled.Container>
      {messages.map(({ content, type }, index) => (
        <Styled.Message key={index} $type={type}>
          {content}
        </Styled.Message>
      ))}
    </Styled.Container>
  );
};
