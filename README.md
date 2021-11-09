![image](https://i.ibb.co/8N1zSRC/ezgif-com-gif-maker.gif)

# RN Features

_[RN Features](https://santhosh-umapathi.github.io/RN-Features/), a project made with Expo, Turtle CLI_

> Authors: Santhosh Umapathi

### Current Version:

- **v1.0 - Release Date ()**

## Installation

Expo Turtle CLI requires the following to run.

- macOS or Linux
- Node.js (version 10 or newer) - [download the latest version of Node.js.](https://nodejs.org/en/)
- [Java Development Kit (version 8)](https://jdk.java.net/)
- fastlane [see how to install it](https://docs.fastlane.tools/getting-started/ios/setup/#installing-fastlane) - for iOS Builds
- Turtle CLI - `sudo npm install -g turtle-cli`

## Verify if Turtle CLI setup

Run `turtle setup:ios` and/or `turtle setup:android` to verify everything is installed correctly. This step is optional and is also performed during the first run of `turtle build:[ios|android]`. Please note that the Android setup command downloads, installs, and configures the appropriate versions of the Android SDK and NDK.
If you would like to make the first build even faster, you can supply the Expo SDK version to the setup command like so: `turtle setup:ios --sdk-version 38.0.0`. This tells Turtle CLI to download additional Expo-related dependencies for the given SDK version.
All Expo-related dependencies will be installed in a directory named .turtle within your home directory. This directory may be removed safely if you ever need to free up some disk space.

## Testing the Project

Install the dependencies and start the server.

```
cd RN-Expo-Turtle-CLI
yarn install
yarn start
```

## Testing builds - Custom Server

Run the following command to test the production build on custom server

```
EXPO_ANDROID_KEYSTORE_BASE64="xx-path/to/keystore-xx"
EXPO_ANDROID_KEYSTORE_ALIAS="expo-turtle-cli"
EXPO_ANDROID_KEYSTORE_PASSWORD="expo-turtle-cli"
EXPO_ANDROID_KEY_PASSWORD="expo-turtle-cli"

yarn export

/* Commit the latest changes and push to remote */

yarn build:apk
/* or */
yarn build:aab
```

Build files can be found under `/build/android` or `/build/ios`

## Build Pages

- [Android](https://santhosh-umapathi.github.io/RN-Features/dist/android-index.json)
- [iOS](https://santhosh-umapathi.github.io/RN-Features/dist/ios-index.json)

## Project Structure

- assets
- src
- - api
- - components
- - config
- - hooks
- - navigator
- - screens
- - utils

## Demo ENV

```
# Secrets
EXPO_ANDROID_KEYSTORE_BASE64=""
EXPO_ANDROID_KEYSTORE_ALIAS=""
EXPO_ANDROID_KEYSTORE_PASSWORD=""
EXPO_ANDROID_KEY_PASSWORD=""
```

## Features

This project was created for educational purposes.

- Locations
- Camera
- Permissions
- Env's
- Custom Scripts
- Animations
- Custom Translations
- Expo Splash Screen

## Learn More

To learn more about the about features, take a look at the following resources:

- [Expo](https://docs.expo.dev/) - Expo Docs
- [Turtle CLI](https://github.com/expo/turtle-cli-example)
- [Expo Custom Server](https://docs.expo.dev/distribution/hosting-your-app/)
- [Expo - Turtle CLI ](https://docs.expo.dev/distribution/turtle-cli/#install-turtle-cli)

## License

###### - App City @2021
