import { ConnectionViewer } from "../ConnectionViewer";
import { CardsLayout } from "../api/CardsLayout";
import { DataverseRecord } from "../api/DataverseRecord";
import { SampleDemo_Data } from "../api/SampleDemo_Data";
import { SampleDemo_Const } from "../api/SampleDemo_Const";
import { Helper } from "../api/Helper";
import { WebAPIRecord } from "../api/WebAPIRecord";
import { WebAPIHelper, WebAPI } from "./WebAPIHelper";

/**
 * Classes that access Dataverse
 * Using the Dataverse Web API.
 */
export class DataverseAccessWebAPI {
    /**
     * An url part for a version for Web API
     */
    static readonly WebAPIVersion = "/api/data/v9.2";
    /**
    * Maximum number of records to retrieve in a single Web API request
    */
    static readonly MaxPageSize = 5000;
    /**
    * Reference to the ConnectionViewer instance
    */
    static cv: ConnectionViewer;
    /**
    * Dictionary in which the object of the entity metadata in the retrieval process is entered as a value.
    * The key is the logical name of the entity (lowercase)
    */
    asyncEMRetrievedEMDicLogical: { [key: string]: WebAPI.entityMetadataInterface };
    /**
    * Dictionary in which the object of the entity metadata in the retrieval process is entered as a value.
    * The key is the ObjectTypeCode of the entity
    */
    asyncEMRetrievedEMDicOTC: { [key: number]: WebAPI.entityMetadataInterface };
    /**
    * Dictionary to find the logical name of the entity from the entity set name in the retrieval process.
    * The key is the entity set name (lowercase).
    * The value is the logical name of the entity.
    */
    asyncEMRetrievedEMDicEntitySetName: { [key: string]: string };
    /**
    * Dictionary in which the object of OneToManyRelationshipMetadata in the retrieval process is entered as a value.
    * The key is the schema name of OneToManyRelationshipMetadata (case sensitive)
    */
    asyncOTMRetrievedMetadataDicSchema: { [key: string]: WebAPI.OTMRelationshipInterface };
    /**
    * Dictionary in which the object of ManyToOneRelationshipMetadata in the retrieval process is entered as a value.
    * The key is the schema name of ManyToOneRelationshipMetadata (case sensitive)
    */
    asyncMTORetrievedMetadataDicSchema: { [key: string]: WebAPI.OTMRelationshipInterface };
    /**
    * Dictionary in which the object of ManyToManyRelationshipMetadata in the retrieval process is entered as a value.
    * The key is the schema name of ManyToManyRelationshipMetadata (case sensitive)
    */
    asyncMTMRetrievedMetadataDicSchema: { [key: string]: WebAPI.MTMRelationshipInterface };
    /**
    * Array of Dataverse connection records retrieved in one asynchronous process
    */
    asyncRetrievedConnRetrievedEC: WebAPIRecord[] | null;
    /**
    * Array of entity logical names and record objects of Dataverse records obtained 
    * as target Dataverse records corresponding to the time of Dataverse connection 
    * record group asyncRetrievedConnRetrievedEC obtained in one asynchronous process.
    */
    asyncRetrievedConnTargetDataverseRecordRetrievedEC: WebAPIRecord[];
    /**
    * Dictionary to store Dataverse records (Entity) obtained by OneToMany relationship in one asynchronous process
    * The key is SchemaName of OneToManyRelationshipMetadata
    * The value is an array that stores the records (entity) obtained by searching for the key OneToManyRelationshipMetadata
    */
    asyncRetrievedOTMRRetrievedECDic: { [key: string]: WebAPIRecord[] } | null;
    /**
    * Dictionary to store Dataverse records (Entity) obtained by ManyToOne relationship in one asynchronous process
    * The key is SchemaName of OneToManyRelationshipMetadata
    * The value is an array that stores the records (entity) obtained by searching for the key OneToManyRelationshipMetadata
    */
    asyncRetrievedMTORRetrievedECDic: { [key: string]: WebAPIRecord[] } | null;
    /**
    * Dictionary to store Dataverse records (Entity) obtained by ManyToMany relationship in one asynchronous process
    * The key is SchemaName of ManyToManyRelationshipMetadata
    * The value is an array that stores the records (entity) obtained by searching for the key ManyToManyRelationshipMetadata
    */
    asyncRetrievedMTMRRetrievedECDic: { [key: string]: WebAPIRecord[] } | null;
    /**
    * Dictionary that includes the records obtained as target Dataverse records corresponding to 
    * the time of ManyToMany record group asyncRetrievedMTMRRetrievedECDic obtained in one asynchronous process.
    * The key is the ID of the MayToMany record
    * The value is an array of EntityCollection representing the corresponding target Dataverse record group
    * 
    */
    asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic: { [key: string]: WebAPIRecord[] };
    constructor(connectionViewer: ConnectionViewer) {
        DataverseAccessWebAPI.cv = connectionViewer;
        this.asyncOTMRetrievedMetadataDicSchema = {};
        this.asyncMTORetrievedMetadataDicSchema = {};
        this.asyncMTMRetrievedMetadataDicSchema = {};
        this.asyncEMRetrievedEMDicLogical = {};
        this.asyncEMRetrievedEMDicOTC = {};
        this.asyncEMRetrievedEMDicEntitySetName = {};

        this.initRelationshipMetadataCacheExecutor = this.initRelationshipMetadataCacheExecutor.bind(this);
        this.retrieveRMCacheExecutor = this.retrieveRMCacheExecutor.bind(this);
        this.retrieveAnnotationRMCacheExecutor = this.retrieveAnnotationRMCacheExecutor.bind(this);
        this.initDataverseRecordAccessExecutor = this.initDataverseRecordAccessExecutor.bind(this);
    }
    /**
    * Access first Dataverse.
    * Get and cache metadata, and retrieve target Dataverse records.
    * Promise returns a single record.
    * @returns_by_resolve {WebAPIRecord} A record retrieved
    */
    initDataverseAccessExecutor(resolve: (value: WebAPIRecord | PromiseLike<WebAPIRecord>) => void, reject: (reason?: any) => void): void {
        ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(true);

        const myPromise = new Promise<void>(DataverseAccessWebAPI.cv.dataverseAccess.initAllMetadataCacheExecutor);
        myPromise
            .then(() => {
                return new Promise<WebAPIRecord>(DataverseAccessWebAPI.cv.dataverseAccess.initDataverseRecordAccessExecutor);
            })
            .then((record: WebAPIRecord) => {
                ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
                resolve(record);
            })
            .catch((e: any) => {
                reject(e.toString());
            });

        return;
    }
    /**
    * Retrieve all metadata caches.
    * Get OneToManyRelationship and ManyToManyRelationship metadata first.
    * Next, get the metadata of Entity. At this time, in addition to the entity specified in Config,
    * get the Entity related to OneToManyRelationship and ManyToManyRelationship.
    * Next, cache the retrieved AttributeMetadata for easy handling.
    */
    async initAllMetadataCacheExecutor(resolve: (value: void) => void, reject: (reason?: any) => void): Promise<void> {
        const myPromise = new Promise<string[]>(DataverseAccessWebAPI.cv.dataverseAccess.initRelationshipMetadataCacheExecutor);
        myPromise
            .then((entityList: string[]) => {
                return DataverseAccessWebAPI.cv.dataverseAccess.initEntityMetadataCacheDeferredized(entityList);
            }).catch((e: any) => {
                reject(e.toString());
            }).finally(() => {
                // Already retrieved Attribute metadata.
                DataverseAccessWebAPI.cv.AttributeMetadataCache = {};

                for (let entityName in DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName) {
                    for (let i = 0; i < DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityName].Attributes.length; i++) {
                        let attributeMetadata = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityName].Attributes[i];
                        if (DataverseAccessWebAPI.cv.AttributeMetadataCache[entityName] == null) {
                            DataverseAccessWebAPI.cv.AttributeMetadataCache[entityName] = {};
                        }
                        DataverseAccessWebAPI.cv.AttributeMetadataCache[entityName][attributeMetadata.LogicalName] = attributeMetadata;
                    }
                }

                resolve();
            });

        return;
    }
    /**
    * Retrieve OneToManyRelationshipMetadata, ManyToOneRelationshipMetadata and ManyToManyRelationshipMetadata,
    * and cache them in this.connectionViewer.OneToManyRelationshipMetadataCache,
    * CV.this.connectionViewer.ManyToOneRelationshipMetadataCache
    * and CV.this.connectionViewer.ManyToManyRelationshipMetadataCache, respectively.
    * At the same time, the entity metadata obtained in the process of obtaining them is also cached in
    * this.connectionViewer.EntityMetadataCacheKeyIsEntityLogicalName and
    * CV.this.connectionViewer.EntityMetadataCacheKeyIsObjectTypeCode.
    * @returns
    * @returns_by_resolve {string[]} An array of logical names found in process of retrieving related metadata.
    */
    initRelationshipMetadataCacheExecutor(resolve: (value: string[] | PromiseLike<string[]>) => void, reject: (reason?: any) => void): void {
        let entityList: string[];
        const myPromise = new Promise<string[]>(DataverseAccessWebAPI.cv.dataverseAccess.retrieveRMCacheExecutor);
        myPromise
            .then((list: string[]) => {
                entityList = list;
                DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache = DataverseAccessWebAPI.cv.dataverseAccess.asyncOTMRetrievedMetadataDicSchema;
                DataverseAccessWebAPI.cv.ManyToManyRelationshipMetadataCache = DataverseAccessWebAPI.cv.dataverseAccess.asyncMTMRetrievedMetadataDicSchema;

                try {
                    return new Promise<WebAPI.OTMRelationshipInterface>(this.retrieveAnnotationRMCacheExecutor);
                } catch (e: any) {
                    reject(e.message);
                }
            }).then((annotationRM: WebAPI.OTMRelationshipInterface | undefined) => {
                if (annotationRM)
                    DataverseAccessWebAPI.cv.AnnotationRelationshipMetadataCache = annotationRM;
                resolve(entityList);
            }).catch((e: any) => {
                reject(e.toString());
            });

        return;
    }
    /**
    * Retrieve cand cache OneToManyRelationshipMetadata and ManyToManyRelationSHipMetadata by accessing Dataverse.
    * @returns 
    * @returns_by_resolve {string[]} An array of related entity logical names. There are no duplications.
    */
    retrieveRMCacheExecutor(resolve: (value: string[] | PromiseLike<string[]>) => void, reject: (reason?: any) => void): void {
        // A array for relationsihp schema names to be retrieved
        const asyncRMToBeRetrievedList = DataverseAccessWebAPI.cv.config.RelationshipSchemaNameList;
        if (0 < asyncRMToBeRetrievedList.length) {
            if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                try {
                    const relationshipArray: any[] = SampleDemo_Data.RelationshipMetadataSample;
                    // A list of logical names of entities on the 1 side or N side of 1:N, or on both sides of N:N. No duplicate data is stored.
                    const entityList: string[] = [];

                    for (const relationship of relationshipArray) {
                        if (0 <= relationship["@odata.type"].indexOf("OneToManyRelationshipMetadata")) {
                            const otmRelationship: WebAPI.OTMRelationshipInterface = relationship;
                            // Cache only if it is a relationship specified in the config.
                            if (ConnectionViewer.cv.config.RelationshipSchemaNameList.some((schemaName) => otmRelationship.SchemaName === schemaName)) {
                                DataverseAccessWebAPI.cv.dataverseAccess.asyncOTMRetrievedMetadataDicSchema[otmRelationship.SchemaName] = otmRelationship;
                                if (entityList.indexOf(relationship.ReferencedEntity) < 0) entityList.push(relationship.ReferencedEntity);
                                if (entityList.indexOf(relationship.ReferencingEntity) < 0) entityList.push(relationship.ReferencingEntity);
                            }
                        } else if (0 <= relationship["@odata.type"].indexOf("ManyToManyRelationshipMetadata")) {
                            const mtmRelationship: WebAPI.MTMRelationshipInterface = relationship;
                            DataverseAccessWebAPI.cv.dataverseAccess.asyncMTMRetrievedMetadataDicSchema[mtmRelationship.SchemaName] = mtmRelationship;

                            if (entityList.indexOf(mtmRelationship.Entity1LogicalName) < 0) entityList.push(mtmRelationship.Entity1LogicalName);
                            if (entityList.indexOf(mtmRelationship.Entity2LogicalName) < 0) entityList.push(mtmRelationship.Entity2LogicalName);
                            if (entityList.indexOf(mtmRelationship.IntersectEntityName) < 0) entityList.push(mtmRelationship.IntersectEntityName);
                        }
                    }

                    resolve(entityList);
                    setTimeout(function () {
                        if (resolve)
                            resolve(entityList);
                    }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
                } catch (error) {
                    reject(`Error in retrieveRMCacheExecutor(): ${error}`);
                }
            } else {
                // Example: /RelationshipDefinitions?$filter=SchemaName eq 'contact_customer_accounts' or SchemaName eq 'account_parent_account' or SchemaName eq 'opportunitycompetitors_association'
                let uri = "/RelationshipDefinitions";

                // Create a string for $filter
                for (let i = 0; i < asyncRMToBeRetrievedList.length; i++) {
                    if (i == 0) uri += "?$filter=";
                    else uri += " or ";
                    uri += "SchemaName eq '" + asyncRMToBeRetrievedList[i] + "'";
                }

                WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                    .then((request) => {
                        let relationshipArray: any[] = JSON.parse(request.response).value;
                        // A list of logical names of entities on the 1 side or N side of 1:N, or on both sides of N:N. No duplicate data is stored.
                        let entityList: string[] = [];

                        for (const relationship of relationshipArray) {
                            if (0 <= relationship["@odata.type"].indexOf("OneToManyRelationshipMetadata")) {
                                let otmRelationship: WebAPI.OTMRelationshipInterface = relationship;
                                DataverseAccessWebAPI.cv.dataverseAccess.asyncOTMRetrievedMetadataDicSchema[otmRelationship.SchemaName] = otmRelationship;

                                if (entityList.indexOf(relationship.ReferencedEntity) < 0) entityList.push(relationship.ReferencedEntity);
                                if (entityList.indexOf(relationship.ReferencingEntity) < 0) entityList.push(relationship.ReferencingEntity);
                            } else if (0 <= relationship["@odata.type"].indexOf("ManyToManyRelationshipMetadata")) {
                                let mtmRelationship: WebAPI.MTMRelationshipInterface = relationship;
                                DataverseAccessWebAPI.cv.dataverseAccess.asyncMTMRetrievedMetadataDicSchema[mtmRelationship.SchemaName] = mtmRelationship;

                                if (entityList.indexOf(mtmRelationship.Entity1LogicalName) < 0) entityList.push(mtmRelationship.Entity1LogicalName);
                                if (entityList.indexOf(mtmRelationship.Entity2LogicalName) < 0) entityList.push(mtmRelationship.Entity2LogicalName);
                                if (entityList.indexOf(mtmRelationship.IntersectEntityName) < 0) entityList.push(mtmRelationship.IntersectEntityName);
                            }
                        }

                        if (resolve)
                            resolve(entityList);
                    })
                    .catch(function (e) {
                        if (reject)
                            reject(e.message);
                    });
            }
        }
        else {
            resolve([]);
        }
        return;
    }
    /**
    * Cache RelationshipMetadata between the annotation entity where CardsLayout is saved and the main card entity by accessing Dataverse.
    * @returns
    * @returns_by_resolve {WebAPI.OTMRelationshipInterface} RelationshipMetadata retrieved
    */
    retrieveAnnotationRMCacheExecutor(resolve: (value: WebAPI.OTMRelationshipInterface | PromiseLike<WebAPI.OTMRelationshipInterface>) => void, reject: (reason?: any) => void): void {
        // entityLogicalName for the entity of the form on which this PCF control will be shown
        const entityLogicalName = DataverseAccessWebAPI.cv.paramEntityLogicalName;

        if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
            let otmRelationship = SampleDemo_Data.AnnotationRelationshipMetadataSample;

            setTimeout(() => {
                resolve(otmRelationship);
            }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
        } else {
            // Example: /RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata?$filter=ReferencedEntity eq 'contact' and ReferencingEntity eq 'annotation' and ReferencingAttribute eq 'objectid'
            let uri = "/RelationshipDefinitions/Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata?$filter=ReferencedEntity eq '";
            uri += DataverseAccessWebAPI.cv.paramEntityLogicalName
            uri += "' and ReferencingEntity eq 'annotation' and ReferencingAttribute eq 'objectid'";

            WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                .then((request) => {
                    let relationshipArray: any[] = JSON.parse(request.response).value;
                    let otmRelationship: WebAPI.OTMRelationshipInterface = relationshipArray[0] // So there should be only one
                    resolve(otmRelationship);
                });
        }
        return;
    }
    /**
    * Cache entity metadata by accessing Dataverse.
    * @param entityListFromRelationship {string[]} Array of logical names of related entities found in the process of obtaining related metadata
    */
    async initEntityMetadataCacheDeferredized(entityListFromRelationship: string[]): Promise<void> {
        // First, list up the entities that should cache metadata in all related to connection data and three relationships.
        // connection
        let entitiesToBeCached: string[] = ([] as string[]).concat(entityListFromRelationship);
        for (let i = 0; i < DataverseAccessWebAPI.cv.config.EntitiesForConnectionList.length; i++) {
            let entityName = DataverseAccessWebAPI.cv.config.EntitiesForConnectionList[i];
            if (entitiesToBeCached.indexOf(entityName) < 0) entitiesToBeCached.push(entityName);
        }
        // Add the "connection" entity itself
        if (entitiesToBeCached.indexOf("connection") < 0) entitiesToBeCached.push("connection");

        await DataverseAccessWebAPI.cv.dataverseAccess.retrieveEMCachePromise(entitiesToBeCached);
        DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName = DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicLogical;
        DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsObjectTypeCode = DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicOTC;
        DataverseAccessWebAPI.cv.EntityLogicalNameKeyIsEntitySetName = DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicEntitySetName;

        return;
    }
    /**
    * Returns a Promise to retrieve EntityMetadata from Dataverse and cache them.
    * @param asyncEMToBeRetrievedEMList {string[]} Array of entity names to be retrieved
    */
    retrieveEMCachePromise(asyncEMToBeRetrievedEMList: string[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Actually retrieve the metadata of the entity in this.connectionViewer.dataverseAccess.asyncEMToBeRetrievedEntityMetadataList from Dataverse.
            if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                for (const em of SampleDemo_Data.EntityMetadataSample) {
                    DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicLogical[em.LogicalName] = em;
                    DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicOTC[em.ObjectTypeCode] = em;
                    DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicEntitySetName[em.EntitySetName] = em.LogicalName;
                }

                setTimeout(function () {
                    resolve();
                }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
            } else {
                // Example: /EntityDefinitions?$select=LogicalName,EntitySetName,ObjectTypeCode,PrimaryIdAttribute,PrimaryImageAttribute,PrimaryNameAttribute,SchemaName,DisplayName&$filter=LogicalName eq 'contact' or LogicalName eq 'account'&$expand=Attributes($select=AttributeType,SchemaName,DisplayName,LogicalName,IsPrimaryId,IsPrimaryName;$filter=IsPrimaryId eq true or IsPrimaryName eq true or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Lookup' or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Customer' or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Uniqueidentifier')
                let uri = "/EntityDefinitions?$select=LogicalName,EntitySetName,ObjectTypeCode,PrimaryIdAttribute,PrimaryImageAttribute,PrimaryNameAttribute,SchemaName,DisplayName&$filter=";

                // Create a string for $filter
                for (let i = 0; i < asyncEMToBeRetrievedEMList.length; i++) {
                    if (i > 0) uri += " or ";
                    uri += "LogicalName eq '" + asyncEMToBeRetrievedEMList[i] + "'";
                }
                uri += "&$expand=Attributes($select=AttributeType,SchemaName,DisplayName,LogicalName,IsPrimaryId,IsPrimaryName;$filter=IsPrimaryId eq true or IsPrimaryName eq true or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Lookup' or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Customer' or AttributeType eq Microsoft.Dynamics.CRM.AttributeTypeCode'Uniqueidentifier')";

                WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                    .then((request) => {
                        const entityMultiple: WebAPI.entityMultipleResponseInterface = JSON.parse(request.response);
                        const entityArray: WebAPI.entityMetadataInterface[] = entityMultiple.value;

                        for (const em of entityArray) {
                            DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicLogical[em.LogicalName] = em;
                            DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicOTC[em.ObjectTypeCode] = em;
                            DataverseAccessWebAPI.cv.dataverseAccess.asyncEMRetrievedEMDicEntitySetName[em.EntitySetName] = em.LogicalName;
                        }
                        resolve();
                    })
                    .catch((e: any) => { reject(e.message + " in retrieveEMCachePromise()"); });
            }
        });
    }
    /**
    * Process to retrieve target record by accessing Dataverse.
    * Metadata has already been retrieved and cached.
    * @returns_by_resolve {WebAPIRecord} A record
    */
    initDataverseRecordAccessExecutor(resolve: (value: WebAPIRecord | PromiseLike<WebAPIRecord>) => void, reject: (reason?: any) => void): void {
        if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
            let webAPIRecord = SampleDemo_Data.getPrimaryRecord();

            setTimeout(function () {
                resolve(webAPIRecord);
            }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
        } else {
            let entityLogicalName = DataverseAccessWebAPI.cv.paramEntityLogicalName;
            let id = DataverseAccessWebAPI.cv.paramGuid;

            if (DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName]) {
                // Get the minimum data for records with ManyToOneRelationship. In the days of Sdk.Soap.js, it was enough to get only the Lookup field.
                // Example: /opportunities(4883f907-720f-e711-80e8-480fcff29761)?$select=opportunityid,name,parentaccountid&$expand=parentaccountid($select=accountid,name)

                let entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "opportunities"
                let primaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryIdAttribute; // "opportunityid"
                let primaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryNameAttribute; // "name"
                let primaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryImageAttribute; // null とか、 "entityimage"
                // Array of OneToManyRelationshipMetadata where Dataverse records of ManyToOne relationship should be retrieved
                let manyToOneRelationshipMetadataArray: WebAPI.OTMRelationshipInterface[] = DataverseAccessWebAPI.cv.dataverseAccess.getManyToOneRelationshipMetadataArray(entityLogicalName);
                // Array of SchemaName of OneToManyRelationshipMetadata where Dataverse records of ManyToOne relationship should be retrieved
                let manyToOneSchemaNames: string[] = []; // ["opportunity_parent_account"]
                let manyToOneNavPropName: string[] = []; // ["parentaccountid"]
                for (let i in manyToOneRelationshipMetadataArray) {
                    let mtorm = manyToOneRelationshipMetadataArray[i];
                    if (mtorm.ReferencingEntity == entityLogicalName) {
                        manyToOneSchemaNames.push(mtorm.SchemaName);
                        manyToOneNavPropName.push(mtorm.ReferencingEntityNavigationPropertyName);
                    }
                }
                let columnsList: string[] = (primaryImageAttributeName) ? ([] as string[]).concat(primaryIdAttributeName, primaryNameAttributeName, primaryImageAttributeName, manyToOneNavPropName)
                    : ([] as string[]).concat(primaryIdAttributeName, primaryNameAttributeName, manyToOneNavPropName);
                // Create a string for $select
                let uri = "/" + entitySetName + "(" + id + ")?$select=";
                for (let i = 0; i < columnsList.length; i++) {
                    if (columnsList[i]) {
                        if (i > 0) uri += ",";
                        uri += columnsList[i];
                    }
                }
                // Create a string for $expand
                for (let i = 0; i < manyToOneSchemaNames.length; i++) {
                    if (i == 0) { uri += "&$expand="; }
                    else { uri += ","; }
                    uri += manyToOneNavPropName[i] + "($select=";
                    let expEntityLogicalName = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[manyToOneSchemaNames[i]].ReferencedEntity; // "account"
                    let expPrimaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryIdAttribute; // "accountid"
                    uri += expPrimaryIdAttributeName;
                    let expPrimaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryNameAttribute; // "name"
                    uri += "," + expPrimaryNameAttributeName;
                    let expPrimaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryImageAttribute; // null とか "entityimage"
                    if (expPrimaryImageAttributeName) uri += "," + expPrimaryImageAttributeName;
                    uri += ")";
                }

                WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                    .then((request) => {
                        // A single record is returned
                        let record = JSON.parse(request.response);
                        let webAPIRecord = WebAPIRecord.CreateWebAPIRecordSingle(record);
                        if (webAPIRecord) resolve(webAPIRecord);
                    })
                    .catch((e: any) => { reject(e.message); });
            } else {
                reject("Metadata of entity " + entityLogicalName + " has not been retrieved. Please make sure that the entity is set in Config.");
            }
        }

        return;
    }
    /**
    * For a specific Dataverse record,
    *   i. Connection (visual is Connector), and
    *  ii. Dataverse records for one-to-many relationships, and
    * iii. Dataverse records for many-to-one relationships, and
    *  iv. Asynchronous processing to retrieve and display Dataverse records of many-to-many relationships.
    * Show only one-to-many, many-to-one, and many-to-many relationships.
    * For cards in a connector (such as connections and xx relationships), it doesn't know if there is a Dataverse record for that Dataverse record 
    * because it doesn't do anything about the connection, one-to-many, many-to-one, or many-to-many relationship.
    * @param record {DataverseRecord} A Dataverse record
    */
    retrieveConnAndOTMAndMTOAndMTMRPromise(record: DataverseRecord): Promise<DataverseRecord> {
        return new Promise<DataverseRecord>((resolve, reject) => {
            const promiseArray = [
                this.retrieveConnPromise(record), // Retrieve connection data
                this.retrieveOTMRDataverseRecordsPromise(record), // Retrieve One-to-Many data
                this.retrieveMTORDataverseRecordsPromise(record), // Retrieve Many-to-One data
                this.retrieveMTMRDataverseRecordsPromise(record) /// Retrieve Many-to-Many data
            ];
            Promise.all(promiseArray).then(() => {
                resolve(record);
            }).catch((e: any) => {
                reject(e.message);
            });
        });
    }
    /**
    * Store the connection records related to a specific Dataverse record in a global variable.
    * @param record {DataverseRecord} A specific Dataverse record
    */
    retrieveConnPromise(record: DataverseRecord): Promise<void> {
        // console.log("in retrieveConnPromise(), record", record);
        return new Promise<void>((resolve, reject) => {
            this.asyncRetrievedConnRetrievedEC = null;

            // When you register one connection on the GUI, two connection records are generated as internal to Dataverse.
            // (Two records set for each source and destination) 
            // Here, the connection source (DataverseRecord1) searches only those that hit the target Dataverse record.
            if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                setTimeout(function () {
                    let webAPIRecordArray = SampleDemo_Data.getConnectionRecords(record);

                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnRetrievedEC = webAPIRecordArray;
                    DataverseAccessWebAPI.cv.dataverseAccess.retrieveConnTargetDataverseRecordsPromise(DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnRetrievedEC)
                        .then(() => {
                            resolve();
                        });
                }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
            } else {
                // Example:
                // <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                //   <entity name='connection'>
                //     <attribute name='connectionid' />
                //     <attribute name='description' />
                //     <attribute name='record1id' />
                //     <attribute name='record1objecttypecode' />
                //     <attribute name='record1roleid' />
                //     <attribute name='record2id' />
                //     <attribute name='record2objecttypecode' />
                //     <attribute name='record2roleid' />
                //     <attribute name='relatedconnectionid' />
                //     <filter type='and'>
                //       <condition attribute='record1id' operator='eq' uiname='' uitype='contact' value='{XXXXXXXXX}' />
                //     </filter>
                //   </entity>
                // </fetch>
                //
                // Using the following:
                //   "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>  <entity name='connection'>    <attribute name='connectionid' />    <attribute name='description' />    <attribute name='record1id' />    <attribute name='record1objecttypecode' />    <attribute name='record1roleid' />    <attribute name='record2id' />    <attribute name='record2objecttypecode' />    <attribute name='record2roleid' />    <attribute name='relatedconnectionid' />    <filter type='and'>      <condition attribute='record1id' operator='eq' uiname='' uitype='contact' value='{XXXXXXXXX}' />    </filter>  </entity></fetch>"

                let uri = "/connections?fetchXml=<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>  <entity name='connection'>    <attribute name='connectionid' />    <attribute name='description' />    <attribute name='record1id' />    <attribute name='record1objecttypecode' />    <attribute name='record1roleid' />    <attribute name='record2id' />    <attribute name='record2objecttypecode' />    <attribute name='record2roleid' />    <attribute name='relatedconnectionid' />    <filter type='and'>      <condition attribute='record1id' operator='eq' uiname='' uitype='";
                uri += record.EntityLogicalName;
                uri += "' value='{";
                uri += record.Id;
                uri += "}' />    </filter>  </entity></fetch>";

                WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                    .then((request) => {
                        // Multiple records are returned
                        let recordArray: WebAPIRecord[] = WebAPIRecord.CreateWebAPIRecordMultiple(JSON.parse(request.response));

                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnRetrievedEC = recordArray;

                        return DataverseAccessWebAPI.cv.dataverseAccess.retrieveConnTargetDataverseRecordsPromise(DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnRetrievedEC);
                    }).then(() => {
                        resolve();
                    })
                    .catch((e) => {
                        reject(e.message);
                    });
            }
        });
    }
    /**
    * Store the Dataverse records that are the targets of the connection records related to a specific Dataverse record in a global variable.
    * Even if the connection record can be retrieved, the Dataverse record that is the target may not be retrieved.
    */
    retrieveConnTargetDataverseRecordsPromise(connectionRecords: WebAPIRecord[]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.asyncRetrievedConnTargetDataverseRecordRetrievedEC = [];

            // Execute asynchronous processing in parallel for the array and wait for all of them to finish. Use Promise.all().
            const promiseArray: Promise<void>[] = [];
            const getConnRecord = (connectionRecord: WebAPIRecord): Promise<void> => {
                return new Promise((resolve, reject) => {
                    if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                        setTimeout(function () {
                            // A single record is returned
                            let webAPIRecord: WebAPIRecord | null = SampleDemo_Data.getConnectionTargetDataverseRecords(connectionRecord);
                            if (webAPIRecord) DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnTargetDataverseRecordRetrievedEC.push(webAPIRecord);
                            resolve();
                        }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
                    } else {
                        // Unlike Sdk.Soap.js, in Web API, you cannot get the entity logical name on the record2id side. Instead, you can get the objectTypeCode.
                        // var entityLogicalName = connectionRecord.view().attributes["record2id"].value.Type;
                        let objectTypeCode = connectionRecord.EntityRecord["record2objecttypecode"];
                        let emCache = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsObjectTypeCode[objectTypeCode];
                        if (!emCache) {
                            // At this time, during card replay, etc., you are trying to handle data from an entity that is not covered by the current config.
                            resolve();
                        } else {
                            let entityLogicalName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsObjectTypeCode[objectTypeCode].LogicalName;

                            if (0 <= DataverseAccessWebAPI.cv.config.EntitiesForConnectionList.indexOf(entityLogicalName)) {
                                // Example: /contacts(fc82f907-720f-e711-80e8-480fcff29761)?$select=contactid,fullname,entityimage
                                let entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsObjectTypeCode[objectTypeCode].EntitySetName;
                                let uri = "/" + entitySetName + "(" + connectionRecord.EntityRecord["_record2id_value"] + ")";

                                uri += "?$select=";
                                let primaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryIdAttribute;
                                uri += primaryIdAttributeName;
                                let primaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryNameAttribute;
                                uri += "," + primaryNameAttributeName;
                                let primaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryImageAttribute;
                                if (primaryImageAttributeName) uri += "," + primaryImageAttributeName;

                                WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                                    .then((request) => {
                                        // A single record is returned
                                        let record = JSON.parse(request.response);
                                        let webAPIRecord = WebAPIRecord.CreateWebAPIRecordSingle(record);
                                        if (webAPIRecord) DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedConnTargetDataverseRecordRetrievedEC.push(webAPIRecord);
                                        resolve();
                                    })
                                    .catch((e) => {
                                        if (!DataverseAccessWebAPI.IsIgnorableError(e.message)) {
                                            Helper.addErrorMessageln(e.message);
                                        }
                                        // If there is an error due to insufficient access privilege, etc., the error message is displayed, but the processing is executed, so it is not reject.
                                        resolve();
                                    });
                            } else {
                                resolve();
                            }
                        }
                    }
                });
            };
            for (const cr of connectionRecords) {
                promiseArray.push(getConnRecord(cr));
            }
            Promise.all(promiseArray)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => { reject(e.message); });
        });
    }
    /**
    * For all Many-to-Many relationship related to the specified Dataverse record, retrieve the Dataverse record 
    * and store it in the global variable asyncRetrievedMTMRRetrievedECDic.
    * @param record {DataverseRecord} A specific Dataverse record
    */
    retrieveMTMRDataverseRecordsPromise(record: DataverseRecord): Promise<void> {
        return new Promise((resolve, reject) => {
            if (DataverseAccessWebAPI.cv.ManyToManyRelationshipMetadataCache != null) {
                this.asyncRetrievedMTMRRetrievedECDic = null;

                // Array of ManyToManyRelationshipMetadata where Dataverse records of ManyToMany relationship should be retrieved asynchronously
                let paramManyToManyRelationshipMetadataArray: WebAPI.MTMRelationshipInterface[] = [];

                // Don't have to match it to the information in the ConfigSet.
                for (let k in DataverseAccessWebAPI.cv.ManyToManyRelationshipMetadataCache) {
                    let mtmrm = DataverseAccessWebAPI.cv.ManyToManyRelationshipMetadataCache[k];

                    if (mtmrm.Entity1LogicalName == record.EntityLogicalName || mtmrm.Entity2LogicalName == record.EntityLogicalName) {
                        paramManyToManyRelationshipMetadataArray.push(mtmrm);
                    }
                }

                this.retrieveMTMRDataverseRecordsByEachRelationshipPromise(record, paramManyToManyRelationshipMetadataArray)
                    .then(function () {
                        resolve();
                    })
                    .catch((e: any) => {
                        reject(e.message);
                    });
            }
        });
    }
    /**
    * For all Many-to-Many relationship related to the specified Dataverse record, retrieve the Dataverse record
    * and store it in the global variable asyncRetrievedMTMRRetrievedECDic.
    * @param record {DataverseRecord} A specific Dataverse record
    * @param relationships Array of Many-to-Many association metadata
    */
    retrieveMTMRDataverseRecordsByEachRelationshipPromise(dataverseRecord: DataverseRecord, relationships: any[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const promiseArray: Promise<void>[] = [];
            const getMTMRM = (mtmrm: WebAPI.MTMRelationshipInterface): Promise<void> => {
                return new Promise<void>((resolve, reject) => {
                    if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                        setTimeout(function () {
                            // Not implemented in sample demo mode
                            resolve();
                        }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
                    } else {
                        // As in the Sdk.Soap.js era, it throws queries against intermediate entities.
                        //
                        // Example: Assuming dataverseRecord.EntityLogicalName is an "opportunity", mtmrm. When SchemaName is "opportunitycompetitors_association",
                        //        Entity1LogicalName: "opportunity"
                        //        Entity2LogicalName: "competitor"
                        //        Entity2NavigationPropertyName: "opportunitycompetitors_association"
                        //        IntersectEntityName: "opportunitycompetitors"
                        //      The entity set name of the "opportunitycompetitors" entity is "opportunitycompetitorscollection", and the PrimaryIdAttribute is "opportunitycompetitorid"
                        //      Request
                        //        /opportunitycompetitorscollection?$filter=opportunityid eq 4883f907-720f-e711-80e8-480fcff29761
                        //      Response
                        //        data.context: "https://yourcrminstance.crm7.dynamics.com/api/data/v8.1/$metadata#opportunitycompetitorscollection"
                        //        value: Array(3)
                        //        ->0: Object
                        //          ->@odata.etag: "W/"1043800""
                        //          ->competitorid: "978ec042-b82b-e711-80f0-480fcff2f771"
                        //          ->opportunitycompetitorid: "9c8ec042-b82b-e711-80f0-480fcff2f771"
                        //          ->opportunityid: "4883f907-720f-e711-80e8-480fcff29761"
                        //        ->1: Object
                        //        ->2: Object
                        //
                        // First, getting intersect record
                        let entityLogicalName = mtmrm.IntersectEntityName; // "opportunitycompetitors_association"
                        let entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "opportunitycompetitorscollection"
                        let referencedId = dataverseRecord.Id; // "4883f907-720f-e711-80e8-480fcff29761"

                        // Create a string for $select
                        let uri = "/" + entitySetName;
                        if (mtmrm.Entity1LogicalName == dataverseRecord.EntityLogicalName &&
                            mtmrm.Entity2LogicalName == dataverseRecord.EntityLogicalName) { // ex. account N:N itself
                            let primaryIdAttributeName1 = mtmrm.Entity1IntersectAttribute; // "accountidone"
                            let primaryIdAttributeName2 = mtmrm.Entity2IntersectAttribute; // "accountidtwo"
                            // Create a string for $filter
                            uri += "?$filter=" + primaryIdAttributeName1 + " eq " + referencedId + " or " + primaryIdAttributeName2 + " eq " + referencedId;
                        }
                        else {
                            let primaryIdAttributeName = (mtmrm.Entity1LogicalName == dataverseRecord.EntityLogicalName) ? mtmrm.Entity1IntersectAttribute : mtmrm.Entity2IntersectAttribute; // "opportunityid"
                            // Create a string for $filter
                            uri += "?$filter=" + primaryIdAttributeName + " eq " + referencedId;
                        }
                        WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                            .then((request) => {
                                // Multiple records are returned
                                let recordArray: WebAPIRecord[] = WebAPIRecord.CreateWebAPIRecordMultiple(JSON.parse(request.response));

                                if (DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic == null) {
                                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic = {};
                                }

                                for (let i = 0; i < recordArray.length; i++) {
                                    let record = recordArray[i];
                                    if (!(mtmrm.SchemaName in DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic)) {
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic[mtmrm.SchemaName] = [];
                                    }
                                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic[mtmrm.SchemaName].push(record);
                                }
                                // Second, getting target record
                                return DataverseAccessWebAPI.cv.dataverseAccess.retrieveMTMRTargetDataverseRecordsPromise(dataverseRecord, DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRRetrievedECDic);
                            }).then(() => {
                                resolve();
                            }).catch((e: any) => {
                                reject(e.toString());
                            });
                    }
                });
            };
            for (const mtmrm of relationships) {
                promiseArray.push(getMTMRM(mtmrm));
            }
            Promise.all(promiseArray)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => { reject(e.message); });
        });
    }
    /**
    * Store the Dataverse records (target) related to the ManyToMany records (intermediate entity records) related to a specific Dataverse record in a global variable.
    * Even if the ManyToMany record (intermediate entity record) can be retrieved, the Dataverse record that is the target may not be retrieved.
    * @param sourceRecord {DataverseRecord} A specific Dataverse record
    * @param manyToManyEntityCollectionDic {} An dictionary with the key being the schema name of the ManyToMany relationship metadata and the value being an array representing the retrieved ManyToMany records (intermediate entity records).
     */
    retrieveMTMRTargetDataverseRecordsPromise(sourceRecord: DataverseRecord, manyToManyEntityCollectionDic: { [key: string]: WebAPIRecord[] }): Promise<void[]> {
        this.asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic = {};

        const promises: Promise<void>[] = [];
        // Execute asynchronous processing in parallel for dictionary and wait for all of them to finish.
        for (const schemaName in manyToManyEntityCollectionDic) {
            const recordArray = manyToManyEntityCollectionDic[schemaName];
            if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                setTimeout(function () {
                    // Not implemented in sample demo mode
                }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
            } else {
                // Example: mtmrm. If Entity1LogicalName is "opportunity", mtmrm. If Entity2LogicalName is "competitor"
                //      The entity set name for the entity "competitor" is "competitors"
                //      Request
                //        /competitors?$select=competitorid,name&$filter=competitorid eq 978ec042-b82b-e711-80f0-480fcff2f771 or competitorid eq a18ec042-b82b-e711-80f0-480fcff2f771
                const mtmrm = DataverseAccessWebAPI.cv.ManyToManyRelationshipMetadataCache[schemaName];
                const entityLogicalName = (mtmrm.Entity1LogicalName == sourceRecord.EntityLogicalName) ? mtmrm.Entity2LogicalName : mtmrm.Entity1LogicalName; // "competitor"
                const entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "competitors"
                const primaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryNameAttribute; // "name"
                const primaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryImageAttribute; // null or "entityimage"
                const intersectEntityId: any = {}; // Dictionary with key being the Id of the TargetDataverse record and value being the Id of the IntersectEntity record
                const idArray: string[] = [];
                let primaryIdAttributeName;
                if (mtmrm.Entity1LogicalName == sourceRecord.EntityLogicalName &&
                    mtmrm.Entity2LogicalName == sourceRecord.EntityLogicalName) { // ex. account N:N itself
                    primaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[sourceRecord.EntityLogicalName].PrimaryIdAttribute
                    for (const record of recordArray) {
                        const id1 = record.EntityRecord[mtmrm.Entity1IntersectAttribute];
                        idArray.push(id1);
                        intersectEntityId[id1] = record.getId(DataverseAccessWebAPI.cv);
                        const id2 = record.EntityRecord[mtmrm.Entity2IntersectAttribute];
                        idArray.push(id2);
                        intersectEntityId[id2] = record.getId(DataverseAccessWebAPI.cv);
                    }
                }
                else {
                    primaryIdAttributeName = (mtmrm.Entity1LogicalName == sourceRecord.EntityLogicalName) ? mtmrm.Entity2IntersectAttribute : mtmrm.Entity1IntersectAttribute; // "competitorid"
                    for (const record of recordArray) {
                        const id = record.EntityRecord[primaryIdAttributeName];
                        idArray.push(id);
                        intersectEntityId[id] = record.getId(DataverseAccessWebAPI.cv);
                    }
                }

                let uri = "/" + entitySetName;
                uri += "?$select=" + primaryIdAttributeName + "," + primaryNameAttributeName;
                if (primaryImageAttributeName) uri += "," + primaryImageAttributeName;

                // Create a string for $filter
                for (let i = 0; i < idArray.length; i++) {
                    if (i == 0) uri += "&$filter=";
                    else uri += " or ";
                    uri += primaryIdAttributeName + " eq " + idArray[i];
                }

                const promise: Promise<void> = new Promise((resolve, reject) => {
                    WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                        .then((request) => {
                            // Multiple records are returned
                            let recordArray: WebAPIRecord[] = WebAPIRecord.CreateWebAPIRecordMultiple(JSON.parse(request.response));
                            for (let i in recordArray) {
                                let record = recordArray[i];
                                let _id = record.getId(DataverseAccessWebAPI.cv);
                                if (_id) {
                                    let interEntId = intersectEntityId[_id];
                                    if (!DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic[interEntId]) {
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic[interEntId] = [];
                                    }
                                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTMRTargetDataverseRecordRetrievedECDic[interEntId].push(record);
                                }
                            }
                            resolve();
                        }).catch((e) => {
                            Helper.addErrorMessageln(e.message)
                            reject(e.message);
                        });
                });
                promises.push(promise);
            }
        }

        return Promise.all(promises);
    }
    /**
    * Store the Dataverse records for all One-to-Many relationship related to the specified Dataverse record in a global variable.
    * @param record {DataverseRecord} A specific Dataverse record
    */
    retrieveOTMRDataverseRecordsPromise(record: DataverseRecord): Promise<void> {
        return new Promise((resolve, reject) => {
            if (DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache != null) {
                this.asyncRetrievedOTMRRetrievedECDic = null;

                // Array of OneToManyRelationshipMetadata where Dataverse records of OneToMany relationship should be retrieved asynchronously
                const paramOneToManyRelationshipMetadataArray: WebAPI.OTMRelationshipInterface[] = [];

                // Don't have to match it to the information in the ConfigSet.
                for (const k in DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache) {
                    const otmrm = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[k];

                    if (otmrm.ReferencedEntity == record.EntityLogicalName) {
                        paramOneToManyRelationshipMetadataArray.push(otmrm);
                    }
                }

                this.retrieveOTMRDataverseRecordsByEachRelationshipPromise(record, paramOneToManyRelationshipMetadataArray)
                    .then(() => {
                        resolve();
                    })
                    .catch((e: any) => {
                        reject(e.message);
                    });
            }
        });
    }
    /**
    * For all One-to-Many relationship related to the specified Dataverse record, retrieve the Dataverse record
    * and store it in the global variable asyncRetrievedOTMRRetrievedECDic.
    * @param record {DataverseRecord} A specific Dataverse record
    * @param relationships Array of One-to-Many association metadata
    */
    retrieveOTMRDataverseRecordsByEachRelationshipPromise(dataverseRecord: DataverseRecord, relationships: WebAPI.OTMRelationshipInterface[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const promiseArray: Promise<void>[] = [];
            const getOTM = (otmrm: WebAPI.OTMRelationshipInterface): Promise<void> => {
                return new Promise<void>((resolve, reject) => {
                    if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                        setTimeout(function () {
                            // Multiple records are returned
                            let recordArray: WebAPIRecord[] = SampleDemo_Data.getOneToManyRelationshipDataverseRecordsByEachRelationship(dataverseRecord, otmrm);
                            if (DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic == null) {
                                DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic = {};
                            }

                            for (let i = 0; i < recordArray.length; i++) {
                                let record: WebAPIRecord = recordArray[i];
                                if (!(otmrm.SchemaName in DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic)) {
                                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic[otmrm.SchemaName] = [];
                                }
                                DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic[otmrm.SchemaName].push(record);
                            }
                            resolve();
                        }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
                    } else {
                        if (dataverseRecord.EntityLogicalName == DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[otmrm.SchemaName].ReferencedEntity) {
                            // Example: Assuming dataverseRecord.EntityLogicalName is "account" and otmrm.SchemaName is "opportunity_parent_account", ReferencingEntityNavigationPropertyName is "parentaccountid"
                            // For the opportunity entity to be retrieved, it is not necessary to retrieve the associated data beyond that.
                            // /opportunities?$select=opportunityid,name,parentaccountid&$filter=parentaccountid/accountid eq ea82f907-720f-e711-80e8-480fcff29761
                            let entityLogicalName = otmrm.ReferencingEntity; // "opportunity"
                            let entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "opportunities"
                            let primaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryIdAttribute; // "opportunityid"
                            let primaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryNameAttribute; // "name"
                            let primaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].PrimaryImageAttribute; // null とか "entityimage"
                            let navPropName = otmrm.ReferencingEntityNavigationPropertyName; // "parentaccountid"
                            let referencedAttributeName = otmrm.ReferencedAttribute; // "accountid"

                            // Create a string for $select
                            let uri = "/" + entitySetName + "?$select=" + primaryIdAttributeName + "," + primaryNameAttributeName + "," + navPropName;
                            if (primaryImageAttributeName) uri += "," + primaryImageAttributeName;
                            uri += "," + navPropName;

                            // $filter part
                            uri += "&$filter=" + navPropName + "/" + referencedAttributeName + " eq " + dataverseRecord.Id;

                            WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                                .then((request) => {
                                    // Multiple records are returned
                                    let recordArray: WebAPIRecord[] = WebAPIRecord.CreateWebAPIRecordMultiple(JSON.parse(request.response));
                                    if (DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic == null) {
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic = {};
                                    }

                                    for (let i = 0; i < recordArray.length; i++) {
                                        let record: WebAPIRecord = recordArray[i];
                                        if (!(otmrm.SchemaName in DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic)) {
                                            DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic[otmrm.SchemaName] = [];
                                        }
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedOTMRRetrievedECDic[otmrm.SchemaName].push(record);
                                    }
                                    resolve();
                                })
                                .catch((e: any) => {
                                    if (!DataverseAccessWebAPI.IsIgnorableError(e.message)) {
                                        Helper.addErrorMessageln(e.message);
                                    }
                                    // If there is an error due to insufficient access privilege, etc., the error message is displayed, but the processing is executed, so it is not reject.
                                    resolve();
                                });
                        } else {
                            resolve();
                        }
                    }
                });
            };
            for (const otm of relationships) {
                promiseArray.push(getOTM(otm));
            }
            Promise.all(promiseArray)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => { reject(e.message); });
        });
    }
    /**
    * Retrive the Dataverse records for all Many-to-One relationship related to the specified Dataverse record, and store them in a global variable asyncRetrievedMTORRetrievedECDic.
    * @param record {DataverseRecord} A specific Dataverse record
    */
    retrieveMTORDataverseRecordsPromise(record: DataverseRecord): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache != null) {
                this.asyncRetrievedMTORRetrievedECDic = null;

                // Array of ManyToOneRelationshipMetadata where Dataverse records of ManyToOne relationship should be retrieved asynchronously
                let paramManyToOneRelationshipMetadataArray: WebAPI.OTMRelationshipInterface[] = [];

                // Don't have to match it to the information in the ConfigSet.
                for (let k in DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache) {
                    let otmrm = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[k];

                    if (otmrm.ReferencingEntity == record.EntityLogicalName) {
                        paramManyToOneRelationshipMetadataArray.push(otmrm);
                    }
                }

                this.retrieveMTORDataverseRecordsByEachRelationshipPromise(record, paramManyToOneRelationshipMetadataArray)
                    .then(() => {
                        resolve();
                    })
                    .catch((e: any) => {
                        reject(e.message);
                    });
            }
        });
    }
    /**
    * For all Many-to-One relationship related to the specified Dataverse record, retrieve the Dataverse record
    * and store it in the global variable asyncRetrievedMTORRetrievedECDic.
    * @param record {DataverseRecord} A specific Dataverse record
    * @param relationships Array of Many-to-One association metadata
    */
    retrieveMTORDataverseRecordsByEachRelationshipPromise(dataverseRecord: DataverseRecord, relationships: WebAPI.OTMRelationshipInterface[]): Promise<void> {
        return new Promise((resolve, reject) => {
            const promiseArray: Promise<void>[] = [];
            const getMTOR = (mtorm: WebAPI.OTMRelationshipInterface): Promise<void> => {
                return new Promise<void>((resolve, reject) => {
                    if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                        setTimeout(function () {
                            // 0 or 1 record is returned
                            // It is a record representing the Many side of ManyToOne.
                            let recordOfMany = SampleDemo_Data.getManyToOneRelationshipDataverseRecordsByEachRelationship(dataverseRecord, mtorm);
                            if (recordOfMany) {
                                let expEntityLogicalName = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[mtorm.SchemaName].ReferencedEntity;

                                // Record representing the One side of ManyToOne
                                let recordOfOne: WebAPIRecord | null = null;
                                for (let k in recordOfMany.EntityRecord) {
                                    // The first one with the type "object" is identified as the object representing the One side.
                                    if (typeof (recordOfMany.EntityRecord[k]) == "object") {
                                        let expEntitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].EntitySetName;
                                        let expEntityRecord = recordOfMany.EntityRecord[k];
                                        if (expEntityRecord != null) {
                                            // 1 record is returned
                                            recordOfOne = new WebAPIRecord(expEntitySetName, expEntityRecord);
                                        } else {
                                            // 0 record is returned
                                        }
                                        break;
                                    }
                                }

                                if (recordOfOne != null) {
                                    if (DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic == null) {
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic = {};
                                    }

                                    if (!(mtorm.SchemaName in DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic)) {
                                        DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic[mtorm.SchemaName] = [];
                                    }

                                    DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic[mtorm.SchemaName].push(recordOfOne);
                                }
                            }

                            resolve();
                        }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
                    } else {
                        if (dataverseRecord.EntityLogicalName == DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[mtorm.SchemaName].ReferencingEntity) {
                            // Example: Assuming dataverseRecord.EntityLogicalName is an "opportunity", mtorm. When SchemaName is "opportunity_parent_account", ReferencingEntityNavigationPropertyName is "parentaccountid".
                            // The request is as follows.
                            //    /opportunities(4883f907-720f-e711-80e8-480fcff29761)?$select=parentaccountid&$expand=parentaccountid($select=accountid,name)
                            // The response is as follows.
                            //    @odata.context: "https://yourcrminstance.crm7.dynamics.com/api/data/v8.1/$metadata#opportunities(parentaccountid,parentaccountid(accountid,name))/$entity"
                            //    @odata.etag: "W/"583061""
                            //    opportunityid: "4883f907-720f-e711-80e8-480fcff29761"
                            //    parentaccountid: Object
                            //    ->@odata.etag: "W/"583338""
                            //    ->accountid: "ea82f907-720f-e711-80e8-480fcff29761"
                            //    ->name: "A Datum corporation"
                            let entityLogicalName = dataverseRecord.EntityLogicalName; // "opportunity"
                            let referencedId = dataverseRecord.Id; // "4883f907-720f-e711-80e8-480fcff29761"
                            let entitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "opportunities"
                            let navPropName = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[mtorm.SchemaName].ReferencingEntityNavigationPropertyName; // "parentaccountid"
                            let expEntityLogicalName = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[mtorm.SchemaName].ReferencedEntity; // "account"
                            let expPrimaryIdAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryIdAttribute; // "accountid"
                            let expPrimaryNameAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryNameAttribute; // "name"
                            let expPrimaryImageAttributeName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].PrimaryImageAttribute; // null or "entityimage"

                            // Create a string for $select
                            let uri = "/" + entitySetName + "(" + referencedId + ")?$select=" + navPropName;

                            // Create a string for $expand
                            uri += "&$expand=" + navPropName + "($select=" + expPrimaryIdAttributeName + "," + expPrimaryNameAttributeName;
                            if (expPrimaryImageAttributeName) uri += "," + expPrimaryImageAttributeName;
                            uri += ")";

                            WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                                .then((request) => {
                                    // 0 or 1 record is returned
                                    // It is a record representing the Many side of ManyToOne.
                                    let recordOfMany = WebAPIRecord.CreateWebAPIRecordSingle(JSON.parse(request.response));

                                    if (recordOfMany) {
                                        // Record representing the One side of ManyToOne
                                        let recordOfOne: WebAPIRecord | null = null;
                                        for (let k in recordOfMany.EntityRecord) {
                                            // The first one with the type "object" is identified as the object representing the One side.
                                            if (typeof (recordOfMany.EntityRecord[k]) == "object") {
                                                let expEntitySetName = DataverseAccessWebAPI.cv.EntityMetadataCacheKeyIsEntityLogicalName[expEntityLogicalName].EntitySetName;
                                                let expEntityRecord = recordOfMany.EntityRecord[k];
                                                if (expEntityRecord != null) {
                                                    // 1 record is returned
                                                    recordOfOne = new WebAPIRecord(expEntitySetName, expEntityRecord);
                                                } else {
                                                    // 0 record is returned
                                                }
                                                break;
                                            }
                                        }

                                        if (recordOfOne != null) {
                                            if (DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic == null) {
                                                DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic = {};
                                            }

                                            if (!(mtorm.SchemaName in DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic)) {
                                                DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic[mtorm.SchemaName] = [];
                                            }

                                            DataverseAccessWebAPI.cv.dataverseAccess.asyncRetrievedMTORRetrievedECDic[mtorm.SchemaName].push(recordOfOne);
                                        }

                                        resolve();
                                    }
                                })
                                .catch((e: any) => {
                                    if (!DataverseAccessWebAPI.IsIgnorableError(e.message)) {
                                        Helper.addErrorMessageln(e.message);
                                    }
                                    // If there is an error due to insufficient access privilege, etc., the error message is displayed, but the processing is executed, so it is not reject.
                                    resolve();
                                });
                        } else {
                            resolve();
                        }
                    }
                });
            };
            for (const mtorm of relationships) {
                promiseArray.push(getMTOR(mtorm));
            }
            Promise.all(promiseArray)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => { reject(e.message); });
        });
    }
    /**
    * Based on the OneToManyRelationshipsMetadataCache, get the list of ManyToOneRelationshipsMetadata to be retrieved for the target entity.
    * For example, if the target entity is opportunity, ManyToOneRelationshipMetadata with the following schema name is eligible.
    *   opportunity_parent_account
    *   opportunity_parent_contact
    * @param entityLogicalName {string} Target entity
    */
    getManyToOneRelationshipMetadataArray(entityLogicalName: string): WebAPI.OTMRelationshipInterface[] {
        let paramManyToOneRelationshipMetadataArray: WebAPI.OTMRelationshipInterface[] = [];

        for (let schemaName in DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache) {
            let otmrm = DataverseAccessWebAPI.cv.OneToManyRelationshipMetadataCache[schemaName];
            if (otmrm.ReferencingEntity == entityLogicalName) {
                paramManyToOneRelationshipMetadataArray.push(otmrm);
            }
        }

        return paramManyToOneRelationshipMetadataArray;
    }
    /**
    * Retrieve the Dynamics 365 memo entity (annotations) and return an array of records.
    * If no arguments are passed, get and return the memo record group attached to the current main card.
    * If annotationId is passed as an argument, only one is retrieved and an array of 1 is returned.
    */
    retrieveAnnotationRecordForCardsLayoutPromise(annotationId: string | null): Promise<WebAPIRecord[]> {
        return new Promise<WebAPIRecord[]>((resolve, reject) => {
            if (DataverseAccessWebAPI.cv.IS_DEMO_MODE) {
                setTimeout(() => {
                    const annotationRecords = SampleDemo_Data.getAnnotationRecords();
                    resolve(annotationRecords);
                }, SampleDemo_Const.DataverseWebAPIDemoResponseTime);
            } else {
                if (!annotationId) {
                    // If no arguments are passed, get and return the memo record group attached to the current main card.
                    // Example: /annotations?$select=subject,documentbody,notetext,_createdby_value,createdon,_modifiedby_value,modifiedon&$orderby=createdon desc&$filter=objectid_contact/contactid eq 0683f907-720f-e711-80e8-480fcff29761
                    let navPropName = DataverseAccessWebAPI.cv.AnnotationRelationshipMetadataCache.ReferencingEntityNavigationPropertyName; // "objectid_contact"
                    let refAttr = DataverseAccessWebAPI.cv.AnnotationRelationshipMetadataCache.ReferencedAttribute; // "contactid"
                    let refAttrVal = DataverseAccessWebAPI.cv.paramGuid; // "0683f907-720f-e711-80e8-480fcff29761"

                    let uri = "/annotations?$select=subject,documentbody,notetext,_createdby_value,createdon,_modifiedby_value,modifiedon&$orderby=createdon desc&$filter=";
                    uri += navPropName + "/" + refAttr + " eq " + refAttrVal;

                    WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                        .then((request) => {
                            // Multiple records are returned
                            let recordArray: WebAPIRecord[] = WebAPIRecord.CreateWebAPIRecordMultiple(JSON.parse(request.response));

                            resolve(recordArray);
                        })
                        .catch((e) => {
                            reject(e.message);
                        });
                } else {
                    // If annotationId is passed as an argument, only one is retrieved and an array of 1 is returned.
                    // Example: /annotations(1f930e8c-0e36-e711-80f2-480fcff207f1)?$select=subject,documentbody,notetext,_createdby_value,createdon,_modifiedby_value,modifiedon
                    let uri = "/annotations(" + annotationId + ")";
                    uri += "?$select=subject,documentbody,notetext,_createdby_value,createdon,_modifiedby_value,modifiedon";

                    WebAPIHelper.request("GET", uri, null, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                        .then((request) => {
                            // 0 or 1 record is returned
                            let record: WebAPIRecord | undefined = WebAPIRecord.CreateWebAPIRecordSingle(JSON.parse(request.response));

                            if (record) resolve([record]);
                            else reject("Could not retrieve an annotation record as GUID = '" + annotationId + "'.");
                        })
                        .catch((e) => {
                            reject(e.message);
                        });
                }
            }
        });
    }
    /**
    * Save the information of CardsLayout instance as a new record of Dynamics 365 memo entity (annotation).
    * @param cardsLayout {CardsLayout} CardsLayout instance to be saved
    * @param notetext {string} String describing the card layout to be saved
    * @returns Promise<string> OData-EntityId value representing the created memo record, a string like "https://yourcrminstance.crm7.dynamics.com/api/data/v9.2/annotations(2941aced-f535-e711-80f2-480fcff207f1)"
    */
    static createAnnotationRecordForCardsLayoutPromise(cardsLayout: CardsLayout): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let odata_entityid: string;

            /**
             * annotation seems to have a special association, and you could not specify a related record when you created the record.
             * Therefore two stages were implemented:
             *   i. After creating an annotation record without association, click
             *  ii. throw a request to re-associate only;
             */
            /*
             *  i.
             *  Example:
             *    uri: /annotations
             *    data:
             *      {
             *          "subject": "Cards layout of Connection Viewer",
             *          "documentbody": "<<A string of cardsLayout in JSON format encoded and Base64>>",
             *          "notetext": "Focus on work history",
             *      }
             */
            let uri = "/annotations";
            let data = {
                "subject": ConnectionViewer.cv.resStr("CardsLayoutOfConnectionViewer"),
                "documentbody": btoa(encodeURI(JSON.stringify(cardsLayout))),
                "notetext": cardsLayout.Name,
            };

            WebAPIHelper.request("POST", uri, data, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                .then((request) => {
                    odata_entityid = request.getResponseHeader("OData-EntityId");
                    if (!odata_entityid) reject("The annotation record was not created correctly. The value of the OData-EntityId header is missing.");

                    /*
                     * ii.
                     *  Example:
                     *     uri: /contacts(0683f907-720f-e711-80e8-480fcff29761)/Contact_Annotation/$ref
                     *     data:
                     *       {
                     *           "@odata.id": "https://yourcrminstance.crm7.dynamics.com/api/data/v8.2/annotations(2941aced-f535-e711-80f2-480fcff207f1)"
                     *       }
                     */
                    let entityLogicalName = this.cv.paramEntityLogicalName; // "contact"
                    let entitySetName = this.cv.EntityMetadataCacheKeyIsEntityLogicalName[entityLogicalName].EntitySetName; // "contacts"
                    if (!entitySetName) reject("Could not retrieve the entity set of the entity '" + entityLogicalName + "' correctly.");
                    let id = this.cv.paramGuid; // "0683f907-720f-e711-80e8-480fcff29761"
                    let referencedEntityNavigationPropertyName = this.cv.AnnotationRelationshipMetadataCache.ReferencedEntityNavigationPropertyName; // "Contact_Annotation"
                    let uri = "/" + entitySetName + "(" + id + ")/" + referencedEntityNavigationPropertyName + "/$ref";

                    let data = {
                        "@odata.id": odata_entityid
                    };

                    return WebAPIHelper.request("POST", uri, data, true, DataverseAccessWebAPI.MaxPageSize, DataverseAccessWebAPI.WebAPIVersion)
                }).then((request) => {
                    // There is no need to do anything in particular.
                    resolve(odata_entityid);
                })
                .catch((e: any) => {
                    reject(e.message);
                });
        });
    }
    // Determine if it is an ignorable error message
    static IsIgnorableError(errorMessage: any) {
        /**
         * The following error occurs when handling connection record information for records for which you do not have access rights.
         * This error is expected and should be ignored.
         * "SecLib::AccessCheckEx failed. Returned hr = -2147187962, ObjectID: 0083f907-720f-e711-80e8-480fcff29761, OwnerId: d8a5171d-5f0f-e711-80e9-480fcff2c651, OwnerIdType: 8 and CallingUser: d8a5171d-5f0f-e711-80e9-480fcff2c651. ObjectTypeCode: 2, objectBusinessUnitId: ac52bd1e-5c0f-e711-80e8-480fcff29761, AccessRights: ReadAccess"
         */
        return errorMessage.indexOf("SecLib::AccessCheckEx failed.") == 0 && 0 < errorMessage.indexOf("AccessRights: ReadAccess");
    }
}
