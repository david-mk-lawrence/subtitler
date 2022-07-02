require('dotenv').config();
const path = require('path');

const config = {
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        devContentSecurityPolicy: "default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
        mainConfig: "./webpack.electron.js",
        renderer: {
          config: "./webpack.react.js",
          entryPoints: [
            {
              name: "main_window",
              html: "./src/renderer/index.html",
              js: "./src/renderer/index.tsx",
              preload: {
                js: "./src/preload.ts"
              }
            }
          ]
        }
      }
    ]
  ],
  packagerConfig: {
    name: "Subtitler",
    executableName: "subtitler",
    icon: path.resolve(__dirname, "assets", "icons", "icon"),
    extendInfo: path.resolve(__dirname, "assets", "info.plist"),
    protocols: [
      {
        name: "Subtitler",
        schemes: ["subtitler"]
      }
    ],
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "Subtitler"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        mimeType: [
          "x-scheme-handler/subtitler"
        ]
      }
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "david-mk-lawrence",
          name: "subtitler"
        },
        draft: true,
        prerelease: false
      }
    }
  ]
};

(function () {
    if (process.platform !== 'darwin') {
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD || !process.env.APPLE_IDENTITY) {
    console.info('Notarization env vars missing. Skipping notarization.');
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: "com.subtitler.subtitler",
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  };

  config.packagerConfig.osxSign = {
      identity: process.env.APPLE_IDENTITY,
      hardenedRuntime: true,
      'gatekeeper-assess': false,
      entitlements: path.resolve(__dirname, "assets", "entitlements.plist"),
      "entitlements-inherit": path.resolve(__dirname, "assets", "entitlements.plist"),
      "signature-flags": "library",
  };
})();

module.exports = config;
