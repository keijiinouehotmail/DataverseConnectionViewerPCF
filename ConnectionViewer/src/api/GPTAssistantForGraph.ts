import { INodesLinks } from "./ForceGraph_CircleUI";
import { WebAPI } from "../services/WebAPIHelper";

/**
 * Graph information represented by vertices and edges, assuming data to be passed to GPT.
 * The vertex information in edges has complete Vertex information.
 */
export interface GraphForGPT {
    vertices: Vertex[],
    edges: Edge[],
}
export interface Vertex {
    id: string,
    name: string,
    entityName: string,
}
export interface SimpleVertex {
    id: string,
    name: string,
}
interface Edge {
    id: string,
    vertex1: Vertex,
    vertex2: Vertex,
    connectionList: Connection[],
}
interface Connection {
    description?: string,
    vertex1roleName?: string,
    vertex2roleName?: string,
}
/**
 * A class that provides assistant functions using GPT functions such as ChatGPT
 */
export class GPTAssistantForGraph {
    /**
     * Create and return compact data for using GPT from INodesLinks data.
     * id is used as it is without shortening.
     */
    static getGraphForGTPFromForceList(
        forceList: INodesLinks,
        entityMetadataCacheKeyIsEntityLogicalName: { [key: string]: WebAPI.entityMetadataInterface }
    ): GraphForGPT {
        const vertices: Vertex[] = [];
        const edges: Edge[] = [];

        for (const node of forceList.nodes) {
            const vertex: Vertex = {
                id: node.id, // This has ID prefix "id"
                name: node.name,
                entityName: entityMetadataCacheKeyIsEntityLogicalName[node.entityName].DisplayName.UserLocalizedLabel.Label.trim(),
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
                id: link.id,
                vertex1: vertices.find(v => v.id === link.source.id)!,
                vertex2: vertices.find(v => v.id === link.target.id)!,
                connectionList: connection,
            };
            edges.push(edge);
        }
        return { vertices, edges };
    }
    /**
     * Create and return compact data for using GPT from INodesLinks data.
     * To shorten the id, a unique id is assigned in this function.
     */
    static getGraphForGTPFromForceListNewId(
        forceList: INodesLinks,
        iDPrefix: string,
        entityMetadataCacheKeyIsEntityLogicalName: { [key: string]: WebAPI.entityMetadataInterface }
    ): GraphForGPT {
        const vertices: Vertex[] = [];
        const edges: Edge[] = [];
        /**
         * Has a unique id as a key and has a newly assigned id as a value in this function.
         * The string of id is a serial number such as "id0" "id1" "id2" ...
         * Also, this serial number is common to node and link.dataverseLink[].linkId.
         * Note that the unique id and link.dataverseLink[].linkId must not be duplicated.
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
            const vertex: Vertex = {
                id: getNewIdNode(node.id), // This node.id has ID prefix "id"
                name: node.name,
                entityName: entityMetadataCacheKeyIsEntityLogicalName[node.entityName].DisplayName.UserLocalizedLabel.Label.trim(),
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
        return { vertices, edges };
    }
    static getSimpleVerticesFromGraphForGPT(sgraphForGPT: GraphForGPT): SimpleVertex[] {
        const simpleVertices: SimpleVertex[] = [];
        for (const vertex of sgraphForGPT.vertices) {
            const simpleVertex: SimpleVertex = {
                id: vertex.id,
                name: vertex.name,
            };
            simpleVertices.push(simpleVertex);
        }
        return simpleVertices;
    }
}