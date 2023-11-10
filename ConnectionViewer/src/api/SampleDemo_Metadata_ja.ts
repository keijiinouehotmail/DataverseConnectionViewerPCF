/**
 * Class for metadata for sample demo in Japanese. All data is fictitious.
 * Removing "DisplayName"."LocalizedLabels" entries to reduce capacity.
 */
export class SampleDemo_Metadata_ja {
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
                    "Label": "取引先企業 ",
                    "LanguageCode": 1041,
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
                            "Label": "取引先企業",
                            "LanguageCode": 1041,
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
                            "Label": "住所 1: ID",
                            "LanguageCode": 1041,
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
                            "Label": "住所 2: ID",
                            "LanguageCode": 1041,
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
                            "Label": "作成者",
                            "LanguageCode": 1041,
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
                            "Label": "作成者 (外部パーティ)",
                            "LanguageCode": 1041,
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
                            "Label": "作成者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "9e465c90-fa69-426a-b448-5547a32124e1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "DefaultPriceLevelId",
                    "LogicalName": "defaultpricelevelid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "dde3fc28-c8f5-41df-b0bd-004ce1cc353a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "価格表",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "54904a0a-99e3-4be4-ab4f-d7630165e05c",
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
                            "Label": "エンティティ イメージ ID",
                            "LanguageCode": 1041,
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
                            "Label": "マスター ID",
                            "LanguageCode": 1041,
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
                            "Label": "修正者",
                            "LanguageCode": 1041,
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
                            "Label": "修正者 (外部パーティ)",
                            "LanguageCode": 1041,
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
                            "Label": "修正者 (代理)",
                            "LanguageCode": 1041,
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
                    "MetadataId": "36f9d610-c032-4a20-843f-0c88c47a0112",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "管理パートナー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "caa0cb5c-de58-48f7-bee5-fd1bd361ab76",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_accountkpiid",
                    "LogicalName": "msdyn_accountkpiid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "affb5960-27a7-495c-a785-b9554b3fa8db",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "KPI",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "36eecb56-7c00-44fb-a4f8-b4cf5f470ca3",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_BillingAccount",
                    "LogicalName": "msdyn_billingaccount",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b96f6811-5775-4669-ad0a-c875e49c5254",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_PreferredResource",
                    "LogicalName": "msdyn_preferredresource",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "71c07b06-5f78-4055-be91-fc87574b6402",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_salesaccelerationinsightid",
                    "LogicalName": "msdyn_salesaccelerationinsightid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d1dc349b-3efe-44bf-8ba3-8a744b118020",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "営業促進分析情報 ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c1e16472-38aa-481a-84fe-1f3e6b93ac91",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_SalesTaxCode",
                    "LogicalName": "msdyn_salestaxcode",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "05272e89-2878-461a-81e8-316cb459e793",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_segmentid",
                    "LogicalName": "msdyn_segmentid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9eb01e28-6366-4bd4-9c8a-f201c867a81f",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "セグメント ID",
                            "LanguageCode": 1041,
                            "IsManaged": false,
                            "MetadataId": "1500e927-f5f1-4d62-a9b5-67dc79d3f86c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_ServiceTerritory",
                    "LogicalName": "msdyn_serviceterritory",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "59959f92-5646-43b1-a0e1-2b5c5e40fc35",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_workhourtemplate",
                    "LogicalName": "msdyn_workhourtemplate",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4854b19d-8f95-491e-9464-05db395974b4",
                    "DisplayName": {
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
                            "Label": "取引先企業名",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "58f1fbc4-2241-db11-898a-0007e9e17ebd",
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
                    "MetadataId": "7bf7ed76-77bb-4b70-8086-312df7727588",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "元のリード",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "69bd3870-67e6-43b1-885b-aa89c73fdd28",
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
                            "Label": "所属部署",
                            "LanguageCode": 1041,
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
                            "Label": "所有チーム",
                            "LanguageCode": 1041,
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
                            "Label": "所有ユーザー",
                            "LanguageCode": 1041,
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
                            "Label": "取引先企業の親会社",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "f751c2fa-2241-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredEquipmentId",
                    "LogicalName": "preferredequipmentid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d5f8e679-3885-41ce-b945-65c5b621efbc",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "優先する設備/備品",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "09ba6c95-9329-4745-ac04-f4766eab57a5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredServiceId",
                    "LogicalName": "preferredserviceid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "ba916f06-fc34-4127-9dc6-9b9ec92adf5f",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "優先するサービス",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "2bead228-2881-4c5d-970e-013209c7e4d2",
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
                            "Label": "優先するユーザー",
                            "LanguageCode": 1041,
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
                            "Label": "取引先責任者",
                            "LanguageCode": 1041,
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
                            "Label": "プロセス",
                            "LanguageCode": 1041,
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
                            "LanguageCode": 1041,
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
                            "Label": "最後に適用された SLA",
                            "LanguageCode": 1041,
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
                            "Label": "(廃止) プロセス ステージ",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ac13ae4b-3820-4276-8e8f-28af41ef2158",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "TerritoryId",
                    "LogicalName": "territoryid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "952b5e27-4020-48da-bcf1-f174c67803e8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "担当地域",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a98f0da6-0093-472b-8f8e-9a12cd3545e4",
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
                            "Label": "通貨型",
                            "LanguageCode": 1041,
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
                    "Label": "取引先担当者 ",
                    "LanguageCode": 1041,
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
                            "Label": "取引先企業",
                            "LanguageCode": 1041,
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
                            "Label": "住所 1: ID",
                            "LanguageCode": 1041,
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
                            "Label": "住所 2: ID",
                            "LanguageCode": 1041,
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
                            "Label": "住所 3: ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "6351dd6c-5b9d-4135-89e1-355070e76bc1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "adx_preferredlanguageid",
                    "LogicalName": "adx_preferredlanguageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "fc6fd981-60da-44d7-985d-a55afb5817a2",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "優先する言語",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "b2ebf950-acf5-4a88-b8d7-ad9c64f5deaf",
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
                            "Label": "取引先担当者",
                            "LanguageCode": 1041,
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
                            "Label": "作成者",
                            "LanguageCode": 1041,
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
                            "Label": "作成者 (外部パーティ)",
                            "LanguageCode": 1041,
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
                            "Label": "作成者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "8551e417-7471-42d7-a040-51e8339bd917",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "DefaultPriceLevelId",
                    "LogicalName": "defaultpricelevelid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "4e021894-735c-4e36-afb9-0c6c3d2686f8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "価格表",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a32d3e88-1088-4667-a206-e8567a8a4338",
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
                            "Label": "エンティティ イメージ ID",
                            "LanguageCode": 1041,
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
                            "Label": "氏名",
                            "LanguageCode": 1041,
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
                            "Label": "マスター ID",
                            "LanguageCode": 1041,
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
                            "Label": "修正者",
                            "LanguageCode": 1041,
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
                            "Label": "修正者 (外部パーティ)",
                            "LanguageCode": 1041,
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
                            "Label": "修正者 (代理)",
                            "LanguageCode": 1041,
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
                    "MetadataId": "67fd44d0-afd6-4c47-a3fe-58e6d7d8b98e",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "管理パートナー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "711ef7b5-2d4e-44a1-9378-9fd4a4c29a4b",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyn_contactkpiid",
                    "LogicalName": "msdyn_contactkpiid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "d507bc8e-8379-42a6-85f6-ad0904928c8a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "KPI",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a98e4d28-194a-4302-9990-56893ff98e0f",
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
                    "MetadataId": "c1f79c58-3afb-4ee7-8d63-a15f9922498d",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "セグメント ID",
                            "LanguageCode": 1041,
                            "IsManaged": false,
                            "MetadataId": "77b48f70-af94-42d2-bea8-db5765ff5f07",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_ContactId",
                    "LogicalName": "msdyncrm_contactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b59396a0-387a-4f8b-929c-6c795f00904f",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "取引先担当者を今すぐ送信",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "626af000-3d21-4754-88f3-3b80438242b1",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_customerjourneyid",
                    "LogicalName": "msdyncrm_customerjourneyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "cde452f6-8701-485b-8250-1cf70b793a43",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソースの顧客体験 (アウトバウンド マーケティング)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "b1f56412-883a-4c94-92ed-e364db169d1c",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_emailid",
                    "LogicalName": "msdyncrm_emailid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "47e67810-be66-470f-a328-1c3231a34d44",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソースの電子メール (アウトバウンド マーケティング)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "8614398d-3f98-4276-aff5-43a513286c30",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_marketingformid",
                    "LogicalName": "msdyncrm_marketingformid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "25620e9c-c59d-45bf-8882-e145b591574f",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソースのフォーム (アウトバウンド マーケティング)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "2a7cfe91-e5ed-45eb-af1d-ce1301b17951",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_marketingpageid",
                    "LogicalName": "msdyncrm_marketingpageid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b32a1e28-9a01-43a8-825e-6a99db95b2fe",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソースのランディング ページ (アウトバウンド マーケティング)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "00290378-10fd-4576-afb5-1a3846fadef5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdyncrm_SegmentMemberId",
                    "LogicalName": "msdyncrm_segmentmemberid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "b2668557-5716-41ec-830d-fed65c5fcb3e",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "セグメント メンバー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "afbbed21-3faf-464e-8ddc-d693f8af1587",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdynmkt_customerjourneyid",
                    "LogicalName": "msdynmkt_customerjourneyid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "764ecb42-6770-412a-a7ea-4e0a2ed647dd",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソース顧客体験",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ee54e633-094d-4506-be5b-935b664c78ee",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdynmkt_emailid",
                    "LogicalName": "msdynmkt_emailid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "5546c710-68b7-4d95-ab41-4254287b1833",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソース電子メール",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7d96d19f-ac72-41a2-949a-ce7a0ee0eda5",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msdynmkt_marketingformid",
                    "LogicalName": "msdynmkt_marketingformid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "afff91d6-779b-4123-972e-2da1d1e1ec8a",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "ソース フォーム",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7efc43d7-56a4-4e7a-984a-7497e922ef59",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msevtmgt_ContactId",
                    "LogicalName": "msevtmgt_contactid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "477fec72-b94e-423e-ab05-5b7f610e1fa8",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "2942feda-9d9a-44b4-a772-ccc8c98d7b3f",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msevtmgt_originatingeventid",
                    "LogicalName": "msevtmgt_originatingeventid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "123757ee-1eb7-4968-a7ce-bf371419ee78",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "元のイベント",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "57550465-4706-411f-8e91-42f637ab1779",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msgdpr_consentchangesourceformId",
                    "LogicalName": "msgdpr_consentchangesourceformid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "abf7625f-3a78-468f-a2b5-b18f212e2fa4",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "consent change source form Id",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "8b810b1b-a0b9-4470-8006-4c324ca63560",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "msgdpr_GDPRParentId",
                    "LogicalName": "msgdpr_gdprparentid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "9e325dca-dee7-4122-a0e0-d9bae63f3fa6",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "親担当者または管理者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "71c6d5ef-828a-4a29-821b-4cb5898ce899",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "omocdp_ECCustomerID",
                    "LogicalName": "omocdp_eccustomerid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "5290faa0-2af0-4ca6-a852-aab3c15412f5",
                    "DisplayName": {
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "OriginatingLeadId",
                    "LogicalName": "originatingleadid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "1a8ab7df-d528-48f2-920a-b6cc7cb306e5",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "元のリード",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "d27151cb-ee9a-4225-87cc-c8caf6a74a73",
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
                            "Label": "所属部署",
                            "LanguageCode": 1041,
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
                            "Label": "所有チーム",
                            "LanguageCode": 1041,
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
                            "Label": "所有ユーザー",
                            "LanguageCode": 1041,
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
                            "Label": "取引先担当者の上司",
                            "LanguageCode": 1041,
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
                            "Label": "会社名",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "6291aa12-2341-db11-898a-0007e9e17ebd",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredEquipmentId",
                    "LogicalName": "preferredequipmentid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0ea34eaa-c367-42e4-bd01-37387b6db379",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "優先する設備/備品",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "852723cf-f44d-4c5a-8015-82d25e92e662",
                            "HasChanged": null
                        }
                    }
                },
                {
                    "@odata.type": "#Microsoft.Dynamics.CRM.LookupAttributeMetadata",
                    "AttributeType": "Lookup",
                    "SchemaName": "PreferredServiceId",
                    "LogicalName": "preferredserviceid",
                    "IsPrimaryId": false,
                    "IsPrimaryName": false,
                    "MetadataId": "0c4f4c19-2abe-4685-9cd9-d4b31bd8fd45",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "優先するサービス",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ed9e08bf-b2c5-4455-97c6-3a16876eb869",
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
                            "Label": "優先するユーザー",
                            "LanguageCode": 1041,
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
                            "Label": "プロセス",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7f6747a3-1c34-4ecf-a1ae-b766612c730f",
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
                    "MetadataId": "589d672c-d005-4623-98dc-932ddf7f8915",
                    "DisplayName": {
                        "UserLocalizedLabel": {
                            "Label": "SLA",
                            "LanguageCode": 1041,
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
                            "Label": "最後に適用された SLA",
                            "LanguageCode": 1041,
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
                            "Label": "(廃止) プロセス ステージ",
                            "LanguageCode": 1041,
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
                            "Label": "サブスクリプション",
                            "LanguageCode": 1041,
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
                            "Label": "通貨型",
                            "LanguageCode": 1041,
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
                    "Label": "営業案件",
                    "LanguageCode": 1041,
                    "IsManaged": true,
                    "MetadataId": "44b59a2e-fd18-4de8-895c-56eaceb0a21e",
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
                            "Label": "取引先企業",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c8118a1e-9946-44d4-9afa-19551a4d9c26",
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
                            "Label": "ソース キャンペーン",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "83c5711b-f2c6-49f0-9388-da1efa884b31",
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
                            "Label": "取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "6e16578e-265c-4fa7-aa2d-8f478dbfdee3",
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
                            "Label": "作成者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "9f463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "作成者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a5463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "見込み顧客",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ef1a9c36-e18f-430f-8167-59b4610c5db3",
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
                            "Label": "修正者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a3463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "修正者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a7463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "パートナー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ac42ffec-7d9f-4c1c-b7f7-b01c42e5cce0",
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
                            "Label": "パートナー取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "d9fff487-bb32-4643-86ef-599e567f658b",
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
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "49d53107-fdb7-411b-997e-143bfdb53110",
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
                            "Label": "予測スコアリング",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "b5fee5d5-ee45-43a5-b151-d0bfbb04d290",
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
                            "Label": "セグメント ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "6f02838a-5758-497e-8c06-3f594bea8bfb",
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
                            "Label": "体験 ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "1be2aa21-9d66-457d-95bd-e89509035e41",
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
                            "Label": "トピック",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "f22d2dab-b4cb-4359-b52a-65880dcdf2a0",
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
                            "Label": "営業案件",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c79db45d-568e-4e5d-8d7d-da9b54d01d82",
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
                            "Label": "元のリード",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "fd28a860-8b40-4e15-a15f-c627ac006f10",
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
                            "Label": "所属部署",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c9463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "所有チーム",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "d2463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "所有ユーザー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "cb463f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "取引先企業",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7466f30d-5a8e-4d73-bb3f-2b53f4acdeb1",
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
                            "Label": "取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7dc5bec8-cddc-4693-b97b-9d7c8af54e2f",
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
                            "Label": "価格表",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "22324b53-2e04-49cd-938d-d94f3fc72624",
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
                            "Label": "プロセス ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "26473f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "e1d2ba98-1be4-4437-a325-ea67b0921f00",
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
                            "Label": "最後に適用された SLA",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7bb4be02-db00-445f-8fe8-3529e0538351",
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
                            "Label": "(廃止) ステージ ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "28473f94-ec9a-ec11-b400-000d3a35cdc7",
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
                            "Label": "ステップ",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "78d43714-a01f-4ccf-98ef-a25fa7cbbaeb",
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
                            "Label": "通貨",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "30473f94-ec9a-ec11-b400-000d3a35cdc7",
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
                    "Label": "つながり ",
                    "LanguageCode": 1041,
                    "IsManaged": true,
                    "MetadataId": "feb81341-f3f6-4715-86e5-265e94422b74",
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
                            "Label": "つながり",
                            "LanguageCode": 1041,
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
                            "Label": "作成者",
                            "LanguageCode": 1041,
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
                            "Label": "作成者 (代理)",
                            "LanguageCode": 1041,
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
                            "Label": "エンティティ イメージ ID",
                            "LanguageCode": 1041,
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
                            "Label": "修正者",
                            "LanguageCode": 1041,
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
                            "Label": "修正者 (代理)",
                            "LanguageCode": 1041,
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
                            "Label": "つながり名",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "fc253cb9-000e-4d94-963c-32c6da9d3d6d",
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
                            "Label": "所属部署",
                            "LanguageCode": 1041,
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
                            "Label": "所有チーム",
                            "LanguageCode": 1041,
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
                            "Label": "所有ユーザー",
                            "LanguageCode": 1041,
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
                            "Label": "接続元",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "988df1d4-9c13-4457-b891-c098ba232b38",
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
                            "Label": "ロール (元)",
                            "LanguageCode": 1041,
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
                            "Label": "接続先",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "9686f69f-63cc-482e-95c8-d5a4a4da670e",
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
                            "Label": "ロール (先)",
                            "LanguageCode": 1041,
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
                            "Label": "逆方向のつながり",
                            "LanguageCode": 1041,
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
                            "Label": "通貨型",
                            "LanguageCode": 1041,
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
                    "Label": "サポート案件",
                    "LanguageCode": 1041,
                    "IsManaged": true,
                    "MetadataId": "34a5c18a-7795-4b5c-89bd-bc45b61b3624",
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
                            "Label": "取引先企業",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "436f3d04-962e-41e5-a990-65140ab87b61",
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
                            "Label": "取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "0730bc16-fbd6-4349-849a-13f52c30c8da",
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
                            "Label": "契約品目",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "24262efd-4cad-4b46-9daa-5f641be69f07",
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
                            "Label": "契約",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "3cffe7f8-19a2-4f94-9c97-622c941fe333",
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
                            "Label": "作成者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "f8bcc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "作成者 (外部パーティ)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "23fbb8d9-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "作成者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "febcc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "顧客",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "789a14b1-9c09-44d0-a979-e241db519c72",
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
                            "Label": "権利",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7414328a-0ff5-4128-9506-0db9b473e652",
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
                            "Label": "既存のサポート案件",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "0c895ff6-6a6a-4ab7-93d7-58e00b3f4b33",
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
                            "Label": "最初の応答期限の KPI",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "bcb95096-e606-44c1-9085-f40d0e4b2a6c",
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
                            "Label": "サポート案件",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "7ea3f7fe-3386-4e75-9f7a-5df9d437063b",
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
                            "Label": "サポート情報の記事",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "d364186a-763b-4f55-bc0e-1d14075e5305",
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
                            "Label": "マスター サポート案件",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "480594f8-55ce-43ed-8962-42157a0ae58f",
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
                            "Label": "修正者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "fcbcc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "修正者 (外部パーティ)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "2bfbb8d9-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "修正者 (代理)",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "00bdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "パートナー取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c9fd9fd3-a270-4335-8513-9948c0782359",
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
                            "Label": "パートナー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "c768bd6b-c143-4330-a003-60c1ac22c774",
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
                            "Label": "機能の場所",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "383da45b-7643-4edf-a583-6030851324fe",
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
                            "Label": "IoT 通知",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "02646c6c-fd23-4dcc-8f98-9b92b207d53c",
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
                            "Label": "所属部署",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "22bdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "所有チーム",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "2bbdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "所有ユーザー",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "24bdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "親サポート案件",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "ac495bcf-20c1-45d3-bdef-f10f078bd1c8",
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
                            "Label": "取引先担当者",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "9005bbe0-9769-40be-bc9c-88c9924f9641",
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
                            "Label": "プロセス ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "73bdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "製品",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "0c8772a7-086f-4253-9e55-3df5b4d26f20",
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
                            "Label": "解決期限の KPI",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "53f75186-292b-45da-80d8-d9f71615b4fc",
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
                            "Label": "担当者連絡先",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a1994ab6-2ed3-40c1-88d5-ed77a561e8b3",
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
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "8953004d-042f-4e00-8a8b-2e9f4389eb7a",
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
                            "Label": "最後に適用された SLA",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "30c3191e-ff7d-48af-9d6f-f048b26ddb22",
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
                            "Label": "ソーシャル プロファイル",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "9da09c68-5c31-41e2-907b-c87962958f61",
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
                            "Label": "(廃止) ステージ ID",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "75bdc0d3-e19a-ec11-b400-000d3a35cdc7",
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
                            "Label": "情報カテゴリ",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "4fecc1c6-c698-4bf9-8917-5cdc784fca56",
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
                            "Label": "サポート案件のタイトル",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "56cd3a57-262d-49e8-94b6-9de26d932bd8",
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
                            "Label": "通貨",
                            "LanguageCode": 1041,
                            "IsManaged": true,
                            "MetadataId": "a86d26d8-1821-40e7-8f6b-53ada2042c29",
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
