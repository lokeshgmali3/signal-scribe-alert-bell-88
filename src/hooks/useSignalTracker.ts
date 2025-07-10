
import { useSignalState } from './useSignalState';
import { useAntidelayManager } from './useAntidelayManager';
import { useSaveTsManager } from './useSaveTsManager';

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
    try {
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        if ((window as any).Capacitor.getPlatform() === 'android') {
          // Send broadcast intent to stop all sound using Capacitor's native bridge
          await (window as any).Capacitor.Plugins.Device.sendBroadcast?.({
            action: 'com.tasker.RING_OFF',
            category: 'android.intent.category.DEFAULT',
            extras: {
              command: 'stop_sound'
            }
          }) || console.log('Ring Off: Sending broadcast intent - com.tasker.RING_OFF');
        }
      } else {
        console.log('Ring Off: Not running on native platform - would send broadcast intent');
      }
    } catch (error) {
      console.error('Error sending Ring Off broadcast intent:', error);
      console.log('Ring Off: Fallback - broadcast intent would be sent to com.tasker.RING_OFF');
    }
  };

  const handleScreenOff = async () => {
    try {
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        if ((window as any).Capacitor.getPlatform() === 'android') {
          // Send broadcast intent to turn off screen using Capacitor's native bridge
          await (window as any).Capacitor.Plugins.Device.sendBroadcast?.({
            action: 'com.tasker.SCREEN_OFF',
            category: 'android.intent.category.DEFAULT',
            extras: {
              command: 'turn_off_screen'
            }
          }) || console.log('Screen Off: Sending broadcast intent - com.tasker.SCREEN_OFF');
        }
      } else {
        console.log('Screen Off: Not running on native platform - would send broadcast intent');
      }
    } catch (error) {
      console.error('Error sending Screen Off broadcast intent:', error);
      console.log('Screen Off: Fallback - broadcast intent would be sent to com.tasker.SCREEN_OFF');
    }
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

