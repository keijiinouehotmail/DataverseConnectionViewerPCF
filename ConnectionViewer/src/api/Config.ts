import { ConfigSet } from "./ConfigSet";
import { ConnectionViewer } from "../ConnectionViewer";
import { Options } from "./Options";

export class Config {
    /**
    * A string of what will be the ID of this configuration. Since it is not a Dataverse record, you can attach it freely.
    */
    ID: string;
    /**
    * A string for user to understand what this configuration is for.
    */
    Description: string;
    /**
    * A string for user to understand what this configuration is for.
    */
    DefaultCardsLayoutDescription: string;
    /**
    * A flag to indicate whether this configuration is the default one in the ConfigSet.
    */
    IsDefault: boolean;
    /**
    * Specify the entity for which you want to display the "connection" record of interest.
    * Display only connection records between entities specified here.
    * Example: "contact"
    */
    EntitiesForConnectionList: string[];
    /**
    * Specify the target "1:N association", "N:1 association", or "N:N association".
    * Specify as a string in "Schema name".
    * Example: "contact_customer_accounts"
    * N:1 association name is the same (same schema name) from the perspective of the entity on the 1st side and from the entity on the N side.
    */
    RelationshipSchemaNameList: string[];
    /**
    * Specify whether to enable the "Display the size of the far card smaller" function.
    */
    SmallerSizeEnabled: boolean;
    /**
    * Constructor to specify the information to target
    * Supports connection data, 1:N, N:1 and N:N associations.
    * @param id string of what will be the ID of this config
    * @param description A string for the user that describes the contents of the config
    * @param entitiesForConnectionList array of entities to target connection data
    * @param relationshipSchemaNameList An array of schema names to target related data.

    */
    constructor(id: string,
        description: string,
        smallerSizeEnabled: boolean,
        defaultCardsLayoutDescription: string = ConnectionViewer.cv.resStr("CardsLayout"),
        isDefault: boolean,
        entitiesForConnectionList: string[],
        relationshipSchemaNameList: string[]
    ) {
        this.ID = id;
        this.Description = description;
        this.SmallerSizeEnabled = smallerSizeEnabled;
        this.DefaultCardsLayoutDescription = defaultCardsLayoutDescription;
        this.IsDefault = isDefault;
        this.EntitiesForConnectionList = entitiesForConnectionList;
        this.RelationshipSchemaNameList = relationshipSchemaNameList;
    }
    /**
    * Returns one valid Config. The logic is as follows.
    * i. If there is a Config ID stored in the browser as a user option, return the Config instance corresponding to the ID of that Config.
    * Otherwise, ii. Returns the first (or several) Config instance with the default flag from the given ConfigSet.
    * Otherwise, iii. Returns the first Config instance of a given ConfigSet.
    * Otherwise, iv. Returns the default Config instance that is hard-coded programmatically.
    * Note that no matter what config information is returned here, do not update the user options.
    * @return Configuration information. Returns null if an error occurs.
    */
    static initConfigWithOptions(userLanguageId: number, configSet: ConfigSet): Config {
        try {
            const userOptions = Options.getUserOptions();
            if (userOptions) {
                // i.
                for (let i = 0; i < configSet.ConfigArray.length; i++) {
                    let config = configSet.ConfigArray[i];
                    if (config.ID == userOptions.ConfigID) {
                        return config;
                    }
                }
            }
            // ii.
            for (let i = 0; i < configSet.ConfigArray.length; i++) {
                const config = configSet.ConfigArray[i];
                if (config.IsDefault) {
                    return config;
                }
            }
            // iii.
            if (0 < configSet.ConfigArray.length) {
                return configSet.ConfigArray[0];
            }

            // iv.
            return Config.getHardcodedSalesConfig(userLanguageId);
        }
        catch (e: any) {
            throw new Error("Error in Config.initConfigWithOptions(): " + e.message);
        }
    }
    /**
    * Parses the given ConfigSet and returns a single Config that is considered the default Config. The logic is as follows.
    *   i. Returns the Config instance (or the first of many) with the default flag from the given ConfigSet.
    *  ii. Otherwise, it returns the first Config instance of the given ConfigSet.
    * iii. Otherwise, the program returns a default hard-coded Config instance.
    * @return Configuration information
    */
    static getCurrentDefaultConfig(userLanguageId: number, configSet: ConfigSet): Config {
        // i.
        for (const config of configSet.ConfigArray) {
            if (config.IsDefault) {
                return config;
            }
        }
        // ii.
        if (0 < configSet.ConfigArray.length) {
            return configSet.ConfigArray[0];
        }

        // iii.
        return Config.getHardcodedSalesConfig(userLanguageId);
    }
    /**
    * Returns hardcoded sales department configuration information.
    */
    static getHardcodedSalesConfig(userLanguageId: number): Config {
        const id = "Sales";
        const description = ConnectionViewer.cv.resStr("ThisIsAConfigurationForSalesDepartment_AccountsAndContactsAsWellAsOpportunitiesAsConnectionRecords");
        const smallerSizeEnabled = true;
        const defaultCardsLayoutDescription = ConnectionViewer.cv.resStr("CardsLayoutForSalesDepartment");
        const isDefault = true;
        /**
        * Specify the entity name to target for the connection record.
        */
        const entitiesForConnectionList = [
            "account"
            , "contact"
            , "opportunity"
        ];
        /**
        * Specify the schema name of the relationship.
        */
        const relationshipSchemaNameList = [
            "contact_customer_accounts",
            "account_parent_account"
        ];

        return new Config(id, description, smallerSizeEnabled, defaultCardsLayoutDescription, isDefault, entitiesForConnectionList, relationshipSchemaNameList);
    }
    /**
    * Returns hardcoded service department configuration information.
    */
    static getHardcodedServiceConfig(userLanguageId: number): Config {
        const id = "Service";
        // "サービス部門向けのコンフィグです。取引先企業、取引先担当者およびサポート案件が対象です。"
        const description = ConnectionViewer.cv.resStr("ThisIsAConfigurationForServiceDepartment_ThisIncludesAccountsContactsAndCases");
        const smallerSizeEnabled = true;
        const defaultCardsLayoutDescription = ConnectionViewer.cv.resStr("CardsLayoutForServiceDepartment");
        const isDefault = false;
        const entitiesForConnectionList = [
            "account"
            , "contact"
            , "incident"
        ];
        /**
        * Specify the schema name of the relationship.
        */
        const relationshipSchemaNameList = [
            "contact_customer_accounts",
            "account_parent_account",
            "incident_customer_accounts",
            "incident_customer_contacts"
        ];

        return new Config(id, description, smallerSizeEnabled, defaultCardsLayoutDescription, isDefault, entitiesForConnectionList, relationshipSchemaNameList);
    }
    /**
    * Checks whether valid configuration information is held. If there is a problem, throw an error containing the contents.
    * @return True if it is determined to be valid.
    */
    static validate(configToCheck: Config): boolean {
        if (!configToCheck.ID) throw new Error("There is no ID.");
        if (!configToCheck.EntitiesForConnectionList) throw new Error("There is no EntitiesForConnectionList.");
        if (!configToCheck.RelationshipSchemaNameList) throw new Error("There is no RelationshipSchemaNameList.");

        return true;
    }
}
/**
* The choice of card style
*/
export enum CardStyleEnum { Circle = 0, Rectangle = 1 }
