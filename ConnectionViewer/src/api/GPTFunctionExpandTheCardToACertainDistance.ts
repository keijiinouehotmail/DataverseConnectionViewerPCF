import { ConnectionViewer } from "../ConnectionViewer";
import { GPTAssistantForGraph } from "./GPTAssistantForGraph";
import { GPTPromptEngineering } from "./GPTPromptEngineering";
import { MyGeneralLibrary } from "./MyGeneralLibrary";
import { ChatMessage } from "./modelsForChat";
import { AzureOAIGPTStreamService } from "../services/AzureOAIGPTStreamService";

export class GPTFunctionExpandTheCardToACertainDistance {
  static readonly defaultMaxDistance = 3;
  static async execute(
    aoaiGPTStreamService: AzureOAIGPTStreamService,
    abortFuncs: React.MutableRefObject<AbortController[]>,
    messages: ChatMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
    userMessage: ChatMessage,
    funcCallArguments: object, // arguments which returned from function call 'expand_the_card_to_a_certain_distance'
  ): Promise<void> {
    const _abortController = new AbortController();
    abortFuncs.current.unshift(_abortController);
    try {
      const target: string = (funcCallArguments as any).target;
      const distance: string = (funcCallArguments as any).distance;
      let maxDistance;

      if (distance) {
        maxDistance = Number(distance);
      } else {
        maxDistance = GPTFunctionExpandTheCardToACertainDistance.defaultMaxDistance;
      }

      // console.log("maxDistance: " , maxDistance);
      if (maxDistance > 0) {
        const graphForGPT = GPTAssistantForGraph.getGraphForGTPFromForceList(
          ConnectionViewer.forceGraph.forceList,
          ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName
        );
        const simpleVertices = GPTAssistantForGraph.getSimpleVerticesFromGraphForGPT(graphForGPT);
        const targetId = await GPTPromptEngineering.getIdFromTargetAndVertices(
          aoaiGPTStreamService,
          abortFuncs,
          target,
          simpleVertices
        );
        let content;
        if (targetId.toLowerCase() === "null") {
          content = ConnectionViewer.cv.resStr("CouldntFindTheCard");
        } else {
          const targetName = ConnectionViewer.forceGraph.forceList.nodes.find(n => n.id === targetId)?.name;
          if (distance) {
            const distanceNumber = Number(distance);

            if (isNaN(distanceNumber)) {
              content = ConnectionViewer.cv.resStr("SpecifyTheDistanceToBeExpandedNumerically");
            } else if (distanceNumber < 1) {
              content = ConnectionViewer.cv.resStr("TheDistanceToExpandMustBeANumberGreaterThanOrEqualTo1");
            } else
              content = `${ConnectionViewer.cv.resStr("ExpandsCardsFromBegin")}${targetName}${ConnectionViewer.cv.resStr("ExpandsCardsFromMiddle")}${distance}${ConnectionViewer.cv.resStr("ExpandsCardsFromEnd")}`;
          } else {
            content = `${ConnectionViewer.cv.resStr("ExpandsCardsFromDefaultBegin")}${targetName}${ConnectionViewer.cv.resStr("ExpandsCardsFromDefaultMiddle")}${GPTFunctionExpandTheCardToACertainDistance.defaultMaxDistance}${ConnectionViewer.cv.resStr("ExpandsCardsFromDefaultEnd")}`;
          }
          const sourceNodeId = targetId;
          ConnectionViewer.forceGraph.expandCards(sourceNodeId, maxDistance);
        }
        const latestMessage: ChatMessage =
        {
          id: MyGeneralLibrary.getNewGuid(),
          role: "assistant",
          content: content,
          date: new Date().toISOString()
        };
        setMessages([...messages!, userMessage!, ...[latestMessage]]);

      }
    } finally {
      abortFuncs.current = abortFuncs.current.filter(a => a !== _abortController);
    }
  }
}