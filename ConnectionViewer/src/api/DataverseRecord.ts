import { CardControl } from "./CardControl";
import { ConnectionViewer } from "../ConnectionViewer";
import { DataverseIconsHelper } from "./DataverseIconsHelper";

/**
 * Class which represents a Dataverse record. This is not for Connection table records.
 */
export class DataverseRecord {
    /**
    * The ID (GUID) of this record. Lowercase.
    */
    Id: string;
    /**
    * The logical name of the entity. Lowercase. "account" etc.
    */
    EntityLogicalName: string;
    /**
    * The schema name of the entity. Starts with a capital letter. "Account" etc.
    */
    EntitySchemaName: string;
    /**
    * ObjectTypeCode of the entity.
    * This is required for custom entities.
    */
    ObjectTypeCode: number;
    /**
    * The display name of the record.
    */
    DisplayName: string;
    /**
    * The image data of the record.
    */
    EntityImage: string | null;
    /**
    * The display name of the entity of the record.
    */
    DisplayEntityName: string;
    /**
    * Whether the connection information has been retrieved.
    */
    private _areConnectionsRetrieved: boolean;
    get AreConnectionsRetrieved(): boolean {
        return this._areConnectionsRetrieved;
    }
    set AreConnectionsRetrieved(value: boolean) {
        this._areConnectionsRetrieved = value;
        if (value && this.Card != null) {
            this.Card.AreConnectionsRetrieved = true;
        }
    }
    /**
    * Corresponding CardControl
    */
    public Card: CardControl;
    constructor(id: string, entityLogicalName: string, entitySchemaName: string, displayName: string, entityImage: string | null, displayEntityName: string, objectTypeCode: number) {
        this.Id = id;
        this.EntityLogicalName = entityLogicalName;
        this.EntitySchemaName = entitySchemaName;
        this.DisplayName = displayName;
        this.EntityImage = entityImage;
        this.DisplayEntityName = displayEntityName;
        this._areConnectionsRetrieved = false;
        this.ObjectTypeCode = objectTypeCode;
    }
    /**
     * Create a card control based on this Dataverse record.
     * Use this method when the value of DisplayName is set.
     * If the value of DisplayName is null, shows something to mean "It's empty".
     */
    CreateCardControlWithDisplayName(position: { x: number; y: number } | null, _fixed: boolean): void {
        try {
            this.Card = new CardControl(this);
            this.Card.DisplayName = (this.DisplayName != null) ? this.DisplayName : ""; // At this point, the DisplayName information should already be set, so if it is empty, string.Empty is entered to explicitly indicate that.
            this.Card.dataverseRecordId = this.Id;

            const iconPath = DataverseIconsHelper.getIcon32UrlStatic(this.EntitySchemaName)

            if (position) {
                ConnectionViewer.forceGraph.addNode({
                    name: this.DisplayName,
                    id: this.Id,
                    iconURL: iconPath,
                    x: position.x,
                    y: position.y,
                    fixed: _fixed,
                    entityName: this.EntityLogicalName
                });
            } else {
                ConnectionViewer.forceGraph.addNode({
                    name: this.DisplayName,
                    id: this.Id,
                    iconURL: iconPath,
                    x: null,
                    y: null,
                    fixed: null,
                    entityName: this.EntityLogicalName
                });
            }
        } catch (e: any) {
            console.error(`${e.message} in CreateCardControlWithDisplayName(), position`, position);
        }
    }
    /**
     * Search ConnectionViewer.cv.DataverseRecordArray and return the value of the EntityImage attribute of the DataverseRecord with the specified ID.
     */
    static getEntityImage(recordId: string): string | null {
        const record = ConnectionViewer.cv.DataverseRecordArray.find((record) => record.Id === recordId);
        if (record) return record.EntityImage;
        return null;
    }
}
/**
 * Class representing a record of the memo (annotation) entity. Treats CV.CardsLayout data as the value of the documentbody attribute.
 * Inherits from the DataverseRecord class.
 */
export class DataverseAnnotationRecord extends DataverseRecord {
    /**
    * The subject of the record
    */
    Subject: string;
    /**
    * The document body of the record. CV.CardsLayout data is stored here.
    */
    Documentbody: string;
    /**
    * The description of the record
    */
    Notetext: string;
    /**
    * The GUID of the record's creator
    */
    CreatedbyValue: string;
    /**
    * The display name of the record's creator
    */
    CreatedbyFormattedValue: string;
    /**
    * The creation date and time of the record (UTC)
    * Example: "2017-03-29T05:52:54Z"
    */
    Createdon: string;
    /**
    * The user-localized string of the creation date and time of the record
    * Example: "2017/03/29 14:52"
    */
    CreatedonFormattedValue: string;
    /**
    * The GUID of the record's updater
    */
    ModifiedbyValue: string;
    /**
    * レコードの更新者の表示名
    * The display name of the record's updater
    */
    ModifiedbyFormattedValue: string;
    /**
    * The update date and time of the record (UTC)
    * Example: "2017-03-29T05:52:54Z"
    */
    Modifiedon: string;
    /**
    * The user-localized string of the update date and time of the record
    * Example: "2017/03/29 14:52"
    */
    ModifiedonFormattedValue: string;
    constructor(id: string,
        entityLogicalName: string,
        entitySchemaName: string,
        displayName: string,
        displayEntityName: string,
        objectTypeCode: number,
        entityRecord: Object,
        subject: string,
        documentbody: string,
        notetext: string,
        createdbyValue: string,
        createdbyFormattedValue: string,
        createdon: string,
        createdonFormattedValue: string,
        modifiedbyValue: string,
        modifiedbyFormattedValue: string,
        modifiedon: string,
        modifiedonFormattedValue: string
    ) {
        super(id, entityLogicalName, entitySchemaName, displayName, null, displayEntityName, objectTypeCode);
        this.Subject = subject;
        this.Documentbody = documentbody;
        this.Notetext = notetext;
        this.CreatedbyValue = createdbyValue;
        this.CreatedbyFormattedValue = createdbyFormattedValue;
        this.Createdon = createdon;
        this.CreatedonFormattedValue = createdonFormattedValue
        this.ModifiedbyValue = modifiedbyValue;
        this.ModifiedbyFormattedValue = modifiedbyFormattedValue;
        this.Modifiedon = modifiedon;
        this.ModifiedonFormattedValue = modifiedonFormattedValue;
    }
}
