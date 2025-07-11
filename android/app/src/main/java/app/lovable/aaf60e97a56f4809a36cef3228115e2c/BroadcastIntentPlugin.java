package app.lovable.aaf60e97a56f4809a36cef3228115e2c;

import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BroadcastIntent")
public class BroadcastIntentPlugin extends Plugin {

    @PluginMethod
    public void sendBroadcast(PluginCall call) {
        String action = call.getString("action");
        
        if (action == null) {
            call.reject("Action is required");
            return;
        }

        try {
            Intent intent = new Intent(action);
            JSObject extras = call.getObject("extras");
            
            if (extras != null) {
                for (String key : extras.keys()) {
                    String value = extras.getString(key);
                    if (value != null) {
                        intent.putExtra(key, value);
                    }
                }
            }

            getActivity().sendBroadcast(intent);
            
            JSObject ret = new JSObject();
            ret.put("success", true);
            call.resolve(ret);
            
        } catch (Exception e) {
            call.reject("Failed to send broadcast: " + e.getMessage());
        }
    }
}