import { ModelMessagesContent } from './types';

export const getModelConfig = (messagesContent: ModelMessagesContent) => ({
  modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
  contentType: 'application/json',
  accept: 'application/json',
  body: JSON.stringify({
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 2048,
    messages: [{ role: 'user', content: messagesContent }],
  }),
});
