import { ConnectionViewer } from "../ConnectionViewer";
import { GPTAssistantForGraph } from "./GPTAssistantForGraph";
import { IGPTRequest, IGPTRequestMessage } from "./modelsForAOAI";
import { ChatMessage } from "./modelsForChat";
import { AzureOAIGPTStreamService } from "../services/AzureOAIGPTStreamService";

export class GPTFunctionDescribeConnections {
  static async execute(
    aoaiGPTStreamService: AzureOAIGPTStreamService,
    abortFuncs: React.MutableRefObject<AbortController[]>,
    messages: ChatMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    userMessage: ChatMessage,
  ): Promise<void> {
    const _abortController = new AbortController();
    abortFuncs.current.unshift(_abortController);
    try {
      const graphForGPT = GPTAssistantForGraph.getGraphForGTPFromForceListNewId(
        ConnectionViewer.forceGraph.forceList,
        ConnectionViewer.IDPrefix,
        ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName
      );
      await aoaiGPTStreamService.getResponse(
        GPTFunctionDescribeConnections.getRequestFunctionAnalyzeConnections(userMessage.content, JSON.stringify(graphForGPT)),
        _abortController,
        messages,
        setMessages,
        userMessage,
        0.9
      );
    } finally {
      abortFuncs.current = abortFuncs.current.filter(a => a !== _abortController);
    }
  }
  private static getRequestFunctionAnalyzeConnections(userQuery: string, graphInfo: string): IGPTRequest {
    const systemPrompt: IGPTRequestMessage = {
      "role": "system",
      "content": GPTFunctionDescribeConnections._systemPrompt
    };
    const userPrompt: IGPTRequestMessage = {
      "role": "user",
      "content": GPTFunctionDescribeConnections._userPrompt.replace("{0}", userQuery).replace("{1}", graphInfo)
    };

    return { messages: [systemPrompt, userPrompt] };
  }
  private static readonly _systemPrompt =
    `You are in AI Assistant to answer questions from CRM users. The CRM user presents JSON text that represents a Graph consisting of information about the customer's contact, information about the opportunity that is proposing products to the customer, information about the account where the contact works, and so on.
For example, the following edge shows the connection between "港コンピュータ株式会社" and "加治佐 健", confirming that 港コンピュータ株式会社 is the previous employer and 加治佐 健 is the previous employee.
{
  "id": "id12",
  "vertex1": {
    "id": "id3",
    "name": "港コンピュータ株式会社",
    "entityName": "取引先企業"
  },
  "vertex2": {
    "id": "id2",
    "name": "加治佐 健",
    "entityName": "取引先担当者"
  },
  "connection": [
    {
      "description": "2021年3月まで",
      "vertex1roleName": "以前の勤務先",
      "vertex2roleName": "以前の社員"
    }
  ]
}

In addition, for example, the following edge has multiple connections between "赤城 紀子" and "清岡 裕美子", so this edge has a stronger influence around it than the other edges.
{
  "id": "id18",
  "vertex1": {
    "id": "id6",
    "name": "赤城 紀子",
    "entityName": "取引先担当者"
  },
  "vertex2": {
    "id": "id8",
    "name": "清岡 裕美子",
    "entityName": "取引先担当者"
  },
  "connection": [
    {
      "description": "アドベンチャーワークスで同僚",
      "vertex1roleName": "同僚",
      "vertex2roleName": "同僚"
    },
    {
      "description": "SJ大学時代のスキー部",
      "vertex1roleName": "友人",
      "vertex2roleName": "友人"
    }
  ]
}

Vertexes connected by Edge influence each other. 
The impact of a single vertex is propagated to vertexes connected by edge and vertex connected by edges, affecting multiple vertexes on the graph.
When considering the impact, the impact of distant vertexes should also be considered.
Note that all vertexes should be considered, but vertex closer to the target vertex has a greater impact.
And edges with multiple connections have a stronger impact on Vertexes.
If you are not confident in your response, respond 'I don't know'`;

  private static readonly _userPrompt =
    `{0}
Use the information in Graph below to answer my questions. 
###
{1}`;
}
