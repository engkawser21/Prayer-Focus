package com.prayerfocus.app;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "KioskMode")
public class KioskModePlugin extends Plugin {

    @PluginMethod
    public void startKiosk(PluginCall call) {
        getBridge().executeOnMainThread(() -> {
            try {
                Activity activity = getActivity();
                if (activity != null) {
                    // Start screen lock task (Kiosk Mode PIN screening)
                    activity.startLockTask();
                    JSObject ret = new JSObject();
                    ret.put("status", "success");
                    call.resolve(ret);
                } else {
                    call.reject("Android activity is null.");
                }
            } catch (Exception e) {
                call.reject("Failed to trigger Lock Task Mode: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void stopKiosk(PluginCall call) {
        getBridge().executeOnMainThread(() -> {
            try {
                Activity activity = getActivity();
                if (activity != null) {
                    // Stop screen lock task
                    activity.stopLockTask();
                    JSObject ret = new JSObject();
                    ret.put("status", "success");
                    call.resolve(ret);
                } else {
                    call.reject("Android activity is null.");
                }
            } catch (Exception e) {
                call.reject("Failed to exit Lock Task Mode: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void checkDrawOverlayPermission(PluginCall call) {
        getBridge().executeOnMainThread(() -> {
            try {
                Activity activity = getActivity();
                if (activity != null) {
                    boolean granted = true;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        granted = Settings.canDrawOverlays(activity);
                    }
                    JSObject ret = new JSObject();
                    ret.put("granted", granted);
                    call.resolve(ret);
                } else {
                    call.reject("Android activity is null.");
                }
            } catch (Exception e) {
                call.reject("Failed to check draw overlay permission: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void requestDrawOverlayPermission(PluginCall call) {
        getBridge().executeOnMainThread(() -> {
            try {
                Activity activity = getActivity();
                if (activity != null) {
                    boolean granted = true;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                        granted = Settings.canDrawOverlays(activity);
                        if (!granted) {
                            Intent intent = new Intent(
                                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                                Uri.parse("package:" + activity.getPackageName())
                            );
                            activity.startActivity(intent);
                        }
                    }
                    JSObject ret = new JSObject();
                    ret.put("status", granted ? "already_granted" : "requested");
                    call.resolve(ret);
                } else {
                    call.reject("Android activity is null.");
                }
            } catch (Exception e) {
                call.reject("Failed to request overlay permission: " + e.getMessage());
            }
        });
    }
}
