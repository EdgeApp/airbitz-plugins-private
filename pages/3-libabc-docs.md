---
layout: post
title:  "Library Documentation"
description: "View a complete list of available javascript functions."
---

### <a name="Airbitz.core.bitidAddress"></a> Airbitz.core.bitidAddress(uri, message)
Returns a bitid address for the given uri and message

* @return {string} bitid address

### <a name="Airbitz.core.bitidSignature"></a> Airbitz.core.bitidSignature(uri, message)
Returns a bitid signature for the given uri and message

* @return {string} bitid signature

### <a name="Airbitz.core.selectedWallet"></a> Airbitz.core.selectedWallet(callback)
Returns the user's currently selected wallet

* @return {object} a wallet

###  <a name="Airbitz.core.wallets"></a> Airbitz.core.wallets(callback)
Returns a list of the wallets for this account, included archived wallets

* @return {object} an array of wallets

### <a name="Airbitz.core.createReceiveRequest"></a> Airbitz.core.createReceiveRequest(wallet, options)
Create a receive request from the provided wallet.

* @param {object} wallet - the wallet object
* @return {object} an object with an address and requestId

### <a name="Airbitz.core.finalizeRequest"></a> Airbitz.core.finalizeRequest(wallet, requestId)
Finalizing a request marks the address as used and it will not be used for
future requests. The metadata will also be written for this address.  This
is useful so that when a future payment comes in, the metadata can be
auto-populated.

* @return true if the request was successfully finalized.
* @param {object} wallet - the wallet object
* @param {string} requestId - the bitcoin address to finalize

### <a name="Airbitz.core.requestSpend"></a> Airbitz.core.requestSpend(wallet, toAddress, amountSatoshi, amountFiat, options)
Request that the user spends.

* @param {object} wallet - the wallet object
* @param {string} toAddress - the recipient address
* @param {number} amountSatoshi - how many satoshis to spend
* @param {amountFiat} amountFiat - not required, but the fiat value at the time of the request

### <a name="Airbitz.core.requestSign"></a> Airbitz.core.requestSign(wallet, toAddress, amountSatoshi, amountFiat, options)
Request that the user creates and signs a transaction

* @param {object} wallet - the wallet object
* @param {string} toAddress - the recipient address
* @param {number} amountSatoshi - how many satoshis to spend
* @param {amountFiat} amountFiat - not required, but the fiat value at the time of the request

### <a name="Airbitz.core.broadcastTx"></a> Airbitz.core.broadcastTx(wallet, rawtx)
Broadcast a transaction to the bitcoin network.

* @param {object} the wallet object
* @param {string} the raw hex to be saved to the database

### <a name="Airbitz.core.saveTx"></a> Airbitz.core.saveTx(wallet, rawtx)
Save the transaction to transaction database This should only be called if
the transaction has been successfully broadcasted, either by using
Airbitz.core.broadcastTx or by a third party.

* @param {object} the wallet object
* @param {string} the raw hex to be saved to the database

### <a name="Airbitz.core.requestFile"></a> Airbitz.core.requestFile(options)
Launches the native OS's camera or file browser so the user can select a
file. The options.success callback will be triggered when complete.

### <a name="Airbitz.core.writeData"></a> Airbitz.core.writeData(key, data)
Securely persist data into the Airbitz core. Only the current plugin will have
access to that data.

* @param {string} key - the key to access the data in the future
* @param {object} data - the data to write, which will be encrypted and backed up

### <a name="Airbitz.core.clearData"></a> Airbitz.core.clearData()
Clear all data in the Airbitz core, for the current plugin.

### <a name="Airbitz.core.readData"></a> Airbitz.core.readData(key)
Read the securely stored data from disk.

* @param {string} key - the key to access the data.

### <a name="Airbitz.core.getAffiliateInfo"></a> Airbitz.core.getAffiliateInfo()
There is affiliate data only if the account was installed via an affiliate
link.

* @return {object} dictionary of affiliate data

### <a name="Airbitz.core.getBtcDenomination"></a> Airbitz.core.getBtcDenomination()
Get the user's currently selected BTC denomination. It can be BTC, mBTC or
bits.

* @return {string} a denomination string

### <a name="Airbitz.core.satoshiToCurrency"></a> Airbitz.core.satoshiToCurrency(satoshi, currencyNum)
Convert satoshis to a fiat currency value.

* @param {number} satoshis - the satoshi to convert
* @param {number} currencyNum - the ISO 3166 currency code
* @return {number} the converted fiat value

### <a name="Airbitz.core.currencyToSatoshi"></a> Airbitz.core.currencyToSatoshi(currency, currencyNum)
Convert a fiat currency value to a satoshi value.

* @param {number} currency - the fiat currency to convert
* @param {number} currencyNum - the ISO 3166 currency code
* @return {number} the converted satoshi value

### <a name="Airbitz.core.formatSatoshi"></a> Airbitz.core.formatSatoshi(satoshi, withSymbol) {
Formats satoshis to display to the user. This uses the user's BTC denomination
to format including the correct code and symbol.

* @param {number} satoshi - the satoshi value to format
* @param {boolean} withSymbol - whether to include a currency symbol when formatting
* @return {string} the formatted satoshi value in either BTC, mBTC or bits.

### <a name="Airbitz.core.formatCurrency"></a> Airbitz.core.formatCurrency(currency, currencyNum, withSymbol)
Formats currencies to display to the user. This uses the user's BTC
denomination to format including the correct code and symbol.

* @param {number} currency - the satoshi value to format
* @param {boolean} withSymbol - whether to include a currency symbol when formatting
* @return {string} the formatted satoshi value in either BTC, mBTC or bits.

### <a name="Airbitz.config.get"></a> Airbitz.config.get(key)
Fetch a configuration value. These are set in the native code, before the
webview is every loaded.

* @param {key} key - the configuration key to fetch a value for
* @return {string}

### <a name="Airbitz.core.setWalletChangeListener"></a> Airbitz.core.setWalletChangeListener(callback)
Callback is called when wallet is changed AND every time plugin is created.

* @param {function} callback - a function that will be called when the user changes their currently selected wallet.

### <a name="Airbitz.core.setDenominationChangeListener"></a> Airbitz.core.setDenominationChangeListener(callback)
Callback is called when the user has changed their BTC denomination.

* @param {function} callback - a function that will be called when the user changes their BTC denomination.

### <a name="Airbitz.core.removeExchangeRateListener"></a> Airbitz.core.removeExchangeRateListener(currencyNum, callback)
Removes an exchange rate listener for a currency number

* @param {number} currencyNum - the currency number
* @param {function} callback - the callback to remove

### <a name="Airbitz.core.addExchangeRateListener"></a> Airbitz.core.addExchangeRateListener(currencyNum, callback)
Add an exchange rate listener that will be called when the exchange rate is updated.

* @param {number} currencyNum - the currency number
* @param {function} callback - the callback to respond to exchange rate updes

### <a name="Airbitz.ui.showAlert"></a> Airbitz.ui.showAlert(title, message, options)
Launches a native alert dialog.

* @param {string} title - the dialog title
* @param {string} message - the message body of the dialog

### <a name="Airbitz.ui.hideAlert"></a> Airbitz.ui.hideAlert(title, message, options)
Hide an alerts that are currently displayed.

### <a name="Airbitz.ui.title"></a> Airbitz.ui.title(s)
Set the title of the current view. This updates the native apps titlebar.

* @param {string} title - the title string

### <a name="Airbitz.ui.debugLevel"></a> Airbitz.ui.debugLevel(level, text)
Log messages to the ABC core at a particular level.

* @param {number} level - ERROR = 0, WARNING = 1, INFO = 2, DEBUG = 3;

### <a name="Airbitz.ui.back"></a> Airbitz.ui.back()
Go back in the navigation stack. 

###  <a name="Airbitz.ui.exit"></a> Airbitz.ui.exit()
Exit the plugin. This pops the current fragment or view controller of the stack
and destroys the webview.

### <a name="Airbitz.ui.launchExternal"></a> Airbitz.ui.launchExternal(uri)
Launch an external web page or application.

* @param {string} uri - the uri or url to open in a different app.

### <a name="Airbitz.ui.navStackClear"></a> Airbitz.ui.navStackClear()
Clear the naviation stack. Helpful when overriding the behavior of the back
button.

### <a name="Airbitz.ui.navStackPush"></a> Airbitz.ui.navStackPush(path)
Push a new URL onto the nav stack.

### <a name="Airbitz.ui.navStackPop"></a> Airbitz.ui.navStackPop()
Pop a URL off the nav stack.

