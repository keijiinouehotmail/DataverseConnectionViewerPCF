/**
 * Class for metadata for sample demo in English. All data is fictitious.
 * Removing "DisplayName"."LocalizedLabels" entries to reduce capacity.
 */
export class SampleDemo_Metadata_en {
    static readonly EntityMetadataSample = [
        // account
        {
            "LogicalName": "account",
            "EntitySetName": "accounts",
            "ObjectTypeCode": 1,
            "PrimaryIdAttribute": "accountid",
            "PrimaryImageAttribute": "entityimage",
            "PrimaryNameAttribute": "name",
            "SchemaName": "Account",
            "MetadataId": "70816501-edb9-4740-a16c-6a5efbc05d84",
            "DisplayName": {
                "UserLocalizedLabel": {
                    "Label": "Account",
                    "LanguageCode": 1033,
                    "IsManaged": true,
                    "MetadataId": "2a4901bf-2241-db11-898a-0007e9e17ebd",
                    "HasChanged": null
                }
            },
            "Attributes": [
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "AccountId",
                    "LogicalName": "accountid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "f8cd5db9-cee8-4845-8cdd-cd4f504957e7",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "5cd8a218-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "Address1_AddressId",
                    "LogicalName": "address1_addressid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "330e9d6e-2ca2-4694-a892-3fbb53d656fd",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Address 1: ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "1052c2fa-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "Address2_AddressId",
                    "LogicalName": "address2_addressid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "4e6b416b-cbce-4524-b194-bf8b3ed46b3e",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Address 2: ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f825e7d6-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedBy",
                    "LogicalName": "createdby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b863fe8a-6393-42ec-a540-972d3b45bd7b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c099f6ca-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedByExternalParty",
                    "LogicalName": "createdbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "827e9002-b547-49fc-9e8d-a6b1cfcef33b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c72d726a-8f5d-412c-9618-7cc99d8308c8",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedOnBehalfBy",
                    "LogicalName": "createdonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "90aa9edb-4009-48f9-9b21-2675a055c3fc",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "9e465c90-fa69-426a-b448-5547a32124e1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "EntityImageId",
                    "LogicalName": "entityimageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "ddf6ebc7-8159-4f16-bf87-4523af5f2264",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Entity Image Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "127b152b-4a4c-4148-8242-da7ec58ec346",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "MasterId",
                    "LogicalName": "masterid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "7af8cc57-303f-4c0c-92d6-53c278e067a0",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Master ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "1c1c9b1e-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedBy",
                    "LogicalName": "modifiedby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "2e19a39f-63d9-4fb1-9353-b725eb311de0",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "4e53c2fa-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedByExternalParty",
                    "LogicalName": "modifiedbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f8e8ceaf-a9e3-4108-9942-5d382f564f97",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7a03aad7-6c69-47f8-8c71-0a8d97303e9a",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedOnBehalfBy",
                    "LogicalName": "modifiedonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e9b339b9-b07c-44fb-b53d-795721d2f520",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e859a486-70dd-4585-aaa9-3de2774a4537",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_managingpartnerid",
                    "LogicalName": "msa_managingpartnerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "fba12083-552b-4877-b107-f33d6ecad784",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Managing Partner",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a0b55b23-3411-4186-a8ce-ea95939fcaea",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
                    "AttributeType": "String",
                    "SchemaName": "Name",
                    "LogicalName": "name",
                    "IsPrimaryId": false,
                    "IsPrimaryName": true,
                    "MetadataId": "a1965545-44bc-4b7b-b1ae-93074d0e3f2a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account Name",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "58f1fbc4-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningBusinessUnit",
                    "LogicalName": "owningbusinessunit",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "80e6486e-17f9-4623-b179-6f86778663ce",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Business Unit",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ec63cfee-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningTeam",
                    "LogicalName": "owningteam",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "aadfb126-cadd-4195-ada8-e739a404ba7e",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Team",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "25972789-f835-42fa-9222-40801fd112ce",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningUser",
                    "LogicalName": "owninguser",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "510089a8-713a-4d49-a993-6af37d5641d0",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "abdb0c5b-0863-4c29-be96-45b4ee4f8bcf",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ParentAccountId",
                    "LogicalName": "parentaccountid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "218eaefa-b657-4eee-933e-aa39fa8ae5c6",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Parent Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f751c2fa-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredSystemUserId",
                    "LogicalName": "preferredsystemuserid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "ea8697f0-8274-4b49-a6a4-dba3f48b3679",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Preferred User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "021c9b1e-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PrimaryContactId",
                    "LogicalName": "primarycontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "dcf69df9-5aa5-4ff0-8f7d-edbe5b7aea7c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Primary Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "b641b506-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ProcessId",
                    "LogicalName": "processid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "bac14cb9-202f-4037-82f3-5b0a570b40ed",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Process",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c76b75b9-274a-4f7a-b093-38d5322ef82a",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAId",
                    "LogicalName": "slaid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "6bdcd7f1-5865-4fef-91b0-676824b18641",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "SLA",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "826c8195-c750-4e24-971e-6215c86b34d6",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAInvokedId",
                    "LogicalName": "slainvokedid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9888d31b-1944-4a65-8856-76234861beb0",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Last SLA applied",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e9c7c65d-98c8-4484-a6a7-f81d279ed578",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "StageId",
                    "LogicalName": "stageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "3c69a2f7-b6c5-47ba-9966-b04a4693bcfc",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "(Deprecated) Process Stage",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ac13ae4b-3820-4276-8e8f-28af41ef2158",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TransactionCurrencyId",
                    "LogicalName": "transactioncurrencyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "6d36e3a6-3e08-4fbc-aaa7-247eba2ab9f5",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Currency",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "b2d8473e-6978-4b44-b667-3c1f5668aac6",
                            "HasChanged": null
                        }
                    }
                }
            ]
        },
        // contact
        {
            "LogicalName": "contact",
            "EntitySetName": "contacts",
            "ObjectTypeCode": 2,
            "PrimaryIdAttribute": "contactid",
            "PrimaryImageAttribute": "entityimage",
            "PrimaryNameAttribute": "fullname",
            "SchemaName": "Contact",
            "MetadataId": "608861bc-50a4-4c5f-a02c-21fe1943e2cf",
            "DisplayName": {
                "UserLocalizedLabel": {
                    "Label": "Contact",
                    "LanguageCode": 1033,
                    "IsManaged": true,
                    "MetadataId": "ba9709b3-2241-db11-898a-0007e9e17ebd",
                    "HasChanged": null
                }
            },
            "Attributes": [
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "AccountId",
                    "LogicalName": "accountid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "47dd42e6-fef1-401b-9a1f-e285b5d9e84b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6043781e-6d2c-4ac6-b0a6-dcbb57b103aa",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "Address1_AddressId",
                    "LogicalName": "address1_addressid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "66f5c815-f416-46ea-aaf9-7526a89e2be9",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Address 1: ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6964cfee-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "Address2_AddressId",
                    "LogicalName": "address2_addressid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "88caa9fa-26cc-460f-83ff-5365d648538c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Address 2: ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "fb90aa12-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "Address3_AddressId",
                    "LogicalName": "address3_addressid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "200b3841-9765-4622-8d3a-c6a33fdeb84a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Address 3: ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6351dd6c-5b9d-4135-89e1-355070e76bc1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ContactId",
                    "LogicalName": "contactid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "2ae700b3-97d2-4d99-96f2-8e4aa6368fc2",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "2d52c2fa-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedBy",
                    "LogicalName": "createdby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "570f0d59-4827-4710-aea7-01bedcaa2f57",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "52d6a218-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedByExternalParty",
                    "LogicalName": "createdbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "29f6cc35-e1bc-47b0-bea7-29fece1842f3",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e4f35f84-f3ca-4499-8c7b-f953b5ec75ee",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedOnBehalfBy",
                    "LogicalName": "createdonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "5accc014-f842-4331-a24b-e88e1147987c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "8551e417-7471-42d7-a040-51e8339bd917",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "EntityImageId",
                    "LogicalName": "entityimageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "6784e5c8-51b5-46d2-af5b-ac2b2c3db625",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Entity Image Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f6d976db-4fa9-4c5c-8a5e-97c524f6642e",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
                    "AttributeType": "String",
                    "SchemaName": "FullName",
                    "LogicalName": "fullname",
                    "IsPrimaryId": false,
                    "IsPrimaryName": true,
                    "MetadataId": "179aa4a5-6317-42a0-9b71-836591b963f1",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Full Name",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "8a41b506-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "MasterId",
                    "LogicalName": "masterid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "a4e75d35-3f43-4301-84b8-aa611273beae",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Master ID",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "4b9af6ca-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedBy",
                    "LogicalName": "modifiedby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e4b60e31-0ad9-4933-8aa1-2b9b783e346b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "fde9af0c-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedByExternalParty",
                    "LogicalName": "modifiedbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c212fc01-729f-408e-ab64-9566b1c3c3c1",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "50046e25-613e-461b-91ef-2a297c7da7e3",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedOnBehalfBy",
                    "LogicalName": "modifiedonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "926917ac-da30-41d7-b6a5-93c8baccd8d2",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ef5dbcd1-8cb0-4b31-8b33-75c4896d5d33",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_managingpartnerid",
                    "LogicalName": "msa_managingpartnerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "361fb238-aa54-45cd-9245-e2d91efa31e1",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Managing Partner",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "bacc692f-b948-4853-9abf-05f434275b51",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningBusinessUnit",
                    "LogicalName": "owningbusinessunit",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "971c238a-987d-4b8b-81ee-50418caff142",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Business Unit",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "84e0eed0-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningTeam",
                    "LogicalName": "owningteam",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "3ee0fcb9-4228-4454-9c27-d6f93a4ab036",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Team",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f3629fca-f1c2-4fff-98f9-68bfa9517b79",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningUser",
                    "LogicalName": "owninguser",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "36b3a71a-b3df-4877-adac-6aa0846f6e8c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "9417c1fc-e050-4a18-90ea-f5b73a10ff3b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ParentContactId",
                    "LogicalName": "parentcontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "8f8bf64b-2425-478f-91dd-651a8ff21356",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Parent Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f66cd932-11fe-4b10-9efe-360283f2e553",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Customer",
                    "SchemaName": "ParentCustomerId",
                    "LogicalName": "parentcustomerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c7a58b13-df19-491c-a918-1bc26eaf6eb3",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Company Name",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6291aa12-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredSystemUserId",
                    "LogicalName": "preferredsystemuserid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e2fc4683-1187-46e6-91f8-9057f0c7d939",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Preferred User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "3098ba00-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ProcessId",
                    "LogicalName": "processid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4e40d60b-79fb-41b7-a0cd-a62996c46688",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Process",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7f6747a3-1c34-4ecf-a1ae-b766612c730f",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "sample_ContributorsId",
                    "LogicalName": "sample_contributorsid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "80912d3b-5718-4be8-a6fc-16cc7d7da25f",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAId",
                    "LogicalName": "slaid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "589d672c-d005-4623-98dc-932ddf7f8915",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "SLA",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a8ed7173-3b9c-4833-836a-4ca60aa41a1f",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAInvokedId",
                    "LogicalName": "slainvokedid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "bbf1111d-d828-43a8-9cf1-b8db34085a33",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Last SLA applied",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ba20c8b9-b1c1-423f-9733-c7bbfa23a007",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "StageId",
                    "LogicalName": "stageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0f8578a7-807b-45fb-b4b7-a03c9aa3cdac",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "(Deprecated) Process Stage",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "3f7aa60f-6013-422d-b1aa-5f88fca7db93",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "SubscriptionId",
                    "LogicalName": "subscriptionid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9fba06a8-1b73-44d3-b01d-dedb14d0b4c3",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Subscription",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "b152b7b7-c529-41eb-b1a9-4a5cb8f46779",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TransactionCurrencyId",
                    "LogicalName": "transactioncurrencyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0762c350-de10-41f9-8f84-a64f5ce9d306",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Currency",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "d779cb5d-78c3-415d-b3b1-54257767b173",
                            "HasChanged": null
                        }
                    }
                }
            ]
        },
        // opportunity
        {
            "LogicalName": "opportunity",
            "EntitySetName": "opportunities",
            "ObjectTypeCode": 3,
            "PrimaryIdAttribute": "opportunityid",
            "PrimaryImageAttribute": null,
            "PrimaryNameAttribute": "name",
            "SchemaName": "Opportunity",
            "MetadataId": "30b0cd7e-0081-42e1-9a48-688442277fae",
            "DisplayName": {
                "UserLocalizedLabel": {
                    "Label": "Opportunity",
                    "LanguageCode": 1033,
                    "IsManaged": true,
                    "MetadataId": "b9f8eb7a-802b-4d8c-a274-41476023487b",
                    "HasChanged": null
                }
            },
            "Attributes": [
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "AccountId",
                    "LogicalName": "accountid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "036b8586-4e5c-49a7-8694-9c6c8cb5d780",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "73786531-61f8-469b-a84b-3b79fafcfbbb",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CampaignId",
                    "LogicalName": "campaignid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "a9b3fe95-66c6-423a-ab8a-18b0968c9434",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Source Campaign",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7483ef16-c59b-4a5e-a0e5-8bd525e2e467",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ContactId",
                    "LogicalName": "contactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "46521de5-8508-47e3-9fd8-41e708fae229",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "abc29424-3a9d-4fc3-967b-d2a370669a5d",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedBy",
                    "LogicalName": "createdby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "a05074cf-e136-488c-8e40-698a66f29114",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "aa10a835-9865-48be-832b-3c31a6a7da20",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedOnBehalfBy",
                    "LogicalName": "createdonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f51c38e6-6867-4f35-b848-3a8310687e6d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e190bd2a-be8b-4565-b8bb-988e1752d09f",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Customer",
                    "SchemaName": "CustomerId",
                    "LogicalName": "customerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "be996913-d018-40bc-b1fb-057a2ca5b852",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Potential Customer",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "b48aade5-96d7-4345-b180-bcd3f7027873",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedBy",
                    "LogicalName": "modifiedby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "2e64b0ae-f8b1-431b-90c3-3ac16e9d9a60",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a39bd808-a49d-4871-a0ce-ecca53e57ff5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedOnBehalfBy",
                    "LogicalName": "modifiedonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c8e94c07-b713-4738-9871-7fbc3d8af753",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "b856f0d7-37f5-4a34-ada6-e272a7fdd6b8",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_partnerid",
                    "LogicalName": "msa_partnerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "de0ad368-f224-4d04-8b86-15521d43ea9b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Partner",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "eaf4c476-5ae3-4f8e-9520-63e6d179dbfd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_partneroppid",
                    "LogicalName": "msa_partneroppid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c8b77f7c-aa23-46ee-b82b-ef1b6c5cf410",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Partner Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7adee041-bfbc-438c-aab6-c0214b4e6a06",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_opportunitykpiid",
                    "LogicalName": "msdyn_opportunitykpiid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "92d07df4-4616-4679-a916-ad88776ffb68",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "KPI",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e8bc1e13-d97c-4e56-83a0-1b65474433d4",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_PredictiveScoreId",
                    "LogicalName": "msdyn_predictivescoreid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0912d4e0-741e-4ce7-bbf2-36af50ca056d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Predictive Score",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "edcdb5e8-e57e-4e4d-9cc7-19dc3900889f",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_segmentid",
                    "LogicalName": "msdyn_segmentid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "a09a46e7-be4e-4962-9c42-4f5601213906",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Segment Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "5b56faa8-430a-4ad7-88ad-17ea8620b761",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_WorkOrderType",
                    "LogicalName": "msdyn_workordertype",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "89ef9756-8db2-4b12-89de-312dd18d735f",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdynmkt_JourneyId",
                    "LogicalName": "msdynmkt_journeyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "7dddc8a4-5f19-49fb-93d4-7f32ee4a75d2",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Journey Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7f61057b-dffa-4a14-8e30-d48dcf03be7e",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
                    "AttributeType": "String",
                    "SchemaName": "Name",
                    "LogicalName": "name",
                    "IsPrimaryId": false,
                    "IsPrimaryName": true,
                    "MetadataId": "cca28961-bbde-4536-b916-f1f192105bfa",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Topic",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "d88da484-9877-4a2a-9353-30191e0a5672",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "OpportunityId",
                    "LogicalName": "opportunityid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "a9a055aa-1cc7-474d-bc0b-396667417017",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Opportunity",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f27c4ef9-a976-4737-87ce-bdbb01d4234c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OriginatingLeadId",
                    "LogicalName": "originatingleadid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f1ae44ca-413b-42b6-8e6f-a25aa311c00b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Originating Lead",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ade060ca-e8c6-4775-b14a-33fc535131ed",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningBusinessUnit",
                    "LogicalName": "owningbusinessunit",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e2ee4aa3-4c7b-4873-8b03-9b6ce62cc893",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Business Unit",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "097912af-53cb-4a94-b20c-828b8d8a7a89",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningTeam",
                    "LogicalName": "owningteam",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b18456d2-4af7-49ff-9f2e-1466192a679d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Team",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "98dbcdf2-02df-4272-a0d2-5ed9993e7d5e",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningUser",
                    "LogicalName": "owninguser",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c11c423e-745b-4460-83da-9af65de64621",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "fd7effbc-0f09-4d5c-b58f-b12e2d23aaa7",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ParentAccountId",
                    "LogicalName": "parentaccountid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "257b4f83-ad85-4151-b062-4b6788397c47",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e4a1b1a5-e9ed-4fc6-930e-436f01422d9a",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ParentContactId",
                    "LogicalName": "parentcontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "1c506ddf-ac44-4ac6-86fc-e55a72ad9840",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "d8dbdfdf-b037-4afd-b0f2-d65901aee613",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PriceLevelId",
                    "LogicalName": "pricelevelid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "2bd3b54d-62ab-474e-9b47-475410ddb6dd",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Price List",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6bc4435f-980b-469b-a915-4674ad3911b7",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ProcessId",
                    "LogicalName": "processid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "24e6feab-2b2e-4d9e-9359-d67ee439cc13",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Process Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a6e5d45e-56d5-498d-a3b9-fd2e4b4b1397",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAId",
                    "LogicalName": "slaid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "955533df-200a-43cb-af04-f25e5ded6136",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "SLA",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c6e84ff3-182c-48d0-9f6e-2692776834d3",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAInvokedId",
                    "LogicalName": "slainvokedid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "ca8300ca-598d-49c3-9753-a0f66665dada",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Last SLA Applied",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "017fe1f1-5f8f-499f-b1f4-61b8fd8bbf0a",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "StageId",
                    "LogicalName": "stageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "34687d61-c9d7-4809-bcbf-e2b451ba47f9",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "(Deprecated) Stage Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a89ab1e7-b529-4fad-9aec-8374767c9471",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "StepId",
                    "LogicalName": "stepid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "7d9ce418-5c1e-41f2-a0b5-d16ccc18893c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Step",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "7f684225-9c5a-4d5e-baba-c378fc3626cf",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TransactionCurrencyId",
                    "LogicalName": "transactioncurrencyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b1998578-5c94-47ba-afbd-b91fbb56e318",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Currency",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "06bb032b-e09b-48bd-94ce-caeada625a6f",
                            "HasChanged": null
                        }
                    }
                }
            ]
        },
        // connection
        {
            "LogicalName": "connection",
            "EntitySetName": "connections",
            "ObjectTypeCode": 3234,
            "PrimaryIdAttribute": "connectionid",
            "PrimaryImageAttribute": "entityimage",
            "PrimaryNameAttribute": "name",
            "SchemaName": "Connection",
            "MetadataId": "c7866019-d3d1-40d7-b483-381fcdccffb2",
            "DisplayName": {
                "UserLocalizedLabel": {
                    "Label": "Connection",
                    "LanguageCode": 1033,
                    "IsManaged": true,
                    "MetadataId": "dedbf70c-f02f-4c2f-9d6f-fd6ab4f4aeed",
                    "HasChanged": null
                }
            },
            "Attributes": [
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ConnectionId",
                    "LogicalName": "connectionid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "522d7a64-a50f-4365-952d-6ff6ae52b3a3",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Connection",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "26f0beb6-080b-4cde-8d20-ded168a561d6",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedBy",
                    "LogicalName": "createdby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "3a846909-9940-42c8-88e1-f78789808259",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "26925fda-0912-46a7-ab50-073c4fede4e1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedOnBehalfBy",
                    "LogicalName": "createdonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9c9e730d-1ecd-40b5-8bff-1f4e12da1c4a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "0a4addcf-fbbf-46d8-a5d9-5de0ff120aae",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "EntityImageId",
                    "LogicalName": "entityimageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "96756ec6-3b2f-471c-b476-cb654890a7f4",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Entity Image Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "faa1e626-7c42-4e59-877c-929e5c598f1b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedBy",
                    "LogicalName": "modifiedby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0c002326-d512-482d-a9bc-3653c53abd3c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "2152837a-0e34-43b7-af3a-a906ea70004c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedOnBehalfBy",
                    "LogicalName": "modifiedonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "43b21cc8-fe01-4569-8d88-0fefdc83c39d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e90728eb-f2c0-45ea-a15d-a4767ae3c716",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
                    "AttributeType": "String",
                    "SchemaName": "Name",
                    "LogicalName": "name",
                    "IsPrimaryId": false,
                    "IsPrimaryName": true,
                    "MetadataId": "9491f246-2444-4de3-ae26-0a2cd98337cb",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Connection Name",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "68a7305c-5617-453f-a482-031404dd52e5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningBusinessUnit",
                    "LogicalName": "owningbusinessunit",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0ffd7246-1322-4c22-92ea-573d0561df7a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Business Unit",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ebca9a12-022c-432b-a239-43cb49595ae9",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningTeam",
                    "LogicalName": "owningteam",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "50b3268d-b9dc-4925-ab76-c08e11b83c30",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Team",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "d8e67993-3e33-486a-b36c-a3921c48ce82",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningUser",
                    "LogicalName": "owninguser",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e29089c2-94f3-406d-9f7f-9a8bd114b3fc",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c656715a-9b45-4ac8-8f80-86746b3d4193",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "Record1Id",
                    "LogicalName": "record1id",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d6ce8ebc-86dc-49cb-839a-1312cab69a9d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Connected From",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "145cdedf-1ae8-4a7e-9532-f7e6838c0a5b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "Record1RoleId",
                    "LogicalName": "record1roleid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d1a596a3-5844-47d1-a834-859382dbc807",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Role (From)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "6eb87047-cda3-462b-932f-23acfb7ffb93",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "Record2Id",
                    "LogicalName": "record2id",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "48c02973-80a2-431b-8805-8c0f06170d69",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Connected To",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "d4b5ddcc-5209-44f9-90ae-3dba2e201f08",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "Record2RoleId",
                    "LogicalName": "record2roleid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0b8dbebc-bf62-47b2-b8ac-e31d53bbd538",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Role (To)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "be510552-9672-4da2-bb8b-a09deff333cb",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "RelatedConnectionId",
                    "LogicalName": "relatedconnectionid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "01fd51a4-6d51-46c5-8eba-f059c5bd9333",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Reciprocal Connection",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f1857862-2719-44ab-8a39-96639060927b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TransactionCurrencyId",
                    "LogicalName": "transactioncurrencyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "33bdc702-3ed3-4821-9dab-3f86387ca6df",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Currency",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "5839fb73-bfbb-4681-a7d6-333b7b412b44",
                            "HasChanged": null
                        }
                    }
                }
            ]
        },
        // incident
        {
            "LogicalName": "incident",
            "EntitySetName": "incidents",
            "ObjectTypeCode": 112,
            "PrimaryIdAttribute": "incidentid",
            "PrimaryImageAttribute": "entityimage",
            "PrimaryNameAttribute": "title",
            "SchemaName": "Incident",
            "MetadataId": "e3fe4ff2-a630-49bb-a1e9-debc3a076815",
            "DisplayName": {
                "UserLocalizedLabel": {
                    "Label": "Case",
                    "LanguageCode": 1033,
                    "IsManaged": true,
                    "MetadataId": "71dacd5b-9af6-402c-8d7d-e301db8ec8e3",
                    "HasChanged": null
                }
            },
            "Attributes": [
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "AccountId",
                    "LogicalName": "accountid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "fee11bbd-3783-46e3-8c74-32f24fd8989a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Account",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "4fc6c83a-3eee-423b-9088-d9a5d073fc85",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ContactId",
                    "LogicalName": "contactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4ff40786-b76b-42bf-ab77-0f3a8fc558c5",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e2526c76-53c0-479c-94a8-42963e4c25dd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ContractDetailId",
                    "LogicalName": "contractdetailid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "76d36a0a-25f9-45d7-ac9b-70e0aaacaa13",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contract Line",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "2a9ce351-94a1-47b7-8b47-c425e1add081",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ContractId",
                    "LogicalName": "contractid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "07933aff-9d82-4622-ae2e-72597dfa5dd9",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contract",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "f904c078-4cdf-4e98-bd89-18c839d25747",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedBy",
                    "LogicalName": "createdby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d9a4c8e4-51e0-4a46-9219-590b05d5e7ea",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "63090fe4-bd4f-4b53-a434-ce8fc2651ef6",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedByExternalParty",
                    "LogicalName": "createdbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b97e8878-ec6d-4076-8b7f-bc151146fd83",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "0aeaa2e4-50e0-4673-9918-5e69ef39d2bb",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "CreatedOnBehalfBy",
                    "LogicalName": "createdonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c1067588-6ffc-479d-9135-b9e5bb79e42c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Created By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "40e4b6d5-5ab6-404d-a985-ef868fa8ecb5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Customer",
                    "SchemaName": "CustomerId",
                    "LogicalName": "customerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "09d25a7a-420f-42f7-bad4-192edc51356a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Customer",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "38720584-b1d8-4ed6-af40-611c8ec093fc",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "EntitlementId",
                    "LogicalName": "entitlementid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "54cf6aed-e2bb-419f-980d-bbd7f223ae37",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Entitlement",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "03268b20-5600-4f77-807a-c597cabccb14",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "EntityImageId",
                    "LogicalName": "entityimageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f4ce67f4-d8dd-4069-9b56-145b8fc436d5",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Existing Case",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a3703727-4ca0-4225-8a97-6df3d3dc69a2",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "FirstResponseByKPIId",
                    "LogicalName": "firstresponsebykpiid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e5aa4a74-4557-41f6-a251-249df7197888",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "First Response By KPI",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c9000433-68da-410a-bdff-5aa275b49b4b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "IncidentId",
                    "LogicalName": "incidentid",
                    "IsPrimaryId": true,
                    "IsPrimaryName": false,
                    "MetadataId": "3f76bccc-fd71-44a0-a955-e4470edae346",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Case",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "cb4ba915-9c6d-4bc8-9df4-495ff00406b1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "KbArticleId",
                    "LogicalName": "kbarticleid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "99ed88fe-0e9e-4553-b5d1-abec6f802e92",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Knowledge Base Article",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "08ba6188-6233-4235-9a60-05640cd1f9f6",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "MasterId",
                    "LogicalName": "masterid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "a495bf5d-1b0b-4594-86f2-102e8d32b9e8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Master Case",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "60b32a36-337c-4c9c-8685-a655970d7e96",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedBy",
                    "LogicalName": "modifiedby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4aec4112-8f69-465b-8f00-7aee5d8896cc",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "fdb3a10b-b1ec-4487-90c6-586ed9c06e78",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedByExternalParty",
                    "LogicalName": "modifiedbyexternalparty",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "92aa7c13-9ab5-48b8-bfaa-639cc8b6ef82",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (External Party)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "dc18ed6d-a7e0-407c-99a8-d0133f99bf4d",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ModifiedOnBehalfBy",
                    "LogicalName": "modifiedonbehalfby",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "ebf07e75-c506-4714-9a8d-c9f92d730832",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Modified By (Delegate)",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "9df61a76-531d-4e78-ae76-204c59d483a8",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_partnercontactid",
                    "LogicalName": "msa_partnercontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "bd0c4701-bc58-4c7f-adfe-619879dd4af8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Partner Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "133513b6-409d-4966-9393-9c0ba598b90d",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msa_partnerid",
                    "LogicalName": "msa_partnerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9bfd9afa-a12d-4e29-9625-0a0acbb4218b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Partner",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "08fb18bb-e6be-44cc-913b-1ea11a7e125c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_FunctionalLocation",
                    "LogicalName": "msdyn_functionallocation",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f222b596-f489-46a0-95b1-5d74aba18e3a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Functional Location",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "335e2e5d-700d-4342-86c2-c0c90f5ec25e",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_IncidentType",
                    "LogicalName": "msdyn_incidenttype",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "359c50a8-5980-4db3-8e67-f2e05da94784",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_iotalert",
                    "LogicalName": "msdyn_iotalert",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "7d4e5486-e33b-4ec4-a659-191e50164e0b",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "IoT Alert",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e1f7fc86-2d29-461c-b945-6721dff639d2",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningBusinessUnit",
                    "LogicalName": "owningbusinessunit",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f995a7f6-435f-4604-a1f8-8286864ea075",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Business Unit",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "9eace610-7006-4244-9fa2-18251ac2077b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningTeam",
                    "LogicalName": "owningteam",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b30e04c7-be8b-4afd-802d-14ad9ef3a77a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning Team",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "ef0c5e9c-40d1-42aa-96b9-2aa8618bd63c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OwningUser",
                    "LogicalName": "owninguser",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e6a9ebfa-f49c-4008-ae30-b0b5888bc84c",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Owning User",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "c22bc6e7-f578-44e2-8954-54e47e635552",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ParentCaseId",
                    "LogicalName": "parentcaseid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "332b5313-8e97-4b38-8778-1a95d57e3df8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Parent Case",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e99494ca-6c3f-41c7-bdc3-b24feb9b525c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PrimaryContactId",
                    "LogicalName": "primarycontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "e3d359c8-a797-4193-a931-a3fe9f36a7dd",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "56953316-22e9-4046-a025-fbc53118d2d5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "ProcessId",
                    "LogicalName": "processid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "2cf2bec1-d174-49a3-bf10-f248efce0d10",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Process Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "40143715-1eff-45f9-9275-c3a137056086",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ProductId",
                    "LogicalName": "productid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "f3ee3c87-8c6c-4a71-b60e-7f1a5850ceec",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Product",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "2841eb4b-5894-4599-8569-42f5a24fd944",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ResolveByKPIId",
                    "LogicalName": "resolvebykpiid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "c6d817b6-47cf-4841-901f-485be5d77a55",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Resolve By KPI",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "2effc070-5791-474b-a102-62aec613d948",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "ResponsibleContactId",
                    "LogicalName": "responsiblecontactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "40e9f508-9615-4c73-be83-c08b80ff6944",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Responsible Contact",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "e521d318-f38d-4b43-9ab0-a3463354f3a8",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAId",
                    "LogicalName": "slaid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "bec76b31-a304-48b1-87fb-cebfe6ae04ee",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "SLA",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "64b04ee3-9531-4a6e-a8c2-fa85b4964859",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SLAInvokedId",
                    "LogicalName": "slainvokedid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "fb08a99a-c42f-4e81-a555-0c7c65baf494",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Last SLA Applied",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "3466a8df-5c8a-442b-a6d7-31644fa2e663",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SocialProfileId",
                    "LogicalName": "socialprofileid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "3250fd9b-6f28-48a3-b88c-807d35835065",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Social Profile",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "91099e8c-b7c3-47f8-bdca-0cf92fc97365",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "AttributeType": "Uniqueidentifier",
                    "SchemaName": "StageId",
                    "LogicalName": "stageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0824db82-d77a-4af1-86dc-d4179b6f3f6e",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "(Deprecated) Stage Id",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "9d031ab3-9ae1-4010-8e75-65dd0f471254",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "SubjectId",
                    "LogicalName": "subjectid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "bdf3dad1-a5fc-4ecb-90a0-39961b3a85d8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Subject",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "194779a2-0208-41ba-9bb1-ae1a19ceed13",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.StringAttributeMetadata",
                    "AttributeType": "String",
                    "SchemaName": "Title",
                    "LogicalName": "title",
                    "IsPrimaryId": false,
                    "IsPrimaryName": true,
                    "MetadataId": "a8386a75-2b87-4d05-bbbe-b409d1035712",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Case Title",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "fb85edf8-1b3b-49d9-bdb6-0a90817c7121",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TransactionCurrencyId",
                    "LogicalName": "transactioncurrencyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4dd74258-2b91-4250-ad27-e5f25df21177",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "Currency",
                            "LanguageCode": 1033,
                            "IsManaged": true,
                            "MetadataId": "a2903d7a-8367-4bd8-9d36-47b4dc37b104",
                            "HasChanged": null
                        }
                    }
                }
            ]
        }
    ];
    static readonly RelationshipMetadataSample = [
        // contact_customer_accounts
        { "@odata.type": "#Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata", "ReferencedAttribute": "accountid", "ReferencedEntity": "account", "ReferencingAttribute": "parentcustomerid", "ReferencingEntity": "contact", "IsHierarchical": false, "EntityKey": null, "IsRelationshipAttributeDenormalized": false, "ReferencedEntityNavigationPropertyName": "contact_customer_accounts", "ReferencingEntityNavigationPropertyName": "parentcustomerid_account", "RelationshipBehavior": 1, "IsDenormalizedLookup": null, "DenormalizedAttributeName": null, "IsCustomRelationship": false, "IsValidForAdvancedFind": true, "SchemaName": "contact_customer_accounts", "SecurityTypes": "Append", "IsManaged": true, "RelationshipType": "OneToManyRelationship", "IntroducedVersion": "5.0.0.0", "MetadataId": "dc9b80f8-c781-46d8-9fd6-a3b610836975", "HasChanged": null, "AssociatedMenuConfiguration": { "Behavior": "UseCollectionName", "Group": "Details", "Order": 50, "IsCustomizable": true, "Icon": null, "ViewId": "00000000-0000-0000-00aa-000010001210", "AvailableOffline": true, "MenuId": "navContacts", "QueryApi": "CRMAccount.RetrieveSubContacts", "Label": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, "CascadeConfiguration": { "Assign": "Cascade", "Delete": "Cascade", "Archive": "NoCascade", "Merge": "Cascade", "Reparent": "Cascade", "Share": "Cascade", "Unshare": "Cascade", "RollupView": "NoCascade" }, "RelationshipAttributes": [], "IsCustomizable": { "Value": true, "CanBeChanged": false, "ManagedPropertyLogicalName": "iscustomizable" } },
        // account_parent_account
        { "@odata.type": "#Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata", "ReferencedAttribute": "accountid", "ReferencedEntity": "account", "ReferencingAttribute": "parentaccountid", "ReferencingEntity": "account", "IsHierarchical": true, "EntityKey": null, "IsRelationshipAttributeDenormalized": false, "ReferencedEntityNavigationPropertyName": "account_parent_account", "ReferencingEntityNavigationPropertyName": "parentaccountid", "RelationshipBehavior": 1, "IsDenormalizedLookup": null, "DenormalizedAttributeName": null, "IsCustomRelationship": false, "IsValidForAdvancedFind": true, "SchemaName": "account_parent_account", "SecurityTypes": "Append", "IsManaged": true, "RelationshipType": "OneToManyRelationship", "IntroducedVersion": "5.0.0.0", "MetadataId": "57511732-b553-4cfb-bcf2-d280f9f8c6f1", "HasChanged": null, "AssociatedMenuConfiguration": { "Behavior": "UseCollectionName", "Group": "Details", "Order": 40, "IsCustomizable": true, "Icon": "/_imgs/area/18_subAccounts.gif", "ViewId": "00000000-0000-0000-00aa-000010001200", "AvailableOffline": true, "MenuId": "navSubAccts", "QueryApi": "CRMAccount.RetrieveSubAccounts", "Label": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, "CascadeConfiguration": { "Assign": "Cascade", "Delete": "RemoveLink", "Archive": "NoCascade", "Merge": "Cascade", "Reparent": "Cascade", "Share": "Cascade", "Unshare": "Cascade", "RollupView": "NoCascade" }, "RelationshipAttributes": [], "IsCustomizable": { "Value": true, "CanBeChanged": false, "ManagedPropertyLogicalName": "iscustomizable" } },
        // incident_customer_accounts
        { "@odata.type": "#Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata", "ReferencedAttribute": "accountid", "ReferencedEntity": "account", "ReferencingAttribute": "customerid", "ReferencingEntity": "incident", "IsHierarchical": false, "EntityKey": null, "IsRelationshipAttributeDenormalized": false, "ReferencedEntityNavigationPropertyName": "incident_customer_accounts", "ReferencingEntityNavigationPropertyName": "customerid_account", "RelationshipBehavior": 1, "IsDenormalizedLookup": null, "DenormalizedAttributeName": null, "IsCustomRelationship": false, "IsValidForAdvancedFind": true, "SchemaName": "incident_customer_accounts", "SecurityTypes": "Append", "IsManaged": true, "RelationshipType": "OneToManyRelationship", "IntroducedVersion": "5.0.0.0", "MetadataId": "35fa5030-e29a-ec11-b400-000d3a35cdc7", "HasChanged": null, "AssociatedMenuConfiguration": { "Behavior": "UseCollectionName", "Group": "Service", "Order": 10, "IsCustomizable": true, "Icon": null, "ViewId": "00000000-0000-0000-00aa-000010003501", "AvailableOffline": true, "MenuId": "navService", "QueryApi": "CRMIncident.RollupRelatedByObject", "Label": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, "CascadeConfiguration": { "Assign": "Cascade", "Delete": "Cascade", "Archive": "NoCascade", "Merge": "Cascade", "Reparent": "Cascade", "Share": "Cascade", "Unshare": "Cascade", "RollupView": "NoCascade" }, "RelationshipAttributes": [], "IsCustomizable": { "Value": true, "CanBeChanged": false, "ManagedPropertyLogicalName": "iscustomizable" } },
        // incident_customer_contacts
        { "@odata.type": "#Microsoft.Dynamics.CRM.OneToManyRelationshipMetadata", "ReferencedAttribute": "contactid", "ReferencedEntity": "contact", "ReferencingAttribute": "customerid", "ReferencingEntity": "incident", "IsHierarchical": false, "EntityKey": null, "IsRelationshipAttributeDenormalized": false, "ReferencedEntityNavigationPropertyName": "incident_customer_contacts", "ReferencingEntityNavigationPropertyName": "customerid_contact", "RelationshipBehavior": 1, "IsDenormalizedLookup": null, "DenormalizedAttributeName": null, "IsCustomRelationship": false, "IsValidForAdvancedFind": true, "SchemaName": "incident_customer_contacts", "SecurityTypes": "Append", "IsManaged": true, "RelationshipType": "OneToManyRelationship", "IntroducedVersion": "5.0.0.0", "MetadataId": "179e4b36-e29a-ec11-b400-000d3a35cdc7", "HasChanged": null, "AssociatedMenuConfiguration": { "Behavior": "UseCollectionName", "Group": "Service", "Order": 10, "IsCustomizable": true, "Icon": null, "ViewId": "00000000-0000-0000-00aa-000010003501", "AvailableOffline": true, "MenuId": "navService", "QueryApi": "CRMIncident.RollupRelatedByObject", "Label": { "LocalizedLabels": [], "UserLocalizedLabel": null } }, "CascadeConfiguration": { "Assign": "Cascade", "Delete": "Cascade", "Archive": "NoCascade", "Merge": "Cascade", "Reparent": "Cascade", "Share": "Cascade", "Unshare": "Cascade", "RollupView": "NoCascade" }, "RelationshipAttributes": [], "IsCustomizable": { "Value": true, "CanBeChanged": false, "ManagedPropertyLogicalName": "iscustomizable" } }
    ];
    static readonly AnnotationRelationshipMetadataSample = { "AssociatedMenuConfiguration": { "Behavior": "DoNotDisplay", "Group": "Details", "Label": { "LocalizedLabels": [], "UserLocalizedLabel": null }, "Order": null }, "CascadeConfiguration": { "Assign": "Cascade", "Delete": "Cascade", "Merge": "Cascade", "Reparent": "Cascade", "Share": "Cascade", "Unshare": "Cascade", "RollupView": "NoCascade" }, "ReferencedAttribute": "contactid", "ReferencedEntity": "contact", "ReferencingAttribute": "objectid", "ReferencingEntity": "annotation", "IsHierarchical": false, "ReferencedEntityNavigationPropertyName": "Contact_Annotation", "ReferencingEntityNavigationPropertyName": "objectid_contact", "IsCustomRelationship": false, "IsCustomizable": { "Value": true, "CanBeChanged": false, "ManagedPropertyLogicalName": "iscustomizable" }, "IsValidForAdvancedFind": true, "SchemaName": "Contact_Annotation", "SecurityTypes": "Append", "IsManaged": true, "RelationshipType": "OneToManyRelationship", "IntroducedVersion": "5.0.0.0", "MetadataId": "249177a6-9ff0-4d5f-acad-4f7c23f81839", "HasChanged": null };
}
