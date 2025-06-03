package com.anonymous.MelodyXChange.BatteryStatus

import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BatteryStatusModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "BatteryStatus"
    }

    @ReactMethod
    fun getBatteryStatus(successCallback: Callback) {
        val batteryIntent = reactContext.registerReceiver(
            null,
            IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        )

        val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
        val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

        val batteryPct = if (level == -1 || scale == -1) {
            0f
        } else {
            (level.toFloat() / scale.toFloat()) * 100.0f
        }

        successCallback.invoke(null, batteryPct)
    }
}
