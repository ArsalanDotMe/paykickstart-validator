# PayKickstart Validator

A package that validates incoming IPN notifications from PayKickstart.

PayKickstart (or PK for short) sends out IPN notifications that need to be verified. The verification process seems to be simple but because PK folks are using PHP, it has a bunch of weird corner-cases that are not obvious at first. I have created this module after internally using the same validator function for a long time and it seems to be working well in my case at least. If you see any issues, please let me know.

## Usage

```javascript
const PKValidator = require('paykickstart-validator')

// OR if you are using the new ES6 module syntax,
// import validateIPN from 'paykickstart-validator'

const isRequestValid = PKValidator.validateIPN(ipnData, secretKey)
```

## API

```javascript
function validateIPN(ipnData: IPNRequestBody, secretKey: string): boolean;
```

### Params:

#### ipnData:

Data in the form of regular JS object coming in from paykickstart. Looks like this (Taken from [IPN Notifications Reference](https://support.paykickstart.com/api/#instant-payment-notification-ipn)):

```php
[
    'event'                             => 'subscription-payment',
    'mode'                              => 'live',
    'payment_processor'                 => 'stripe',
    'is_rebill'                         => 1,
    'amount'                            => 9.99,
    'buyer_ip'                          => '196.215.215.215',
    'buyer_first_name'                  => 'Ruggero',
    'buyer_last_name'                   => 'Sandri-Boriani',
    'buyer_email'                       => 'ruggero@sandri.com',
    'vendor_first_name'                 => 'Digital',
    'vendor_last_name'                  => 'Kickstart',
    'vendor_email'                      => 'support@digitalkickstart.com',
    'billing_address_1'                 => '',
    'billing_address_2'                 => '',
    'billing_city'                      => '',
    'billing_state'                     => '',
    'billing_zip'                       => '',
    'billing_country'                   => '',
    'shipping_address_1'                => '',
    'shipping_address_2'                => '',
    'shipping_city'                     => '',
    'shipping_state'                    => '',
    'shipping_zip'                      => '',
    'shipping_country'                  => '',
    'transaction_id'                    => 'PK-TN0LNO7XWR',
    'invoice_id'                        => 'PK-PZ1WK636WR',
    'tracking_id'                       => 216,
    'transaction_time'                  => 1469014598,
    'product_id'                        => 2354,
    'product_name'                      => 'SEO Snapshot - Main',
    'campaign_id'                       => 215,
    'campaign_name'                     => 'SEO Snapshot',
    'affiliate_first_name'              => 'Bob',
    'affiliate_last_name'               => 'Jones',
    'affiliate_email'                   => 'bob@jones.com',
    'affiliate_commission_amount'       => 4.99,
    'affiliate_commission_percent'      => 50,
    'ref_affiliate_first_name'          => null,
    'ref_affiliate_last_name'           => null,
    'ref_affiliate_email'               => null,
    'ref_affiliate_commission_amount'   => null,
    'ref_affiliate_commission_percent'  => null,
    'buyer_tax_number'                  => null,
    'buyer_tax_name'                    => null,
    'tax_transaction_id'                => null,
    'tax_amount'                        => null,
    'tax_percent'                       => null,
    'coupon_code'                       => '',
    'coupon_type'                       => '',
    'coupon_rate'                       => '',
    'custom_var1'                       => 123,
    'custom_var2'                       => 'email@user.com',
    'licenses'                          => ['HPLD-XSQW-KDW3-8HTD', 'AWDF-XADWR-HYTF-4T7B'],
    'verification_code'                 => 'e2288202ad23b877c3498a6db6214b5a417b75a4'
]
```

#### secretKey

Secret key for the PK campaign. You can find it in the campaign settings page.


# Tests

I test this package on a bunch of real-world cases but I don't want to release that test data to the public. If you have some IPN notifications from PK that you won't mind being shared here, please open an issue.
