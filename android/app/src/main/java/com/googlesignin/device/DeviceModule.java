package com.googlesignin.device;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;

import android.app.ActivityManager;
import android.content.Context;
import java.util.List;
import java.util.Objects;
import android.app.Activity;
import android.provider.Browser;
import android.database.Cursor;

public class DeviceModule extends ReactContextBaseJavaModule {
   
    private ReactContext mReactContext;
    //constructor
   public DeviceModule(ReactApplicationContext reactContext) {
       super(reactContext);
       mReactContext = reactContext;
   }

   
 

   @Override
   public String getName() {
       return "Device";
   }

   @ReactMethod
   public void getDeviceName(Callback cb) {
       try{
       

    //     ActivityManager activityManager = (ActivityManager) mReactContext.getSystemService( Context.ACTIVITY_SERVICE );
    //     final List<ActivityManager.RunningTaskInfo> recentTasks = Objects.requireNonNull(activityManager).getRunningTasks(Integer.MAX_VALUE);
    //    String name="";

    //    for (int i = 0; i < recentTasks.size(); i++) {
    //        // cb.invoke(null,recentTasks.get(i).baseActivity.toShortString());
    //        name =recentTasks.get(i).baseActivity.toShortString() + recentTasks.get(i).id ;
    //    }
    //     cb.invoke(null,name);

    // BrowserProvider browserProvider = new BrowserProvider(mReactContext);
    // List list = browserProvider.getSearches().getList();

    // cb.invoke(null,browserProvider);


            // String text = "";

            // Cursor query = getContentResolver().query(Uri.parse("content://com.android.chrome.browser/bookmarks"),
            //         projection, null, null, null);

            // query.moveToFirst();
            // while (query.moveToNext()) {

            //     text += query.getString(query
            //             .getColumnIndex(Browser.BookmarkColumns.TITLE));
            //     text += "\n";
            //     text += query.getString(query
            //             .getColumnIndex(Browser.BookmarkColumns.URL));
            //     text += "\n\n";

            // }
            // cb.invoke(null, text);

        }catch (Exception e){
            cb.invoke(e.toString(), null);
        }
   }
}


