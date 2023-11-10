import { DataverseRecord } from "./DataverseRecord";
import { WebAPIRecord } from "./WebAPIRecord";
import { SampleDemo_Metadata_ja } from "./SampleDemo_Metadata_ja";
import { WebAPI } from "../services/WebAPIHelper";
import { ConnectionViewer } from "../ConnectionViewer";
import { SampleDemo_Data_ja } from "./SampleDemo_Data_ja";
import { SampleDemo_Data_en } from "./SampleDemo_Data_en";
import { SampleDemo_Metadata_en } from "./SampleDemo_Metadata_en";

/**
 * Class for data for sample demo in Japanese. All data is fictitious.
 */
export class SampleDemo_Data {
    /**
     * Returns the logical entity name of the primary record for the sample demo. Assumes the record of the form that called the connection viewer.
     */
    static get EntityLogicalName() {
        return "contact";
    }
    /**
     * Returns the id of the primary record for the sample demo. Assumes the record of the form that called the connection viewer.
     */
    static get Guid() {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getPrimaryRecord().EntityRecord["contactid"];
        else return SampleDemo_Data_en.getPrimaryRecord().EntityRecord["contactid"];
    }
    /**
     * Returns the primary record for the sample demo. Assumes the record of the form that called the connection viewer.
     */
    static getPrimaryRecord(): WebAPIRecord {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getPrimaryRecord();
        else return SampleDemo_Data_en.getPrimaryRecord();
    }
    /**
     * Returns a group of connection records WebAPIRecord[] related to a specific record for the sample demo.
     */
    static getConnectionRecords(primary: DataverseRecord): WebAPIRecord[] {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getConnectionRecords(primary);
        else return SampleDemo_Data_en.getConnectionRecords(primary);
    }
    static getConnectionTargetDataverseRecords(connectionRecord: WebAPIRecord): WebAPIRecord | null {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getConnectionTargetDataverseRecords(connectionRecord);
        else return SampleDemo_Data_en.getConnectionTargetDataverseRecords(connectionRecord);
    }
    static getAnnotationRecords(): WebAPIRecord[] {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getAnnotationRecords();
        else return SampleDemo_Data_en.getAnnotationRecords();
    }
    /**
     * For sample demo, return the records related to a specific record in 1:N.
     * @param otmrm OneToManyRelationship metadata
     */
    static getOneToManyRelationshipDataverseRecordsByEachRelationship(dataverseRecord: DataverseRecord, otmrm: any): WebAPIRecord[] {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getOneToManyRelationshipDataverseRecordsByEachRelationship(dataverseRecord, otmrm);
        else return SampleDemo_Data_en.getOneToManyRelationshipDataverseRecordsByEachRelationship(dataverseRecord, otmrm);
    }
    /**
     * For sample demo, return the records related to a specific record in N:1.
     * @param otmrm OneToManyRelationship metadata
     * @returns 
     */
    static getManyToOneRelationshipDataverseRecordsByEachRelationship(dataverseRecord: DataverseRecord, otmrm: any): WebAPIRecord | null {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Data_ja.getManyToOneRelationshipDataverseRecordsByEachRelationship(dataverseRecord, otmrm);
        else return SampleDemo_Data_en.getManyToOneRelationshipDataverseRecordsByEachRelationship(dataverseRecord, otmrm);
    }
    /**
     * Get the entity metadata for sample demo statically.
     * Originally returns WebAPI.entityMetadataInterface[]
     */
    static get EntityMetadataSample(): any[] {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Metadata_ja.EntityMetadataSample;
        else return SampleDemo_Metadata_en.EntityMetadataSample;
    }
    /**
     * Get the relationship metadata for sample demo statically.
     */
    static get RelationshipMetadataSample(): any[] {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Metadata_ja.RelationshipMetadataSample;
        else return SampleDemo_Metadata_en.RelationshipMetadataSample;
    }
    /**
     * Get the relationship metadata of annotation entity for sample demo statically.
     */
    static get AnnotationRelationshipMetadataSample(): WebAPI.OTMRelationshipInterface {
        if (ConnectionViewer.cv.languageIdToShow === 1041) return SampleDemo_Metadata_ja.AnnotationRelationshipMetadataSample;
        else return SampleDemo_Metadata_en.AnnotationRelationshipMetadataSample;
    }
}
