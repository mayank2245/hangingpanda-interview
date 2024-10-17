package com.Hanging_Panda

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate


class MainActivity : ReactActivity() {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String = "Hanging Panda"

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flag [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

    override fun onResume() {
        super.onResume()
        val reactContext = reactInstanceManager.currentReactContext
        val params: WritableMap = Arguments.createMap()
        params.putString("event", "active")

        // When the app starts, reactContext will be null initially until the bridge between Native and React Native is established
        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("ActivityStateChange", params)
        }
    }

    override fun onPause() {
        super.onPause()
        val reactContext = reactInstanceManager.currentReactContext
        val params: WritableMap = Arguments.createMap()
        params.putString("event", "inactive")

        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("ActivityStateChange", params)
        }
    }

    override fun onStop() {
        super.onStop()
        val reactContext = reactInstanceManager.currentReactContext
        val params: WritableMap = Arguments.createMap()
        params.putString("event", "background")

        reactContext?.let {
            it
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("ActivityStateChange", params)
        }
    }
}
