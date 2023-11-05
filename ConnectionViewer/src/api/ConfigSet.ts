import { Config } from "./Config";
import { ConnectionViewer } from "../ConnectionViewer";

/**
 * A class that bundles and stores multiple configuration information.
 * It is assumed that the user can select one configuration information.
 */
export class ConfigSet {
    ConfigArray: Config[];
    /**
     * Constructor. If there is a duplicate ID in the received config array, it throws an error.
     */
    constructor(configArray: Config[]) {
        this.ConfigArray = configArray;

        if (!ConfigSet.checkIDUnique(configArray)) {
            throw "There is duplication in ID.";
        }
    }
    /**
     * Check the received Config array for unique IDs (no duplicates).
     * @returns True if all are unique.
     */
    static checkIDUnique(configArray: Config[]): boolean {
        var idArray = [];
        for (var i = 0; i < configArray.length; i++) {
            var id = configArray[i].ID;
            if (0 <= idArray.indexOf(id)) {
                // There is a duplicate
                return false;
            }
            idArray.push(id);
        }
        // All unique, no duplicates
        return true;
    }
    /**
     * @returns A hard-coded ConfigSet.
     */
    static getHardcodedConfigSet(userLanguageId: number): ConfigSet {
        const configArray = [];
        configArray.push(Config.getHardcodedSalesConfig(userLanguageId));
        configArray.push(Config.getHardcodedServiceConfig(userLanguageId));

        return new ConfigSet(configArray);
    }
    /**
     * Parses the parameters to this PCF control and returns an instance of ConfigSet.
     * Parses the contents, performs a simple check, and returns an instance of the ConfigSet.
     * If an error occurs, throw the error containing the descriptive text.
     */
    static getConfigSetFromParameter(configSetParameter: string): ConfigSet {
        let configSetToCheck: ConfigSet;
        try {
            configSetToCheck = JSON.parse(configSetParameter);
        } catch (error) {
            throw new Error(ConnectionViewer.cv.resStr('ConfigSetErrorCheckFormat'));
        }

        if (!configSetToCheck.ConfigArray) throw new Error("There is no ConfigArray in ConfigSet");
        if (configSetToCheck.ConfigArray.length == 0) throw new Error("There is no content of  ConfigArray in ConfigSet");

        for (let i = 0; i < configSetToCheck.ConfigArray.length; i++) {
            const configToCheck: Config = configSetToCheck.ConfigArray[i];
            try {
                Config.validate(configToCheck);
            } catch (e: any) {
                let ordinal: string;
                if (i + 1 === 1) ordinal = "1st";
                else if (i + 1 === 2) ordinal = "2nd";
                else if (i + 1 === 3) ordinal = "3rd";
                else ordinal = (i + 1).toString() + "th";
                throw new Error(`The ${ordinal} of ConfigArray in ConfigSet is not valid. ${e.message}`);
            }
        }

        return configSetToCheck;
    }
}
