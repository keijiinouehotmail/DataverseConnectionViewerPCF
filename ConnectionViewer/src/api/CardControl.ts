import { ConnectionViewer } from "../ConnectionViewer";
import { DataverseRecord } from "./DataverseRecord";
import { ForceGraph_CircleUI } from "./ForceGraph_CircleUI";

export class CardControl {
    /**
    * Unit is "px"
    * This should be same as width of div.card in css.
    */
    static CARD_WIDTH = 128;
    /**
    * Unit is "px"
    */
    static CARD_HEIGHT = 40;
    /**
    * Text when display name is empty
    */
    static EMPTY_EXPLANATION_STRING = "((empty))";
    /**
    * Id (no prefix) of corresponding DataverseRecord
    */
    dataverseRecordId: string;
    /**
    * EntityLogicalName of corresponding DataverseRecord
    */
    EntityLogicalName: string;
    /**
     * EntityLogicalName of corresponding DataverseRecord
    */
    EntitySchemaName: string;
    /**
    * ObjectTypeCode of corresponding DataverseRecord
    */
    ObjectTypeCode: number;
    /**
    * Whether the related connection data has been retrieved or not
    */
    _areConnectionsRetrieved: boolean;
    /**
    * Whether the related connection data has been retrieved or not
    * getter
    */
    get AreConnectionsRetrieved(): boolean {
        return this._areConnectionsRetrieved;
    }
    /**
    * Whether the related connection data has been retrieved or not
    * setter
    */
    set AreConnectionsRetrieved(retrieved: boolean) {
        this._areConnectionsRetrieved = retrieved;
        ConnectionViewer.forceGraph.connectionRetrieved(this.dataverseRecordId, retrieved);
    }
    /**
    * Display name of the card
    */
    DisplayName: string;
    /**
    * Image which is displayed on the card
    */
    EntityImage: string;
    /**
    * Whether the card is focused or not
    */
    private _isFocused: boolean;
    /**
    * Whether the card is focused or not
    * getter
    */
    get IsFocused(): boolean {
        return this._isFocused;
    }
    constructor(dataverseRecord: DataverseRecord) {
        this.dataverseRecordId = dataverseRecord.Id;
        this.EntitySchemaName = dataverseRecord.EntitySchemaName;
        this.EntityLogicalName = dataverseRecord.EntityLogicalName;
        this.EntitySchemaName = dataverseRecord.EntitySchemaName;
        this.ObjectTypeCode = dataverseRecord.ObjectTypeCode;
        this._areConnectionsRetrieved = false;
    }
    /**
    * Focus. At the same time, perform asynchronous processing to retrieve the required Dataverse records and display cards and connectors.
    * UI changes on focus are implemented on the d3 side in the ForceGraph_RectangleUI class.
    * It also handles processing for layouts in which a group of cards are expanded, which is managed by CardsLayoutManager.
    * @param finished {() => void} The callback to perform when focus is complete, except for IS_CardsLaout_Replaying processing. Option.
    * @param finishedArgs {number} The argument to pass to the callback function. Option.
    */
    Focus(finished?: (record: DataverseRecord, distanceDone: number) => void, finishedArgs?: number): void {
        try {
            this._isFocused = true;
            ForceGraph_CircleUI.focusACardControlByDataverseRecordId(this.dataverseRecordId);

            ConnectionViewer.cv.clm.SetLastFocusedId(this.dataverseRecordId);

            if (!this.AreConnectionsRetrieved) {
                ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(true);

                const dataverseRecord = ConnectionViewer.cv.getCachedDataverseRecord(this.dataverseRecordId);
                ConnectionViewer.cv.dataverseAccess.retrieveConnAndOTMAndMTOAndMTMRPromise(dataverseRecord!)
                    .then((record: DataverseRecord) => {
                        ConnectionViewer.cv.clm.AddFocusedId(record.Id);
                        ConnectionViewer.cv.ShowCardsAndConnectors(
                            record
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedConnRetrievedEC
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedConnTargetDataverseRecordRetrievedEC
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic
                            , ConnectionViewer.cv.dataverseAccess.asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic
                        );

                        if (ConnectionViewer.cv.IS_CardsLaout_Replaying) setTimeout(ConnectionViewer.cv.clm.nextCardsLayoutReplay, 100);

                        ConnectionViewer.forceGraph.changeUISizeForForCards();
                        finished?.(record, finishedArgs!);
                    })
                    .finally(() => {
                        ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
                    });
            } else {
                // Here, it is important to make setTImeout behave in the same way as the above Dataverse access as an asynchronous process.
                // As an asynchronous process, the onclick of the SVG element should be executed first.
                // The behavior is not expected that changeUISizeForFarCards() will be executed first.
                setTimeout(() => {
                    if (ConnectionViewer.cv.config.SmallerSizeEnabled) ConnectionViewer.forceGraph.changeUISizeForForCards();
                }, 100);
                const dataverseRecord = ConnectionViewer.cv.getCachedDataverseRecord(this.dataverseRecordId);
                finished?.(dataverseRecord!, finishedArgs!);
            }
        } catch (e: any) {
            console.error(`Erro in Focus(): ${e.message}`);
        }
    }
    /**
     * Unfocus.
     * UI changes when unfocused are implemented on the d3 side in ForceGraph_RectangleUI class.
     */
    Unfocus() {
        this._isFocused = false;
        ForceGraph_CircleUI.unfocusACardControlByDataverseRecordId(this.dataverseRecordId);
    }
    /**
     * Preserve Dynamics 365 entities and their color correspondence. Referring to CRM for phones in Dynamics CRM 2015 (used from a browser).
     */
    static EntityColor: { [key: string]: string } = {
        account: "#CE7200"
        , lead: "#3052A6"
        , opportunity: "#3E7239"
        , contact: "#0072C6"
        , incident: "#7A278F"
        , systemuser: "#578837"
        , phonecall: "#C0172B"
        , task: "#C0172B"
        , email: "#C0172B"
        , letter: "#C0172B"
        , appointment: "#C0172B"
        , serviceappointment: "#C0172B"
        , competitor: "#b22222" // firebrick
        , _other: "#0072c6"
    };
    /**
     * Returns its corresponding color for a specific entity in Dynamics 365.
     * @return Text for color. Ex: "#0072c6"
     * @param entityName {string} Entity logical name
     */
    static getEntityColor(entityName: string): string {
        if (entityName in CardControl.EntityColor) {
            return CardControl.EntityColor[entityName];
        } else {
            return CardControl.EntityColor["_other"];
        }
    }
}
