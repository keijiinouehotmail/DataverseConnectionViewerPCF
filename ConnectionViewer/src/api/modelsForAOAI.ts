// Request to GPT
export interface IGPTRequest {
  messages: IGPTRequestMessage[];
  functions?: IGPTRequestFunction[];
}

// Interface representing one message to pass to GPT
export interface IGPTRequestMessage {
  role: string;
  content: string;
}

// Answer from GPT. With internal flag.
export interface IPEResponse {
  id: string;
  content: string | undefined;
  isInternal: boolean;
}

export interface IGPTRequestFunction {
  name: string;
  description: string;
  parameters: IGPTRequestFunctionParameter;
}

export interface IGPTRequestFunctionParameter {
  type: string;
  properties: object;
  required: string[];
}

export interface IGPTResponseFunctionCall {
  name: string;
  arguments: object;
}