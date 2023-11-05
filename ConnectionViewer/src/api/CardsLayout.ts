import { WebAPIRecord } from "./WebAPIRecord";

/**
* A class that represents the layout in which the cards are expanded.
* Stored as the value of a documentbody attribute in a record in a Dataverse annotation table.
*/
export class CardsLayout {
    /**
     * Same value as annotationid of WebAPIRecord
     */
    annotationId: string;
    /**
     * Name of the card layout
     */
    Name: string;
    /**
    * An array of IDs of the Card's DataverseRecord if there is a record that is focused and has not yet retrieved related data.
    * The first is the ID of the record that represents the main DataverseRecord.
    */
    FocusedIdList: string[];
    /**
    * Array of SingleCardLayout
    */
    CardList: SingleCardLayout[];
    /**
    * ID which was last focused
    */
    LastFocusedId: string;
    /**
    * Object that represents the amount of movement of the entire canvas.
    */
    CanvasTranslated: { x: number, y: number };
    /**
     * ID of the configuration selected when the cards were expanded
     * Examples: "Sales", "Service", etc.
     */
    ConfigId: string;
    /**
    * @param annotationId {string} The annotationid of the WebAPIRecord of the annotation record where the card layout is stored
    */
    constructor(annotationId?: string) {
        this.annotationId = annotationId!;
        this.FocusedIdList = [];
        this.CardList = [];
        this.CanvasTranslated = { x: 0, y: 0 };
    }
    /**
     * Receives an object and returns a new CardsLayout instance.
     * If there is a problem, return null.
     * @param annotationid {string} The annotationid of the WebAPIRecord of the annotation record where the card layout is stored
     * @param obj {Object} An object that parsed the documentbody of a notes record retrieved from Dataverse. Assume that it was got with JSON.parse(decodeURI(atob(annotationWebAPIRecord.EntityRecord["documentbody"]))).
     */
    static getCardsLayoutFromObject(annotationid: string, obj: any): CardsLayout | null {
        const focusedIdList = obj["FocusedIdList"];
        const lastFocusedId = obj["LastFocusedId"];
        const cardList = obj["CardList"];
        const canvasTranslated = obj["CanvasTranslated"];
        const configId = obj["ConfigId"];
        const name = obj["Name"];

        if (focusedIdList && cardList) {
            const cardsLayout = new CardsLayout(annotationid);
            cardsLayout.Name = name;
            cardsLayout.FocusedIdList = focusedIdList;
            cardsLayout.LastFocusedId = lastFocusedId;
            cardsLayout.CardList = cardList;
            if (canvasTranslated.x && canvasTranslated.y) cardsLayout.CanvasTranslated = canvasTranslated;
            else cardsLayout.CanvasTranslated = { x: 0, y: 0 };
            cardsLayout.ConfigId = configId;

            return cardsLayout;
        }

        return null;
    }
    /**
     * Receives a WebAPIRecord containing the data for the annotation and returns a new CardsLayout instance.
     * If there is a problem, return null.
     */
    static getCardsLayoutFromAnnotationWebAPIRecord(record: WebAPIRecord): CardsLayout | null {
        try {
            const obj = JSON.parse(decodeURI(atob(record.EntityRecord["documentbody"])));
            // Not using record.getId(ConnectionViewer.cv) to get the id. Annotation Because you are not retrieving metadata.
            const annotationid = record.EntityRecord["annotationid"];
            return CardsLayout.getCardsLayoutFromObject(annotationid, obj);
        } catch (e) {
            return null;
        }
    }
}
/**
* A class that represents the layout of a cards
*/
export class SingleCardLayout {
    DataverseRecordId: string;
    X: number;
    Y: number;
    Fixed: boolean;

    constructor(dataverseRecordId: string, x: number | undefined, y: number | undefined, fixed: boolean | null | undefined) {
        if (!dataverseRecordId || x === undefined || y === undefined) throw new Error("Some arguments passed to the constructor of a SingleCardLayout do not contain a value.");
        this.DataverseRecordId = dataverseRecordId;
        this.X = x ? x : 0;
        this.Y = y ? y : 0;
        this.Fixed = fixed ? true : false;
    }
}
