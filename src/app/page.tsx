'use client';

import { InputBox, MessageLog, Message, Messages } from '@/components';
import * as Styled from './styled';
import { ChangeEvent, useState } from 'react';
import attachSource from '@/assets/attach.png';
import Image from 'next/image';

function Chatbot() {
  const [inputBoxValue, setInputBox] = useState<string>('');
  const [fileValue, setFileValue] = useState<File>();
  const [messages, setMessages] = useState<Messages>([]);

  const clearInputBox = () => {
    document.getElementById('input-box')!.innerHTML = '';
  };

  const handleSubmit = () => {
    const message: Message = { content: inputBoxValue, type: 'sended' };

    setMessages([...messages, message]);
    clearInputBox();

    if (fileValue) {
      const data = new FormData();
      data.append('file', fileValue);
      data.append('question', message.content);

      handleRequest(data);
    }
  };

  const handleRequest = async (data: FormData) => {
    let modelAnswerContent = '';

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: data,
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        try {
          const partialAnswerContent = decoder.decode(value);
          modelAnswerContent += partialAnswerContent;
        } catch (error) {
          console.log(error);
        }
      }

      setMessages((previousState) => [
        ...previousState,
        { content: modelAnswerContent, type: 'received' },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFileInput = (event: ChangeEvent<HTMLInputElement>) =>
    setFileValue(event.target.files?.item(0)!);

  return (
    <Styled.ChatBox>
      <MessageLog messages={messages} />
      <Styled.Footer>
        <Styled.Label htmlFor='file'>
          <Image src={attachSource} alt='attach-button' />
        </Styled.Label>
        <Styled.InvisibleFileInput
          id='file'
          type='file'
          onChange={handleChangeFileInput}
        />
        <InputBox
          id='input-box'
          submit={handleSubmit}
          onInput={setInputBox}
          value={inputBoxValue}
        />
      </Styled.Footer>
    </Styled.ChatBox>
  );
}

export default Chatbot;
