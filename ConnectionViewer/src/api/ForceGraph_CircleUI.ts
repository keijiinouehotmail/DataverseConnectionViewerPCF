import * as d3selection from "d3-selection";
import * as d3force from "d3-force";
import * as d3drag from "d3-drag";
import * as d3transition from "d3-transition";
import { easeExpInOut } from "d3-ease";
import { CardControl } from "./CardControl";
import { ConnectionViewer } from "../ConnectionViewer";
import { ConnectorControl } from "./ConnectorControl";
import { DataverseLink, DataverseLinkTypeEnum } from "./DataverseLink";
import { IConnDescsContext, IDVLink } from "../components/ReactConnDescs";
import { Helper } from "./Helper";
import { SVG_NS } from "./NonReactDiv";
import { DataverseRecord } from "./DataverseRecord";
import { INodeScore202309, NodeScoring202309 } from "./NodeScoring202309";
import { ImageResources } from "./ImageResources";
import { EventEnum } from "./EventEnum";
import { ForceGraphCardsExpander } from "./ForceGraphCardsExpander";
import { Point } from "./Point";

export interface INodesLinks {
    nodes: ICVSimulationNodeDatum[];
    links: ICVSimulationLinkDatum[];
    cdLinks: ICVSimulationLinkDatum[]; // Store only links with a Connection Description.
}

export interface ICVSimulationNodeDatum extends d3force.SimulationNodeDatum {
    name: string,
    id: string, // with prefix
    iconURL: string,
    fixed?: boolean | null,
    entityName: string,
    sizeType: string,
    radius: number,
    sizeChanged: boolean,
    numberOfLines: number | null,
    computedTextLength: number | null,
    scoringSourceNodeId?: string, // The ID of the score source node. A score source node is a node for which the score of this node (targetNodeId) is calculated. With prefix.
    scoringDistance?: number, // The distance to the score source node. The minimum distance connected by a link.
    scoringScore?: number, // The score of the score source node for the node to be scored.
    scoringPreviousScore?: number, // The score that the score target node had at the previous distance.
    scoringStg1score?: number, // The score of the score target node for stage 1 alone. Including the calculation process.
    scoringStg2score?: number, // The score of the score target node for stage 2 alone. Including the calculation process.
}

export interface ICVSimulationLinkDatum extends d3force.SimulationLinkDatum<ICVSimulationNodeDatum> {
    id: string, // This ID will continue to hold the LinkId of the DataverseLink that was initially specified when the link was created.
    description: string | null,
    role1: string | null,
    role2: string | null,
    connector: ConnectorControl,
    source: ICVSimulationNodeDatum,
    target: ICVSimulationNodeDatum,
    dataverseLinkArray: DataverseLink[],
    scoringDistance?: number, // The distance to the score source node. The number of link distances held by the link matches the smaller of the two node distances of the two connected nodes.
}

/**
 * A class that manages objects represented by a mechanical model.
 * The card is drawn as a round circle.
 * Use d3force's forceSimulation.
 */
export class ForceGraph_CircleUI {
    /**
     * Implementation by using d3.forceSimulation
     */
    forceSimulation: d3force.Simulation<ICVSimulationNodeDatum, ICVSimulationLinkDatum>;
    /**
    * List for force layout. Contains a list of nodes and a list of links (lines connecting nodes to nodes).
    */
    forceList: INodesLinks;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionConnectionLine: d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string>;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionConnectionDescriptionG: d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string>;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionSVGScoringLinksG: d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string>;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionConnectionRole1: d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string>;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionConnectionRole2: d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string>;
    /**
     * Selection associated with data in Force simulation
     */
    forceSelectionNodeCard: d3selection.Selection<d3selection.BaseType, ICVSimulationNodeDatum, SVGGElement, string>;
    /**
    * SVG inner g element for drawing cards
    */
    svgGForCards: d3selection.Selection<SVGGElement, string, HTMLElement, any>;
    /**
    * SVG inner g element for drawing connection lines
    */
    svgGForLines: d3selection.Selection<SVGGElement, string, HTMLElement, any>;
    /**
    * SVG inner g element for drawing connection descriptions
    */
    svgGForConnectionDescriptions: d3selection.Selection<SVGGElement, string, HTMLElement, any>;
    /**
    * SVG inner g element for drawing connection roles
    */
    svgGForConnectionRoles: d3selection.Selection<SVGGElement, string, HTMLElement, any>;
    /**
    * SVG inner g element for displaying distance etc. on links for node scoring
    */
    svgScoringLinksG: d3selection.Selection<SVGGElement, string, HTMLElement, any>;
    /**
    * svg
    */
    svg: d3selection.Selection<SVGElement, string, HTMLElement, any>;
    /**
    * ID of the Dataverse record of the currently focused card. No prefix.
    */
    currentFocusedCardID: string | null = null;
    /**
    * The position where the drag started. Record even if only mouse clicked or touched.
    */
    dragStartedPoint: Point;
    /**
    * DOM element currently being processed for drag and other events
    */
    currentEventElem: Element | null = null;
    /**
     * Start date and time of event start such as touch operation
     */
    touchPointerMouseStarted: number | null = null;
    /**
     * Dummy card to display in the foreground when dragging a card
     */
    frontDummyCard: SVGGElement | null = null;
    /**
     * In node scoring, the node ICVSimulationNodeDatum that is the current score source node
     * If this is not null, the node scoring display should be made.
     */
    currentScoreSourceNode: ICVSimulationNodeDatum | null = null;
    /**
     * In node scoring, if the score becomes past after calculating the score once, such as adding a card, true
     */
    currentScoreInvalidated: boolean = false;
    /**
     * In node scoring, the score calculated most recently for currentScoreSourceNode
     * As managed by currentScoreInvalidated, this value will be null if the score becomes past.
     */
    currentNodesScore: INodeScore202309 | null = null;
    /**
     * How many milliseconds should be considered to be held by touch operation etc.
     */
    static readonly HOLDING_TIME = 800; // milliseconds
    /**
     * Distance to be considered as dragging by touch operation etc. If 100 is specified, the distance is considered to be 10px.
     */
    static readonly HOLDING_DISTANCE = 100; // 10px
    /**
    * A threshold for determining that the text in the circle should be displayed on a single line only if it is less than this value (for L size) 
    * Among the values of h lined up in MyDefTextPathL on the html file, it should match the largest one.
    */
    static readonly SVG_TEXT_SINGLE_LINE_L_LENGTH = 90;
    /**
    * A threshold for determining that the text in the circle should be displayed on two lines only if it is less than this value (for M size)
    * Among the values of h lined up in MyDefTextPathM2 and MyDefTextPathM3 on the html file, it should match the largest one.
    */
    static readonly SVG_TEXT_SINGLE_LINE_M2_LENGTH = 58;
    /**
    * A threshold for determining that the text in the circle should be displayed on three or more lines only if it is less than this value (for M size)
    * It should match the sum of the values of h lined up in MyDefTextPathM2 on the html file.
    */
    static readonly SVG_TEXT_SINGLE_LINE_M3_LENGTH = 96;
    /**
    * The distance between the cards, where one node is size "L" and the other node is size "M".
    * If both nodes are of size "L", CV.ConnectionViewer.CARD_DISTANCE should be used.
    */
    static CARD_DISTANCE_LM = 163; // = 180 - ((50 + 6) - (34 + 5))
    /**
    * The distance between the cards, where both nodes are size "M".
    * If both nodes are of size "L", CV.ConnectionViewer.CARD_DISTANCE should be used.
    */
    static CARD_DISTANCE_MM = 146; // = 180 - ((50 + 6) - (34 + 5)) * 2
    /**
    * Radius of card for size "L"
    */
    static radius_for_l: number;
    /**
    * Radius of card for size "M"
    */
    static radius_for_m: number;
    /**
    * Radius of card for size "L" for determining the display position of Role1 and Role2. Also considering the thickness of the stroke.
    */
    static radius_for_role_l: number;
    /**
    * Radius of card for size "M" for determining the display position of Role1 and Role2. Also considering the thickness of the stroke.
    */
    static radius_for_role_m: number;
    /**
     * Whether to enable node scoring feature or not.
     */
    enableNodeScoring: boolean;
    /**
     * The GUID of the main record, which is the id of the record displayed in the form.
     * No prefix.
     */
    guidMainRecord: string;
    /**
     * Whether to display additional information in the UI for debugging when coding for node scoring.
     */
    static DEBUG_NodeScoring = false;
    /**
     * Instance of ForceGraphCardsExpander
     */
    cardsExpander: ForceGraphCardsExpander;
    /**
     * Constructor of an object represented by a mechanical model
     * @param svgGForCardsID {string} ID of the g element in SVG that indicates the area to draw the card. Starts with #.
     * @param svgGForLinesID {string} ID of the g element in SVG that indicates the area to draw the connection line. Starts with #.
     * @param svgGForConnectionDescriptions {string} ID of the g element in SVG that indicates the area to draw the connection description. Starts with #.
     * @param svgGForConnectionRoles {string} ID of the g element in SVG that indicates the area to draw the connection role. Starts with #.
     * @param svgScoringLinksGID {string} ID of the g element in SVG to display distance etc. on the link for node scoring. Starts with #.
     * @param enableNodeScoring {boolean} Whether to enable node scoring feature or not.
     * @param guidMainRecord {string} The GUID of the main record, which is the id of the record displayed in the form. No prefix.
     */
    constructor(
        svgGForCardsID: string,
        svgGForLinesID: string,
        svgGForConnectionDescriptions: string,
        svgGForConnectionRoles: string,
        svgScoringLinksGID: string,
        enableNodeScoring: boolean = false,
        guidMainRecord: string,
    ) {
        // console.log("in ForceGraph_CircleUI constructor()");

        this.forceList = { nodes: [], links: [], cdLinks: [] };
        this.forceTicked = this.forceTicked.bind(this);
        this.forceSimulation = d3force.forceSimulation<ICVSimulationNodeDatum, ICVSimulationLinkDatum>(this.forceList.nodes)
            .force("charge", d3force.forceManyBody().strength(-3000))
            .force("collide", d3force.forceCollide().radius(ForceGraph_CircleUI.CARD_DISTANCE_MM / 2))
            .force("x", d3force.forceX())
            .force("y", d3force.forceY())
            .force("link",
                d3force.forceLink<ICVSimulationNodeDatum, ICVSimulationLinkDatum>(this.forceList.links)
                    .id((node) => node.id)
                    .distance((link) => {
                        if (ConnectionViewer.cv.config.SmallerSizeEnabled) {
                            if (link.source.sizeType === "M" && link.target.sizeType === "M") return ForceGraph_CircleUI.CARD_DISTANCE_MM;
                            else if (link.source.sizeType === "L" && link.target.sizeType === "L") return ConnectionViewer.CARD_DISTANCE;
                            else return ForceGraph_CircleUI.CARD_DISTANCE_LM;
                        } else {
                            return ConnectionViewer.CARD_DISTANCE;
                        }
                    }))
            .on("tick", this.forceTicked);

        this.svg = d3selection.select<SVGElement, string>("svg");
        this.svgGForCards = d3selection.select<SVGGElement, string>(svgGForCardsID);
        this.svgGForLines = d3selection.select<SVGGElement, string>(svgGForLinesID);
        this.svgGForConnectionDescriptions = d3selection.select<SVGGElement, string>(svgGForConnectionDescriptions);
        this.svgGForConnectionRoles = d3selection.select<SVGGElement, string>(svgGForConnectionRoles);
        this.svgScoringLinksG = d3selection.select<SVGGElement, string>(svgScoringLinksGID);
        this.enableNodeScoring = enableNodeScoring;
        this.guidMainRecord = guidMainRecord;
        const ns = ConnectionViewer.ns;
        ForceGraph_CircleUI.radius_for_l = parseInt(d3selection.select(`#${ns}_MyDefCircleL`).attr("r") as string);
        ForceGraph_CircleUI.radius_for_l = parseInt(d3selection.select(`#${ns}_MyDefCircleL`).attr("r") as string);
        ForceGraph_CircleUI.radius_for_m = parseInt(d3selection.select(`#${ns}_MyDefCircleM`).attr("r") as string);
        ForceGraph_CircleUI.radius_for_role_l = parseInt(d3selection.select(`#${ns}_MyDefCircleL`).attr("r") as string) + parseInt(d3selection.select(`#${ns}_MyDefCircleL`).attr("stroke-width") as string);
        ForceGraph_CircleUI.radius_for_role_m = parseInt(d3selection.select(`#${ns}_MyDefCircleM`).attr("r") as string) + parseInt(d3selection.select(`#${ns}_MyDefCircleM`).attr("stroke-width") as string);
        const _DEBUG_NodeScoring = ForceGraph_CircleUI.checkAndGetDEBUG_NodeScoringFromLocation();
        if ((_DEBUG_NodeScoring !== undefined)) ForceGraph_CircleUI.DEBUG_NodeScoring = _DEBUG_NodeScoring;

        this.createCenterMark();
        d3selection.select(`#${ns}_MySVG`).attr("pointer-events", "all");
        this.initCanvasToDrag();

        this.sizeChanged();
    }
    createCenterMark(): void {
        const ns = ConnectionViewer.ns;
        const centerMarkG = d3selection.select(`#${ns}_MyDragDropG`).append("g")
            .classed("centerMark", true)
            .lower();

        centerMarkG.append("line")
            .classed("centerMark", true)
            .attr("x1", -5)
            .attr("y1", 0)
            .attr("x2", 5)
            .attr("y2", 0);

        centerMarkG.append("line")
            .classed("centerMark", true)
            .attr("x1", 0)
            .attr("y1", -5)
            .attr("x2", 0)
            .attr("y2", 5);
    }

    /**
     * Focus on a specific card. The argument is the id of the Dataverse record.
     * If there is already a card in focus, it will also un-focus it.
     * @param id {string} ID of the Dataverse record (no prefix)
     */
    static focusACardControlByDataverseRecordId(id: string): void {
        if (ConnectionViewer.forceGraph.currentFocusedCardID != id) {
            // Unfocus the card if it is already in focus
            if (ConnectionViewer.forceGraph.currentFocusedCardID != null) {
                for (var i = 0; i < ConnectionViewer.cv.DataverseRecordArray.length; i++) {
                    if (ConnectionViewer.cv.DataverseRecordArray[i].Id == ConnectionViewer.forceGraph.currentFocusedCardID) {
                        ConnectionViewer.cv.DataverseRecordArray[i].Card.Unfocus();
                        break;
                    }
                }
            }

            ConnectionViewer.forceGraph.currentFocusedCardID = id;

            // Focus processing as UI
            if (d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard .circleInCard") != null) {
                d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard .circleInCard").attr("fill", (d: any) => `url(#${ConnectionViewer.ns}_LG_${d.entityName})`);
            }
        }
    }
    /**
     * 
     * @param id {string} ID of the Dataverse record
     */
    static unfocusACardControlByDataverseRecordId(id: string): void {
        if (d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard .circleInCard") != null) {
            d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard .circleInCard").attr("fill", `url(#${ConnectionViewer.ns}_LGUnfocused)`);
        }
    }
    /**
     * Add a node.
     * The string of id handled by d3 may not start with a number, so add a prefix to the stored id.
     * If x and y are not specified in the argument, they will not be fixed.
     * @param nodeObj Name and ID and iconURL and x and y. x and y can be null unless explicitly specified.
     */
    addNode(nodeObj: { name: string; id: string; iconURL: string; x: number | null; y: number | null; fixed: boolean | null; entityName: string }): void {
        if (nodeObj.x !== null && nodeObj.y !== null) {
            this.forceList.nodes.push(
                {
                    name: nodeObj.name,
                    id: ConnectionViewer.IDPrefix + nodeObj.id,
                    iconURL: nodeObj.iconURL,
                    x: nodeObj.x,
                    y: nodeObj.y,
                    fixed: nodeObj.fixed, // Not a property with a special meaning for d3, but used in this app.
                    fx: nodeObj.fixed ? nodeObj.x : null,
                    fy: nodeObj.fixed ? nodeObj.y : null,
                    entityName: nodeObj.entityName,
                    sizeType: "L",
                    radius: ForceGraph_CircleUI.radius_for_role_l,
                    sizeChanged: false,
                    numberOfLines: null,
                    computedTextLength: null,
                });
        } else {
            this.forceList.nodes.push({
                name: nodeObj.name,
                id: ConnectionViewer.IDPrefix + nodeObj.id,
                iconURL: nodeObj.iconURL,
                entityName: nodeObj.entityName,
                sizeType: "L",
                radius: ForceGraph_CircleUI.radius_for_role_l,
                sizeChanged: false,
                numberOfLines: null,
                computedTextLength: null,
            });
        }
        this.refreshForceNodeWhenAdded = this.refreshForceNodeWhenAdded.bind(this);
        this.forceSelectionNodeCard = this.refreshForceNodeWhenAdded();
    }
    /**
     * Defines the behavior of force when a node is added. Returns d3.Selection.
     * Note that even fixed cards can be dragged.
     */
    refreshForceNodeWhenAdded(): d3selection.Selection<d3selection.BaseType, ICVSimulationNodeDatum, SVGGElement, string> {
        try {
            const forceNodeCard = this.svgGForCards.selectAll("g.circleCard")
                .data(this.forceList.nodes, (node: any) => node.id)
                .join(enter => {
                    const nodeEnter = enter.append("g") // Whold card. Class is circleCard
                        .attr("id", (node) => node.id) // d.id has already prefix.
                        .classed("circleCard", true)
                        .call(d3drag.drag<SVGGElement, ICVSimulationNodeDatum>()
                            .on("start", this.dragstarted)
                            .on("drag", this.dragged)
                            .on("end", this.dragended)
                        )
                        .on("click", (event: PointerEvent) => {
                            event.preventDefault();
                            event.stopPropagation();
                        });
                    nodeEnter
                        .append("title")
                        .text((d) => d.name);

                    // For node scoring
                    if (this.enableNodeScoring) {
                        const NodeScoringG = nodeEnter
                            .append("g")
                            .classed(`${ConnectionViewer.ns}_NodeScoringG`, true);
                        // Graphics for node scoring 1 of 2 scoreCircleNomal
                        // stroke-width and r are changed when the score is calculated.
                        NodeScoringG
                            .append("circle")
                            .classed("scoreCircleNomal", true)
                            .attr("cx", 0)
                            .attr("cy", 0)
                            .attr("stroke", d => CardControl.getEntityColor(d.entityName))
                            .attr("stroke-dasharray", "6 4 22 4")
                            .attr("stroke-opacity", 0.3)
                            .attr("fill", "none")
                            .attr("cursor", "none")
                            .attr("visibility", "collapse");
                        // Graphics for node scoring 2 of 2 scoreCircleHigh
                        // stroke-width and r are changed when the score is calculated.
                        NodeScoringG
                            .append("circle")
                            .classed("scoreCircleHigh", true)
                            .attr("cx", 0)
                            .attr("cy", 0)
                            .attr("stroke", d => CardControl.getEntityColor(d.entityName))
                            .attr("stroke-dasharray", "6 30")
                            .attr("stroke-opacity", 0.8)
                            .attr("fill", "none")
                            .attr("cursor", "none")
                            .attr("visibility", "collapse");
                    }

                    // Circle in card. Class is circleInCard
                    nodeEnter
                        .append("use")
                        .classed("circleInCard", true)
                        .attr("href", (d) => { return `#${ConnectionViewer.ns}_MyDefCircle` + d.sizeType; }) // MyDefCircleL or MyDefCircleM, Not 'xlink:href'
                        .attr("fill", `url(#${ConnectionViewer.ns}_LGUnfocused)`)
                        .attr("stroke", (d) => `url(#${ConnectionViewer.ns}_LG_${d.entityName})`)
                        .attr("filter", (d) => {
                            return (d.fixed) ? `url(#${ConnectionViewer.ns}_MyDefDropShadow)` : "";
                        });
                    nodeEnter
                        .append("image")
                        .attr("cursor", "move")
                        .attr("visibility", (d) => { return (d.sizeType === "L") ? "visible" : "collapse"; })
                        // Set href x y width height at once.
                        .each((datum: ICVSimulationNodeDatum, index: number, groups: any) => {
                            const entityImage = DataverseRecord.getEntityImage(datum.id.substring(ConnectionViewer.IDPrefix.length));
                            const elem = groups[index];
                            elem.setAttribute("href", (entityImage) ? "data:image/png;base64," + entityImage : datum.iconURL);
                            elem.setAttribute("x", (entityImage) ? -16 : -14);
                            elem.setAttribute("y", (entityImage) ? -46 : -44);
                            elem.setAttribute("width", (entityImage) ? 32 : 28);
                            elem.setAttribute("height", (entityImage) ? 32 : 28);
                        });

                    // Display the name of the card
                    // First, place the string on the SVG normally.
                    nodeEnter
                        .each((node: ICVSimulationNodeDatum, index: number, groups: any) => {
                            const text = document.createElementNS(SVG_NS, "text");
                            text.setAttribute("class", "nameInCard");
                            text.setAttribute("font-family", "Meiryo UI");
                            text.setAttribute("font-size", "9pt");
                            text.setAttribute("fill", "white");
                            text.setAttribute("text-decoration", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "underline" : "");
                            text.setAttribute("cursor", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "pointer" : "move");
                            text.textContent = node.name;
                            const GElem = groups[index];
                            GElem.appendChild(text);

                            // Store the length of the card name displayed on text in d.computedTextLength. This information is assumed to be unchanged in the future.
                            // Also, add information to d.numberOfLines whether text fits on multiple lines.
                            const computedTextLength = text.getComputedTextLength();
                            node.computedTextLength = computedTextLength;
                            node.numberOfLines = ForceGraph_CircleUI.getNumberOfLines(computedTextLength, node.sizeType);

                            if (node.numberOfLines === 1) {
                                // Processing of SVG Text that fits on one line
                                text.setAttribute("x", "0");
                                text.setAttribute("y", "4");
                                text.setAttribute("font-family", "Meiryo UI");
                                text.setAttribute("font-size", "9pt");
                                text.setAttribute("fill", "white");
                                text.setAttribute("text-decoration", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "underline" : "");
                                text.setAttribute("text-anchor", "middle");
                            } else {
                                // Processing of SVG Text that becomes multiple lines with textPath
                                const ns = ConnectionViewer.ns;
                                text.setAttribute("x", "0");
                                text.setAttribute("y", "0");
                                text.setAttribute("font-family", "Meiryo UI");
                                text.setAttribute("font-size", "9pt");
                                text.setAttribute("fill", "white");
                                text.setAttribute("text-decoration", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "underline" : "");
                                text.textContent = "";
                                const textPath = document.createElementNS(SVG_NS, "textPath");
                                textPath.setAttribute("href", `#${ns}_MyDefTextPath${node.sizeType}${node.numberOfLines}`); // One of the following: "MyDefTextPathL2", "MyDefTextPathL3", "MyDefTextPathM2", "MyDefTextPathM3", Not 'xlink:href'
                                textPath.textContent = node.name;
                                text.appendChild(textPath);
                            }
                        })

                    // Processing of "…"
                    nodeEnter
                        .append("text")
                        .classed("cardToBeRetrieved", true)
                        .attr("x", 0)
                        .attr("y", (d) => { return (d.sizeType === "L") ? 43 : 27; })
                        .attr("font-family", "Meiryo UI")
                        .attr("font-size", "9pt")
                        .attr("fill", "white")
                        .attr("text-anchor", "middle")
                        .attr("cursor", "move")
                        .text("…");

                    // UI processing for node scoring card for debugging
                    if (this.enableNodeScoring && ForceGraph_CircleUI.DEBUG_NodeScoring) {
                        const DEBUG_NodeScoringG = nodeEnter
                            .append("g")
                            .classed(`${ConnectionViewer.ns}_DEBUG_NodeScoringG`, true);
                        DEBUG_NodeScoringG
                            .append("use")
                            .attr("href", `#${ConnectionViewer.ns}_ScoringDistanceRect`); // Not 'xlink:href'
                        DEBUG_NodeScoringG
                            .append("text")
                            .classed(`${ConnectionViewer.ns}_ScoringDistance`, true)
                            .attr("x", -20)
                            .attr("y", 30)
                            .attr("text-anchor", "middle")
                            .attr("font-size", "9pt")
                            .attr("fill", "red")
                            .attr("pointer-events", "none")
                            .text(d => d.scoringDistance ?? "");
                        DEBUG_NodeScoringG
                            .append("use")
                            .attr("href", `#${ConnectionViewer.ns}_ScoringScoreRect`); // Not 'xlink:href'
                        DEBUG_NodeScoringG
                            .append("text")
                            .classed(`${ConnectionViewer.ns}_ScoringScore`, true)
                            .attr("x", 15)
                            .attr("y", 30)
                            .attr("text-anchor", "middle")
                            .attr("font-size", "9pt")
                            .attr("fill", "red")
                            .attr("pointer-events", "none")
                            .text(d => (d.scoringScore) ?
                                (d.scoringScore <= 2) ? d.scoringScore.toString().substring(0, 6) : d.scoringScore
                                : "");
                    }

                    return nodeEnter;
                },
                    update => update,
                    exit => exit.remove());

            this.forceSimulation.nodes(this.forceList.nodes); // It is necessary to specify at this timing
            return forceNodeCard;
        } catch (e: any) {
            throw new Error(`${e.message} in refreshForceNodeWhenAdded()`);
        }
    }
    /**
     * Processes the behavior of force when a link is added.
     */
    refreshForceLinkWhenAdded(link: ICVSimulationLinkDatum): void {
        this.forceSelectionConnectionLine = this.appendAndGetForceConnectionLine();
        this.forceSelectionConnectionDescriptionG = this.appendAndGetForceConnectionDescriptionG(link);
        if (ForceGraph_CircleUI.DEBUG_NodeScoring) this.forceSelectionSVGScoringLinksG = this.appendAndGetForceSVGScoringLinksG();
        this.forceSelectionConnectionRole1 = this.appendAndGetForceConnectionRole1();
        this.forceSelectionConnectionRole2 = this.appendAndGetForceConnectionRole2();

        this.currentScoreInvalidated = true;
        this.forceSimulation.alpha(1).restart();
        this.forceTicked(); // Executing here not in refreshForceNodeWhenAdded()
    }
    /**
     * Create and get d3.Selection representing the line of connection.
     * @returns d3.Selection representing the line of connection
     */
    appendAndGetForceConnectionLine(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        let forceConnectionLine = this.svgGForLines.selectAll("line.connectionLine")
            .data(this.forceList.links)
            .join(enter => enter.append("line").classed("connectionLine", true),
                update => update,
                exit => exit.remove());

        return forceConnectionLine;
    }
    /**
     * Create and get d3.Selection representing the score on the link for node scoring.
     * @returns d3.Selection representing the line of connection
     */
    appendAndGetForceSVGScoringLinksG(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        const forceSVGScoringLinksG = this.svgScoringLinksG.selectAll(`g.${ConnectionViewer.ns}_ScoringLinkG`)
            .data(this.forceList.links)
            .join(enter => {
                const ScoringLinkG = enter
                    .append("g")
                    .classed(`${ConnectionViewer.ns}_ScoringLinkG`, true);
                ScoringLinkG
                    .append("use")
                    .attr("href", `#${ConnectionViewer.ns}_ScoringLinkRect`);
                ScoringLinkG
                    .append("text")
                    .classed(`${ConnectionViewer.ns}_ScoringLinkDistance`, true)
                    .attr("x", 0)
                    .attr("y", 3)
                    .attr("text-anchor", "middle")
                    .attr("font-size", "9pt")
                    .attr("fill", "yellow")
                    .attr("pointer-events", "none")
                    .text(d => d.scoringDistance ?? "");

                return ScoringLinkG;
            },
                update => update,
                exit => exit.remove());

        return forceSVGScoringLinksG;
    }
    /**
     * Create and get d3.Selection representing the description and mask of the connection.
     * Force the click event of <a> prepared outside SVG.
     * @returns d3.Selection representing the description of connection
     */
    appendAndGetForceConnectionDescriptionG(link: ICVSimulationLinkDatum): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        if (link.description && link.description.length > 0 && this.forceList.cdLinks.indexOf(link) < 0) {
            this.forceList.cdLinks.push(link);
        }

        const forceConnectionDescriptionG = this.svgGForConnectionDescriptions.selectAll("g.connectionDescriptionG")
            .data(this.forceList.cdLinks)
            .join(enter => {
                const connectionDescriptionG = enter
                    .append("g")
                    .classed("connectionDescriptionG", true);

                // Mask part
                connectionDescriptionG.append("rect")
                    .classed("connectionMask", true)
                    .attr("x", "0") // This value will be changed later.
                    .attr("y", "0") // This value will be changed later.
                    .attr("width", "100") // This value will be changed later.
                    .attr("height", "16"); // This value will be changed later.

                // Connection description part
                connectionDescriptionG.append("text")
                    .classed("connectionDescription", true)
                    .attr("id", (link) => "cd_" + link.id)
                    .attr("x", "0")
                    .attr("y", "4")
                    .attr("pointer-events", "visibleFill")
                    .attr("text-anchor", "middle")
                    .text((link) => link.connector.Description ?? "")
                    .call(d3drag.drag<SVGTextElement, ICVSimulationLinkDatum>()
                        .on("start", ConnectionViewer.forceGraph.connectionMaskToClickTouchPointerMouseStart)
                    )
                    .on("click", (event: PointerEvent) => {
                        event.preventDefault();
                        event.stopPropagation();
                    });

                // Adjust the position and size of the mask. Including processing getBBox() that can only be done after being appended once.
                this.setRectAttributesforConnectionDescription(connectionDescriptionG);

                return connectionDescriptionG;
            },
                update => update,
                exit => exit.remove());

        return forceConnectionDescriptionG;
    }
    /**
     * Set the attributes of Rect representing the mask corresponding to the description of the connection.
     * @param connectionDescriptionG g that represents the description of the connection, filtered by the data with the description of the connection, and processed by data().
     */
    setRectAttributesforConnectionDescription(connectionDescriptionG: d3selection.Selection<SVGGElement, ICVSimulationLinkDatum, SVGGElement, string>): void {
        connectionDescriptionG.each((link: ICVSimulationLinkDatum, index: number, groups: any) => {
            const rectElem = groups[index].querySelector("rect.connectionMask");
            const textElem = groups[index].querySelector("text.connectionDescription");

            if (rectElem && textElem) {
                const w = textElem.getBBox().width;
                const h = textElem.getBBox().height;
                rectElem.setAttribute("x", String(-w / 2));
                rectElem.setAttribute("y", String(-h / 2));
                rectElem.setAttribute("width", String(w));
                rectElem.setAttribute("height", String(h));
            }
        });
    }
    /**
     * Search this.forceList by ID and return the node.
     * @param prefixId {string} ID of Node. With prefix.
     * @returns Node that was searched and hit. Returns null if not hit.
     */
    findNode(prefixId: string): ICVSimulationNodeDatum | undefined {
        return this.forceList.nodes.find((d) => d.id == prefixId);
    }
    /**
     * Add a link (connection).
     * @param linkObj ID of the connection source, ID of the connection destination, LinkId of the DataverseLink instance, description of the connection, display name of the connection role 1, display name of the connection role 2
     */
    addLink(linkObj: {
        source: string;
        target: string;
        linkId: string;
        description: string | null;
        role1: string | null;
        role2: string | null;
        connector: ConnectorControl;
        dataverseLink: DataverseLink;
    }): void {
        var foundSource = this.findNode(ConnectionViewer.IDPrefix + linkObj.source);
        var foundTarget = this.findNode(ConnectionViewer.IDPrefix + linkObj.target);

        if (foundSource != null && foundTarget != null) {
            const link: ICVSimulationLinkDatum = {
                source: foundSource,
                target: foundTarget,
                id: linkObj.linkId, // This id continues to persist the LinkId of the originally specified DataverseLink when the link was created.
                description: linkObj.description, // This description may be changed later.
                role1: linkObj.role1, // This role1 may be changed later.
                role2: linkObj.role2, // This role2 may be changed later.
                connector: linkObj.connector,
                dataverseLinkArray: [linkObj.dataverseLink],
            };
            this.forceList.links.push(link);
            this.refreshForceLinkWhenAdded = this.refreshForceLinkWhenAdded.bind(this);
            this.refreshForceLinkWhenAdded(link);
        } else {
            console.error("in addLink()");
        }
    }
    /**
     * For a particular card, change the display of the "related connection data has been retrieved" state.
     * If the boolean argument is true, it will be displayed as retrieved, and if it is false, it will be displayed as not retrieved.
     * @param id {string} id of Dataverse record
     */
    connectionRetrieved(id: string, retrieved: boolean): void {
        if (d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard") != null) {
            if (retrieved) {
                d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard").select("text.cardToBeRetrieved").style("opacity", "0.0");
            } else {
                d3selection.select("g#" + ConnectionViewer.IDPrefix + id + ".circleCard").select("text.cardToBeRetrieved").style("opacity", "1.0");
            }
        }
    }
    /**
     * Returns information for drawing <text> of the connection role in the appropriate state.
     * The information is the position, the value of the text-anchor attribute, and the value of the alignment-baseline attribute.
     * The position is the position P where the connector line touches the round card.
     * For the other two attribute values, change them depending on which quadrant the position P is in from the center of the card.
     * @param r Radius of round card
     * @param X1 x position of connectionRole1 object
     * @param Y1 y position of connectionRole1 object
     * @param X2 x position of connectionRole2 object
     * @param Y2 y position of connectionRole2 object
     * @param reverse false if processing the role1 card, true if processing the role2 card
     * @returns An object containing the three values of position, text-anchor attribute, and alignment-baseline attribute
     */
    static UpdatePositionARole(
        r: number, X1: number, Y1: number, X2: number, Y2: number, reverse: boolean, _index?: number
    ): { "position": Point, "text-anchor": string, "dominant-baseline": string } {
        let position = new Point(0, 0);
        let textAnchor: string;
        let dominantBaseline: string;

        // Place the connector wire on the primary line y=ax+b
        // The coordinates are calculated with X1, Y1 as the center (0, 0).
        // If reverse = true, the coordinates are calculated with X2, Y2 as the center (0, 0).
        const dx = (!reverse) ? X2 - X1 : X1 - X2;
        const dy = (!reverse) ? Y2 - Y1 : Y1 - Y2;

        // The value of angle is -PI < angle <= PI
        const angle = Math.atan2(dy, dx);

        // position
        position.x = r * Math.cos(angle);
        position.y = r * Math.sin(angle);
        // Consider the center of the coordinates and move.
        position.x += (!reverse) ? X1 : X2;
        position.y += (!reverse) ? Y1 : Y2;

        // The other two
        // The quadrant is the mathematical position
        if (angle < - Math.PI / 2) {
            // Quadrant 2
            textAnchor = "end";
            dominantBaseline = "text-after-edge";
        } else if (angle < 0) {
            // Quadrant 1
            textAnchor = "start";
            dominantBaseline = "text-after-edge";
        } else if (angle < Math.PI / 2) {
            // Quadrant 4
            textAnchor = "start";
            dominantBaseline = "text-before-edge";
        } else {
            // Quadrant 3
            textAnchor = "end";
            dominantBaseline = "text-before-edge";
        }

        return { "position": position, "text-anchor": textAnchor, "dominant-baseline": dominantBaseline };
    }
    /**
     * Set the position of the canvas to the specified position.
     * Record the position in MyDragDropRect and set the actual drawing in MyDragDropG.
     */
    setCanvasPosition(x: number, y: number): void {
        const ns = ConnectionViewer.ns;
        // data-dragx and data-dragy are custom attributes for managing the x or y position of the drag. MyCanvasToDrag itself does not move.
        d3selection.select(`#${ns}_MyDragDropRect`)
            .attr("data-dragx", x)
            .attr("data-dragy", y);

        d3selection.select(`#${ns}_MyDragDropG`)
            .attr("transform", "translate(" + x + " " + y + ")");
    }
    /**
     * Get the current position of the canvas.
     * The default value is (0, 0).
     */
    getCanvasPosition(): Point {
        const ns = ConnectionViewer.ns;
        let x = parseInt(d3selection.select(`#${ns}_MyDragDropRect`).attr("data-dragx"));
        let y = parseInt(d3selection.select(`#${ns}_MyDragDropRect`).attr("data-dragy"));

        if (x && y) return new Point(x, y);
        else return new Point(0, 0);
    }
    /**
     * Initialize the process of dragging the canvas
     * Detect mouse operation drag & drop at MyDragDropRect and
     * the actual drawing is operated by transform of MyDragDropG.
     * If you press and hold (hold) without dragging, reset the movement of the canvas.
     */
    initCanvasToDrag(): void {
        let startedEventPosition: Point;
        let startedCanvasPosition: Point
        let startedTime: number;

        const started = function (this: SVGRectElement, event: any, d: unknown): void {
            startedEventPosition = new Point(event.x, event.y);
            startedCanvasPosition = ConnectionViewer.forceGraph.getCanvasPosition();
            startedTime = new Date().getTime();
        };
        const drag = function (this: SVGRectElement, event: any, d: unknown): void {
            let currentPosition = new Point(event.x, event.y);
            let diff = Point.diff(currentPosition, startedEventPosition);
            ConnectionViewer.forceGraph.setCanvasPosition(startedCanvasPosition.x + diff.x, startedCanvasPosition.y + diff.y);
        };
        const end = function (this: SVGRectElement, event: any, d: unknown): void {
            const currentTime = new Date().getTime();
            const delta = currentTime - startedTime;
            const dx = event.x - startedEventPosition.x;
            const dy = event.y - startedEventPosition.y;
            const holding_time = ForceGraph_CircleUI.HOLDING_TIME;
            const holding_distance = ForceGraph_CircleUI.HOLDING_DISTANCE;

            if (delta >= holding_time && dx * dx + dy * dy < holding_distance) {
                ConnectionViewer.forceGraph.setCanvasPosition(0, 0);
            }
        };

        // Perform drag processing on the area where the UI of the card and connection on the canvas is placed
        d3selection.select<SVGRectElement, unknown>(`#${ConnectionViewer.ns}_MyDragDropRect`)
            .call(d3drag.drag<SVGRectElement, unknown>()
                .on("start", started)
                .on("drag", drag)
                .on("end", end)
            );
    }
    /**
     * Do the processing that it was found that multiple DataverseLink instances are related to one link (connection).
     * Search for LinkId of DataverseLink passed as a parameter from the existing link group,
     * it is assumed that the DataverseLink specified when the link was created is passed.
     * @param dataverseLink {DataverseLink} DataverseLink instance
     */
    setMultipleDataverseConnetionFound(dataverseLink: DataverseLink): void {
        const link = this.forceList.links.find((link) => link.id === dataverseLink.LinkId);
        if (link) {
            link.description = dataverseLink.Connector!.Description;
            link.role1 = dataverseLink.Connector!.Role1;
            link.role2 = dataverseLink.Connector!.Role2;
            if (dataverseLink.Connector) link.connector = dataverseLink.Connector;

            // In some cases, you need to add a description UI. Duplicate checks are performed in appendAndGetForceConnectionDescriptionG().
            this.forceSelectionConnectionDescriptionG = this.appendAndGetForceConnectionDescriptionG(link);

            // Link description
            this.updateForceConnectionDescriptionG();
            this.updateForceConnectionRole1();
            this.updateForceConnectionRole2();
        }
    }
    /**
     * Update d3.Selection representing the description of the connection to the latest state.
     */
    updateForceConnectionDescriptionG(): void {
        // Connection description part
        this.svgGForConnectionDescriptions.selectAll("text.connectionDescription")
            .data(this.forceList.cdLinks)
            .text((link) => link.description);

        // Adjust the position and size of the mask
        const connectionDescriptionG = this.svgGForConnectionDescriptions
            .selectAll<SVGGElement, SVGGElement>("g.connectionDescriptionG")
            .data(this.forceList.cdLinks);
        this.setRectAttributesforConnectionDescription(connectionDescriptionG);
    }
    /**
     * Create and get d3.Selection representing connection 1.
     * @returns d3.Selection representing connection 1
     */
    appendAndGetForceConnectionRole1(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        let linkRole1HasTextList = this.forceList.links.filter((value, _index, _array) => {
            return value.role1;
        });
        let forceConnectionRole1 = this.svgGForConnectionRoles.selectAll("text.connectionRole1")
            .data(linkRole1HasTextList)
            .join(enter => enter.append("text")
                .classed("connectionRole1", true)
                .text(d => d.role1),
                update => update.text(d => d.role1),
                exit => exit.remove());

        return forceConnectionRole1;
    }
    /**
     * Update d3.Selection representing connection 1.
     * @returns d3.Selection representing connection 1
     */
    updateForceConnectionRole1(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        return this.appendAndGetForceConnectionRole1();
    }
    /**
     * Create and get d3.Selection representing connection 2.
     * @returns d3.Selection representing connection 2
     */
    appendAndGetForceConnectionRole2(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        let linkRole2HasTextList = this.forceList.links.filter((value, _index, _array) => {
            return value.role2;
        });
        let forceConnectionRole2 = this.svgGForConnectionRoles.selectAll("text.connectionRole2")
            .data(linkRole2HasTextList)
            .join(enter => enter.append("text")
                .classed("connectionRole2", true)
                .text(d => d.role2),
                update => update.text(d => d.role2),
                exit => exit.remove());

        return forceConnectionRole2;
    }
    /**
     * Update d3.Selection representing connection 2.
     * @returns d3.Selection representing connection 2
     */
    updateForceConnectionRole2(): d3selection.Selection<d3selection.BaseType, ICVSimulationLinkDatum, SVGGElement, string> {
        return this.appendAndGetForceConnectionRole2();
    }
    changeUISizeForForCards(): void {
        this.refreshWhenUpdate();
    }
    /**
     * Refresh the display when nodes and links are changed. Only existing d3 objects are handled.
     */
    refreshWhenUpdate(): void {
        try {
            const focusedPrefixedId = ConnectionViewer.IDPrefix + ConnectionViewer.forceGraph.currentFocusedCardID;
            const directlyConnectedPrefixedId: string[] = []; // Store the Id of the card that is directly connected to the card that is focused.
            const ns = ConnectionViewer.ns;

            for (const link of this.forceList.links) {
                if (link.source.id == focusedPrefixedId) {
                    directlyConnectedPrefixedId.push(link.target.id);
                } else if (link.target.id == focusedPrefixedId) {
                    directlyConnectedPrefixedId.push(link.source.id);
                }
            }

            // First, look at g.circleCard and give the flag "L" or "M" to d.
            if (ConnectionViewer.cv.config.SmallerSizeEnabled) {
                this.svgGForCards.selectAll("g.circleCard")
                    .data(this.forceList.nodes)
                    .each((d) => {
                        const prefixedId = d.id;
                        if (prefixedId == focusedPrefixedId || 0 <= directlyConnectedPrefixedId.indexOf(prefixedId)) {
                            // Focused card or card directly connected to the focused card
                            const previousSizeType = d.sizeType;
                            d.sizeType = "L";
                            d.radius = ForceGraph_CircleUI.radius_for_role_l;
                            if (previousSizeType != d.sizeType) d.sizeChanged = true;
                            else d.sizeChanged = false;
                        } else {
                            // Other cards
                            const previousSizeType = d.sizeType;
                            d.sizeType = "M";
                            d.radius = ForceGraph_CircleUI.radius_for_role_m;
                            if (previousSizeType != d.sizeType) d.sizeChanged = true;
                            else d.sizeChanged = false;
                        }
                    });
            }

            // Set SVG graphics for node scoring
            this.refreshWhenUpdateNodeScoring();

            if (ConnectionViewer.cv.config.SmallerSizeEnabled) {
                // Next, use.circleInCard
                this.svgGForCards.selectAll("g.circleCard > use.circleInCard")
                    .data(this.forceList.nodes)
                    .attr("href", (d) => {
                        // If there is no difference in the size of the card, CV_MyDefCircleL or CV_MyDefCircleM
                        // If there is a difference in the size of the card, CV_MyDefCircleMtoL or CV_MyDefCircleLtoM
                        if (d.sizeChanged) {
                            return (d.sizeType === "L") ? `#${ns}_MyDefCircleMtoL` : `#${ns}_MyDefCircleLtoM`;
                        } else {
                            return (d.sizeType === "L") ? `#${ns}_MyDefCircleL` : `#${ns}_MyDefCircleM`;
                        }
                    });

                // Make the size change an animation.
                const myEase = d3transition.transition().ease(easeExpInOut).duration(500);
                d3selection.select(`#${ns}_MyDefCircleLtoM`).attr("r", ForceGraph_CircleUI.radius_for_l);
                d3selection.select(`#${ns}_MyDefCircleMtoL`).attr("r", ForceGraph_CircleUI.radius_for_m);
                myEase.selection().select(`#${ns}_MyDefCircleLtoM`).transition().attr("r", ForceGraph_CircleUI.radius_for_m);
                myEase.selection().select(`#${ns}_MyDefCircleMtoL`).transition().attr("r", ForceGraph_CircleUI.radius_for_l);
            }

            // Next, image
            this.svgGForCards.selectAll("g.circleCard > image")
                .data(this.forceList.nodes)
                .attr("visibility", (d) => { return (d.sizeType === "L") ? "visible" : "collapse"; })
                .attr("cursor", d => !this.enableNodeScoring ? "move"
                    : (d.fixed && d.sizeType === "L") ?
                        (this.currentScoreSourceNode === d && !this.currentScoreInvalidated ?
                            `url(${ImageResources.ClearNodeScore32x32_png_url}) 0 0, move`
                            : `url(${ImageResources.CheckNodeScore32x32_png_url}) 0 0, move`)
                        : "move")
                .on("click", (event, d) => {
                    if (this.enableNodeScoring && d.fixed && d.sizeType === "L") this.calculateScoringNodesToggle(d);
                });
            // Next, text.nameInCard
            // Give information on how many lines text will fit in d.numberOfLines.
            const nodeNameInCard = this.svgGForCards.selectAll("g.circleCard > text.nameInCard")
                .data(this.forceList.nodes)
                .each((node) => {
                    node.numberOfLines = ForceGraph_CircleUI.getNumberOfLines(node.computedTextLength, node.sizeType);
                })
                .on("click", (event: PointerEvent, node: ICVSimulationNodeDatum) => {
                    if (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) {
                        ConnectionViewer.cv.OpenNewDataverseFormWindow(node.id.replace(ConnectionViewer.IDPrefix, ""), node.entityName);
                    }
                });

            // Processing of SVG Text
            nodeNameInCard.each((node, index, groups) => {
                if (node.numberOfLines === 1) {
                    // Processing of SVG Text that fits on one line
                    const elem: SVGTextElement | null = groups[index] as SVGTextElement;
                    if (!elem) return;
                    elem.setAttribute("x", "0");
                    elem.setAttribute("y", "4");
                    elem.setAttribute("text-decoration", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "underline" : "");
                    elem.setAttribute("cursor", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "pointer" : "move");
                    elem.setAttribute("text-anchor", "middle");
                    elem.textContent = node.name;
                    elem.querySelector("textPath")?.setAttribute("visibility", "collapse");
                } else {
                    // Processing of SVG Text with textPath that spans multiple lines
                    const elem: SVGTextElement | null = groups[index] as SVGTextElement;
                    if (!elem) return;
                    elem.setAttribute("x", "0");
                    elem.setAttribute("y", "0");
                    elem.setAttribute("text-decoration", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "underline" : "");
                    elem.setAttribute("cursor", (node.sizeType === "L" && node.id !== ConnectionViewer.IDPrefix + this.guidMainRecord) ? "pointer" : "move");
                    elem.setAttribute("text-anchor", "");
                    elem.textContent = "";
                    let textPathElem = elem.querySelector("textPath");
                    if (!textPathElem) {
                        textPathElem = document.createElementNS(SVG_NS, "textPath");
                        elem.appendChild(textPathElem);
                    }
                    textPathElem.setAttribute("href", `#${ns}_MyDefTextPath${node.sizeType}${node.numberOfLines}`); // One of the followings: "MyDefTextPathL2", "MyDefTextPathL3", "MyDefTextPathM2", "MyDefTextPathM3"
                    textPathElem.textContent = node.name;
                }
            });

            // Processing of "…"
            this.svgGForCards.selectAll("g.circleCard > text.cardToBeRetrieved")
                .data(this.forceList.nodes)
                .attr("y", (node) => { return (node.sizeType === "L") ? 43 : 27; });

            if (ForceGraph_CircleUI.DEBUG_NodeScoring) {
                // UI processing for cards for node scoring
                this.svgGForCards.selectAll(`text.${ConnectionViewer.ns}_ScoringDistance`)
                    .data(this.forceList.nodes)
                    .text(d => d.scoringDistance ?? "");
                this.svgGForCards.selectAll(`text.${ConnectionViewer.ns}_ScoringScore`)
                    .data(this.forceList.nodes)
                    .text(d => (d.scoringScore) ?
                        (d.scoringScore <= 2) ? d.scoringScore.toString().substring(0, 6) : d.scoringScore
                        : "");
                // UI processing for links for node scoring
                this.svgScoringLinksG.selectAll(`g.${ConnectionViewer.ns}_ScoringLinkG`)
                    .data(this.forceList.links)
                    .attr("transform", d => `translate(${(d.source.x! + d.target.x!) / 2}, ${(d.source.y! + d.target.y!) / 2})`);
                this.svgScoringLinksG.selectAll(`text.${ConnectionViewer.ns}_ScoringLinkDistance`)
                    .data(this.forceList.links)
                    .text(d => d.scoringDistance ?? "");
            }

            this.forceSimulation
                .force("link",
                    d3force.forceLink<ICVSimulationNodeDatum, ICVSimulationLinkDatum>(this.forceList.links)
                        .distance((link) => {
                            if (ConnectionViewer.cv.config.SmallerSizeEnabled) {
                                if (link.source.sizeType === "M" && link.target.sizeType === "M") return ForceGraph_CircleUI.CARD_DISTANCE_MM;
                                else if (link.source.sizeType === "L" && link.target.sizeType === "L") return ConnectionViewer.CARD_DISTANCE;
                                else return ForceGraph_CircleUI.CARD_DISTANCE_LM;
                            } else {
                                return ConnectionViewer.CARD_DISTANCE;
                            }
                        }));
        } catch (e: any) {
            console.error(`${e.message} in refreshWhenUpdate()`);
        }
    }
    /**
     * For the text object of SVG that displays the string to be displayed in the round card,
     * determine whether it fits on several lines on the display size and return the number of lines, but the meaning depends on the size.
     * For "L" size, return 1 or 2. 2 is returned to mean that 2 or more lines are required.
     * For "M" size, return 1 or 2 or 3. 3 is returned to mean that 3 or more lines are required.
     * @param size string A string representing the size of the card, assumed to be "L" or "M".
     */
    static getNumberOfLines(computedTextLength: number | null, size: string): number {
        if (!computedTextLength) computedTextLength = 1;
        if (size === "L") {
            return (computedTextLength < ForceGraph_CircleUI.SVG_TEXT_SINGLE_LINE_L_LENGTH) ? 1 : 2;
        } else if (size === "M" && computedTextLength < ForceGraph_CircleUI.SVG_TEXT_SINGLE_LINE_M2_LENGTH) {
            return 1;
        } else if (size === "M" && computedTextLength < ForceGraph_CircleUI.SVG_TEXT_SINGLE_LINE_M3_LENGTH) {
            return 2;
        } else if (size === "M") {
            return 3;
        } else {
            throw new Error("size '" + size + "' is not supported.");
        }
    }
    /**
     * For d3.Selection representing g elements that can click the description of the connector,
     * event listener at the start of touch operation
     */
    connectionMaskToClickTouchPointerMouseStart(this: SVGTextElement, event: any, link: ICVSimulationLinkDatum): void {
        event.sourceEvent.preventDefault();
        event.sourceEvent.stopPropagation();

        const connDescsContext: IConnDescsContext = {
            elementId: "cd_" + link.id,
            recordDisplayNameLeft: link.source.name,
            recordDisplayNameRight: link.target.name,
            entityDisplayNameLeft: ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName[link.source.entityName].DisplayName.UserLocalizedLabel.Label,
            entityDisplayNameRight: ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName[link.target.entityName].DisplayName.UserLocalizedLabel.Label,
            DVLinkArray: [],
        };
        for (const dvLink of link.dataverseLinkArray) {
            const r1 = (dvLink.Record1DisplayRoleName) ? dvLink.Record1DisplayRoleName : "⋅";
            const r2 = (dvLink.Record2DisplayRoleName) ? dvLink.Record2DisplayRoleName : "⋅";
            const desc = (dvLink.LinkType == DataverseLinkTypeEnum.ManyToMany) ? "(N:N relationship)" : dvLink.Description;

            const DVLink: IDVLink = {
                displayRoleNameLeft: r1,
                displayRoleNameRight: r2,
                description: desc ?? ""
            };
            connDescsContext.DVLinkArray.push(DVLink);
        }

        ConnectionViewer.cv.connDescsContext = connDescsContext;
        ConnectionViewer.cv.toggleIsCalloutVisible();
    }
    /**
     * Focus on a specific card. The argument is an id with a prefix.
     * If there is another card in the focus state, the process of unfocusing it is also performed.
     * @param prefixId id with a prefix.
     */
    focusACardControlById(prefixId: string): void {
        if (prefixId.indexOf(ConnectionViewer.IDPrefix) == 0) {
            const id = prefixId.substring(ConnectionViewer.IDPrefix.length, prefixId.length);

            // Do nothing if the same card is already focused.
            if (ConnectionViewer.forceGraph.currentFocusedCardID == id) return;

            // Find the corresponding DataverseRecord and focus its card control.
            const targetRecord = ConnectionViewer.cv.DataverseRecordArray.find((record) => record.Id == id);
            targetRecord!.Card.Focus();
        }
    }
    /**
     * Perform processing when the drawing size of the control is changed.
     */
    sizeChanged(): void {
        const ns = ConnectionViewer.ns;
        d3selection.selectAll(`#${ns}_MySVG,#${ns}_MyDragDropRect`)
            .style("width", "100%")
            .style("height", ConnectionViewer.cv.paramHeight + "px");

        const mysvg = document.getElementById(`${ns}_MySVG`);
        if (mysvg) {
            const centerX = mysvg.clientWidth / 2;
            const centerY = ConnectionViewer.cv.paramHeight / 2;

            this.setCanvasPosition(centerX, centerY);
        }

        this.forceTicked();
    }
    /**
     * Perform forceSimulation.on("tick" processing.
     */
    forceTicked(): void {
        this.forceSelectionNodeCard?.
            attr("transform", (node) => {
                return "translate(" + node.x + " " + node.y + ")";
            });
        this.forceSelectionConnectionLine?.
            attr("x1", function (d) { return d.source.x!; })
            .attr("y1", function (d) { return d.source.y!; })
            .attr("x2", function (d) { return d.target.x!; })
            .attr("y2", function (d) { return d.target.y!; })

        this.forceSelectionConnectionDescriptionG?.
            attr("transform", (link, _i) => {
                const x: number = (link.source.x! + link.target.x!) / 2;
                const y: number = (link.source.y! + link.target.y!) / 2;
                return (x && y) ? "translate(" + x + " " + y + ")" : null;
            });

        this.forceSelectionSVGScoringLinksG?.
            attr("transform", (d, _i) => {
                const x: number = (d.source.x! + d.target.x!) / 2;
                const y: number = (d.source.y! + d.target.y!) / 2;
                return (x && y) ? "translate(" + x + " " + y + ")" : null;
            });

        const roleEachFunc = (datum: any, index: number, groups: any, reverse: boolean) => {
            const textElem: any = groups[index];
            if (datum.source.x != undefined && datum.source.y != undefined && datum.target.x != undefined && datum.target.y != undefined) {
                // The return value of UpdatePositionARole is an object
                // { "position": Point, "text-anchor": string, "alignment-baseline": string }
                const obj = ForceGraph_CircleUI.UpdatePositionARole(
                    (!reverse) ? datum.source.radius : datum.target.radius
                    , datum.source.x
                    , datum.source.y
                    , datum.target.x
                    , datum.target.y
                    , reverse, index);
                textElem.setAttribute("text-anchor", obj["text-anchor"]);
                textElem.setAttribute("dominant-baseline", obj["dominant-baseline"]);
                textElem.setAttribute("x", obj.position.x);
                textElem.setAttribute("y", obj.position.y);
            }
        };

        this.forceSelectionConnectionRole1?.
            each((datum, index, groups) => roleEachFunc(datum, index, groups, false));

        this.forceSelectionConnectionRole2?.
            each((datum, index, groups) => roleEachFunc(datum, index, groups, true));
    }
    /**
     * Turn on or off the d3 force behavior for the specified card.
     */
    cardToggleFixed(node: ICVSimulationNodeDatum): void {
        const ns = ConnectionViewer.ns;
        const circleInCard = this.forceSelectionNodeCard.select(`g#${node.id} .circleInCard`);
        circleInCard.each((datum: ICVSimulationNodeDatum, index, group) => {
            if (datum.fixed) this.cardFixedOrRelease(node, false);
            else this.cardFixedOrRelease(node, true);
        });
    }
    /**
     * Fix or do not fix the d3 force behavior for the specified card.
     */
    cardFixedOrRelease(node: ICVSimulationNodeDatum, toFiex: boolean): void {
        const ns = ConnectionViewer.ns;
        const circleInCard = this.forceSelectionNodeCard.select(`g#${node.id} .circleInCard`);
        if (toFiex) {
            circleInCard.attr("filter", `url(#${ns}_MyDefDropShadow)`);
            node.fixed = true;
            node.fx = node.x;
            node.fy = node.y;
        } else {
            circleInCard.attr("filter", "");
            node.fx = null;
            node.fy = null;
            node.fixed = false;
        }

        // It is necessary to change the cursor of image in the card, so it is necessary to call.
        this.refreshWhenUpdate();
    }
    /**
     * Drag processing starts. In fact, even if there is no movement of the position, this process runs even with just a mouse click.
     * dragstarted()
     * dragged()
     * dragended()
     * Hold down (hold) the card for a certain period of time, and perform processing related to fixing the card in this drag processing.
     * If you hold it for a certain period of time and move it a certain distance, the card will be fixed during dragging.
     * If you hold it for a certain period of time and do not move it a certain distance, the card's fixed mode will be toggled when dragging ends.
     */
    dragstarted(this: SVGGElement, event: any, node: ICVSimulationNodeDatum): void {
        node.x = node.fx = event.x;
        node.y = node.fy = event.y;

        ConnectionViewer.forceGraph.touchPointerMouseStarted = new Date().getTime();
        const circleCardElem = this.closest(".circleCard") as SVGGElement;
        const prefixId = circleCardElem.id;

        if (!prefixId) return;

        // If the element has not yet been processed by other events.
        if (!ConnectionViewer.forceGraph.currentEventElem) {
            ConnectionViewer.forceGraph.currentEventElem = circleCardElem;
            ConnectionViewer.forceGraph.dragStartedPoint = new Point(<number>node.x, <number>node.y);
            ConnectionViewer.forceGraph.focusACardControlById(prefixId);
        }

        ConnectionViewer.cv.emitter.emit(EventEnum.CardClick, node);
    }
    dragged(this: SVGGElement, event: any, node: ICVSimulationNodeDatum): void {
        node.x = node.fx = event.x;
        node.y = node.fy = event.y;
        ConnectionViewer.forceGraph.forceTicked(); // Since this cannot be used normally, using ConnectionViewer.forceGraph.

        const current = new Date().getTime();
        const started = ConnectionViewer.forceGraph.touchPointerMouseStarted;
        if (started && node.x && node.y) {
            const delta = current - started;
            var dx = node.x - ConnectionViewer.forceGraph.dragStartedPoint.x;
            var dy = node.y - ConnectionViewer.forceGraph.dragStartedPoint.y;
            const holding_time = ForceGraph_CircleUI.HOLDING_TIME;
            const holding_distance = ForceGraph_CircleUI.HOLDING_DISTANCE;
            // If you hold it for more than ForceGraph_CircleUI.HOLDING_TIME (1 second, etc.)
            // and move it more than ForceGraph_CircleUI.HOLDING_DISTANCE (the sum of squares is 100, that is, 10px in distance, etc.),
            // the card is fixed mode.
            if (delta >= holding_time && dx * dx + dy * dy >= holding_distance) {
                ConnectionViewer.forceGraph.cardFixedOrRelease(node, true);
            }

            ConnectionViewer.forceGraph.frontDummyCard = ConnectionViewer.forceGraph.cloneToFrontDummyCard(this, node.id);
        }
    }
    dragended(this: SVGGElement, event: any, node: ICVSimulationNodeDatum): void {
        ConnectionViewer.forceGraph.removeFrontDummyCard();
        ConnectionViewer.forceGraph.frontDummyCard = null;

        if (!node.fixed) {
            // If the card is not fixed, turn off the fix when the drag ends.
            // Note that even fixed cards can be dragged.
            node.fx = null;
            node.fy = null;
        }
        const current = new Date().getTime();
        const started = ConnectionViewer.forceGraph.touchPointerMouseStarted;
        if (started && node.x && node.y) {
            const delta = current - started;
            const dx = node.x - ConnectionViewer.forceGraph.dragStartedPoint.x;
            const dy = node.y - ConnectionViewer.forceGraph.dragStartedPoint.y;
            // If you hold it for a certain period of time (1 second, etc.)
            if (delta >= ForceGraph_CircleUI.HOLDING_TIME && dx * dx + dy * dy < 100) {
                ConnectionViewer.forceGraph.cardToggleFixed(node);
            }
        }
        ConnectionViewer.forceGraph.currentEventElem = null;
        // If alpha 1 is specified, the simulation will start again from the previous state.
        // If alpha 0.1 is specified, a small behavior that can confirm that an event has occurred.
        ConnectionViewer.forceGraph.forceSimulation.alpha(0.1).restart(); // Since this cannot be used normally, using ConnectionViewer.forceGraph.
    }
    /**
     * When dragging a card, create a dummy card with the same appearance as the original card and display it in the foreground.
     * Clone the original card each time you start dragging and move it, and display it in the foreground.
     * Related to removeFrontDummyCard().
     * @param svgGElem SVG element of the original card
     * @param nodeId nodeId of the original card
     */
    cloneToFrontDummyCard(svgGElem: SVGGElement, nodeId: string): SVGGElement {
        const frontDummyCard = svgGElem.cloneNode(true) as SVGGElement;

        frontDummyCard.id = "dummy_" + nodeId; // example: "dummy_id0083f907-720f-e711-80e8-480fcff29761" which has "id".
        frontDummyCard.style.pointerEvents = "none";
        frontDummyCard.classList.remove("circleCard");
        frontDummyCard.classList.add("dummyCard");
        // Remove the shadow. If you don't, it will overlap and get darker.
        frontDummyCard.querySelector("use.circleInCard")?.setAttribute("filter", "");

        d3selection.select(`g#${frontDummyCard.id}`).remove();
        ConnectionViewer.forceGraph.svgGForCards.append(() => frontDummyCard);

        return frontDummyCard;
    }
    /**
     * When the card drags it ends, delete the dummy card that was displayed in the foreground.
     * Related to removeFrontDummyCard().
     */
    removeFrontDummyCard(): void {
        ConnectionViewer.forceGraph.svgGForCards.selectAll("g.dummyCard").remove();
    }
    /**
     * Find a link in forceList.links with the specified dataverseLink Id.
     * At most, only one should be found.
     */
    findDataverseLink(dataverseLinkId: string): ICVSimulationLinkDatum | undefined {
        return this.forceList.links.find((link) => {
            return link.dataverseLinkArray.find((dvLink) => dvLink.LinkId === dataverseLinkId);
        });
    }
    /**
     * If a link containing dvLink1 already exists in forctList.links,
     * Add dvLink2 to the same link as dvLink1.
     */
    addDataverseLink(dvLink1: DataverseLink, dvLink2: DataverseLink) {
        const forceLink4dvLink1 = this.findDataverseLink(dvLink1.LinkId);
        if (forceLink4dvLink1) forceLink4dvLink1.dataverseLinkArray.push(dvLink2);
    }
    /**
     * Receive the score source node, calculate the overall score, and reflect it in this.forceList.
     * If scoring has already been done with the same source node,
     * and if the score has not become the past due to adding cards, etc., cancel the scoring.
     */
    calculateScoringNodesToggle(scoreSourceNode: ICVSimulationNodeDatum): void {
        if (this.currentScoreSourceNode === scoreSourceNode && !this.currentScoreInvalidated) {
            // Turning off scoring
            this.currentScoreSourceNode = null;
            this.currentNodesScore = null;
            this.resetScoreSourceNodeSVG(null);
        } else {
            // Turning on scoring
            this.currentScoreSourceNode = scoreSourceNode;
            this.currentScoreInvalidated = false;

            this.currentNodesScore = NodeScoring202309.calculateAllNodesScore(scoreSourceNode.id, this.forceList);
            this.resetScoreSourceNodeSVG(scoreSourceNode);
        }
        this.refreshWhenUpdate();
    }
    /**
     * Receive the Id of the score source node, forcibly calculate the overall score again, and reflect it in this.forceList.
     */
    forceScoringNodesById(sourceNodeId: string): void {
        if (this.enableNodeScoring) {
            const scoreSourceNode = this.findNode(sourceNodeId);
            if (scoreSourceNode) {
                this.currentScoreSourceNode = scoreSourceNode;
                this.currentScoreInvalidated = false;

                this.currentNodesScore = NodeScoring202309.calculateAllNodesScore(scoreSourceNode.id, this.forceList);
                this.resetScoreSourceNodeSVG(scoreSourceNode);
                this.refreshWhenUpdate();
            }
        }
    }
    /**
     * Set the SVG graphics of the score source node.
     * Note that the graphics of the previous node are deleted just before that.
     * If null is received, just delete it.
     */
    resetScoreSourceNodeSVG(scoreSourceNode: ICVSimulationNodeDatum | null): void {
        const ns = ConnectionViewer.ns;
        this.svgGForCards.selectAll(`.${ns}_circleScoringSource`).remove();

        if (scoreSourceNode) {
            this.svgGForCards.select(`g.circleCard#${scoreSourceNode.id} g.${ns}_NodeScoringG`)
                .append("use")
                .classed(`${ns}_circleScoringSource`, true)
                .attr("href", `#${ns}_MyDefCircleScoringSourceL`) // Not 'xlink:href'
                .attr("stroke", `url(#${ConnectionViewer.ns}_LG_${scoreSourceNode.entityName})`);
        }
    }
    /**
     * Called from refreshWhenUpdate(), set the node scoring SVG graphics.
     */
    refreshWhenUpdateNodeScoring(): void {
        const ns = ConnectionViewer.ns;
        // Update graphics for score source nodes.
        // Additions and deletions are handled by resetScoreSourceNodeSVG().
        this.svgGForCards.select(`g.circleCard#${this.currentScoreSourceNode?.id} use.${ns}_circleScoringSource`)
            .attr("href", () => {
                // If there is no difference in card size, _MyDefCircleScoringSourceL or _MyDefCircleScoringSourceM
                // If there is a difference in the size of the card, _MyDefCircleScoringSourceMtoL or _MyDefCircleScoringSourceLtoM
                if (this.currentScoreSourceNode?.sizeChanged) {
                    if (!this.currentScoreInvalidated)
                        return (this.currentScoreSourceNode?.sizeType === "L") ? `#${ns}_MyDefCircleScoringSourceMtoL` : `#${ns}_MyDefCircleScoringSourceLtoM`;
                    else
                        return (this.currentScoreSourceNode?.sizeType === "L") ? `#${ns}_MyDefCircleScoringSourceMtoLAttention` : `#${ns}_MyDefCircleScoringSourceLtoMAttention`;
                } else {
                    if (!this.currentScoreInvalidated)
                        return (this.currentScoreSourceNode?.sizeType === "L") ? `#${ns}_MyDefCircleScoringSourceL` : `#${ns}_MyDefCircleScoringSourceM`;
                    else
                        return (this.currentScoreSourceNode?.sizeType === "L") ? `#${ns}_MyDefCircleScoringSourceLAttention` : `#${ns}_MyDefCircleScoringSourceMAttention`;
                }
            });
        // Animate the change in the size of the score source node
        const myEase = d3transition.transition().ease(easeExpInOut).duration(500);
        if (!this.currentScoreInvalidated) {
            d3selection.select(`#${ns}_MyDefCircleScoringSourceLtoM`).attr("r", ForceGraph_CircleUI.radius_for_l + 8);
            d3selection.select(`#${ns}_MyDefCircleScoringSourceMtoL`).attr("r", ForceGraph_CircleUI.radius_for_m + 8);
            myEase.selection().select(`#${ns}_MyDefCircleScoringSourceLtoM`).transition().attr("r", ForceGraph_CircleUI.radius_for_m + 8);
            myEase.selection().select(`#${ns}_MyDefCircleScoringSourceMtoL`).transition().attr("r", ForceGraph_CircleUI.radius_for_l + 8);
        } else {
            d3selection.select(`#${ns}_MyDefCircleScoringSourceLtoMAttention`).attr("r", ForceGraph_CircleUI.radius_for_l + 8);
            d3selection.select(`#${ns}_MyDefCircleScoringSourceMtoLAttention`).attr("r", ForceGraph_CircleUI.radius_for_m + 8);
            myEase.selection().select(`#${ns}_MyDefCircleScoringSourceLtoMAttention`).transition().attr("r", ForceGraph_CircleUI.radius_for_m + 8);
            myEase.selection().select(`#${ns}_MyDefCircleScoringSourceMtoLAttention`).transition().attr("r", ForceGraph_CircleUI.radius_for_l + 8);
        }

        // Graphics for target nodes 1 of 2
        this.svgGForCards.selectAll("g.circleCard circle.scoreCircleNomal")
            .data(this.forceList.nodes)
            .attr("visibility", d => this.currentScoreSourceNode && d.id !== this.currentScoreSourceNode.id && d.scoringScore && d.scoringScore >= NodeScoring202309.IGNORING_SCORE ? "visible" : "collapse")
            .attr("stroke-width", d => !d.scoringScore ? 0 : ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!))
            .attr("r", d => !d.scoringScore ? 0 : d.sizeType === "L" ?
                ForceGraph_CircleUI.radius_for_role_l + (ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!)) / 2
                : ForceGraph_CircleUI.radius_for_role_m + (ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!)) / 2);
        // Graphics for target nodes 2 of 2
        this.svgGForCards.selectAll("g.circleCard circle.scoreCircleHigh")
            .data(this.forceList.nodes)
            .attr("visibility", (d) => {
                if (!this.currentScoreSourceNode || d.id === this.currentScoreSourceNode.id || (d.scoringScore && d.scoringScore < NodeScoring202309.IGNORING_SCORE))
                    return "collapse";
                else
                    // visible if the standard score for that node's distance is exceeded
                    return (d.scoringScore && d.scoringScore > NodeScoring202309.SOURCE_NODE_SCORE * Math.pow(NodeScoring202309.NEIGHBOURHOOD_RATE, d.scoringDistance!) ? "visible" : "collapse");
            })
            .attr("stroke-width", d => !d.scoringScore ? 0 : ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!))
            .attr("r", d => !d.scoringScore ? 0 : d.sizeType === "L" ?
                ForceGraph_CircleUI.radius_for_role_l + (ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!)) / 2
                : ForceGraph_CircleUI.radius_for_role_m + (ForceGraph_CircleUI.getStrokeWidth(d.scoringScore!)) / 2);

    }
    /**
     * This function is a function that is valid only in the local environment during development.
     * In online model-driven apps, the hidden parameters are removed from the URL and the form is displayed.
     * Check the hidden parameter "CV_DEBUG_NodeScoring" for DEBUG_NodeScoring from the page URL,
     * If there is a parameter, it is converted to a logical value (boolean) by considering it as a number and returns the value.
     * If you want to specify false, it is better to specify CV_DEBUG_NodeScoring = 0.
     * If you want to specify true, it is better to specify CV_DEBUG_NodeScoring = 1 as an example.
     * If there is no parameter or if it cannot be converted to a number, undefined is returned.
     */
    static checkAndGetDEBUG_NodeScoringFromLocation(): boolean | undefined {
        const string_DEBUG_NodeScoring = new URLSearchParams(document.location.search).get("CV_DEBUG_NodeScoring");
        if (string_DEBUG_NodeScoring === null) return undefined;

        const number_DEBUG_NodeScoring = Number(string_DEBUG_NodeScoring);
        if (!isNaN(number_DEBUG_NodeScoring)) return (number_DEBUG_NodeScoring) ? true : false;
        else return undefined;
    }
    /**
     * Calculate the stroke-width to be displayed as graphics from the score.
     * This is a straight line with a score of 1 when score = 0.1 and a score of 25 when score = 2.
     */
    static getStrokeWidth(score: number): number {
        return 1 + (score - 0.1) * 12.632;
    }
    expandCards(sourceNodeId: string, maxDistance: number): void {
        if (!this.cardsExpander) this.cardsExpander = new ForceGraphCardsExpander(ConnectionViewer.cv, this);
        this.cardsExpander.initiateExpand(sourceNodeId, maxDistance);
    }
}
