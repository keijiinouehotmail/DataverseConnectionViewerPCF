import * as React from 'react';
import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source';
import { IGPTRequest, IGPTResponseFunctionCall } from '../api/modelsForAOAI';
import { ChatMessage } from '../api/modelsForChat';
import { MyGeneralLibrary } from '../api/MyGeneralLibrary';

class RetriableError extends Error { }
class FatalError extends Error { }

export class AzureOAIGPTStreamService {
    private apiKeyOpenAI: string;
    private endpointURL: string;

    constructor(
        apiKeyOpenAI: string,
        endpointURLAzureOAI: string,
    ) {
        this.apiKeyOpenAI = apiKeyOpenAI;
        this.endpointURL = endpointURLAzureOAI;
    }

    /**
     * If the name of the function call is returned, return that information.
     * When calling internally for use in prong prompt engineering, etc., the following three do not need to be specified. 
     * Programmatically it is determined with or without setMessages.
     *  - messages
     *  - setMessages
     *  - userMessage
     * api-version=2023-07-01-preview 用
     * @returns 
     */
    public async getResponse(
        request: IGPTRequest,
        abortController: AbortController,
        messages?: ChatMessage[],
        setMessages?: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
        userMessage?: ChatMessage,
        _temperature = 0.7
    ): Promise<IGPTResponseFunctionCall | string> {
        const id = MyGeneralLibrary.getNewGuid();
        // A string, such as a chat answer or a return value of function_call
        let text = ''; 
        // The name of the function calling function, such as "search_hotels"
        let functionName = ''; 
        // The arguments of the function calling function, such as "{\n  \"location\": \"San Diego\",\n  \"max_price\": 300,\n  \"features\": \"beachfront,free breakfast\"\n}"
        let functionArguments = ''; 

        const replyErrorMessage = (errorMessage: string) => {
            if (setMessages) {
                const latestMessage: ChatMessage =
                    { id: id, role: 'error', content: errorMessage, date: new Date().toISOString() };
                setMessages([...messages!, userMessage!, ...[latestMessage]]);
            }
        };
        const done = async () => {
            if (setMessages) {
                if (!functionName) {
                    const latestMessage: ChatMessage =
                        { id: id, role: 'assistant', content: text, date: new Date().toISOString() };
                    setMessages([...messages!, userMessage!, ...[latestMessage]]);
                }
            }
        };
        const gotChunkText = (chunkText: string) => {
            text += chunkText;
            if (setMessages) {
                const convertedText = this.convertMarkdownLinkToHtmlLink(text);
                const latestMessage: ChatMessage =
                    { id: id, role: 'assistant', content: convertedText + String.fromCodePoint(0x258C), date: new Date().toISOString() };
                setMessages([...messages!, userMessage!, latestMessage]);
            }
        };

        await fetchEventSource(this.endpointURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': this.apiKeyOpenAI,
            },
            body: JSON.stringify((request.functions) ?
                {
                    "messages": request.messages,
                    "functions": request.functions,
                    "function_call": "auto",
                    "max_tokens": 4000,
                    "temperature": _temperature,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "top_p": 0.95,
                    "stream": true,
                    "stop": null,
                } :
                {
                    "messages": request.messages,
                    "max_tokens": 4000,
                    "temperature": _temperature,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "top_p": 0.95,
                    "stream": true,
                    "stop": null,
                }
            ),
            signal: abortController.signal,
            async onopen(response) {
                if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
                    return; // everything's good
                } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                    // client-side errors are usually non-retriable:
                    console.log('FatalError response', response);
                    // This is also the case if the maximum token value is exceeded.
                    // <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams>
                    const reader = (response as any).body.getReader();
                    let value = '';
                    for (; ;) {
                        const result = await reader.read();
                        if (result.value) value += new TextDecoder().decode(result.value);
                        if (result.done) break;
                    }
                    abortController.abort();
                    replyErrorMessage(value);
                } else {
                    console.log('RetriableError response', response);
                    throw new RetriableError();
                }
            },
            onmessage(msg) {
                // if the server emits an error message, throw an exception
                // so it gets handled by the onerror callback below:
                if (msg.event === 'FatalError') {
                    console.log('FatalError msg', msg);
                    throw new FatalError(msg.data);
                }
                const msgData = JSON.parse(msg.data);
                if (msgData.object === 'chat.completion.chunk') {
                    if (msgData.choices[0].finish_reason !== null) { // like 'stop'
                        abortController.abort();
                        done();
                        return;
                    }
                    const functionCall = msgData.choices[0].delta.function_call;
                    if (functionCall) {
                        if (functionCall.name) functionName = functionCall.name;
                        if (functionCall.arguments) functionArguments += functionCall.arguments;
                    }
                    const chunkText = msgData.choices[0].delta.content;
                    if (chunkText) {
                        gotChunkText(chunkText);
                    }
                }
            },
            onclose() {
                done();
            },
            onerror(err) {
                console.log('err', err);
                if (err instanceof FatalError) {
                    // throw err; // rethrow to stop the operation
                    replyErrorMessage(err.message);
                } else {
                    // do nothing to automatically retry. You can also
                    // return a specific retry interval here.
                }
            }
        });

        if (functionName) return { name: functionName, arguments: JSON.parse(functionArguments) };
        else return text;
    }

    private convertMarkdownLinkToHtmlLink(text: string): string {
        const regex = /\[(.+?)\]\((https?:\/\/.+?)\)/g;
        return text.replace(regex, '<a href="$2" target="_blank">$1</a>');
    }
}