---
layout: post
title:  "Adding your plugin to Airbitz"
description: "Learn how to add the plugin to the iOS and Android native apps."
---

In order to see your plugin in Airbitz, you must modify the Native app to
include the plugin. Those instructions are slightly different for each
for [Android](#android) vs [iOS](#ios).

## <a name="android"></a>Android

To add your plugin to Android, first modify the `mkplugin` script to
include your new plugin.

{% highlight bash %}
cd airbitz-android-gui
cat <<EOF >> mkplugin
    gulp myplugin-android
    cp build/android/myplugin/index.html ${CURRENT_DIR}/Airbitz/airbitz/src/main/assets/myplugin.html
EOF
{% endhighlight bash %}

Now we need to modify the native code. In your favorite editor open
`java/com/airbitz/plugins/PluginFramework.java` and
look for the `class PluginList`. In the constructor, add your plugin with a
configuration like the following.

{% highlight java %}
plugin = new Plugin();
plugin.pluginId = "com.myplugin.plugin";
plugin.sourceFile = "file:///android\_asset/myplugin.html";
plugin.name = "MyPlugin"
// These are the various environment settings to supply
plugin.env.put("SANDBOX", String.valueOf(api.isTestNet()));
mPlugins.add(plugin);
mPluginsGrouped.get(BUYSELL).add(plugin);
{% endhighlight java %}

Now that all the code is in place we can build the plugin and the app and run
our plugin. 

{% highlight bash %}
./gradlew buildAirbitzPlugins installDevelopDebug
{% endhighlight bash %}

Last, launch the app, login, navigate to Buy/Sell and see launch your plugin.

## <a name="ios"></a>iOS

Updating the `mkplugin` is very similar to android. The main difference is the
location of the plugin changes.

{% highlight bash %}
cd airbitz-ios-gui
cat <<EOF >> mkplugin
    gulp myplugin-ios
    cp ${CURRENT_DIR}/Airbitz/Resources/plugins/myplugin.html ${SIM_DEVICES}${CURRENT_DEVICE}${SIM_APPS}${CURRENT_APP}/${APP_NAME}/
EOF
{% endhighlight bash %}

{% highlight objc %}
plugin = [[Plugin alloc] init];
plugin.pluginId = @"com.myplugin.plugin";
plugin.sourceFile = @"myplugin";
plugin.sourceExtension = @"html";
plugin.name = @"MyPlugin";
plugin.env = @{
    @"SANDBOX": (isTestnet ? @"true" : @"false"),
};
[buySellPlugins addObject:plugin];
{% endhighlight objc %}

Now you can run `./mkplugin`, build and run the code in Xcode. You can then
launch the app, login, navigate to Buy/Sell and launch your plugin.
