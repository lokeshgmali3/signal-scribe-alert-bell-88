package app.lovable.aaf60e97a56f4809a36cef3228115e2c;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(android.os.Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Register the custom BroadcastIntent plugin
        registerPlugin(BroadcastIntentPlugin.class);
    }
}