import { SimpleVertex } from "./GPTAssistantForGraph";
import { IGPTRequest } from "./modelsForAOAI";
import { AzureOAIGPTStreamService } from "../services/AzureOAIGPTStreamService";

export class GPTPromptEngineering {
  /**
   * Target is name of records like "Ryan Brim", "森山 三郎" or "AR025を10台"
   */
  /**
   * Get id from target and vertices.
   * @param target Name of records like "Ryan Brim", "森山 三郎" or "AR025を10台"
   */
  static async getIdFromTargetAndVertices(
    aoaiGPTStreamService: AzureOAIGPTStreamService,
    abortFuncs: React.MutableRefObject<AbortController[]>,
    target: string,
    simpleVertices: SimpleVertex[]
  ): Promise<string> {
    const aoaiRequest: IGPTRequest = {
      messages: [
        {
          "role": "system",
          "content": "Your role is a function, and you should only respond to values as the user asks. If you are not confident in your response, respond only a value as 'null'."
        },
        {
          "role": "user",
          "content": `The following JSON represents an array of id and name objects. Ignore any spaces in name. Please return only id value of the object whose name is closest to '${target}'.\n###\n${JSON.stringify(simpleVertices)}\n`
        },
      ],
    };
    const _abortController = new AbortController();
    abortFuncs.current.unshift(_abortController);
    try {
      const id = await aoaiGPTStreamService.getResponse(
        aoaiRequest,
        _abortController,
      ) as string;
      return id;
    } finally {
      abortFuncs.current = abortFuncs.current.filter(a => a !== _abortController);
    }
  }
}