package app.lovable.aaf60e97a56f4809a36cef3228115e2c;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import android.content.Intent;
import android.content.Context;

@CapacitorPlugin(name = "BroadcastIntent")
public class BroadcastIntentPlugin extends Plugin {

    @PluginMethod
    public void sendBroadcast(PluginCall call) {
        String action = call.getString("action");
        JSObject extras = call.getObject("extras");
        
        if (action == null) {
            call.reject("Action is required");
            return;
        }
        
        try {
            Context context = getContext();
            Intent intent = new Intent(action);
            
            // Add extras if provided
            if (extras != null) {
                for (String key : extras.keys()) {
                    String value = extras.getString(key);
                    if (value != null) {
                        intent.putExtra(key, value);
                    }
                }
            }
            
            // Send the broadcast intent
            context.sendBroadcast(intent);
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            call.reject("Failed to send broadcast intent: " + e.getMessage());
        }
    }
}