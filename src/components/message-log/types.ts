export type MessageType = 'received' | 'sended';

export type Message = { content: string; type: MessageType };
export type Messages = Message[];

export interface MessageLogProps {
  messages: Messages;
}

export interface MessageProps {
  $type: MessageType;
}
