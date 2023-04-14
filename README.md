# Modrinth Publisher Dashboard

An unofficial android app to track your modrinth statistics.


<div align="center">
<img src="https://user-images.githubusercontent.com/93472213/231879232-db0f65a1-7a4e-4a6f-8bfc-eeffa099b7a4.png" width="auto" height="350px" />  
<img src="https://user-images.githubusercontent.com/93472213/231879101-0886958a-723d-4ab1-9766-68b87d06541b.png" width="auto" height="350px" />  
<img src="https://user-images.githubusercontent.com/93472213/231878677-fa5c9a92-990c-4952-b4a7-59a2394109ae.png" width="auto" height="350px" />  
</div>

- Uses [Omorphia](https://omorphia.modrinth.com/) for Vue components.
- Uses [CapacitorJS](https://capacitorjs.com/) to compile the vue web app to android.

## Features

Currently, I plan to have feature parity with the Analytics page on the modrinth website:

- Payout section
  + [x] Total revenue
  + [x] This months revenue
  + [ ] Transaction History
  + [ ] Create new transaction
- Project section
  Some items in this section wont be available until they're added to knossos.
  + [ ] Total downloads
  + [ ] This months downloads
  + [ ] Total follows
  + [ ] This months follows
- Notification section
  + [ ] Dismiss Notifications
  + [ ] Ignore from certain projects
  + [ ] Filter
  + [ ] Search
- Settings Section
  + [x] Theme Switcher
  + [ ] Account Switcher (hotswap between multiple accounts)
  + [ ] Push Notifications

## IOS Support

I cannot provide IOS support myself because I do not have any apple devices. However, you can add it yourself. Check the CapacitorJS documentation for information on adding IOS as a build target.
