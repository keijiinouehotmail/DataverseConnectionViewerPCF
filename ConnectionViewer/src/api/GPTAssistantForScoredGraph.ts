import { INodesLinks } from "./ForceGraph_CircleUI";
import { SimpleVertex } from "./GPTAssistantForGraph";
import { WebAPI } from "../services/WebAPIHelper";

/**
 * Graph information represented by vertices and edges, including scores, assuming data to be passed to GPT.
 * The vertex information in edges has complete Vertex information.
 */
export interface ScoredGraphForGPT {
    // The ID of the score source node. A score source node is a node for which the score of this node (targetNodeId) is calculated. With prefix.
    sourceNodeId: string,
    vertices: ScoredVertex[],
    edges: Edge[],
}
interface ScoredVertex {
    id: string,
    name: string,
    entityName: string,
    score?: number,
}
interface Edge {
    id: string,
    vertex1: ScoredVertex,
    vertex2: ScoredVertex,
    connectionList: Connection[],
}
interface Connection {
    description?: string,
    vertex1roleName?: string,
    vertex2roleName?: string,
}
/**
 * A class that provides assistant functions using GPT functions such as ChatGPT. Including scores.
 */
export class GPTAssistantForScoredGraph {
    /**
     * Create and return compact data for using GPT from INodesLinks data. Including scores.
     * Assign own id in this function to shorten the id.
     */
    static getScoredGraphForGTPFromForceList(
        // The ID of the score source node. A score source node is a node for which the score of this node (targetNodeId) is calculated. With prefix.
        sourceNodeId: string, 
        forceList: INodesLinks,
        iDPrefix: string, 
        entityMetadataCacheKeyIsEntityLogicalName: { [key: string]: WebAPI.entityMetadataInterface }
    ): ScoredGraphForGPT {
        const vertices: ScoredVertex[] = [];
        const edges: Edge[] = [];
        /**
         * Holds the original id as a key and the id newly assigned in this function as a value.
         * The string of id is a serial number such as "id0" "id1" "id2" ...
         * Also, this serial number is common to node and link.dataverseLink[].linkId.
         * Note that the original id must not be duplicated in node and link.dataverseLink[].linkId, so separate them.
         * For entityName, store the display name, not the internal name.
         */
        const nodeIdDictionary: { [key: string]: string } = {};
        const linkIdDictionary: { [key: string]: string } = {};
        let sequence = 0;

        const getNewIdNode = (originalId: string): string => {
            if (nodeIdDictionary[originalId] === undefined) {
                nodeIdDictionary[originalId] = iDPrefix + sequence;
                sequence++;
            }
            return nodeIdDictionary[originalId];
        };
        const getNewIdLink = (originalId: string): string => {
            if (linkIdDictionary[originalId] === undefined) {
                linkIdDictionary[originalId] = iDPrefix + sequence;
                sequence++;
            }
            return linkIdDictionary[originalId];
        };
        for (const node of forceList.nodes) {
            const vertex: ScoredVertex = {
                id: getNewIdNode(node.id), // This node.id has ID prefix "id"
                name: node.name,
                entityName: entityMetadataCacheKeyIsEntityLogicalName[node.entityName].DisplayName.UserLocalizedLabel.Label.trim(),
                score: node.scoringScore,
            };
            vertices.push(vertex);
        }
        for (const link of forceList.links) {
            const connection: Connection[] = [];
            for (const dataverseLink of link.dataverseLinkArray) {
                const connDescsContext: Connection = {};
                if (dataverseLink.Description) connDescsContext.description = dataverseLink.Description;
                if (dataverseLink.Record1DisplayRoleName) connDescsContext.vertex1roleName = dataverseLink.Record1DisplayRoleName;
                if (dataverseLink.Record2DisplayRoleName) connDescsContext.vertex2roleName = dataverseLink.Record2DisplayRoleName;
                connection.push(connDescsContext);
            }
            const edge: Edge = {
                id: getNewIdLink(link.id),
                vertex1: vertices.find(v => v.id === getNewIdNode(link.source.id))!,
                vertex2: vertices.find(v => v.id === getNewIdNode(link.target.id))!,
                connectionList: connection,
            };
            edges.push(edge);
        }
        return { sourceNodeId, vertices, edges };
    }
    static getSimpleVerticesFromScoredGraphForGPT(scoredGraphForGPT: ScoredGraphForGPT): SimpleVertex[] {
        const simpleVertices: SimpleVertex[] = [];
        for (const vertex of scoredGraphForGPT.vertices) {
            const simpleVertex: SimpleVertex = {
                id: vertex.id,
                name: vertex.name,
            };
            simpleVertices.push(simpleVertex);
        }
        return simpleVertices;
    }
}