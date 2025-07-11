
import { useSignalState } from './useSignalState';
import { useAntidelayManager } from './useAntidelayManager';
import { useSaveTsManager } from './useSaveTsManager';
import BroadcastIntent from '../plugins/broadcast-intent';

export const useSignalTracker = () => {
  const {
    signalsText,
    setSignalsText,
    savedSignals,
    antidelaySeconds,
    setAntidelaySeconds,
    saveButtonPressed,
    handleSaveSignals,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    handleClear
  } = useSignalState();

  const {
    showAntidelayDialog,
    antidelayInput,
    setAntidelayInput,
    handleAntidelaySubmit,
    handleAntidelayCancel
  } = useAntidelayManager(savedSignals, antidelaySeconds, setAntidelaySeconds);

  const {
    showSaveTsDialog,
    antidelayInput: saveTsAntidelayInput,
    setAntidelayInput: setSaveTsAntidelayInput,
    saveTsButtonPressed,
    handleSaveTsMouseDown,
    handleSaveTsMouseUp,
    handleSaveTsMouseLeave,
    handleSaveTsSubmit: originalHandleSaveTsSubmit,
    handleSaveTsCancel
  } = useSaveTsManager();

  // Wrapper functions to pass signalsText to handlers
  const handleSaveTsMouseDownWithSignals = (e: React.MouseEvent | React.TouchEvent) => {
    handleSaveTsMouseDown(e);
  };

  const handleSaveTsMouseUpWithSignals = (e: React.MouseEvent | React.TouchEvent) => {
    handleSaveTsMouseUp(e, signalsText);
  };


  const handleRingOff = async () => {
    console.log('🔴 Ring Off button clicked - Starting function');
    
    try {
      console.log('🔴 Checking Capacitor availability...');
      console.log('🔴 Window.Capacitor exists:', !!(window as any).Capacitor);
      console.log('🔴 Is native platform:', (window as any).Capacitor?.isNativePlatform?.());
      console.log('🔴 Platform:', (window as any).Capacitor?.getPlatform?.());
      
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        if ((window as any).Capacitor.getPlatform() === 'android') {
          console.log('🔴 Android platform detected - attempting to send broadcast intent');
          
          try {
            // Send broadcast intent for Tasker using custom Capacitor plugin
            const intentAction = 'com.tasker.RING_OFF';
            console.log('🔴 Sending broadcast intent:', intentAction);
            
            const result = await BroadcastIntent.sendBroadcast({
              action: intentAction,
              extras: {
                'source': 'signal_scribe',
                'action_type': 'ring_off'
              }
            });
            
            if (result.success) {
              console.log('🔴 Broadcast intent sent successfully:', intentAction);
            } else {
              throw new Error('Failed to send broadcast intent');
            }
          } catch (broadcastError) {
            console.error('🔴 Error sending broadcast intent:', broadcastError);
            
            // Fallback to URL scheme
            console.log('🔴 Fallback: Attempting URL scheme approach');
            window.location.href = 'tasker://ringoff';
            console.log('🔴 URL scheme sent as fallback');
          }
        } else {
          console.log('🔴 Not Android platform');
        }
      } else {
        console.log('🔴 Web environment - Not on mobile device');
        console.log('🔴 For Tasker: Use broadcast intent com.tasker.RING_OFF');
      }
    } catch (error) {
      console.error('🔴 Error in Ring Off handler:', error);
    }
    
    console.log('🔴 Ring Off function completed');
  };

  const handleScreenOff = async () => {
    console.log('📱 Screen Off button clicked - Starting function');
    
    try {
      console.log('📱 Checking Capacitor availability...');
      console.log('📱 Window.Capacitor exists:', !!(window as any).Capacitor);
      console.log('📱 Is native platform:', (window as any).Capacitor?.isNativePlatform?.());
      console.log('📱 Platform:', (window as any).Capacitor?.getPlatform?.());
      
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        if ((window as any).Capacitor.getPlatform() === 'android') {
          console.log('📱 Android platform detected - attempting to send broadcast intent');
          
          try {
            // Send broadcast intent for Tasker using custom Capacitor plugin
            const intentAction = 'com.tasker.SCREEN_OFF';
            console.log('📱 Sending broadcast intent:', intentAction);
            
            const result = await BroadcastIntent.sendBroadcast({
              action: intentAction,
              extras: {
                'source': 'signal_scribe',
                'action_type': 'screen_off'
              }
            });
            
            if (result.success) {
              console.log('📱 Broadcast intent sent successfully:', intentAction);
            } else {
              throw new Error('Failed to send broadcast intent');
            }
          } catch (broadcastError) {
            console.error('📱 Error sending broadcast intent:', broadcastError);
            
            // Fallback to URL scheme
            console.log('📱 Fallback: Attempting URL scheme approach');
            window.location.href = 'tasker://screenoff';
            console.log('📱 URL scheme sent as fallback');
          }
        } else {
          console.log('📱 Not Android platform');
        }
      } else {
        console.log('📱 Web environment - Not on mobile device');
        console.log('📱 For Tasker: Use broadcast intent com.tasker.SCREEN_OFF');
      }
    } catch (error) {
      console.error('📱 Error in Screen Off handler:', error);
    }
    
    console.log('📱 Screen Off function completed');
  };

  return {
    signalsText,
    setSignalsText,
    saveButtonPressed,
    saveTsButtonPressed,
    showAntidelayDialog,
    antidelayInput,
    setAntidelayInput,
    antidelaySeconds,
    showSaveTsDialog,
    saveTsAntidelayInput,
    setSaveTsAntidelayInput,
    handleSaveSignals,
    handleSaveTsMouseDown: handleSaveTsMouseDownWithSignals,
    handleSaveTsMouseUp: handleSaveTsMouseUpWithSignals,
    handleSaveTsMouseLeave,
    handleSaveTsSubmit: originalHandleSaveTsSubmit,
    handleSaveTsCancel,
    handleAntidelaySubmit,
    handleAntidelayCancel,
    handleUndo,
    handleRedo,
    canUndo,
    canRedo,
    handleClear,
    handleRingOff,
    handleScreenOff
  };
};

