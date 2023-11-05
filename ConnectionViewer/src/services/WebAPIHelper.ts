export class WebAPIHelper {
    static getClientUrl(): string {
        return document.location.origin;
    }
    /**
     * @function request
     * @description Generic helper function to handle basic XMLHttpRequest calls.
     * @param {string} action - The request action. String is case-sensitive.
     * @param {string} uri - An absolute or relative URI. Relative URI starts with a "/".
     * @param {object} data - An object representing an entity. Required for create and update action.
     * @param {boolean} formattedValue - If "true" then include formatted value; "false" otherwise.
     *    For more info on formatted value, see:
     *    https://msdn.microsoft.com/en-us/library/gg334767.aspx#bkmk_includeFormattedValues
     * @param {number} maxPageSize - Indicate the page size. Default is 10 if not defined.
     * @param {string} _webAPIPath - like "/api/data/v8.1" or "/api/data/v8.2" // tester
     * @returns {Promise} - A Promise that returns either the request object or an error object.
     */
    static request(
        action: string,
        uri: string,
        data: Object | null,
        formattedValue: boolean,
        maxPageSize: number,
        _webAPIPath: string
    ): Promise<WebAPI.requestInterface> {
        if (!RegExp(action, "g").test("POST PATCH PUT GET DELETE")) { // Expected action verbs.
            throw new Error("Sdk.request: action parameter must be one of the following: " +
                "POST, PATCH, PUT, GET, or DELETE.");
        }
        if ((RegExp(action, "g").test("POST PATCH PUT")) && (data === null || data === undefined)) {
            throw new Error("Sdk.request: data parameter must not be null for operations that create or modify data.");
        }
        if (maxPageSize === null || maxPageSize === undefined) {
            //maxPageSize = 10; // Default limit is 10 entities per page.
            // tester
            maxPageSize = 5000;
        }
        var defaultWebAPIPath = "/api/data/v9.2";
        const clientUrl = this.getClientUrl();
        // Construct a fully qualified URI if a relative URI is passed in.
        if (uri.charAt(0) === "/") {
            uri = clientUrl + ((_webAPIPath != null) ? _webAPIPath : defaultWebAPIPath) + uri;
        }

        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(action, encodeURI(uri), true);
            request.setRequestHeader("OData-MaxVersion", "4.0");
            request.setRequestHeader("OData-Version", "4.0");
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            if (action == "GET") request.setRequestHeader("Prefer", "odata.maxpagesize=" + maxPageSize); // tester
            if (action == "GET" && formattedValue) { // tester
                request.setRequestHeader("Prefer",
                    "odata.include-annotations=OData.Community.Display.V1.FormattedValue");
            }
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    request.onreadystatechange = null;
                    switch (this.status) {
                        case 200: // Success with content returned in response body.
                        case 204: // Success with no content returned in response body.
                            resolve(this as any);
                            break;
                        default: // All other statuses are unexpected so are treated like errors.
                            var error;
                            try {
                                error = JSON.parse(request.response).error;
                            } catch (e) {
                                error = new Error("Unexpected Error");
                            }
                            reject(error);
                            break;
                    }
                }
            };
            request.send(JSON.stringify(data));
        });
    }
}

export declare namespace WebAPI {
    interface requestInterface {
        response: string;
        getResponseHeader(headerName: string): string;
    }

    interface entityMultipleResponseInterface {
        value: entityMetadataInterface[];
    }
    // For entity metadata
    interface entityMetadataInterface {
        LogicalName: string;
        EntitySetName: string;
        ObjectTypeCode: number;
        PrimaryIdAttribute: string;
        PrimaryImageAttribute: string;
        PrimaryNameAttribute: string;
        SchemaName: string;
        DisplayName: { UserLocalizedLabel: { Label: string; } };
        Attributes: attributeMetadataInterface[];
        //        OneToManyRelationships: WebAPI.OTMRelationshipInterface[];
        //        ManyToOneRelationships: WebAPI.OTMRelationshipInterface[];
        //        ManyToManyRelationships: any[];
    }
    // For attribute metadata
    interface attributeMetadataInterface {
        DisplayName: { UserLocalizedLabel: { Label: string; } };
        LogicalName: string;
        AttributeType: string;
        SchemaName: string;
        IsPrimaryId: boolean;
        IsPrimaryName: boolean;
    }

    /**
     * For metadata of OneToManyRelationship and ManyToOneRelationship
     * Example:
     *    MetadataId: "dc9b80f8-c781-46d8-9fd6-a3b610836975"
     *    ReferencedAttribute: "accountid"
     *    ReferencedEntity: "account"
     *    ReferencedEntityNavigationPropertyName: "contact_customer_accounts"
     *    ReferencingAttribute: "parentcustomerid"
     *    ReferencingEntity: "contact"
     *    ReferencingEntityNavigationPropertyName: "parentcustomerid_account"
     *    RelationshipType: "OneToManyRelationship"
     *    SchemaName: "contact_customer_accounts"
     */
    interface OTMRelationshipInterface {
        MetadataId: string;
        SchemaName: string;
        ReferencedAttribute: string;
        ReferencedEntity: string;
        ReferencedEntityNavigationPropertyName: string;
        ReferencingAttribute: string;
        ReferencingEntity: string;
        ReferencingEntityNavigationPropertyName: string;
        RelationshipType: string;
    }
    /**
     * For metadata of ManyToManyRelationship
     * Example:
     *    MetadataId: "8b366d86-d389-11db-9246-00123f3a1b51"
     *    SchemaName: "opportunitycompetitors_association"
     *    Entity1IntersectAttribute: "opportunityid"
     *    Entity1LogicalName: "opportunity"
     *    Entity1NavigationPropertyName: "opportunitycompetitors_association"
     *    Entity2IntersectAttribute: "competitorid"
     *    Entity2LogicalName: "competitor"
     *    Entity2NavigationPropertyName: "opportunitycompetitors_association"
     *    IntersectEntityName: "opportunitycompetitors"
     */
    interface MTMRelationshipInterface {
        MetadataId: string
        SchemaName: string
        Entity1IntersectAttribute: string
        Entity1LogicalName: string
        Entity1NavigationPropertyName: string
        Entity2IntersectAttribute: string
        Entity2LogicalName: string
        Entity2NavigationPropertyName: string
        IntersectEntityName: string
    }
    interface entityLogicalNameRecordObject {
        entityLogicalName: string;
        record: Object;
    }
}