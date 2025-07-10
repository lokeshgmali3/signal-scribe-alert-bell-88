
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
          // Use App plugin to send custom event that can trigger broadcast intent
          const { App } = (window as any).Capacitor.Plugins;
          if (App && App.addListener) {
            // Send custom event that native side can listen to
            await App.removeAllListeners();
            console.log('Ring Off: Sending custom event for Tasker integration');
            // Create a custom URL scheme event that can be caught by Tasker
            window.location.href = 'tasker://ringoff';
          }
        }
      } else {
        console.log('Ring Off: Web environment - would send broadcast intent com.tasker.RING_OFF');
      }
    } catch (error) {
      console.error('Error sending Ring Off event:', error);
      console.log('Ring Off: Fallback - would trigger Tasker automation');
    }
  };

  const handleScreenOff = async () => {
    try {
      if ((window as any).Capacitor && (window as any).Capacitor.isNativePlatform()) {
        if ((window as any).Capacitor.getPlatform() === 'android') {
          // Use App plugin to send custom event that can trigger broadcast intent
          const { App } = (window as any).Capacitor.Plugins;
          if (App && App.addListener) {
            // Send custom event that native side can listen to
            await App.removeAllListeners();
            console.log('Screen Off: Sending custom event for Tasker integration');
            // Create a custom URL scheme event that can be caught by Tasker
            window.location.href = 'tasker://screenoff';
          }
        }
      } else {
        console.log('Screen Off: Web environment - would send broadcast intent com.tasker.SCREEN_OFF');
      }
    } catch (error) {
      console.error('Error sending Screen Off event:', error);
      console.log('Screen Off: Fallback - would trigger Tasker automation');
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

