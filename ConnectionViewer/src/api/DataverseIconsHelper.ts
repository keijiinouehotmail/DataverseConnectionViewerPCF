import { ImageResources } from "./ImageResources";

/**
 * A class that handles Dataverse icons. It also includes Dynamics 365 icons.
 */
export class DataverseIconsHelper {
    /**
    * Assume to use when running locally in sample demo mode.
    * Returns the URL of the icon representing the entity.
    * Custom entities can be changed from the standard icon, but are not implemented.
    * @returns {string} A valid string specified as a URL that contains a Base64 string representing an image. data:image/svg+xml;utf8, data.
    * 
    */
    static getIcon32UrlStatic(entitySchemaName: string): string {
        return ImageResources.getEntityIconSVGUrl(entitySchemaName);
    }
}