export const mockLoaderData = {
    orders: [
        {
            number: '10003',
            lineItems: [
                {
                    productName: { original: 'Flowers', translated: 'Flowers' },
                    catalogReference: {
                        catalogItemId: 'd5442049-3e5b-4ba0-9f2d-30b458f79942',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: {} },
                    },
                    quantity: 1,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [],
                    image: 'wix:image://v1/22e53e_2fee033b2eca46cab4eec7fa74e99c31~mv2.jpg#originWidth=3000&originHeight=3000',
                    physicalProperties: { sku: '364215376135191', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '166.50', formattedAmount: '€166.50' },
                    priceBeforeDiscounts: { amount: '166.50', formattedAmount: '€166.50' },
                    totalPriceBeforeTax: { amount: '166.50', formattedAmount: '€166.50' },
                    totalPriceAfterTax: { amount: '166.50', formattedAmount: '€166.50' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '166.50', formattedAmount: '€166.50' },
                    customLineItem: false,
                    rootCatalogItemId: 'd5442049-3e5b-4ba0-9f2d-30b458f79942',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000001',
                },
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: 'e5e7c186-1af9-47fc-aae4-49afc9290dcc',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: { Size: '250 ml' } },
                    },
                    quantity: 3,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [
                        {
                            name: { original: 'Size', translated: 'Size' },
                            plainText: { original: '250 ml', translated: '250 ml' },
                            lineType: 'PLAIN_TEXT',
                            plainTextValue: { original: '250 ml', translated: '250 ml' },
                        },
                    ],
                    image: 'wix:image://v1/22e53e_4f99aa57e6a04e6dbcdbfe474fc1654f~mv2.jpg#originWidth=4000&originHeight=4000',
                    physicalProperties: { sku: '364215376135199', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '85.00', formattedAmount: '€85.00' },
                    priceBeforeDiscounts: { amount: '85.00', formattedAmount: '€85.00' },
                    totalPriceBeforeTax: { amount: '255.00', formattedAmount: '€255.00' },
                    totalPriceAfterTax: { amount: '255.00', formattedAmount: '€255.00' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '255.00', formattedAmount: '€255.00' },
                    customLineItem: false,
                    rootCatalogItemId: 'e5e7c186-1af9-47fc-aae4-49afc9290dcc',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000002',
                },
            ],
            buyerInfo: {
                contactId: '0b84b6c5-5c75-47f8-afc6-376456a96115',
                email: 'yuriiv@wix.com',
                memberId: '35dff1e1-a3a5-4ff6-945e-a2a5d1529ec7',
            },
            paymentStatus: 'NOT_PAID',
            fulfillmentStatus: 'NOT_FULFILLED',
            buyerLanguage: 'en',
            weightUnit: 'KG',
            currency: 'EUR',
            taxIncludedInPrices: false,
            siteLanguage: 'en',
            priceSummary: {
                subtotal: { amount: '421.50', formattedAmount: '€421.50' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '421.50', formattedAmount: '€421.50' },
                total: { amount: '421.50', formattedAmount: '€421.50' },
                totalWithGiftCard: { amount: '421.50', formattedAmount: '€421.50' },
                totalWithoutGiftCard: { amount: '421.50', formattedAmount: '€421.50' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            billingInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            shippingInfo: {
                carrierId: 'c8a08776-c095-4dec-8553-8f9698d86adc',
                code: '00000000-0000-0000-0000-000000000001',
                title: 'Free Shipping',
                logistics: {
                    deliveryTime: '',
                    shippingDestination: {
                        address: {
                            addressLine1: 'Lviv',
                            city: 'Lviv',
                            country: 'UA',
                            postalCode: '79000',
                        },
                        contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
                    },
                },
                cost: {
                    price: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceBeforeTax: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceAfterTax: { amount: '0.00', formattedAmount: '€0.00' },
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                },
                region: { name: 'Domestic' },
            },
            status: 'APPROVED',
            taxSummary: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                manualTaxRate: '0',
            },
            taxInfo: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                taxBreakdown: [],
                manualTaxRate: '0',
            },
            appliedDiscounts: [],
            activities: [],
            attributionSource: 'UNSPECIFIED',
            createdBy: {},
            channelInfo: { type: 'WEB' },
            checkoutId: '7fe4785c-cc7a-45dc-a0ff-a2c02bb62715',
            customFields: [],
            cartId: 'e39b9286-4eb1-46fc-9a69-b7fe2cdf86ac',
            isInternalOrderCreate: false,
            payNow: {
                subtotal: { amount: '421.50', formattedAmount: '€421.50' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '421.50', formattedAmount: '€421.50' },
                total: { amount: '421.50', formattedAmount: '€421.50' },
                totalWithGiftCard: { amount: '421.50', formattedAmount: '€421.50' },
                totalWithoutGiftCard: { amount: '421.50', formattedAmount: '€421.50' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            balanceSummary: {
                balance: { amount: '421.50', formattedAmount: '€421.50' },
                paid: { amount: '0', formattedAmount: '€0.00' },
                refunded: { amount: '0', formattedAmount: '€0.00' },
                authorized: { amount: '0', formattedAmount: '€0.00' },
                pendingRefund: { amount: '0', formattedAmount: '€0.00' },
            },
            additionalFees: [],
            purchaseFlowId: 'f0dc0cbf-ec2e-4b35-b3d1-77c412ad1094',
            recipientInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            purchasedDate: '2024-11-06T15:32:51.397Z',
            _id: '9a6170af-e362-4a25-8788-cd411f680a61',
            _createdDate: '2024-11-06T15:32:51.397Z',
            _updatedDate: '2024-11-07T19:38:54.179Z',
        },
        {
            number: '10002',
            lineItems: [
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: 'aecf498b-d733-4fc5-b3ee-0f8e366f575b',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: {} },
                    },
                    quantity: 2,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [],
                    image: 'wix:image://v1/22e53e_4a271c0887d34ec6be04a8f3c870b869~mv2.jpg#originWidth=3000&originHeight=3000',
                    physicalProperties: { sku: '671253175371', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '95.00', formattedAmount: '€95.00' },
                    priceBeforeDiscounts: { amount: '95.00', formattedAmount: '€95.00' },
                    totalPriceBeforeTax: { amount: '190.00', formattedAmount: '€190.00' },
                    totalPriceAfterTax: { amount: '190.00', formattedAmount: '€190.00' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '190.00', formattedAmount: '€190.00' },
                    customLineItem: false,
                    rootCatalogItemId: 'aecf498b-d733-4fc5-b3ee-0f8e366f575b',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000001',
                },
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: 'a578c5ca-a022-4f8c-ba56-d6252dc87f5f',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: { Size: 'Small' } },
                    },
                    quantity: 1,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [
                        {
                            name: { original: 'Size', translated: 'Size' },
                            plainText: { original: 'Small', translated: 'Small' },
                            lineType: 'PLAIN_TEXT',
                            plainTextValue: { original: 'Small', translated: 'Small' },
                        },
                    ],
                    image: 'wix:image://v1/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg#originWidth=3716&originHeight=3716',
                    physicalProperties: { sku: '21554345656', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '120.00', formattedAmount: '€120.00' },
                    priceBeforeDiscounts: { amount: '120.00', formattedAmount: '€120.00' },
                    totalPriceBeforeTax: { amount: '120.00', formattedAmount: '€120.00' },
                    totalPriceAfterTax: { amount: '120.00', formattedAmount: '€120.00' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '120.00', formattedAmount: '€120.00' },
                    customLineItem: false,
                    rootCatalogItemId: 'a578c5ca-a022-4f8c-ba56-d6252dc87f5f',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000002',
                },
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: 'a578c5ca-a022-4f8c-ba56-d6252dc87f5f',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: { Size: 'Large' } },
                    },
                    quantity: 3,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [
                        {
                            name: { original: 'Size', translated: 'Size' },
                            plainText: { original: 'Large', translated: 'Large' },
                            lineType: 'PLAIN_TEXT',
                            plainTextValue: { original: 'Large', translated: 'Large' },
                        },
                    ],
                    image: 'wix:image://v1/22e53e_8adb0d7018b047e0a998acf987fd3fd6~mv2.jpg#originWidth=3716&originHeight=3716',
                    physicalProperties: { sku: '21554345656', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '120.00', formattedAmount: '€120.00' },
                    priceBeforeDiscounts: { amount: '120.00', formattedAmount: '€120.00' },
                    totalPriceBeforeTax: { amount: '360.00', formattedAmount: '€360.00' },
                    totalPriceAfterTax: { amount: '360.00', formattedAmount: '€360.00' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '360.00', formattedAmount: '€360.00' },
                    customLineItem: false,
                    rootCatalogItemId: 'a578c5ca-a022-4f8c-ba56-d6252dc87f5f',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000003',
                },
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: 'a04d6bf1-0b00-415b-846b-39ec23fb5373',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: { Size: 'Small' } },
                    },
                    quantity: 1,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [
                        {
                            name: { original: 'Size', translated: 'Size' },
                            plainText: { original: 'Small', translated: 'Small' },
                            lineType: 'PLAIN_TEXT',
                            plainTextValue: { original: 'Small', translated: 'Small' },
                        },
                    ],
                    image: 'wix:image://v1/22e53e_e1b7b337b97b4dd3bb9ed68e2598dc61~mv2.jpg#originWidth=3708&originHeight=3709',
                    physicalProperties: { sku: '366615376135191', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '7.50', formattedAmount: '€7.50' },
                    priceBeforeDiscounts: { amount: '7.50', formattedAmount: '€7.50' },
                    totalPriceBeforeTax: { amount: '7.50', formattedAmount: '€7.50' },
                    totalPriceAfterTax: { amount: '7.50', formattedAmount: '€7.50' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '7.50', formattedAmount: '€7.50' },
                    customLineItem: false,
                    rootCatalogItemId: 'a04d6bf1-0b00-415b-846b-39ec23fb5373',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000004',
                },
            ],
            buyerInfo: {
                contactId: '0b84b6c5-5c75-47f8-afc6-376456a96115',
                email: 'yuriiv@wix.com',
                memberId: '35dff1e1-a3a5-4ff6-945e-a2a5d1529ec7',
            },
            paymentStatus: 'NOT_PAID',
            fulfillmentStatus: 'NOT_FULFILLED',
            buyerLanguage: 'en',
            weightUnit: 'KG',
            currency: 'EUR',
            taxIncludedInPrices: false,
            siteLanguage: 'en',
            priceSummary: {
                subtotal: { amount: '677.50', formattedAmount: '€677.50' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '677.50', formattedAmount: '€677.50' },
                total: { amount: '677.50', formattedAmount: '€677.50' },
                totalWithGiftCard: { amount: '677.50', formattedAmount: '€677.50' },
                totalWithoutGiftCard: { amount: '677.50', formattedAmount: '€677.50' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            billingInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            shippingInfo: {
                carrierId: 'c8a08776-c095-4dec-8553-8f9698d86adc',
                code: '00000000-0000-0000-0000-000000000001',
                title: 'Free Shipping',
                logistics: {
                    deliveryTime: '',
                    shippingDestination: {
                        address: {
                            addressLine1: 'Lviv',
                            city: 'Lviv',
                            country: 'UA',
                            postalCode: '79000',
                        },
                        contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
                    },
                },
                cost: {
                    price: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceBeforeTax: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceAfterTax: { amount: '0.00', formattedAmount: '€0.00' },
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                },
                region: { name: 'Domestic' },
            },
            status: 'APPROVED',
            taxSummary: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                manualTaxRate: '0',
            },
            taxInfo: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                taxBreakdown: [],
                manualTaxRate: '0',
            },
            appliedDiscounts: [],
            activities: [],
            attributionSource: 'UNSPECIFIED',
            createdBy: {},
            channelInfo: { type: 'WEB' },
            checkoutId: 'b335fc6b-889e-4749-93bf-5dc8ec3642d0',
            customFields: [],
            cartId: 'a389d577-91d8-46fb-b9f2-43bd3c0c66ce',
            isInternalOrderCreate: false,
            payNow: {
                subtotal: { amount: '677.50', formattedAmount: '€677.50' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '677.50', formattedAmount: '€677.50' },
                total: { amount: '677.50', formattedAmount: '€677.50' },
                totalWithGiftCard: { amount: '677.50', formattedAmount: '€677.50' },
                totalWithoutGiftCard: { amount: '677.50', formattedAmount: '€677.50' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            balanceSummary: {
                balance: { amount: '677.50', formattedAmount: '€677.50' },
                paid: { amount: '0', formattedAmount: '€0.00' },
                refunded: { amount: '0', formattedAmount: '€0.00' },
                authorized: { amount: '0', formattedAmount: '€0.00' },
                pendingRefund: { amount: '0', formattedAmount: '€0.00' },
            },
            additionalFees: [],
            purchaseFlowId: '2fd93f73-6973-4503-8273-6289bf5c626c',
            recipientInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            purchasedDate: '2024-11-05T14:27:31.225Z',
            _id: '55b604f3-36b7-4c9e-95e6-0c208a16d494',
            _createdDate: '2024-11-05T14:27:31.225Z',
            _updatedDate: '2024-11-06T19:03:25.253Z',
        },
        {
            number: '10001',
            lineItems: [
                {
                    productName: { original: "I'm a product", translated: "I'm a product" },
                    catalogReference: {
                        catalogItemId: '7b067cb8-e0bc-49ac-92ca-747bfdb8fc21',
                        appId: '215238eb-22a5-4c36-9e7b-e7c08025e04e',
                        options: { options: { Color: 'White' } },
                    },
                    quantity: 1,
                    totalDiscount: { amount: '0.00', formattedAmount: '€0.00' },
                    descriptionLines: [
                        {
                            name: { original: 'Color', translated: 'Color' },
                            colorInfo: {
                                original: 'White',
                                translated: 'White',
                                code: 'rgb(255, 255, 255)',
                            },
                            lineType: 'COLOR',
                            color: 'White',
                        },
                    ],
                    image: 'wix:image://v1/22e53e_6818890490334e429d78876ba5f757ce~mv2.jpg#originWidth=3941&originHeight=3941',
                    physicalProperties: { sku: '364115376135191', shippable: true },
                    itemType: { preset: 'PHYSICAL' },
                    price: { amount: '10.00', formattedAmount: '€10.00' },
                    priceBeforeDiscounts: { amount: '10.00', formattedAmount: '€10.00' },
                    totalPriceBeforeTax: { amount: '10.00', formattedAmount: '€10.00' },
                    totalPriceAfterTax: { amount: '10.00', formattedAmount: '€10.00' },
                    paymentOption: 'FULL_PAYMENT_ONLINE',
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                    taxInfo: {
                        taxAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        taxIncludedInPrice: false,
                        taxBreakdown: [],
                    },
                    locations: [],
                    lineItemPrice: { amount: '10.00', formattedAmount: '€10.00' },
                    customLineItem: false,
                    rootCatalogItemId: '7b067cb8-e0bc-49ac-92ca-747bfdb8fc21',
                    taxableAddress: { addressType: 'SHIPPING' },
                    priceUndetermined: false,
                    fixedQuantity: false,
                    _id: '00000000-0000-0000-0000-000000000001',
                },
            ],
            buyerInfo: {
                contactId: '0b84b6c5-5c75-47f8-afc6-376456a96115',
                email: 'yuriiv@wix.com',
                memberId: '35dff1e1-a3a5-4ff6-945e-a2a5d1529ec7',
            },
            paymentStatus: 'NOT_PAID',
            fulfillmentStatus: 'NOT_FULFILLED',
            buyerLanguage: 'en',
            weightUnit: 'KG',
            currency: 'EUR',
            taxIncludedInPrices: false,
            siteLanguage: 'en',
            priceSummary: {
                subtotal: { amount: '10.00', formattedAmount: '€10.00' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '10.00', formattedAmount: '€10.00' },
                total: { amount: '10.00', formattedAmount: '€10.00' },
                totalWithGiftCard: { amount: '10.00', formattedAmount: '€10.00' },
                totalWithoutGiftCard: { amount: '10.00', formattedAmount: '€10.00' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            billingInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            shippingInfo: {
                carrierId: 'c8a08776-c095-4dec-8553-8f9698d86adc',
                code: '00000000-0000-0000-0000-000000000001',
                title: 'Free Shipping',
                logistics: {
                    deliveryTime: '',
                    shippingDestination: {
                        address: {
                            addressLine1: 'Lviv',
                            city: 'Lviv',
                            country: 'UA',
                            postalCode: '79000',
                        },
                        contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
                    },
                },
                cost: {
                    price: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceBeforeTax: { amount: '0', formattedAmount: '€0.00' },
                    totalPriceAfterTax: { amount: '0.00', formattedAmount: '€0.00' },
                    taxDetails: {
                        taxableAmount: { amount: '0.00', formattedAmount: '€0.00' },
                        taxRate: '0.0000',
                        totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                    },
                },
                region: { name: 'Domestic' },
            },
            status: 'APPROVED',
            taxSummary: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                manualTaxRate: '0',
            },
            taxInfo: {
                totalTax: { amount: '0.00', formattedAmount: '€0.00' },
                taxBreakdown: [],
                manualTaxRate: '0',
            },
            appliedDiscounts: [],
            activities: [],
            attributionSource: 'UNSPECIFIED',
            createdBy: {},
            channelInfo: { type: 'WEB' },
            checkoutId: '4aa7fb29-f910-4e16-aeab-8b31a7374cd0',
            customFields: [],
            cartId: '43cd6fa8-d1e6-4ec6-812d-431c275a96b0',
            isInternalOrderCreate: false,
            payNow: {
                subtotal: { amount: '10.00', formattedAmount: '€10.00' },
                shipping: { amount: '0.00', formattedAmount: '€0.00' },
                tax: { amount: '0.00', formattedAmount: '€0.00' },
                discount: { amount: '0.00', formattedAmount: '€0.00' },
                totalPrice: { amount: '10.00', formattedAmount: '€10.00' },
                total: { amount: '10.00', formattedAmount: '€10.00' },
                totalWithGiftCard: { amount: '10.00', formattedAmount: '€10.00' },
                totalWithoutGiftCard: { amount: '10.00', formattedAmount: '€10.00' },
                totalAdditionalFees: { amount: '0.00', formattedAmount: '€0.00' },
            },
            balanceSummary: {
                balance: { amount: '10.00', formattedAmount: '€10.00' },
                paid: { amount: '0', formattedAmount: '€0.00' },
                refunded: { amount: '0', formattedAmount: '€0.00' },
                authorized: { amount: '0', formattedAmount: '€0.00' },
                pendingRefund: { amount: '0', formattedAmount: '€0.00' },
            },
            additionalFees: [],
            purchaseFlowId: 'b1a94cfd-fef4-4f0a-af6e-00ed098a909d',
            recipientInfo: {
                address: { addressLine1: 'Lviv', city: 'Lviv', country: 'UA', postalCode: '79000' },
                contactDetails: { firstName: 'Y', lastName: 'V', phone: '+1234567890' },
            },
            purchasedDate: '2024-11-05T10:25:45.821Z',
            _id: '1bffd7ed-a420-4edc-9a91-e627c7586951',
            _createdDate: '2024-11-05T10:25:45.821Z',
            _updatedDate: '2024-11-06T12:54:32.347Z',
        },
    ],
};
