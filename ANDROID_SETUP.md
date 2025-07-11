# Android Setup Instructions

After running `npx cap add android`, you need to add the custom broadcast intent plugin files:

## Step 1: Copy Plugin Files
Copy these files to your Android project:

1. Copy `plugins/android/BroadcastIntentPlugin.java` to:
   `android/app/src/main/java/app/lovable/aaf60e97a56f4809a36cef3228115e2c/BroadcastIntentPlugin.java`

2. Copy `plugins/android/MainActivity.java` to:
   `android/app/src/main/java/app/lovable/aaf60e97a56f4809a36cef3228115e2c/MainActivity.java`

## Step 2: Build and Install
Then continue with your build process:
```bash
npm run build
npx cap sync
cd android
.\gradlew assembleDebug
adb install -r app\build\outputs\apk\debug\app-debug.apk
```

## What these files do:
- **BroadcastIntentPlugin.java**: Custom Capacitor plugin that sends Android broadcast intents
- **MainActivity.java**: Registers the custom plugin with Capacitor

These files enable the "Ring Off" and "Screen Off" buttons to send broadcast intents that Tasker can receive.