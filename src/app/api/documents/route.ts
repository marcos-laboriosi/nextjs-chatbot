import { NextRequest, NextResponse } from 'next/server';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { getModelConfig } from '@/utils';

const decoder = new TextDecoder();
const bedrockRuntimeClient = new BedrockRuntimeClient({
  region: 'sa-east-1',
});

async function* makeIterator(data: FormData) {
  const file = data.get('file');
  const question = data.get('question') as string;
  const loader = new PDFLoader(file!);
  const documents = await loader.load();
  const documentMessageContent = { type: 'text', text: '' };

  documents.forEach(
    ({ pageContent }) => (documentMessageContent.text += pageContent)
  );

  const modelConfig = getModelConfig([
    documentMessageContent,
    { type: 'text', text: question },
  ]);

  const invokeModelWithResponseStreamCommand =
    new InvokeModelWithResponseStreamCommand(modelConfig);

  try {
    const response = await bedrockRuntimeClient.send(
      invokeModelWithResponseStreamCommand
    );

    if (response.body) {
      for await (const item of response.body) {
        if (item.chunk) {
          try {
            const json = JSON.parse(decoder.decode(item.chunk.bytes));

            if (json.type == 'content_block_delta') {
              yield json.delta.text;
            }
          } catch (error) {
            yield ' ';
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ name: 'documents', route: '/api/documents' });
}

function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const iterator = makeIterator(data);
  const stream = iteratorToStream(iterator);

  return new Response(stream);
}
