---
layout: post
title:  "Creating a plugin"
description: "Learn how to write your first Airbitz plugin."
---

Airbitz plugins are just single page HTML files, with all the resources
compiled in. That means that the javascript libraries, stylesheets and whatever
else are all included in one monolithic HTML file.

The `airbitz-plugins` has a build system to help ease the creation of the
files.  Simply creating a new directory under the `plugins` directory will be
treated as a new plugin. The build system knows to how to compile the
javascript, HTML and CSS to work with Airbitz. 

## Dependencies

First off, lets make sure you have the dependencies installed.
{% highlight bash %}
npm install -g gulp
cd airbitz-plugins
npm install
{% endhighlight %}

To create a new plugin, you can copy the `blank` plugin and begin coding.

{% highlight bash %}
cp -a blank myplugin
{% endhighlight %}

And here is a list of the files in the new plugin.
{% highlight bash %}
plugins/myplugin/index.html
plugins/myplugin/css/style.css
plugins/myplugin/js/script.js
plugins/myplugin/vendors/jquery-2.1.3.min.js
plugins/myplugin/vendors/qrcode.min.js
{% endhighlight bash %}

## index.html

Let's take a look at the `index.html`. The `index.html` is essentially your
main function into the plugin. That means, you need to declare all of your
dependencies here, such as CSS, fonts or javascript files. You can view the
full source of the sample file [here][blank-index]. Let's examine the file
piece by piece. 

First up is the `<head>` tag.  The head can contain whatever you want, in this
case its just a reference to our `style.css` but other references or javascript
files can be included. The build system will automatically inline them into the
final build.

{% highlight html %}
<meta name=viewport content="initial-scale=1, maximum-scale=1.0, user-scalable=no">
<!-- include your stylesheet -->
<link type="text/css" rel="stylesheet" href="css/style.css"  media="screen,projection"/>
{% endhighlight html %}

Next up is the `<body>` tag. To keep things simple you can add your UI directly
inside of the HTML. [Some of our the other plugins][glidera-plugin] use a more
sophisticated framework like angular.  Here is our UI.

{% highlight html %}
  <div id="container">
    <h2>Wallet Name</h2>
    <div id="walletName">Loading...</div>
    <h2>Address</h2>
    <div id="address">Loading...</div>
    <div id="qrcode"></div>
  </div>
{% endhighlight html %}

At the bottom of the `<body>` tag, we can include other dependencies such as
all our javascript libraries.  Its important to include `abc.js` which will
give you access to the Airbitz wallet functionality.

{% highlight html %}
  <!-- Include the core javascript bindings -->
  <script src="js/abc.js" type="text/javascript"></script>
  <!-- Include some other libraries -->
  <script src="vendors/jquery-2.1.3.min.js" type="text/javascript"></script>
  <script src="vendors/qrcode.min.js" type="text/javascript"></script>
  <!-- Include your javascript code -->
  <script src="js/script.js" type="text/javascript"></script>
{% endhighlight html %}

## script.js

The next important part of your plugin is the javascript. As we can see from
the `index.html`, we are using `abc.js`, `jquery-2.1.3.min.js`, `qrcode.min.js`
and finally `script.js`. `script.js` is our code that pulls all those libraries together.

The `script.js` calls into the Airbitz core in a few ways. First it calls
[`Airbitz.ui.title`][title] to change the page title. Next is sets up a wallet listener
using [`Airbitz.core.setWalletChangeListener`][setWalletChangeListener], so when the user changes their
selected wallet, our code knows about it. Lastly, it requests the current
wallet using [`Airbitz.ui.selectedWallet`][selectedWallet]. You can view the sample code
[here][blank-script].

{% highlight javascript %}
$(function() {
  Airbitz.ui.title('Blank Plugin');
  qrcode = new QRCode(document.getElementById("qrcode"), {
    text: '',
    width: 128,
    height: 128,
  });
  // If the user changes the wallet, we want to know about it
  Airbitz.core.setWalletChangeListener(function(wallet) {
    Airbitz.ui.showAlert("Wallet Changed", "Wallet Changed to " + wallet.name + ".");
    updateUi(wallet);
  });
  // After loading, lets fetch the currently selected wallet
  Airbitz.core.selectedWallet({
      success: updateUi,
      error: function() {
          Airbitz.ui.showAlert("Wallet Error", "Unable to load wallet!");
      }
  });
});
{% endhighlight javascript %}

Lastly we define the `updateUi` function. When the plugin loads or when the
user changes their selected wallet, this function is called. We update the
wallet name in the UI, and call into the Airbitz core library to create a
receive request. This returns an address to us, but stores the meta with the
address, so when bitcoin is received, the transactions meta-data will
automatically be tag with the same information. 

{% highlight javascript %}
function updateUi(wallet) {
  $('#walletName').text(wallet.name);
  Airbitz.core.createReceiveRequest(wallet, {
    label: "Blank App Request",
    category: "Income:Plugin",
    notes: "Income generated from a plugin",
    amountSatoshi: 0,
    amountFiat: 0,
    success: function(data) {
      var address = data["address"];
      $('#address').text(address);
      qrcode.clear();
      qrcode.makeCode('bitcoin:' + address);
    },
    error: function() {
      $('#address').text('');
      Airbitz.ui.showAlert("Wallet Error", "Unable to load request!");
    }
  });
}
{% endhighlight javascript %}

For more ideas you can check out our existing plugins with [foldapp][foldapp-plugin] and [glidera][glidera-plugin].

The [Glidera][glidera-plugin] plugin is build on top of angular, while the
[foldapp][foldapp-plugin] plugin is using a jQuery and handlebars.

When you are ready you can [add the plugin to the native apps](adding-plugins-to-native-apps.html).

[foldapp-plugin]: https://github.com/Airbitz/airbitz-plugins/tree/master/plugins/foldapp
[glidera-plugin]: https://github.com/Airbitz/airbitz-plugins/tree/master/plugins/glidera
[blank-index]: https://github.com/Airbitz/airbitz-plugins/tree/master/plugins/blank/index.html
[blank-script]: https://github.com/Airbitz/airbitz-plugins/tree/master/plugins/blank/js/script.js
[title]: 3-libabc-docs.html#Airbitz.ui.title
[selectedWallet]: 3-libabc-docs.html#Airbitz.ui.selectedWallet
[setWalletChangeListener]: 3-libabc-docs.html#Airbitz.core.setWalletChangeListener
