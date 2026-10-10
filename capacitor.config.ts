import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.quickdial.ahilyanagar",
  appName: "QuickDial",
  webDir: "capacitor-www",
  server: {
    url: "https://maharashtra-services.lovable.app",
    cleartext: false,
  },
};

export default config;
