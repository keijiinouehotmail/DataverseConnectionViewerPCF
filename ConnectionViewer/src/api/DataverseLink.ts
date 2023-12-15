import { CardControl } from "./CardControl";
import { ConnectionViewer } from "../ConnectionViewer";
import { ConnectorControl } from "./ConnectorControl";
import { DataverseRecord } from "./DataverseRecord";
import { MyGeneralLibrary } from "./MyGeneralLibrary";
import { WebAPI } from "../services/WebAPIHelper";
import { WebAPIRecord } from "./WebAPIRecord";

/**
 * A Dataverse link which represents one of the followings:
 * - A connection table record
 * - A OneToMany relationship
 * - A ManyToMany relationship
 * A connector, which is displayed by CV.ForceGraph, may have multiple instalces of this Dataverse link.
 */
export class DataverseLink {
    /**
    * If an instance of this class represents a connection record, its GUID.
    * If it does not represent a connection record, a new GUID dynamically created by this program (not a GUID given by Dataverse).
    */
    LinkId: string;
    /**
    *
    */
    DataverseRecord1: DataverseRecord;
    /**
    *
    */
    DataverseRecord2: DataverseRecord;
    /**
    *
    */
    DataverseRecord1DisplayName: string;
    /**
    *
    */
    DataverseRecord2DisplayName: string;
    /**
    *
    */
    Record1RoleId: string | null;
    /**
    *
    */
    Record2RoleId: string | null;
    /**
     * The name of the connection role, for record1. It is obtained asynchronously.
     */
    Record1DisplayRoleName: string | null;
    /**
     * The name of the connection role, for record2. It is obtained asynchronously.
     */
    Record2DisplayRoleName: string | null;
    /**
    *
    */
    Description: string | null;
    /**
    *
    */
    RelatedConnectionId: string | null;
    /**
    * Corresponding ConnectorControl
    * ConnectorControl : DataverseLink = 1 : N
    */
    Connector: ConnectorControl | null;
    /**
    * Represents a connection record, or either a OneToMany or ManyToMany association
    * 
    */
    LinkType: DataverseLinkTypeEnum;
    /**
    * If an instance represents a OneToMany relationship (including when it is obtained by ManyToOne),
    * it holds the schema name of the OneToMany relationship metadata.
    * If it represents a connection entity, it holds null.
    */
    OTMRelationshipSchemaName: string | null;
    constructor(linkId: string, record1: DataverseRecord, record2: DataverseRecord, record1displayname: string, record2displayname: string
        , record1roleid: string | null, record2roleid: string | null, record1displayrolename: string | null, record2displayrolename: string | null
        , description: string | null, relatedconnectionid: string | null, connectionType: DataverseLinkTypeEnum, otmRelationshipSchemaName: string | null) {
        this.LinkId = linkId;
        this.DataverseRecord1 = record1;
        this.DataverseRecord1.DisplayName = record1displayname;
        this.DataverseRecord2 = record2;
        this.DataverseRecord2.DisplayName = record2displayname;
        this.DataverseRecord1DisplayName = record1displayname;
        this.DataverseRecord2DisplayName = record2displayname;
        this.Record1RoleId = record1roleid;
        this.Record2RoleId = record2roleid;
        this.Record1DisplayRoleName = record1displayrolename;
        this.Record2DisplayRoleName = record2displayrolename;
        this.Description = description;
        this.RelatedConnectionId = relatedconnectionid;
        this.LinkType = connectionType;
        this.OTMRelationshipSchemaName = otmRelationshipSchemaName;
        this.Connector = null;
    }
    /**
     * For card1or2_1 and card1or2_2, when this CreateConnector() is called, 
     * it may be unknown which corresponds to DataverseRecord1 and which corresponds to DataverseRecord2. 
     * Judging within this CreateConnector().
     */
    CreateConnector(card1or2_1: CardControl, card1or2_2: CardControl): void {
        var card1: CardControl;
        var card2: CardControl;

        if (card1or2_1.dataverseRecordId.toUpperCase() == this.DataverseRecord1.Id.toUpperCase()) {
            card1 = card1or2_1;
            card2 = card1or2_2;
        }
        else {
            card1 = card1or2_2;
            card2 = card1or2_1;
        }

        this.Connector = new ConnectorControl(this.LinkId);
        this.Connector.Description = this.Description;
        this.Connector.Role1 = this.Record1DisplayRoleName;
        this.Connector.Role2 = this.Record2DisplayRoleName;

        ConnectionViewer.forceGraph.addLink({
            source: card1.dataverseRecordId,
            target: card2.dataverseRecordId,
            linkId: this.LinkId,
            description: this.Description,
            role1: this.Record1DisplayRoleName,
            role2: this.Record2DisplayRoleName,
            connector: this.Connector,
            dataverseLink: this,
        });
    }
    /**
     * For the target Dataverse record,
     * it receives a group of Dataverse connection records and converts them into a new Dataverse Link instance group and returns the array.
     * Note that when registering one connection on the GUI, two connection records are generated internally in Dataverse. (Two records set for each connection source and connection destination)
     * Here, in conjunction with CV. Dataverse Access.retrieveConnectionsDeferredized(), only those that hit the target Dataverse record as the connection source (record1 something something) are filtered.
     * It filters the returned records properly than in the Dynamics CRM 2013 era.
     * @param connectionEntities {WebAPIRecord[]} Dataverse connection record group
     * @param connectionTargetDataverseEntities {WebAPIRecordy[]} Dataverse connection record target Dataverse record group
     * @param entityMetadataCacheOTC Entity metadata cache
     */
    static ConvertConnectionEntitiesToDataverseLinkList(
        record: DataverseRecord,
        connectionEntities: WebAPIRecord[] | null,
        connectionTargetDataverseEntities: WebAPIRecord[],
        entityMetadataCacheOTC: any,
        cv: ConnectionViewer): DataverseLink[] {
        let list: DataverseLink[] = [];

        let findInDataverseRecordArray = function (id: string): DataverseRecord | null {
            let foundEntity: DataverseRecord | null = null;
            for (let r in ConnectionViewer.cv.DataverseRecordArray) {
                if (ConnectionViewer.cv.DataverseRecordArray[r].Id == id) {
                    foundEntity = ConnectionViewer.cv.DataverseRecordArray[r];
                    break;
                }
            }
            return foundEntity;
        };

        let findInConnectionTargetDataverseEntities = function (id: string): WebAPIRecord | null {
            let foundEntity: WebAPIRecord | null = null;
            for (let r in connectionTargetDataverseEntities) {
                if (connectionTargetDataverseEntities[r].getId(cv) == id) {
                    foundEntity = connectionTargetDataverseEntities[r];
                    break;
                }
            }
            return foundEntity;
        };

        // Takes two ObjectTypeCodes for an entity and determines whether they are both the target entity of the Connection in the Config. Returns true if applicable.
        let findInConfig = function (otc1: number, otc2: number): boolean {
            let logicalName1 = ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode[otc1].LogicalName;
            let logicalName2 = ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode[otc2].LogicalName;
            if (0 <= ConnectionViewer.cv.config.EntitiesForConnectionList.indexOf(logicalName1) &&
                0 <= ConnectionViewer.cv.config.EntitiesForConnectionList.indexOf(logicalName2)) return true;
            else return false;
        }

        if (connectionEntities != null) {
            for (let i = 0; i < connectionEntities.length; i++) {
                const entity = connectionEntities[i];
                const objectTypeCode1: number = entity.EntityRecord["record1objecttypecode"];
                const objectTypeCode2: number = entity.EntityRecord["record2objecttypecode"];

                // Sometimes there are incomplete connection records. (Sample data, etc.) In that case, do not process.
                if (objectTypeCode1 === undefined || objectTypeCode2 === undefined) continue;

                if (record.Id == entity.EntityRecord["_record1id_value"] &&
                    (objectTypeCode1.toString() in ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode) &&
                    (objectTypeCode2.toString() in ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode) &&
                    findInConfig(objectTypeCode1, objectTypeCode2)) {

                    let entityImage1;
                    let dataverseRecord = findInDataverseRecordArray(entity.EntityRecord["_record1id_value"]);
                    if (dataverseRecord) entityImage1 = dataverseRecord.EntityImage;
                    if (!entityImage1) {
                        const entityRecord = findInConnectionTargetDataverseEntities(entity.EntityRecord["_record1id_value"]);
                        const imgAttr = ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode[objectTypeCode1].PrimaryImageAttribute;
                        if (entityRecord && imgAttr) entityImage1 = entityRecord.EntityRecord[imgAttr];
                    }

                    const record1 = new DataverseRecord(
                        entity.EntityRecord["_record1id_value"]
                        , entityMetadataCacheOTC[objectTypeCode1].LogicalName
                        , entityMetadataCacheOTC[objectTypeCode1].SchemaName
                        , entity.EntityRecord["_record1id_value@OData.Community.Display.V1.FormattedValue"]
                        , entityImage1
                        , entityMetadataCacheOTC[objectTypeCode1].DisplayName.UserLocalizedLabel.Label
                        , entity.EntityRecord["record1objecttypecode"]
                    );

                    let entityImage2;
                    dataverseRecord = findInDataverseRecordArray(entity.EntityRecord["_record2id_value"]);
                    if (dataverseRecord) entityImage2 = dataverseRecord.EntityImage;
                    if (!entityImage2) {
                        const entityRecord = findInConnectionTargetDataverseEntities(entity.EntityRecord["_record2id_value"]);
                        const imgAttr = ConnectionViewer.cv.EntityMetadataCacheKeyIsObjectTypeCode[objectTypeCode2].PrimaryImageAttribute;
                        if (entityRecord && imgAttr) entityImage2 = entityRecord.EntityRecord[imgAttr];
                    }

                    const record2 = new DataverseRecord(
                        entity.EntityRecord["_record2id_value"]
                        , entityMetadataCacheOTC[objectTypeCode2].LogicalName
                        , entityMetadataCacheOTC[objectTypeCode2].SchemaName
                        , entity.EntityRecord["_record2id_value@OData.Community.Display.V1.FormattedValue"]
                        , entityImage2
                        , entityMetadataCacheOTC[objectTypeCode2].DisplayName.UserLocalizedLabel.Label
                        , entity.EntityRecord["record2objecttypecode"]
                    );

                    const _id = entity.getId(ConnectionViewer.cv);
                    if (!_id) return [];
                    else {
                        let con = new DataverseLink(
                            _id
                            , record1
                            , record2
                            , record1.DisplayName
                            , record2.DisplayName
                            , entity.EntityRecord["_record1roleid_value"]
                            , entity.EntityRecord["_record2roleid_value"]
                            , entity.EntityRecord["_record1roleid_value@OData.Community.Display.V1.FormattedValue"]
                            , entity.EntityRecord["_record2roleid_value@OData.Community.Display.V1.FormattedValue"]
                            , entity.EntityRecord["description"]
                            , entity.EntityRecord["_relatedconnectionid_value"]
                            , DataverseLinkTypeEnum.Connection
                            , null // null, because it is connection entity
                        );
                        list.push(con);
                    }
                }
            }
        }

        return list;
    }
    /**
     * For the target Dataverse record,
     * it receives a group of Dataverse ManyToMany records and converts them into a new Dataverse Link instance group and returns the array.
     * If the target Dataverse record for the ManyToMany record does not exist (it should have been acquired, so it means that there is no access right),
     * no new Dataverse Link instance is generated.
     * @param manyToManyRelationshipTargetDataverseEntitiesDic 
     * @param entityMetadataCacheEntityLogicalName 
     */
    static ConvertManyToManyEntitiesToDataverseLinkList(
        sourceDataverseRecord: DataverseRecord
        , manyToManyRelationshipTargetDataverseEntitiesDic: { [key: string]: WebAPIRecord[] }
        , entityMetadataCacheEntityLogicalName: any): DataverseLink[] {
        const list: DataverseLink[] = [];

        if (manyToManyRelationshipTargetDataverseEntitiesDic != null) {
            for (const m2mrecordID in manyToManyRelationshipTargetDataverseEntitiesDic) {
                const targetDataverseEntities: WebAPIRecord[] = manyToManyRelationshipTargetDataverseEntitiesDic[m2mrecordID];
                for (const targetEntity of targetDataverseEntities) {
                    const entityLogicalName1 = sourceDataverseRecord.EntityLogicalName;
                    const entityLogicalName2 = targetEntity.getEntityLogicalName(ConnectionViewer.cv);

                    if ((entityLogicalName1 in entityMetadataCacheEntityLogicalName)
                        && (entityLogicalName2 in entityMetadataCacheEntityLogicalName)
                    ) {
                        const record1 = new DataverseRecord(
                            sourceDataverseRecord.Id
                            , entityLogicalName1
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].SchemaName
                            , sourceDataverseRecord.DisplayName
                            , sourceDataverseRecord.EntityImage
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].DisplayName.UserLocalizedLabel.Label
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].ObjectTypeCode
                        );

                        const primaryNameAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryNameAttribute;
                        const primaryImageAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryImageAttribute;

                        const _id = targetEntity.getId(ConnectionViewer.cv);
                        if (!_id || _id === sourceDataverseRecord.Id) continue;
                        else {
                            const record2 = new DataverseRecord(
                                _id
                                , entityLogicalName2
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].SchemaName
                                , targetEntity.EntityRecord[primaryNameAttributeName2]
                                , targetEntity.EntityRecord[primaryImageAttributeName2]
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].DisplayName.UserLocalizedLabel.Label
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].ObjectTypeCode
                            );

                            const con = new DataverseLink(
                                m2mrecordID
                                , record1
                                , record2
                                , record1.DisplayName
                                , record2.DisplayName
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , null // null because it represents a ManyToMany relationship, not a Dataverse connection record
                                , DataverseLinkTypeEnum.ManyToMany
                                , null // null, because it is ManyToMany relationship
                            );
                            
                            list.push(con);
                        }
                    }
                }
            }
        }

        return list;
    }
   /**
    * Takes a set of records retrieved from a Dataverse OneToMany association, 
    * converts them into a new DataverseLink set of instances, and returns an array of them.
    * DataverseLink record1 contains OneToMany's record and record2 contains many records.
    * @param oneToManyRelationshipEntitiesDic 
    */
    static ConvertOneToManyRelationshipEntitiesToDataverseLinkList(
        sourceDataverseRecord: DataverseRecord
        , oneToManyRelationshipEntitiesDic: { [key: string]: WebAPIRecord[] } | null
        , entityMetadataCacheEntityLogicalName: any
        , oneToManyRelationshipMetadataCache: { [key: string]: WebAPI.OTMRelationshipInterface }
        , attributeMetadataCache: any): DataverseLink[] {
        let list: DataverseLink[] = [];

        if (oneToManyRelationshipEntitiesDic != null) {
            for (let otmrSchemaName in oneToManyRelationshipEntitiesDic) {
                for (let i = 0; i < oneToManyRelationshipEntitiesDic[otmrSchemaName].length; i++) {
                    let targetEntity: WebAPIRecord = oneToManyRelationshipEntitiesDic[otmrSchemaName][i];

                    let entityLogicalName1 = sourceDataverseRecord.EntityLogicalName;
                    let entityLogicalName2 = targetEntity.getEntityLogicalName(ConnectionViewer.cv);

                    if ((entityLogicalName1 in entityMetadataCacheEntityLogicalName)
                        && (entityLogicalName2 in entityMetadataCacheEntityLogicalName)
                        && oneToManyRelationshipMetadataCache != null
                        && (otmrSchemaName in oneToManyRelationshipMetadataCache)
                    ) {
                        let record1 = new DataverseRecord(
                            sourceDataverseRecord.Id
                            , entityLogicalName1
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].SchemaName
                            , sourceDataverseRecord.DisplayName
                            , sourceDataverseRecord.EntityImage
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].DisplayName.UserLocalizedLabel.Label
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].ObjectTypeCode
                        );

                        let primaryNameAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryNameAttribute;
                        let primaryImageAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryImageAttribute;

                        let _id = targetEntity.getId(ConnectionViewer.cv);
                        if (!_id) return [];
                        else {
                            let record2 = new DataverseRecord(
                                _id
                                , entityLogicalName2
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].SchemaName
                                , targetEntity.EntityRecord[primaryNameAttributeName2]
                                , targetEntity.EntityRecord[primaryImageAttributeName2]
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].DisplayName.UserLocalizedLabel.Label
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].ObjectTypeCode
                            );

                            let entName = oneToManyRelationshipMetadataCache[otmrSchemaName].ReferencingEntity;
                            let attName = oneToManyRelationshipMetadataCache[otmrSchemaName].ReferencingAttribute;

                            let con = new DataverseLink(
                                MyGeneralLibrary.getNewGuid() // Because it represents a OneToMany relationship, not a Dataverse connection record, create a new GUID dynamically.
                                , record1
                                , record2
                                , record1.DisplayName
                                , record2.DisplayName
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , attributeMetadataCache[entName][attName].DisplayName.UserLocalizedLabel.Label
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , DataverseLinkTypeEnum.OneToMany
                                , otmrSchemaName
                            );

                            list.push(con);
                        }
                    }
                }
            }
        }

        return list;
    }
   /**
    * Receives a set of records retrieved from a Dataverse ManyToOne relationship, converts them to a new DataverseLink instance, and returns an array of them.
    * DataverseLink records 1 contain many records in OneToMany, and record2 stores records for One.
    * @param manyToOneRelationshipEntitiesDic {object} Dictionary representing a set of records retrieved in a Dataverse ManyToOne association
    * @param manyToOneRelationshipEntitiesDic {object} Dictionary representing the records obtained by ManyToOne relationship of Dataverse 
    */
    static ConvertManyToOneRelationshipEntitiesToDataverseLinkList(
        sourceDataverseRecord: DataverseRecord
        , manyToOneRelationshipEntitiesDic: { [key: string]: WebAPIRecord[] } | null
        , entityMetadataCacheEntityLogicalName: any
        , oneToManyRelationshipMetadataCache: any
        , attributeMetadataCache: any): DataverseLink[] {
        let list: DataverseLink[] = [];

        if (manyToOneRelationshipEntitiesDic != null) {
            for (let otmrSchemaName in manyToOneRelationshipEntitiesDic) {
                for (let i = 0; i < manyToOneRelationshipEntitiesDic[otmrSchemaName].length; i++) {
                    let targetEntity: WebAPIRecord = manyToOneRelationshipEntitiesDic[otmrSchemaName][i];

                    let entityLogicalName1 = sourceDataverseRecord.EntityLogicalName;
                    let entityLogicalName2 = targetEntity.getEntityLogicalName(ConnectionViewer.cv);

                    if ((entityLogicalName1 in entityMetadataCacheEntityLogicalName)
                        && (entityLogicalName2 in entityMetadataCacheEntityLogicalName)
                        && oneToManyRelationshipMetadataCache != null
                        && (otmrSchemaName in oneToManyRelationshipMetadataCache)
                    ) {
                        let record1 = new DataverseRecord(
                            sourceDataverseRecord.Id
                            , entityLogicalName1
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].SchemaName
                            , sourceDataverseRecord.DisplayName
                            , sourceDataverseRecord.EntityImage
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].DisplayName.UserLocalizedLabel.Label
                            , entityMetadataCacheEntityLogicalName[entityLogicalName1].ObjectTypeCode
                        );

                        let primaryNameAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryNameAttribute;
                        let primaryImageAttributeName2 = entityMetadataCacheEntityLogicalName[entityLogicalName2].PrimaryImageAttribute;

                        let _id = targetEntity.getId(ConnectionViewer.cv);
                        if (!_id) return [];
                        else {
                            let record2 = new DataverseRecord(
                                _id
                                , entityLogicalName2
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].SchemaName
                                , targetEntity.EntityRecord[primaryNameAttributeName2]
                                , targetEntity.EntityRecord[primaryImageAttributeName2]
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].DisplayName.UserLocalizedLabel.Label
                                , entityMetadataCacheEntityLogicalName[entityLogicalName2].ObjectTypeCode
                            );

                            let entName = oneToManyRelationshipMetadataCache[otmrSchemaName].ReferencingEntity;
                            let attName = oneToManyRelationshipMetadataCache[otmrSchemaName].ReferencingAttribute;

                            let con = new DataverseLink(
                                MyGeneralLibrary.getNewGuid() // Because it represents a OneToMany relationship, not a Dataverse connection record, create a new GUID dynamically.
                                , record1
                                , record2
                                , record1.DisplayName
                                , record2.DisplayName
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , attributeMetadataCache[entName][attName].DisplayName.UserLocalizedLabel.Label
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , null // null, because it represents a OneToMany relationship, not a Dataverse connection record
                                , DataverseLinkTypeEnum.OneToMany
                                , otmrSchemaName
                            );

                            list.push(con);
                        }
                    }
                }
            }
        }

        return list;
    }
    /**
     * Takes two instances and checks whether they are the same combination of DataverseRecords.
     * It does not matter what type of connection it is. It is not a judgment of whether it is an equivalent DataverseLink.
     * @return {boolean} true if the combination is the same, false otherwise
     */
    static HaveSameCombinationOfDataverseRecords(con1: DataverseLink, con2: DataverseLink): boolean {
        return (con1.DataverseRecord1.Id == con2.DataverseRecord1.Id && con1.DataverseRecord2.Id == con2.DataverseRecord2.Id)
            || (con1.DataverseRecord1.Id == con2.DataverseRecord2.Id && con1.DataverseRecord2.Id == con2.DataverseRecord1.Id);
    }
    /**
     * Takes two instances and checks whether they can be considered to be DataverseLinks with equivalent meanings.
     * It also asks about the type of connection.
     * @return {boolean} true if it is a DataverseLink with equivalent meaning, false otherwise
     */
    static HaveSameContext(con1: DataverseLink, con2: DataverseLink): boolean {
        if (con2.LinkType == DataverseLinkTypeEnum.Connection && con1.LinkType == DataverseLinkTypeEnum.Connection) {
            // For connected entity records.
            // For combinations related to the same connection, equivalence.
            if (con1.LinkId == con2.LinkId
                ||
                con1.LinkId == con2.RelatedConnectionId
            ) {
                return true;
            }
        } else if (con2.LinkType == DataverseLinkTypeEnum.ManyToMany && con1.LinkType == DataverseLinkTypeEnum.ManyToMany) {
            // For ManyToMany relationships.
            // If they have the same intermediate table ID, they are equivalent.
            if (con2.LinkId == con1.LinkId) {
                return true;
            }

        } else if (con2.LinkType == DataverseLinkTypeEnum.OneToMany && con1.LinkType == DataverseLinkTypeEnum.OneToMany) {
            // For OneToMany relationships.
            // If the same card ID combination obtained with the same OneToMany metadata, they are equivalent.
            if ((con2.OTMRelationshipSchemaName == con1.OTMRelationshipSchemaName) &&
                DataverseLink.HaveSameCombinationOfDataverseRecords(con1, con2)
            ) {
                return true;
            }
        }
        return false;
    }
    static getDataverseLinksHaveRecordId(dataverseLinkArray: DataverseLink[], recordId: string): DataverseLink[] {
        const dvLinklist: DataverseLink[] = [];
        for (let i = 0; i < dataverseLinkArray.length; i++) {
            if (dataverseLinkArray[i].DataverseRecord1.Id == recordId || dataverseLinkArray[i].DataverseRecord2.Id == recordId) {
                dvLinklist.push(dataverseLinkArray[i]);
            }
        }
        return dvLinklist;
    }
}
/**
 * In Dataverse Link, enum representing one of the types of connection records, OneToMany relationships, or ManyToMany relationships
 */
export enum DataverseLinkTypeEnum {
    Connection,
    OneToMany,
    ManyToMany
}
