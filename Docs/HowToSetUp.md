# How to set up

This article is a work in progress.

```json
{
  "ConfigArray": [
    {
      "ID": "Sales",
      "Description": "This is a configuration for the sales department. Accounts and contacts, as well as opportunities as connection records.",
      "SmallerSizeEnabled": true,
      "DefaultCardsLayoutDescription": "Cards layout for sales department",
      "IsDefault": true,
      "EntitiesForConnectionList": [
        "account",
        "contact",
        "opportunity"
      ],
      "RelationshipSchemaNameList": [
        "contact_customer_accounts",
        "account_parent_account"
      ]
    },
    {
      "ID": "Service",
      "Description": "This is a configuration for the service department. This includes accounts, contacts, and cases.",
      "SmallerSizeEnabled": true,
      "DefaultCardsLayoutDescription": "Cards layout for service department",
      "IsDefault": false,
      "EntitiesForConnectionList": [
        "account",
        "contact",
        "incident"
      ],
      "RelationshipSchemaNameList": [
        "contact_customer_accounts",
        "account_parent_account",
        "incident_customer_accounts",
        "incident_customer_contacts"
      ]
    }
  ]
}
```