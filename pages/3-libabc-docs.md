---
layout: post
title:  "Library Documentation"
description: "View a complete list of available javascript functions."
---

### <a name="Airbitz.core.bitidAddress"></a> Airbitz.core.bitidAddress(uri, message)
Returns a bitid address for the given uri and message

#### Parameters

* uri - the uri used to select the bitid address
* message - ignored, can be left null

#### Sample Response

`"1KQzWvB5BFWY6ZPT19vYdwdcoX6AGzbPsN"`

### <a name="Airbitz.core.bitidSignature"></a> Airbitz.core.bitidSignature(uri, message)

Returns a bitid signature for the given uri and message

#### Parameters

* uri - the uri used to select the bitid address
* message - the message to be signed

#### Sample Response

`"IMWK1ug3fXo7Gr0Ql42IV5nEtgJfM4b8bWAT2uMDmLGNIV8D3VtfPcmn4xCSSVINX+8a4LJM73JijckTJ4m29ZQ="`

### <a name="Airbitz.core.selectedWallet"></a> Airbitz.core.selectedWallet(callback)
Returns the user's currently selected wallet as the first parameter of the callback.

#### Sample Response

```
{
    "id": "wallet-id",
    "name": "My Wallet",
    "currency": "USD",
    "currencyCode": 840,
    "balance": 1000000,
}
```

###  <a name="Airbitz.core.wallets"></a> Airbitz.core.wallets(callback)
Returns a list of the wallets for this account, included archived wallets, in
the first parameter of the callback.

#### Sample Response

```
[{
    "id": "wallet-id",
    "name": "My Wallet",
    "currency": "USD",
    "currencyCode": 840,
    "balance": 1000000,
}, {
    "id": "wallet-id",
    "name": "My Wallet",
    "currency": "USD",
    "currencyCode": 840,
    "balance": 1000000,
}]
```

### <a name="Airbitz.core.createReceiveRequest"></a> Airbitz.core.createReceiveRequest(wallet, options)
Create a receive request from the provided wallet.  Returns an object with an
address and requestId.

#### Parameters
* Wallet object


#### Sample Response

```
{
    "requestId": "1PfLSCgMZdzHRKsQDSya6Pin3ugqLKri3n",
    "address": "1PfLSCgMZdzHRKsQDSya6Pin3ugqLKri3n"
}
```

### <a name="Airbitz.core.finalizeRequest"></a> Airbitz.core.finalizeRequest(wallet, requestId)
Finalizing a request marks the address as used and it will not be used for
future requests. The metadata will also be written for this address.  This
is useful so that when a future payment comes in, the metadata can be
auto-populated.

#### Parameters
* Wallet object
* RequestId or Bitcoin Address - the bitcoin address to finalize

### <a name="Airbitz.core.requestSpend"></a> Airbitz.core.requestSpend(wallet, toAddress, amountSatoshi, amountFiat, options)
Request that the user spends. This takes the user to the native spend
confirmation screen so they can confirm the spend.

#### Parameters
* Wallet object - the wallet object
* toAddress - the recipient address
* amountSatoshi - how many satoshis to spend
* amountFiat - not required, but the fiat value at the time of the request

### <a name="Airbitz.core.requestSign"></a> Airbitz.core.requestSign(wallet, toAddress, amountSatoshi, amountFiat, options)
Request that the user spends. This takes the user to the native spend
confirmation screen so they can confirm the spend. This is simliar to
`requestSpend`, however the transaction is not broadcasted or saved to the
local blockchain database. Thed developer must call `broadcastTx` and/or
`saveTx` to persist the spend.

#### Parameters
* Wallet - the wallet object
* toAddress - the recipient address
* amountSatoshi - how many satoshis to spend
* amountFiat - not required, but the fiat value at the time of the request

### <a name="Airbitz.core.broadcastTx"></a> Airbitz.core.broadcastTx(wallet, rawtx)
Broadcast a transaction to the bitcoin network.

#### Parameters
* the wallet object
* the raw hex to be saved to the database

### <a name="Airbitz.core.saveTx"></a> Airbitz.core.saveTx(wallet, rawtx)
Save the transaction to transaction database This should only be called if
the transaction has been successfully broadcasted, either by using
Airbitz.core.broadcastTx or by a third party.

#### Parameters
* the wallet object
* the raw hex to be saved to the database

### <a name="Airbitz.core.requestFile"></a> Airbitz.core.requestFile(options)
Launches the native OS's camera or file browser so the user can select a
file. The options.success callback will be triggered when complete.

### <a name="Airbitz.core.writeData"></a> Airbitz.core.writeData(key, data)
Securely persist data into the Airbitz core. Only the current plugin will have
access to that data.

#### Parameters
* key - the key to access the data in the future
* data - the data to write, which will be encrypted and backed up

### <a name="Airbitz.core.clearData"></a> Airbitz.core.clearData()
Clear all data in the Airbitz core, for the current plugin.

### <a name="Airbitz.core.readData"></a> Airbitz.core.readData(key)
Read the securely stored data from disk.

#### Parameters
* key - the key to access the data.

### <a name="Airbitz.core.getAffiliateInfo"></a> Airbitz.core.getAffiliateInfo()
There is affiliate data only if the account was installed via an affiliate
link. Returns a dictionary of affiliate data.

### <a name="Airbitz.core.getBtcDenomination"></a> Airbitz.core.getBtcDenomination()
Get the user's currently selected BTC denomination. It can be BTC, mBTC or
bits. Returns a denomination string.

### <a name="Airbitz.core.satoshiToCurrency"></a> Airbitz.core.satoshiToCurrency(satoshi, currencyNum)
Convert satoshis to a fiat currency value.  Returns the converted fiat value

#### Parameters

* satoshis - the satoshi to convert
* currencyNum - the ISO 3166 currency code

### <a name="Airbitz.core.currencyToSatoshi"></a> Airbitz.core.currencyToSatoshi(currency, currencyNum)
Convert a fiat currency value to a satoshi value.  Returns the converted
satoshi value

#### Parameters

* currency - the fiat currency to convert
* currencyNum - the ISO 3166 currency code

### <a name="Airbitz.core.formatSatoshi"></a> Airbitz.core.formatSatoshi(satoshi, withSymbol) {
Formats satoshis to display to the user. This uses the user's BTC denomination
to format including the correct code and symbol.

#### Parameters

* satoshi - the satoshi value to format
* withSymbol - boolean, whether to include a currency symbol when formatting

### <a name="Airbitz.core.formatCurrency"></a> Airbitz.core.formatCurrency(currency, currencyNum, withSymbol)
Formats currencies to display to the user. This uses the user's BTC
denomination to format including the correct code and symbol.

#### Parameters

* currency - the satoshi value to format
* withSymbol - boolean, whether to include a currency symbol when formatting

### <a name="Airbitz.config.get"></a> Airbitz.config.get(key)
Fetch a configuration value. These are set in the native code, before the
webview is every loaded.

#### Parameters

* key - the configuration key to fetch a value for

### <a name="Airbitz.core.setWalletChangeListener"></a> Airbitz.core.setWalletChangeListener(callback)
Callback is called when wallet is changed AND every time plugin is created.

#### Parameters

* callback - a function that will be called when the user changes their currently selected wallet.

### <a name="Airbitz.core.setDenominationChangeListener"></a> Airbitz.core.setDenominationChangeListener(callback)
Callback is called when the user has changed their BTC denomination.

#### Parameters

* callback - a function that will be called when the user changes their BTC denomination.

### <a name="Airbitz.core.removeExchangeRateListener"></a> Airbitz.core.removeExchangeRateListener(currencyNum, callback)
Removes an exchange rate listener for a currency number

#### Parameters

* currencyNum - the currency number
* callback - the callback to remove

### <a name="Airbitz.core.addExchangeRateListener"></a> Airbitz.core.addExchangeRateListener(currencyNum, callback)
Add an exchange rate listener that will be called when the exchange rate is updated.

#### Parameters

* currencyNum - the currency number
* callback - the callback to respond to exchange rate updes

### <a name="Airbitz.ui.showAlert"></a> Airbitz.ui.showAlert(title, message, options)
Launches a native alert dialog.

#### Parameters

* title - the dialog title
* message - the message body of the dialog

### <a name="Airbitz.ui.hideAlert"></a> Airbitz.ui.hideAlert(title, message, options)
Hide an alerts that are currently displayed.

### <a name="Airbitz.ui.title"></a> Airbitz.ui.title(s)
Set the title of the current view. This updates the native apps titlebar.

#### Parameters

* title - the title string

### <a name="Airbitz.ui.debugLevel"></a> Airbitz.ui.debugLevel(level, text)
Log messages to the ABC core at a particular level.

#### Parameters

* level - ERROR = 0, WARNING = 1, INFO = 2, DEBUG = 3;

### <a name="Airbitz.ui.back"></a> Airbitz.ui.back()
Go back in the navigation stack. 

###  <a name="Airbitz.ui.exit"></a> Airbitz.ui.exit()
Exit the plugin. This pops the current fragment or view controller of the stack
and destroys the webview.

### <a name="Airbitz.ui.launchExternal"></a> Airbitz.ui.launchExternal(uri)
Launch an external web page or application.

#### Parameters

* uri - the uri or url to open in a different app.

### <a name="Airbitz.ui.navStackClear"></a> Airbitz.ui.navStackClear()
Clear the naviation stack. Helpful when overriding the behavior of the back
button.

### <a name="Airbitz.ui.navStackPush"></a> Airbitz.ui.navStackPush(path)
Push a new URL onto the nav stack.

#### Parameters

path - the URI or url to push to the nav stack

### <a name="Airbitz.ui.navStackPop"></a> Airbitz.ui.navStackPop()
Pop a URL off the nav stack.

