import { Strings1033 } from "../strings/Strings1033";
import { Strings1041 } from "../strings/Strings1041";

/**
 * Helper for strings such as labels.
 */
export class StringHelper {
    /**
     * List of languages supported as .resx files
     */
    private readonly supportedLanguageIdList: number[] = [
        1033, // en
        1041, // ja
    ];
    private userLanguageId: number;
    private languageIdToShow: number;
    /**
     * Constructor
     * If a language other than a supported language is requested, a string for English (1033) is returned.
     * @param userLanguageId ID (number) of the display language selected by the user
     */
    constructor(userLanguageId: number) {
        this.userLanguageId = userLanguageId;
        if(this.supportedLanguageIdList.includes(userLanguageId))
            this.languageIdToShow = userLanguageId;
        else
            this.languageIdToShow = 1033;
    }
    /**
     * If a language other than a supported language is requested, a string for English (1033) is returned.
     */
    public getString(id: string): string {
        if(this.languageIdToShow === 1041) return Strings1041[id] ?? id;
        else return Strings1033[id];
    }
}
