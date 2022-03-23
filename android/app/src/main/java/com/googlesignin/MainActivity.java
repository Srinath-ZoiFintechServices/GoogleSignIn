package com.googlesignin;
import 	android.content.pm.PackageManager;
import com.facebook.react.ReactActivity;
import android.content.ComponentName;

import android.os.Bundle; // Import this.
import android.content.Intent;
import android.provider.Settings;
import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.app.AppOpsManager;
import android.content.Context;
import android.util.Log;
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (!isAccessGranted()) {
          Log.i("MainActivity","I am in if");
          Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
          startActivity(intent);
        }else{
          Log.i("MainActivity","I am in else");
        }
    }
  @Override
  protected String getMainComponentName() {
    return "GoogleSignIn";
  }

  
  private boolean isAccessGranted() {
    try {
        Context context = getApplicationContext();
        // PackageManager packageManager = getPackageManager();
        // ApplicationInfo applicationInfo = packageManager.getApplicationInfo(getPackageName(), 0);
        // Context context=getApplicationContext();
        // AppOpsManager appOpsManager = (AppOpsManager) getSystemService(Context.APP_OPS_SERVICE);
        // int mode = 0;
        // if (android.os.Build.VERSION.SDK_INT > android.os.Build.VERSION_CODES.KITKAT) {
        //     mode = appOpsManager.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS,
        //             applicationInfo.uid, applicationInfo.packageName);
        // }
        // return (mode == AppOpsManager.MODE_ALLOWED);
        PackageManager packageManager = context.getPackageManager();
        ApplicationInfo applicationInfo = packageManager.getApplicationInfo(context.getPackageName(), 0);
        AppOpsManager appOpsManager = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOpsManager.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, applicationInfo.uid, applicationInfo.packageName);
        return (mode == AppOpsManager.MODE_ALLOWED);

    } catch (PackageManager.NameNotFoundException e) {
        return false;
    }
}
}
