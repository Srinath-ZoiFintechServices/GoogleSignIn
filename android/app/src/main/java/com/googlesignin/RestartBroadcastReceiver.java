package com.googlesignin;
import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.Nullable;
import android.content.BroadcastReceiver;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import android.util.Log;
import android.content.Context;

public class RestartBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(RestartBroadcastReceiver.class.getSimpleName(), "Service Stopped, but this is a never ending service.");
        context.startService(new Intent(context, HeartbeartService.class));
    }
}