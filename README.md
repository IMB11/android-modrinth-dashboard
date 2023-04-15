# Modrinth Publisher Dashboard

An unofficial android app to track your modrinth statistics.

<div align="center">
  <img width="200" src="https://i.imgur.com/wszkIOG.png" />
  <img width="200" src="https://i.imgur.com/j6nVB0J.png" />
  <img width="200" src="https://i.imgur.com/Jz62lSa.png" />
  <img width="200" src="https://i.imgur.com/fpBdTHV.png" />
  <img width="200" src="https://i.imgur.com/AKbzI8O.png" />
</div>

- Uses [Omorphia](https://omorphia.modrinth.com/) for Vue components.
- Uses [CapacitorJS](https://capacitorjs.com/) to compile the vue web app to android.

### Contents

- [Features](#features)
- [Development](#development)
- [IOS Support](#ios-support)

## Features

Currently, I plan to have feature parity with the Analytics page on the modrinth website:

- Payout section
  + [x] Total revenue
  + [x] This months revenue
  + [x] Transaction History
  + [ ] Create new transaction
- Project section
  Some items in this section wont be available until they're added to knossos.
  + [ ] Total downloads
  + [ ] This months downloads
  + [ ] Total follows
  + [ ] This months follows
- [x] Notification section
- Settings Section
  + [x] Theme Switcher
  + [ ] Account Switcher (hotswap between multiple accounts)
  + [ ] Push Notifications

## Development

If you wish to contribute to the UI stuff, all you need to do is:

```bash
pnpm install
pnpm run serve
```

If you wish to push a debug apk to your android device, you will need to run the following:

```bash
pnpm install
pnpm run build
npx cap sync
npx cap run android
```

If you want to build an apk, you will need to open the `android` folder in Android Studio v2022+

## IOS Support

I cannot provide IOS support myself because I do not have any apple devices. However, you can add it yourself. Check the CapacitorJS documentation for information on adding IOS as a build target.
