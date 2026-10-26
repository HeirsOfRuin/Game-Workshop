// The Android app: the release web build in a Capacitor WebView.
// .github/workflows/android.yml builds the web, runs `npx cap sync android`, then the APK.
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.github.{{OWNER_LOWER}}.{{APP_ID}}', // never change after the first published APK
  appName: '{{NAME}}',
  webDir: '{{WEB_DIR}}',
  android: { backgroundColor: '{{BG}}' },
};

export default config;
