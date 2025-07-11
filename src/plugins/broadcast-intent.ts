import { registerPlugin } from '@capacitor/core';

export interface BroadcastIntentPlugin {
  sendBroadcast(options: { action: string; extras?: Record<string, string> }): Promise<{ success: boolean }>;
}

const BroadcastIntent = registerPlugin<BroadcastIntentPlugin>('BroadcastIntent', {
  web: {
    sendBroadcast: async (options: { action: string; extras?: Record<string, string> }) => {
      console.log('Web: Cannot send broadcast intent on web platform:', options);
      return { success: false };
    }
  }
});

export default BroadcastIntent;