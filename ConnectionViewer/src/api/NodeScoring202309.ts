import { ICVSimulationNodeDatum, INodesLinks } from "./ForceGraph_CircleUI";

/**
 * Interface for the entire score information in the node scoring model 202309.
 * Only the following field groups in the ICVSimulationNodeDatum field group are updated.
 *   - scoringSourceNodeId?: string,
 *   - scoringDistance?: number,
 *   - scoringScore?: number,
 *   - scoringPreviousScore?: number,
 *   - scoringStg1score?: number,
 *   - scoringStg2score?: number,
 */
export interface INodeScore202309 {
    // The Id of the score source node. The score source node is the node (targetNodeId) that is the calculation target when calculating the score of this node for a certain node. With prefix.
    sourceNodeId: string,
    // The score that the score source node itself can give to the neighboring node. In this score model, it is fixed at 2.
    CONST_sourceNodeScore: number,
    // When a node gives to a neighboring node, it gives the value obtained by multiplying its score by this value. In this score model, it is fixed at 1/2 (= 0.5).
    CONST_neighbourhoodRate: number,
    // An instance of Map. The key is the prefix id of the score target node. The value is information about the score target node.
    targetScoring: Map<string, ICVSimulationNodeDatum>,
}
/**
 * A local interface that is a simplified version of ICVSimulationLinkDatum.
 */
interface IScoringLink202309 {
    id: string,
    source: ICVSimulationNodeDatum,
    target: ICVSimulationNodeDatum,
    // Number of types of connections. An integer greater than or equal to 1.
    linkCount: number, 
}
/**
 * Implementation of the node scoring model 202309.
 */
export class NodeScoring202309 {
    /**
     * The score that the score source node itself can give to the neighboring node. In this score model, it is fixed at 2.
     */
    public static readonly SOURCE_NODE_SCORE = 2;
    /**
     * When a node gives to a neighboring node, it gives the value obtained by multiplying its score by this value. In this score model, it is fixed at 1/2 (= 0.5).
     */
    public static readonly NEIGHBOURHOOD_RATE = 1 / 2;
    /**
     * A numerical value that can be regarded as an indicator that scores below this score can be effectively ignored.
     */
    public static readonly IGNORING_SCORE = 0.1;
    /**
     * Score the influence exerted by all other cards on a certain card and update the value of the node scoring system field of the nodes received by nodesLinks.
     * It also returns the result.
     */
    public static calculateAllNodesScore(sourceNodePrefixedId: string, nodesLinks: INodesLinks): INodeScore202309 {
        // All score-related fields for each node in nodes of nodesLinks must be undefined.
        nodesLinks.nodes.forEach(node => {
            node.scoringSourceNodeId = undefined;
            node.scoringDistance = undefined;
            node.scoringScore = undefined;
            node.scoringPreviousScore = undefined;
            node.scoringStg1score = undefined;
            node.scoringStg2score = undefined;
        });

        // Get the links grouped by distance.
        const linksForDistances = this.getLinksForDistances(sourceNodePrefixedId, nodesLinks);

        // Perform processing for each distance.
        const targetScoring = this.getTargetScoringStagingForAllDistances(sourceNodePrefixedId, nodesLinks, linksForDistances);

        const result = {
            sourceNodeId: sourceNodePrefixedId,
            CONST_sourceNodeScore: NodeScoring202309.SOURCE_NODE_SCORE,
            CONST_neighbourhoodRate: NodeScoring202309.NEIGHBOURHOOD_RATE,
            targetScoring: targetScoring,
        };

        return result;
    }
    /**
     * Get the links grouped by distance.
     * As a premise, all score-related fields for each node in the nodes of nodesLinks received must be undefined.
     * @param sourceNodePrefixedId 
     * @param nodesLinks 
     * @returns 
     */
    private static getLinksForDistances(sourceNodePrefixedId: string, nodesLinks: INodesLinks): Map<number, IScoringLink202309[]> {
        // Store the node.id group to be processed.
        const restLinkIdList: string[] = [];
        nodesLinks.links.forEach(link => { restLinkIdList.push(link.id); });
        // Store the index group of elements to be deleted from stockNodeIdList that have been processed.
        const indexListToBeRemoved: number[] = [];
        let distance = 0;
        const result = new Map<number, IScoringLink202309[]>();

        // Perform score processing for each distance. Called recursively.
        const processNextDistance = (sNodes: ICVSimulationNodeDatum[]) => {
            const nextSNodes: ICVSimulationNodeDatum[] = [];
            sNodes.forEach(sNode => {
                sNode.scoringSourceNodeId ??= sourceNodePrefixedId;
                // If a value is already entered, use that value.
                sNode.scoringDistance ??= distance;
                const tLinks = nodesLinks.links.filter(l =>
                    (l.source.id === sNode.id || l.target.id === sNode.id) && restLinkIdList.includes(l.id)
                );
                tLinks.forEach(tLink => {
                    const tNode = (tLink.source.id === sNode.id) ? tLink.target : tLink.source;
                    tNode.scoringSourceNodeId ??= sourceNodePrefixedId;
                    // If a value is already entered, use that value.
                    tNode.scoringDistance ??= distance + 1;
                    tLink.scoringDistance = Math.min(sNode.scoringDistance!, tNode.scoringDistance);
                    if (!result.get(distance)) result.set(distance, []);
                    result.get(distance)?.push({
                        id: tLink.id,
                        source: sNode,
                        target: tNode,
                        linkCount: tLink.dataverseLinkArray.length,
                    });
                    indexListToBeRemoved.push(restLinkIdList.indexOf(tLink.id));

                    nextSNodes.push(tNode);
                });
                for (; ;) {
                    const index = indexListToBeRemoved.pop();
                    if (index !== undefined) restLinkIdList.splice(index, 1);
                    else break;
                }
            });

            if (restLinkIdList.length > 0 && nextSNodes.length > 0) {
                distance++;
                processNextDistance(nextSNodes);
            } else if (nextSNodes.length <= 0) console.error("in getLinksForDistances(), nextSNodes.length <= 0");
        };

        processNextDistance([nodesLinks.nodes.find(node => node.id === sourceNodePrefixedId)!]);
        return result;
    }
    /**
     * Perform processing for all distances and return the result in the Staging interface.
     * @returns An instance of Map. The key is the prefix id of the score target node. The value is information about the score target node.
     */
    private static getTargetScoringStagingForAllDistances(
        sourceNodePrefixedId: string,
        nodesLinks: INodesLinks,
        linksForDistances: Map<number, IScoringLink202309[]>)
        : Map<string, ICVSimulationNodeDatum> {
        const result = new Map<string, ICVSimulationNodeDatum>();
        let distance = 0;
        for (; ;) {
            if (linksForDistances.has(distance)) {
                const scoringsForDistance = this.getNodeScoresForDistance(sourceNodePrefixedId, nodesLinks, distance, linksForDistances.get(distance)!);
                scoringsForDistance.forEach((targetNodeInfo, distance, map) => {
                    result.set(targetNodeInfo.id, targetNodeInfo);
                });
            }
            else break;
            distance++;
        }
        return result;
    }
    /**
     * Perform processing for a certain distance. Receive one or more links.
     * @param sourceNodePrefixedId 
     * @param nodesLinks 
     * @param distance 
     * @param linkList 
     * @returns Map<string, ICVSimulationNodeDatum> key is the prefix id of the score target node. The value is information about the score target node.
     */
    private static getNodeScoresForDistance(sourceNodePrefixedId: string, nodesLinks: INodesLinks, distance: number, linkList: IScoringLink202309[]): Map<string, ICVSimulationNodeDatum> {
        // key is the prefix id of the score target node. The value is information about the score target node.
        const targetScoring = new Map<string, ICVSimulationNodeDatum>();

        // Perform special processing when distance = 0.
        if (distance === 0) nodesLinks.nodes.find(node => node.id === sourceNodePrefixedId)!.scoringScore = NodeScoring202309.SOURCE_NODE_SCORE;

        // scoringPreviousScore is set for the previous target node before stage 1.
        linkList.forEach(link => {
            link.source.scoringPreviousScore = link.source.scoringScore!;
            link.target.scoringPreviousScore = link.target.scoringScore!;
        });

        // Perform stage 1 processing.
        const linksForStage1 = NodeScoring202309.getNodeScoresForDistanceStage1(targetScoring, distance, linkList);

        // Perform stage 2 processing.
        NodeScoring202309.getNodeScoresForDistanceStage2(targetScoring, distance, linkList, linksForStage1);

        return targetScoring;
    }
    /**
     * Perform stage 1 processing for a certain distance. Receive one or more links.
     * Update the targetScoring internally.
     * @param targetScoring Map<string, ICVSimulationNodeDatum> key is the prefix id of the score target node. The value is information about the score target node.
     * @returns Links processed in stage 1
     */
    private static getNodeScoresForDistanceStage1(targetScoring: Map<string, ICVSimulationNodeDatum>, distance: number, linkList: IScoringLink202309[]): IScoringLink202309[] {
        const linksForStage1 = linkList.filter(link => link.source.scoringDistance === distance && link.target.scoringDistance === distance);

        linksForStage1.forEach(link => {
            link.source.scoringStg1score = link.target.scoringPreviousScore! * NodeScoring202309.NEIGHBOURHOOD_RATE * (1 + (link.linkCount - 1) / 2); // `f(linkCount) = 1 + (linkCount - 1) / 2`
            link.target.scoringStg1score = link.source.scoringPreviousScore! * NodeScoring202309.NEIGHBOURHOOD_RATE * (1 + (link.linkCount - 1) / 2); // `f(linkCount) = 1 + (linkCount - 1) / 2`

            // It is not assumed that link.source.scoringScore is undefined. The value must be entered in the previous distance.
            link.source.scoringScore! += link.source.scoringStg1score;
            // It is not assumed that link.target.scoringScore is undefined. The value must be entered in the previous distance.
            link.target.scoringScore! += link.target.scoringStg1score;

            targetScoring.set(link.source.id, link.source);
            targetScoring.set(link.target.id, link.target);
        });

        return linksForStage1;
    }
    /**
     * Perform stage 2 processing for a certain distance. Receive one or more links.
     * The return value is the TargetScoring after both stage 1 and stage 2 processing.
     * @param targetScoring Map<string, ICVSimulationNodeDatum> key is the prefix id of the score target node. The value is information about the score target node.
     */
    private static getNodeScoresForDistanceStage2(targetScoring: Map<string, ICVSimulationNodeDatum>, distance: number, linkList: IScoringLink202309[], linksForStage1: IScoringLink202309[]): void {
        const linksForStage2 = linkList.filter(link => !linksForStage1.includes(link));

        linksForStage2.forEach(link => {
            link.source.scoringScore ??= 0;
            link.target.scoringScore ??= 0;
        });
        linksForStage2.forEach(link => {
            const [sNode, tNode] = (link.source.scoringDistance === distance) ? [link.source, link.target] : [link.target, link.source];
            tNode.scoringStg2score = sNode.scoringScore! * NodeScoring202309.NEIGHBOURHOOD_RATE * (1 + (link.linkCount - 1) / 2); // `f(linkCount) = 1 + (linkCount - 1) / 2`
            tNode.scoringScore! += tNode.scoringStg2score;

            targetScoring.set(sNode.id, sNode);
            targetScoring.set(tNode.id, tNode);
        });
    }
}
