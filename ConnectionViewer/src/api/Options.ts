/**
 * Utility class for managing user options
 * User option settings are stored in the browser's localStorage. HTML5 compatible browser is required.
 * In addition, the Config information is stored with the key "CV.Config".
 */
export class Options {
    static ConfigString = "CV.Config";
    /**
    * Config ID
    */
    ConfigID: string;
    constructor(configID: string) {
        this.ConfigID = configID;
    }
    /**
     * Copy all properties of the option setting from the source to the target
     * @param source option in source
     * @param target option in target
     */
    static copyAllProperties(source: Options, target: Options): void {
        target.ConfigID = source.ConfigID;
    }
    /**
     * Get user option settings from localStorage. If you can not get it, return null.
     */
    static getUserOptions(): Options | null {
        if (typeof (localStorage) !== 'undefined' && Options.ConfigString in localStorage) {
            try {
                return JSON.parse(localStorage[Options.ConfigString]);
            } catch (error) {
                return null;
            }
        } else {
            return null;
        }
    }
    /**
     * Save user option settings to localStorage. If an error occurs, return null.
     */
    static setUserOptions(options: Options): Options | null {
        try {
            localStorage.setItem(Options.ConfigString, JSON.stringify(options));
        } catch (error) {
            return null;
        }
        return options;
    }
}
