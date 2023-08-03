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
                "label": "Nickname",
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
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
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
            },
            {
                "key": "phone3 ext",
                "type": "string",
                "label": "Work Phone Extension",
                "constraints": [
                    {
                        "type": "unique"
                    }
                ]
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
                "type": "string",
                "label": "Purchased Product Type"
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
            }
        ]
    } as SheetConfig
] 