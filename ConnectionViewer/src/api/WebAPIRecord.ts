import { ConnectionViewer } from "../ConnectionViewer";
import { Helper } from "./Helper";

/**
* A class that represents a Dataverse record retrieved from a web API with some additional properties for ease of use.
*/
export class WebAPIRecord {
    /**
    * Entity set name. Lowercase such as "accounts".
    */
    EntitySetName: string;
    /**
    * Object data of raw data representing a record on Dataverse retrieved from Web API. Entity.
    */
    EntityRecord: any;
    constructor(entitySetName: string, entityRecord: Object) {
        if (!entitySetName) {
            throw new Error("entitySetName が値を持っていません。CV.WebAPIRecord コンストラクタにて。");
        }
        if (!entityRecord) {
            throw new Error("EntityRecord が値を持っていません。CV.WebAPIRecord コンストラクタにて。");
        }
        this.EntitySetName = entitySetName;
        this.EntityRecord = entityRecord;
    }
    /*
    * Create a new single WebAPIRecord instance from an Object immediately after JSON.parse of the raw data of 
    * the response of a request that returns a single Dataverse record with Web API and return it.
    */
    static CreateWebAPIRecordSingle(requestResponseSingle: any): WebAPIRecord | undefined {
        try {
            let odataContext = requestResponseSingle["@odata.context"];
            let entitySetName = WebAPIRecord.getEntitySetNameFromOdataContext(odataContext);
            let entityRecord = requestResponseSingle;

            return new WebAPIRecord(entitySetName, entityRecord);
        } catch (e: any) {
            Helper.addErrorMessageln("Error in CV.WebAPIRecord.CreateWebAPIRecordSingle()" + e.message);
        }
    }
    /*
    * Create a new multiple WebAPIRecord instances from an Object immediately after JSON.parse of the raw data of
    * the response of a request that returns multiple Dataverse records with Web API and return them.
    */
    static CreateWebAPIRecordMultiple(requestResponseMultiple: any): WebAPIRecord[] {
        let odataContext = requestResponseMultiple["@odata.context"];
        let entitySetName = WebAPIRecord.getEntitySetNameFromOdataContext(odataContext);
        let records = requestResponseMultiple["value"];
        let webAPIRecords: WebAPIRecord[] = [];
        for (let i = 0; i < records.length; i++) {
            let entityRecord = records[i];
            webAPIRecords.push(new WebAPIRecord(entitySetName, entityRecord));
        }
        return webAPIRecords;
    }
    /*
    * Returns the entity set name from the value string of @odata.context in the Web API response as shown below.
    * "@odata.context":"https://yourcrminstance.crm7.dynamics.com/api/data/v8.1/$metadata#accounts"
    *   -> Returns "accounts"
    * "@odata.context":"https://yourcrminstance.crm7.dynamics.com/api/data/v8.2/$metadata#contacts(cont…name,parentcustomerid_account,parentcustomerid_account(accountid))/$entity"
    *   -> Returns "contacts"
    * "@odata.context":"https://yourcrminstance.crm7.dynamics.com/api/data/v8.1/$metadata#accounts/$entity"
    *   -> Returns "accounts"
    */
    private static getEntitySetNameFromOdataContext(odataContext: string): string {
        return odataContext.split(/\$metadata#/)[1].split(/\(|\//)[0];
    }
    getEntityLogicalName(cv: ConnectionViewer): string {
        let entityLogicalName = cv.EntityLogicalNameKeyIsEntitySetName[this.EntitySetName];
        if (!entityLogicalName) throw new Error("Unable to get the corresponding entity logical name from entity set name '" + this.EntitySetName + "'.");
        return entityLogicalName;
    }
    getId(cv: ConnectionViewer): string | undefined {
        try {
            let entityLogicalName = this.getEntityLogicalName(cv);
            let primaryIdAttributeName = cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryIdAttribute;
            return this.EntityRecord[primaryIdAttributeName];
        } catch (e: any) {
            Helper.addErrorMessageln(e.message);
        }
    }
}
