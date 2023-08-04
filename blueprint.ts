import { SheetConfig } from "@flatfile/api/api";

export const blueprint = [
    {
        "name": "Orders",
        "description": "Some orders for our marvelous store",
        "slug": "orders",
        "fields": [
            {
                "key": "first_name",
                "type": "string",
                "label": "First Name",
                "constraints": [
                    {
                        "type": "required"
                    }
                ]
            },
            {
                "key": "last_name",
                "type": "string",
                "label": "Last Name",
                "constraints": [
                    {
                        "type": "required"
                    }
                ]
            },
            {
                "key": "nick",
                "type": "string",
                "label": "Nickname"
            },
            {
                "key": "email",
                "type": "string",
                "label": "Email",
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
            },
            {
                "key": "phone",
                "type": "string",
                "label": "Home Phone",
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
            },
            {
                "key": "phone2",
                "type": "string",
                "label": "Mobile Phone",
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
            },
            {
                "key": "phone3",
                "type": "string",
                "label": "Work Phone",
            },
            {
                "key": "phone3 ext",
                "type": "string",
                "label": "Work Phone Extension",
            },
            {
                "key": "dob",
                "type": "date",
                "label": "Date of Birth"
            },
            {
                "key": "dop",
                "type": "date",
                "label": "Date of Last Payment"
            },
            {
                "key": "billing_street1",
                "type": "string",
                "label": "[Billing] Street"
            },
            {
                "key": "billing_street2",
                "type": "string",
                "label": "[Billing] Street 2"
            },
            {
                "key": "billing_city",
                "type": "string",
                "label": "[Billing] City"
            },
            {
                "key": "billing_state",
                "type": "string",
                "label": "[Billing] State"
            },
            {
                "key": "billing_zip",
                "type": "string",
                "label": "[Billing] Postal Code"
            },
            {
                "key": "billing_country",
                "type": "string",
                "label": "[Billing] Country"
            },
            {
                "key": "shipping_street1",
                "type": "string",
                "label": "[Shipping] Street"
            },
            {
                "key": "shipping_street2",
                "type": "string",
                "label": "[Shipping] Street 2"
            },
            {
                "key": "shipping_city",
                "type": "string",
                "label": "[Shipping] City"
            },
            {
                "key": "shipping_state",
                "type": "string",
                "label": "[Shipping] State"
            },
            {
                "key": "shipping_zip",
                "type": "string",
                "label": "[Shipping] Postal Code"
            },
            {
                "key": "shipping_country",
                "type": "string",
                "label": "[Shipping] Country"
            },
            {
                "key": "bank",
                "type": "string",
                "label": "Bank Account"
            },
            {
                "key": "bank-bic",
                "type": "string",
                "label": "Bank BIC"
            },
            {
                "key": "bank-iban",
                "type": "string",
                "label": "Bank IBAN"
            },
            {
                "key": "bank-name",
                "type": "string",
                "label": "Bank Name"
            },
            {
                "key": "product name",
                "type": "string",
                "label": "Purchased Product Name"
            },
            {
                "key": "product category",
                "type": "string",
                "label": "Purchased Product Category"
            },
            {
                "key": "product material",
                "type": "string",
                "label": "Purchased Product Material"
            },
            {
                "key": "product type",
                "type": "enum",
                "label": "Purchased Product Type",
                "config": {
                    "options": [
                        { "value": "ind", "label": "Industrial"},
                        { "value": "com", "label": "Commercial"},
                        { "value": "res", "label": "Residential"}
                    ]
                }
            },
            {
                "key": "product color",
                "type": "string",
                "label": "Purchased Product Color"
            },
            {
                "key": "product size",
                "type": "string",
                "label": "Purchased Product Size"
            },
            {
                "key": "product price",
                "type": "number",
                "label": "Purchased Product Price"
            },
            {
                "key": "product quantity",
                "type": "number",
                "label": "Purchased Product Quantity"
            },
            {
                "key": "product date",
                "type": "date",
                "label": "Product Purchase Date"
            },
            {
                "key": "company's name",
                "type": "string",
                "label": "Company Name"
            },
            {
                "key": "company's phone",
                "type": "string",
                "label": "Company Phone"
            },
            {
                "key": "company's dept.",
                "type": "string",
                "label": "Company Department"
            },
            {
                "key": "company's primary color",
                "type": "string",
                "label": "Company Primary Brand Color"
            },
            {
                "key": "company's secondary color",
                "type": "string",
                "label": "Company Secondary Brand Color"
            },
            {
                "key": "company's slogan",
                "type": "string",
                "label": "Company Slogan"
            },
            {
                "key": "company's logo",
                "type": "string",
                "label": "Company Brand Logo"
            },
            {
                "key": "company's theme",
                "type": "string",
                "label": "Company Brand Theme"
            },
            {
                "key": "company_street1",
                "type": "string",
                "label": "[Company] Street"
            },
            {
                "key": "company_street2",
                "type": "string",
                "label": "[Company] Street 2"
            },
            {
                "key": "company_city",
                "type": "string",
                "label": "[Company] City"
            },
            {
                "key": "company_state",
                "type": "string",
                "label": "[Company] State"
            },
            {
                "key": "company_zip",
                "type": "string",
                "label": "[Company] Postal Code"
            },
            {
                "key": "company_country",
                "type": "string",
                "label": "[Company] Country"
            },
            {
                "key": "notes",
                "type": "string",
                "label": "Notes"
            },
            {
                "key": "notes_1",
                "type": "string",
                "label": "Notes 1"
            },
            {
                "key": "notes_2",
                "type": "string",
                "label": "Notes 2"
            },
            {
                "key": "notes_3",
                "type": "string",
                "label": "Notes 3"
            },
            {
                "key": "notes_4",
                "type": "string",
                "label": "Notes 4"
            },
            {
                "key": "notes_5",
                "type": "string",
                "label": "Notes 5"
            },
            {
                "key": "notes_6",
                "type": "string",
                "label": "Notes 6"
            },
            {
                "key": "notes_7",
                "type": "string",
                "label": "Notes 7"
            },
            {
                "key": "notes_8",
                "type": "string",
                "label": "Notes 8"
            },
            {
                "key": "notes_9",
                "type": "string",
                "label": "Notes 9"
            },
            {
                "key": "notes_10",
                "type": "string",
                "label": "Notes 10"
            },
            {
                "key": "notes_11",
                "type": "string",
                "label": "Notes 11"
            },
            {
                "key": "notes_12",
                "type": "string",
                "label": "Notes 12"
            },
            {
                "key": "notes_13",
                "type": "string",
                "label": "Notes 13"
            },
            {
                "key": "notes_14",
                "type": "string",
                "label": "Notes 14"
            },
            {
                "key": "notes_15",
                "type": "string",
                "label": "Notes 15"
            },
            {
                "key": "notes_16",
                "type": "string",
                "label": "Notes 16"
            },
            {
                "key": "notes_17",
                "type": "string",
                "label": "Notes 17"
            },
            {
                "key": "notes_18",
                "type": "string",
                "label": "Notes 18"
            },
            {
                "key": "notes_19",
                "type": "string",
                "label": "Notes 19"
            },
            {
                "key": "notes_20",
                "type": "string",
                "label": "Notes 20"
            },
            {
                "key": "notes_21",
                "type": "string",
                "label": "Notes 21"
            },
            {
                "key": "notes_22",
                "type": "string",
                "label": "Notes 22"
            },
            {
                "key": "notes_23",
                "type": "string",
                "label": "Notes 23"
            },
            {
                "key": "notes_24",
                "type": "string",
                "label": "Notes 24"
            },
            {
                "key": "notes_25",
                "type": "string",
                "label": "Notes 25"
            },
            {
                "key": "notes_26",
                "type": "string",
                "label": "Notes 26"
            },
            {
                "key": "notes_27",
                "type": "string",
                "label": "Notes 27"
            },
            {
                "key": "notes_28",
                "type": "string",
                "label": "Notes 28"
            },
            {
                "key": "notes_29",
                "type": "string",
                "label": "Notes 29"
            },
            {
                "key": "notes_30",
                "type": "string",
                "label": "Notes 30"
            },
            {
                "key": "notes_31",
                "type": "string",
                "label": "Notes 31"
            },
            {
                "key": "notes_32",
                "type": "string",
                "label": "Notes 32"
            },
            {
                "key": "notes_33",
                "type": "string",
                "label": "Notes 33"
            },
            {
                "key": "notes_34",
                "type": "string",
                "label": "Notes 34"
            },
            {
                "key": "notes_35",
                "type": "string",
                "label": "Notes 35"
            },
            {
                "key": "notes_36",
                "type": "string",
                "label": "Notes 36"
            },
            {
                "key": "notes_37",
                "type": "string",
                "label": "Notes 37"
            },
            {
                "key": "notes_38",
                "type": "string",
                "label": "Notes 38"
            },
            {
                "key": "notes_39",
                "type": "string",
                "label": "Notes 39"
            },
            {
                "key": "notes_40",
                "type": "string",
                "label": "Notes 40"
            },
            {
                "key": "notes_41",
                "type": "string",
                "label": "Notes 41"
            },
            {
                "key": "notes_42",
                "type": "string",
                "label": "Notes 42"
            },
            {
                "key": "notes_43",
                "type": "string",
                "label": "Notes 43"
            },
            {
                "key": "notes_44",
                "type": "string",
                "label": "Notes 44"
            },
            {
                "key": "notes_45",
                "type": "string",
                "label": "Notes 45"
            },
            {
                "key": "notes_46",
                "type": "string",
                "label": "Notes 46"
            },
            {
                "key": "notes_47",
                "type": "string",
                "label": "Notes 47"
            },
            {
                "key": "notes_48",
                "type": "string",
                "label": "Notes 48"
            },
            {
                "key": "notes_49",
                "type": "string",
                "label": "Notes 49"
            },
            {
                "key": "notes_50",
                "type": "string",
                "label": "Notes 50"
            }
        ]
    } as SheetConfig
] 