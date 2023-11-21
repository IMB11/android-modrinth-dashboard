import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mineblock11.modrinth',
  appName: 'Modrinth Dashboard',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
