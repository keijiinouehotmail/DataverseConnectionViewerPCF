import * as React from "react";
import * as d3selection from 'd3-selection';
import chroma = require("chroma-js");
import { EventEmitter2 } from "eventemitter2";
import { ReactRoot, IReactRootProps } from "./components/ReactRoot";
import { DataverseRecord } from "./api/DataverseRecord";
import { ForceGraph_CircleUI } from "./api/ForceGraph_CircleUI";
import { DataverseLink } from "./api/DataverseLink";
import { Config } from "./api/Config";
import { ConfigSet } from "./api/ConfigSet";
import { CardsLayoutManager } from "./api/CardsLayoutManager";
import { Helper } from "./api/Helper";
import { WebAPIRecord } from "./api/WebAPIRecord";
import { CardControl } from "./api/CardControl";
import { IConnDescsContext } from "./components/ReactConnDescs";
import { NonReactDiv } from "./api/NonReactDiv";
import { DataverseIconsHelper } from "./api/DataverseIconsHelper";
import { AzureOAIGPTStreamService } from "./services/AzureOAIGPTStreamService";
import { DataverseAccessWebAPI } from "./services/DataverseAccessWebAPI";
import { WebAPI } from "./services/WebAPIHelper";
import { IInputs, IOutputs } from "../generated/ManifestTypes";
import { StringHelper } from "./api/StringHelper";
import { SampleDemo_Data_en } from "./api/SampleDemo_Data_en";

// /**
//  * The root class of DataverseConnectionViewerPCF.
//  * Visualizes data of connections within Dataverse.
//  * Uses D3.js force layout, Fluent UI React.
//  */
export class ConnectionViewer implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    public static readonly ns = "CV"; // namespace of this class to align the namespace attribute in ControlManifest.Input.xml
    public static readonly IDPrefix = "id" // Prefix string for dealing with any id. id in d3 might have to be string which does not start with number charasters.
    /**
     * Instance of ConnectionViewer
     */
    private static _cv: ConnectionViewer;
    /**
     * Getter for instance of ConnectionViewer
     */
    public static get cv(): ConnectionViewer { return ConnectionViewer._cv; }
    /**
     * Instance of ForceGraph_CircleUI
     * Managing an object which is expressed by mechanics model.
     * Using D3.js force layout. Declaring here because thsi cannot be called in 'on' event of d3 if this is declared in the instance of ConnectionViewer
     */
    public static forceGraph: ForceGraph_CircleUI;
    /**
     * context of this PCF control
     */
    _context: ComponentFramework.Context<IInputs>;
    /**
     * Shortcut for getting string resource
     */
    public resStr(id: string): string {
        return this.stringHelper?.getString(id) ?? id;
    }

    /**
    * Distance between cards
    */
    static CARD_DISTANCE = 180;
    /**
     * Default height when height is not specified from property of this control
     */
    static DEFAULT_HEIGHT = 500;
    /**
    * ConfigSet
    */
    configSet: ConfigSet;
    /**
    * The currently selected configuration. It can be changed in the user settings.
    * 
    */
    config: Config;
    /**
    * Whether this is in sample demo mode or not.
    */
    IS_DEMO_MODE: boolean;
    /**
     * Array of records from Dataverse which were already retrieved
     */
    DataverseRecordArray: DataverseRecord[];
    /**
     * Array of links from Dataverse which were already retrieved
     */
    dataverseLinkArray: DataverseLink[];
    /**
     * Instance of DataverseAccessWebAPI
     */
    dataverseAccess: DataverseAccessWebAPI;
    /**
     * Instance of CardsLayoutManager
     */
    clm: CardsLayoutManager;
    /**
    * Entity logical name of the entity record which this viewer is working on. One of the parameters passed from Dataverse form, etc.
    * Stored in lowercase.
    */
    paramEntityLogicalName: string;
    /**
    * Guid of the entity record which this viewer is working on. One of the parameters passed from Dataverse form, etc.
    * Stored in lowercase.
    */
    paramGuid: string;
    /**
     * Height in which this control will be renderd
     */
    paramHeight: number;
    /**
     * Array of config. This represents ConfigSet.
     */
    paramConfigSet: string;
    /**
     * Whether to enable node scoring feature or not.
     */
    paramEnableNodeScoring: boolean;
    /**
     * Azure Open AI API Key
     */
    paramAzureOpenAIAPIKey: string;
    /**
     * Azure Open AI API Endpoint URL
     */
    paramAzureOpenAIAPIEndpointURL: string;
    /**
     * A div for non React UI. This is a part of thic PCF control.
     */
    nonReactDiv: HTMLDivElement;
    /**
     * A div for showing that this control is currently retrieving data from Dataverse.
     */
    spinnerDiv: HTMLDivElement;
    /**
     * Data for displaying connection description in Callout
     */
    public connDescsContext: IConnDescsContext;
    /**
     * Function for toggling visibility of Callout for connection description
     */
    public toggleIsCalloutVisible: () => void;
    /**
    * Array of entity logical names (lowercase) which are already shown in the legend area.
    */
    legendAlreadyShownEntityLogicalNameArray: string[];
    /**
    * Whether this is in replaying of cards layout or not.
    */
    IS_CardsLaout_Replaying: boolean;
    /**
    * Cache of entity metadata. Dictionary.
    * Key is entity logical name (lowercase).
    * Value is entity metadata.
    */
    EntityMetadataCacheKeyIsEntityLogicalName: { [key: string]: WebAPI.entityMetadataInterface };
    /**
    * Cache of entity metadata. Dictionary.
    * Key is entity ObjectTypeCode (number).
    * Value is entity metadata.
    */
    EntityMetadataCacheKeyIsObjectTypeCode: { [key: number]: WebAPI.entityMetadataInterface };
    /**
    * Cache for finding entity logical name from entity set name. Dictionary.
    * Key is entity set name (lowercase).
    * Value is entity logical name.
    */
    EntityLogicalNameKeyIsEntitySetName: { [key: string]: string };
    /**
    * Cache of OneToManyRelationshipMetadata. Dictionary.
    * OneToManyRelationshipMetadata handles both OneToMany and ManyToOne as metadata.
    * Key is SchemaName of OneToManyRelationshipMetadata (case sensitive).
    * Value is OneToManyRelationshipMetadata.
    */
    OneToManyRelationshipMetadataCache: { [key: string]: WebAPI.OTMRelationshipInterface };
    /**
    * Cache of ManyToManyRelationshipMetadata. Dictionary.
    * Key is SchemaName of ManyToManyRelationshipMetadata (case sensitive).
    * Value is ManyToManyRelationshipMetadata.
    */
    ManyToManyRelationshipMetadataCache: { [key: string]: WebAPI.MTMRelationshipInterface };
    /**
    * Cache of RelationshipMetadata between annotation entity and main card entity for CardsLayout.
    * Value is ManyToManyRelationshipMetadata.
    */
    AnnotationRelationshipMetadataCache: WebAPI.OTMRelationshipInterface;
    /**
    * Cache of AttributeMetadata. Dictionary.
    * Key is entity logical name (lowercase).
    * Value is another dictionary. Key is attribute logical name (lowercase). Value is AttributeMetadata.
    */
    AttributeMetadataCache: { [key: string]: { [key: string]: WebAPI.attributeMetadataInterface } };
    /**
     * Whether initCVPromise() is done or not.
     */
    private initCVPromiseDone = false;
    /**
     * Instance of AOAI GPT API for stream
     */
    private aoaiGPTStreamService: AzureOAIGPTStreamService;
    /**
     * Instance of EventEmitter2 for receiving SVG events and passing them to React
     */
    emitter: EventEmitter2;
    /**
     * Instance of StringHelper
     */
    stringHelper: StringHelper;
    /**
     * Language ID to show. 1041 for Japanese, 1033 for English.
     * Currently, all cases other than 1041 are set to 1033.
     */
    languageIdToShow: number;
    /**
     * constructor() -> init() -> updateView()
     */
    constructor() {
        ConnectionViewer._cv = this;
        this.receiveNonReactDiv = this.receiveNonReactDiv.bind(this);
        this.resetConnectionViewer = this.resetConnectionViewer.bind(this);
        this.receiveSpinnerDiv = this.receiveSpinnerDiv.bind(this);
        this.emitter = new EventEmitter2();
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        // this.notifyOutputChanged = notifyOutputChanged;
        // console.log("in init() of ConnectionViewer class v1.0.1.8");

        this._context = context;
        // In the new record creation screen, etc., it should be undefined.
        if (!context.parameters.entityId.raw) return;
        // Currently, all cases other than 1041 (Japanese) are set to 1033 (English).
        this.languageIdToShow = (context.userSettings.languageId === 1041) ? 1041 : 1033;
        this.stringHelper = new StringHelper(context.userSettings.languageId);
        this.IS_DEMO_MODE = context.parameters.demo.raw ? true : false;
        this.paramGuid = (this.IS_DEMO_MODE) ? SampleDemo_Data_en.Guid : (context.parameters.entityId.raw as string).toLowerCase();
        this.paramEntityLogicalName = (this.IS_DEMO_MODE) ? SampleDemo_Data_en.EntityLogicalName : (context.parameters.entityName.raw as string).toLowerCase();
        this.paramHeight = (context.parameters.height.raw) ? context.parameters.height.raw as number : ConnectionViewer.DEFAULT_HEIGHT;
        this.paramConfigSet = context.parameters.configSet?.raw! as string;
        this.paramEnableNodeScoring = context.parameters.enableNodeScoring.raw ? true : false;
        this.paramAzureOpenAIAPIKey = context.parameters.AzureOpenAIAPIKey?.raw! as string;
        this.paramAzureOpenAIAPIEndpointURL = context.parameters.AzureOpenAIAPIEndpointURL?.raw! as string;
        if (this.paramAzureOpenAIAPIKey && this.paramAzureOpenAIAPIEndpointURL) {
            this.aoaiGPTStreamService = new AzureOAIGPTStreamService(this.paramAzureOpenAIAPIKey, this.paramAzureOpenAIAPIEndpointURL);
        }

        this.DataverseRecordArray = [];
        this.dataverseLinkArray = [];
        this.dataverseAccess = new DataverseAccessWebAPI(this);
        this.clm = new CardsLayoutManager();
        context.mode.trackContainerResize(true);
    }
    private notifyOutputChanged(): void {
        // console.log("in notifyOutputChanged()");
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        // In the new record creation screen, etc., it should be undefined.
        if (!context.parameters.entityId.raw) {
            return React.createElement("div", null);
        }

        if (this.initCVPromiseDone) setTimeout(() => {
            ConnectionViewer.forceGraph!.sizeChanged();
        }, 100);

        const props: IReactRootProps = {
            height: this.paramHeight,
            ns: ConnectionViewer.ns,
            userLanguageId: this._context.userSettings.languageId,
            aoaiGPTStreamService: this.aoaiGPTStreamService,
            receiveNonReactDiv: this.receiveNonReactDiv,
            receiveSpinnerDiv: this.receiveSpinnerDiv,
            emitter: this.emitter,
        };

        return React.createElement(
            ReactRoot, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        // console.log('in getOutputs()');
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    /**
     * Initialization for Connection Viewer
     * @param annotationId guid of annotation record for replaying cards layout
     */
    private initCVPromise(annotationId?: string): Promise<void> {
        return new Promise<void>((resolve) => {
            try {
                this.IS_CardsLaout_Replaying = annotationId ? true : false;

                if (this.paramEntityLogicalName && this.paramGuid) {
                    const userLanguageId = this._context.userSettings.languageId;
                    try {
                        if (!this.paramConfigSet || this.paramConfigSet.length === 0 || this.paramConfigSet === "val") { // "val" is a default value in developing PCF control
                            ConnectionViewer.cv.configSet = ConfigSet.getHardcodedConfigSet(userLanguageId);
                        }
                        else
                            ConnectionViewer.cv.configSet = ConfigSet.getConfigSetFromParameter(this.paramConfigSet);
                    } catch (e: any) {
                        Helper.addErrorMessageln(`Error in ConfigSet.getConfigSetFromParameter(). ${e.message}. Using hardcoded ConfigSet in initCVPromise()`);
                        ConnectionViewer.cv.configSet = ConfigSet.getHardcodedConfigSet(userLanguageId);
                    }
                    ConnectionViewer.cv.config = Config.initConfigWithOptions(userLanguageId, ConnectionViewer.cv.configSet);
                    ConnectionViewer.forceGraph = new ForceGraph_CircleUI(
                        `#${ConnectionViewer.ns}_MySVGCards`,
                        `#${ConnectionViewer.ns}_MySVGLines`,
                        `#${ConnectionViewer.ns}_MySVGConnectionDescriptions`,
                        `#${ConnectionViewer.ns}_MySVGConnectionRoles`,
                        `#${ConnectionViewer.ns}_SVGScoringLinksG`,
                        this.paramEnableNodeScoring,
                        this.paramGuid,
                    );

                    if (ConnectionViewer.cv.config == null) {
                        Helper.addErrorMessageln("Error in Config.initConfigAndOptions(). You may be able to solve this problem by selecting ConfigSet again in options.");
                    }

                    const myPromise = new Promise<WebAPIRecord>(this.dataverseAccess.initDataverseAccessExecutor);
                    myPromise
                        .then((record: WebAPIRecord) => {
                            return ConnectionViewer.cv.clm.initCardsLayoutReplayPromise(record, annotationId);
                        })
                        .then((recordAndExistCardLayout: { record: WebAPIRecord; existCardLayout: boolean }) => {
                            ConnectionViewer.cv.initialDataverseRecordRetrieved(recordAndExistCardLayout.record);
                            resolve(); // This is for whole initCVPromise()
                        }).catch((e) => {
                            Helper.addErrorMessageln(e.toString() + " in inner of initCVPromise()");
                            ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
                        });
                } else {
                    Helper.addErrorMessageln("Either Entity Name or Entity Id is not specified in PCF control property. in initCVPromise()");
                }

                this.initCVPromiseDone = true;
            } catch (e: any) {
                Helper.addErrorMessageln(e.message + " in initCVPromise()");
                ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
            }
        });
    }
    /**
     * Initialize non React processes.
     */
    private async initNonReact(nonReactDiv: HTMLDivElement, annotationId?: string) {
        // Delete all existing child elements
        while (nonReactDiv.lastChild) nonReactDiv.removeChild(nonReactDiv.lastChild);

        // Add new child elements
        NonReactDiv.appendChildren(nonReactDiv);
        nonReactDiv.style.height = this.paramHeight + "px";
        this.nonReactDiv = nonReactDiv;

        await this.initCVPromise(annotationId);

        ConnectionViewer.preventSafariTouchScroll();
    }
    /**
     * 
     */
    private async receiveNonReactDiv(nonReactDiv: HTMLDivElement) {
        await this.initNonReact(nonReactDiv);
    }
    /**
     * 
     */
    private async receiveSpinnerDiv(spinnerDiv: HTMLDivElement) {
        this.spinnerDiv = spinnerDiv;
    }
    /**
    * Indicates that asynchronous processing is currently running
    * @param {boolean} show true to display, false to not display.
    */
    public showCurrentlyRetrievingStoryboard(show: boolean): void {
        if (ConnectionViewer.cv.spinnerDiv)
            ConnectionViewer.cv.spinnerDiv.style.visibility = show ? "visible" : "hidden";
    }
    /**
    * Move the canvas by the specified amount
    */
    translateCanvas(x: number, y: number) {
        ConnectionViewer.forceGraph.setCanvasPosition(x, y);
    }
    /**
     * Returns the one with the specified ID (without prefix) from ConnectionViewer.cv.DataverseRecordArray.
     * Returns null if not found.
     */
    findDataverseRecordById(id: string): DataverseRecord | undefined {
        return this.DataverseRecordArray.find((record) => record.Id == id);
    }
    /**
    * Receive the data of the Dataverse record and actually start drawing the cards and connections.
    */
    initialDataverseRecordRetrieved(_record: WebAPIRecord): void {
        try {
            var primaryNameAttributeName = this.EntityMetadataCacheKeyIsEntityLogicalName[this.paramEntityLogicalName].PrimaryNameAttribute;
            var primaryImageAttributeName = this.EntityMetadataCacheKeyIsEntityLogicalName[this.paramEntityLogicalName].PrimaryImageAttribute;

            var record = new DataverseRecord(
                this.paramGuid
                , this.paramEntityLogicalName
                , this.EntityMetadataCacheKeyIsEntityLogicalName[this.paramEntityLogicalName].SchemaName
                , _record.EntityRecord[primaryNameAttributeName]
                , (primaryImageAttributeName) ? _record.EntityRecord[primaryImageAttributeName] : null
                , this.EntityMetadataCacheKeyIsEntityLogicalName[this.paramEntityLogicalName].DisplayName.UserLocalizedLabel.Label
                , this.EntityMetadataCacheKeyIsEntityLogicalName[this.paramEntityLogicalName].ObjectTypeCode
            );

            this.DataverseRecordArray.push(record);
            this.showInitialDataverseRecord(record);
        } catch (e: any) {
            console.error(`${e.message} in initialDataverseRecordRetrieved()`);
        }
    }
    /**
    * Show the first card.
    */
    showInitialDataverseRecord(record: DataverseRecord): void {
        try {
            if (ConnectionViewer.cv.IS_CardsLaout_Replaying) {
                // In case of replaying
                let singleCardLayout = ConnectionViewer.cv.clm.findCardInReplaying(record.Id);
                if (singleCardLayout) {
                    // In case of replaying and saved card exists
                    let position = { x: singleCardLayout.X, y: singleCardLayout.Y };
                    record.CreateCardControlWithDisplayName({ x: 0, y: 0 }, singleCardLayout.Fixed);
                } else {
                    // In case of replaying but saved card does not exist.
                    // It is unknown when this happens.
                    record.CreateCardControlWithDisplayName({ x: 0, y: 0 }, true);
                }
            } else {
                record.CreateCardControlWithDisplayName({ x: 0, y: 0 }, true);
            }
            this.clm.PrimaryDataverseRecord = record;
            record.Card.Focus();
            this.initLegend();
            this.CheckAndUpdateLegend(record.EntityLogicalName);
        } catch (e: any) {
            console.error(`${e.message} in showInitialDataverseRecord()`);
        }
    }
    /**
    * Initialize the control to display the icon image and entity display name in the legend part.
    * Entity-specific ObjectTypeCode information is required in advance.
    */
    initLegend(): void {
        this.legendAlreadyShownEntityLogicalNameArray = [];
    }
    /**
    * Check if the legend of the specified entity is already displayed, and if not, display it.
    * However, the annotation entity for CardsLayout is not displayed.
    * @param entityLogicalName {string} Entity logical name
    */
    CheckAndUpdateLegend(entityLogicalName: string): void {
        try {
            if (this.legendAlreadyShownEntityLogicalNameArray.indexOf(entityLogicalName) < 0
                && ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName != null
                && (entityLogicalName in ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName)
                && ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName] != null
                && entityLogicalName != "annotation") {
                const entitySchemaName = ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].SchemaName;
                // Icon image URL
                const iconPath = DataverseIconsHelper.getIcon32UrlStatic(entitySchemaName)

                // Entity display name
                const entityDisplayName = ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].DisplayName.UserLocalizedLabel.Label;

                // Generate DOM dynamically
                const MyLegendTable = document.getElementById(`${ConnectionViewer.ns}_LegendTable`) as HTMLElement;
                const elemTR = document.createElement("TR");
                const elemTD1 = document.createElement("TD");
                elemTD1.className = "legendTD";
                const elemSPAN = document.createElement("SPAN");
                elemSPAN.className = "entityLegend";
                const entityColor = CardControl.getEntityColor(entityLogicalName);
                elemSPAN.style.background = `linear-gradient(135deg, ${entityColor}, ${chroma(entityColor).darken().hex()})`;
                elemTD1.appendChild(elemSPAN);
                const elemIMG = document.createElement("IMG");
                elemIMG.className = "cardImage";
                elemIMG.setAttribute("src", iconPath);
                elemIMG.setAttribute("title", entityDisplayName);
                elemSPAN.appendChild(elemIMG);
                const elemTD2 = document.createElement("TD");
                elemTD2.className = "legendTD";
                elemTD2.innerHTML = ": " + entityDisplayName;
                elemTR.appendChild(elemTD1);
                elemTR.appendChild(elemTD2);
                MyLegendTable.appendChild(elemTR);

                this.legendAlreadyShownEntityLogicalNameArray.push(entityLogicalName);
                NonReactDiv.setEntityColorToSVGDefs(entityLogicalName, CardControl.getEntityColor(entityLogicalName));
            }
        } catch (e: any) {
            console.error(`${e.message} in CheckAndUpdateLegend()`);
        }
    }
    /**
    * Stop the behavior of trying to scroll the page when touching on iOS Safari.
    */
    static preventSafariTouchScroll(): void {
        d3selection.select(`div#${ConnectionViewer.ns}_MyCardConnectionDiv`).on("touchstart", (event) => {
            event.preventDefault();
        });
    }
    /**
    * For targeted Dataverse records, place and display connectors and associated cards that you haven't 
    * already viewed using retrieved connection records and OneToMany and ManyToOne related records.
    * The actual display is done with d3.
    * @param record {DataverseRecord} Targeted Dataverse record
    * @param connectionEntities {WebAPIRecord[]} Retrieved connection records
    * @param connectionTargetDataverseEntities {WebAPIRecord[]} Retrieved target Dataverse records of connection records
    * @param oneToManyRelationshipEntitiesDic Retrieved records by One-To-Many
    * @param manyToOneRelationshipEntitiesDic Retrieved records by Many-To-One
    * @param manyToManyRelationshipEntitiesDic Retrieved intermediate entity connection records by Many-To-Many
    * @param manyToManyRelationshipTargetDataverseEntitiesDic Dictionary that holds target Dataverse records of retrieved records by Many-To-Many. The key is the ID of the MayToMany record, and the value is the WebAPIRecord that represents the target Dataverse record group corresponding to the value.
    */
    // TODO manyToManyRelationshipEntitiesDic is not used
    ShowCardsAndConnectors(
        record: DataverseRecord
        , connectionEntities: WebAPIRecord[] | null
        , connectionTargetDataverseEntities: WebAPIRecord[]
        , oneToManyRelationshipEntitiesDic: { [key: string]: WebAPIRecord[] } | null
        , manyToOneRelationshipEntitiesDic: { [key: string]: WebAPIRecord[] } | null
        , manyToManyRelationshipEntitiesDic: { [key: string]: WebAPIRecord[] } | null // TODO: This arg is not used
        , manyToManyRelationshipTargetDataverseEntitiesDic: { [key: string]: WebAPIRecord[] }): void {
        try {
            let listToBeAddedByConnectionEntities: DataverseLink[] = DataverseLink.ConvertConnectionEntitiesToDataverseLinkList(
                record
                , connectionEntities
                , connectionTargetDataverseEntities
                , ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode
                , this);
            let listToBeAddedByOneToManyRelationshipEntities: DataverseLink[] = DataverseLink.ConvertOneToManyRelationshipEntitiesToDataverseLinkList(
                record
                , oneToManyRelationshipEntitiesDic
                , ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName
                , ConnectionViewer.cv.OneToManyRelationshipMetadataCache
                , ConnectionViewer.cv.AttributeMetadataCache);
            let listToBeAddedByManyToOneRelationshipEntities: DataverseLink[] = DataverseLink.ConvertManyToOneRelationshipEntitiesToDataverseLinkList(
                record
                , manyToOneRelationshipEntitiesDic
                , ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName
                , ConnectionViewer.cv.OneToManyRelationshipMetadataCache
                , ConnectionViewer.cv.AttributeMetadataCache);
            let listToBeAddedByManyToManyEntities: DataverseLink[] = DataverseLink.ConvertManyToManyEntitiesToDataverseLinkList(
                record
                , manyToManyRelationshipTargetDataverseEntitiesDic
                , ConnectionViewer.cv.EntityMetadataCacheKeyIsEntityLogicalName);

            let toBeAddedList: DataverseLink[] = [];
            toBeAddedList = listToBeAddedByConnectionEntities.concat(listToBeAddedByOneToManyRelationshipEntities);
            toBeAddedList = toBeAddedList.concat(listToBeAddedByManyToOneRelationshipEntities);
            toBeAddedList = toBeAddedList.concat(listToBeAddedByManyToManyEntities);

            // Register in CV.connectionViewer.DataverseLinkArray. At the same time, update the card and link on CV.forceGraph display.
            for (let i = 0; i < toBeAddedList.length; i++) {
                const dataverseLink: DataverseLink = toBeAddedList[i];
                let alreadyExist = false;
                let addedAnotherDataverseLinkToExistingLink = false;
                // If the DataverseLink exists in the CV.connectionViewer.DataverseLinkArray cache, skip the subsequent processing.
                for (let j = 0; j < ConnectionViewer.cv.dataverseLinkArray.length; j++) {
                    const existDataverseLink = ConnectionViewer.cv.dataverseLinkArray[j];
                    alreadyExist = existDataverseLink.Connector!.HaveSameContextInDataverseLinkAray(dataverseLink);

                    // Link the DataverseLink instance to the existing ConnectorControl and link
                    if (!alreadyExist) {
                        if (DataverseLink.HaveSameCombinationOfDataverseRecords(existDataverseLink, dataverseLink)) {
                            existDataverseLink.Connector!.addDataverseLink(existDataverseLink, dataverseLink);
                            dataverseLink.Connector = existDataverseLink.Connector;
                            ConnectionViewer.forceGraph.setMultipleDataverseConnetionFound(existDataverseLink);
                            addedAnotherDataverseLinkToExistingLink = true;
                        }
                    }
                }
                if (!alreadyExist && !addedAnotherDataverseLinkToExistingLink) {
                    let target: DataverseRecord;

                    if (record.Id == dataverseLink.DataverseRecord1.Id) {
                        target = dataverseLink.DataverseRecord2;
                    } else {
                        target = dataverseLink.DataverseRecord1;
                    }

                    // Check if DataverseRecord already exists in DataverseRecordArray.
                    const foundRecord = this.DataverseRecordArray.find((existingRecord) => existingRecord.Id === target.Id);
                    if (!foundRecord) {
                        // Register the DataverseRecord that is not in DataverseRecordArray in DataverseRecordArray and process it.
                        this.DataverseRecordArray.push(target);

                        if (ConnectionViewer.cv.IS_CardsLaout_Replaying) {
                            // In case of replaying
                            let singleCardLayout = ConnectionViewer.cv.clm.findCardInReplaying(target.Id);
                            if (singleCardLayout) {
                                // In case of replaying and saved card exists
                                let position = { x: singleCardLayout.X, y: singleCardLayout.Y };
                                target.CreateCardControlWithDisplayName(position, singleCardLayout.Fixed);
                            } else {
                                // There are cards that are being replayed but not saved.
                                // This is the case when there are records added after saving.
                                target.CreateCardControlWithDisplayName(null, false);
                            }
                        } else {
                            target.CreateCardControlWithDisplayName(null, false);
                        }
                        this.CheckAndUpdateLegend(target.EntityLogicalName);
                        dataverseLink.CreateConnector(record.Card, target.Card);
                    } else {
                        // This is the case for Dataverse records that are already cached in the DataverseRecordList.
                        // Check if the connector already exists.
                        let connectorWasSet = false;
                        const dvLinkListForFoundRecord = DataverseLink.getDataverseLinksHaveRecordId(this.dataverseLinkArray, foundRecord.Id);
                        for (let dvLink of dvLinkListForFoundRecord) {
                            if (DataverseLink.HaveSameContext(dataverseLink, dvLink) && dvLink.Connector != null && dataverseLink.Connector == null) {
                                dataverseLink.Connector = dvLink.Connector;
                                connectorWasSet = true;
                                break;
                            }
                        }

                        if (!connectorWasSet) {
                            // In this case, a new connector will be created between the already displayed cards.
                            dataverseLink.CreateConnector(record.Card, foundRecord.Card);
                        }
                    }

                    this.dataverseLinkArray.push(dataverseLink);
                }
            }

            record.AreConnectionsRetrieved = true;
        } catch (e: any) {
            Helper.addErrorMessageln(e.message + " in ShowCardsAndConnectors()");
        }
    }
    /** Translate above
     * Reset this PCF control.
     * The timing at which it may be called is as follows:
     *  - When the user changes the config in the user options
     *  - When trying to apply a saved expanded card layout
     * If annotationId is specified, apply the expanded card layout corresponding to that annotationId.
     */
    public async resetConnectionViewer(annotationId?: string): Promise<void> {
        this.DataverseRecordArray = [];
        this.dataverseLinkArray = [];
        this.dataverseAccess = new DataverseAccessWebAPI(this);
        this.clm = new CardsLayoutManager(annotationId);
        this.IS_CardsLaout_Replaying = false;

        await this.initNonReact(this.nonReactDiv!, annotationId);
    }
    /**
     * Open a new Dataverse form page for a specific Dataverse record.
     */
    public OpenNewDataverseFormWindow(entityId: string, entityName: string): void {
        if (!ConnectionViewer.cv.IS_DEMO_MODE) {
            const entityFormOptions = {
                entityId: entityId,
                entityName: entityName,
                openInNewWindow: true,
            };

            this._context.navigation.openForm(entityFormOptions)
                .then((value) => { // Success
                },
                    (reason: any) => { // Failure
                        console.error("context.navigation.openForm() Failure in OpenNewDataverseFormWindow(), reason", reason);
                    }
                );
        }
    }
    /**
     * Retrieve one of the cached Dataverse records DataverseRecordArray.
     * If not, return undefined.
     */
    public getCachedDataverseRecord(entityId: string): DataverseRecord | undefined {
        return this.DataverseRecordArray.find((record) => record.Id === entityId);
    }
}
