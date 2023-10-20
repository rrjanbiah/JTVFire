# J-TV self server

## Introduction

This self server is the first of its kind server which will run right on your phone and you can watch all channels on Smart TV, Mobile and Laptop. It will let you generate all the personal playlists.

Star repo if you find this helpful

## Prerequisites

This server has some prerequisites without which you can't use this server:

1. An android phone. IOS may work but I haven't tested.
1. Jio number with subscription as you need to login.
1. Your phone and your TV or Laptop must be connected to the same wifi. In case you are watching on your phone, then this is not required.
1. Little brain as the process is little complicated. [Come on. You are setting up a server afterall]

## Let's get started (Mobile)

download Termux application from F-Droid.

Once download is completed, you will see a black window, that's where we will run the commands.

Copy and run first command

```bash
apt update && apt upgrade -y
```

Once done, run the second command to start the installation of server. Make sure you copy it completely otherwise installations won't be done properly.

download nodejs by using this command

```bash
pkg install nodejs-lts wget -y
````

download script files and install

```bash
wget https://github.com/dhruv-2015/JIOTVServer/releases/download/V2.9.3/JTVServer.zip -N && unzip JTVServer.zip && rm JTVServer.zip
```

download start script

```bash
curl -o start.sh https://raw.githubusercontent.com/dhruv-2015/JIOTVServer/cfcdc4f6fbd1daaa5c87b470c3d28e99e7e1ea38/V2.0.3/start.sh && sh start.sh
```

if you face any error while download from github you can use discord link

```bash
curl -o start.sh https://cdn.discordapp.com/attachments/1072165096656220170/1072186722315681852/start.sh && sh start.sh
```

Till here, your server will start. This activity is one time only. Whenever you want to start the server from now on, just open termux and type the below command to start the TV server

```bash
sh start.sh
```

The server will now start.
Now go to your mobile's chrome browser and open <http://localhost:3500/>

## Control panel operations

There a server console will get open. It's time to fill up the details there. Below are the things that you have to do.

### Jio Login

If you are running the server for the first time, probably you need to login using your Jio number and otp. In case login is successful, you will receive a success message

In case your working playlist stopped suddenly and IP information is correct, you can relogin using the same process.

### IP Address

There are 3 states your mobile network can be in.

1. You're connected to Wi-Fi.
1. You have your mobile data on.
1. You have your mobile data and hotspot on.

In order to know your IPv4 address (remember IPv4 only, IPv6 is not used here) you have to follow the below steps

1. Go to your phone's settings.
1. Click on About Phone.
1. In the long list, you will see an option titled "IP address".
1. There you will see the IP address printed. Something like 192.168.*.*
1. Copy this IP address to your clipboard.

Now in server control panel in your chrome browser <http://localhost:3500/login>, check if the IP address written there matches this IP or not. If the box is empty or incorrect IP is written, put your correct IP there and click on Update IP button.<br>

NOTE: You have to update your IP everytime you change your network.

### Generate playlist

Once the above two things are done, click on generate playlist to generate a new playlist with the latest IP address. <br>

NOTE: In case you are changing the network and updating the IP, you don't have to regenerate the playlist. just copy url or download playlist and use.

### Download latest playlist

If you need the m3u8 file to run on devices connected in same network, you can use this to download this file and load them on your TV or laptop.<br>

### Playlist link

This playlist link can be used to load playlists on other devices like on TV or laptop.

## Things to take care of

In order to make things work smoothly, you have to take care of the following things:

1. Your phone and your TV must be connected to same wi-fi.
1. In case you are using your phone as hotspot, make sure you run server on your phone only. Or other phone which is using your hotspot.
1. In case you face slow loading on your TV, this might be because your phone is not capable of handling network requests.
1. If you change your network, please perform the following steps:
   1. See your IP in phone's settings.
   1. Update it on server control panel.
   1. get new playlist.
   1. Load the playlist again on your TV/Laptop/Mobile.

## Issues faced during testing

**Issue**:  Installation is not happening.

**Solution**: Make sure you have copied the second command properly.

**Issue**: Getting ERR_TLS_CERT_ALTNAME_INVALID.

**Solution**: This issue is fixed

**Issue**: Taking too long to load channel

**Solution**: This issue is fixed

**Issue**: Token expire error

**Solution**: This issue is fixed

For any other issues faced, make sure you join our discord server: <https://discord.gg/suyzkCQKhC>

Our telegram group is closed and is no more available. Please join discord for all latest official communications

Thanks for using this.
Stay tuned with all the updates in our discord server.

## Let's get started (Linux w/ Docker)

prerequsit: docker & docker-compose installed
clone the repo
run `docker-compose up -d`
once the container is up and running go to your http://{IP}:{PORT} and you should be able to access the portal

# Fire TV

## Firestick Instructions (Simplified Approach)

Notes on IP setup above are now obsolete (Dhruv may update that). The setup approach here attempts to make the process lightweight on Firestick by avoiding additional software such as `wget` and `zip`, and also by making the installation process easy to type on *Termux* on Firestick through a short URL on GitLab.

### Prerequisites

**Read carefully before starting**; this is not a quick copy-paste task, and you'll need to know the basics.

1. Both your Firestick and your Android Phone should be connected to the same WiFi network.
2. (Optional) As Amazon can track sideloaded apps, it's better to disable "Data Monitoring," "Device Usage Data," and "Collect App Usage Data" under "Privacy Settings" on your Firestick.

### Tools Required

For easy installation, it is highly recommended to use the following apps:

1. [Easy Fire Tools](https://play.google.com/store/apps/details?id=de.agondev.easyfiretools&hl=en_IN) App on your Android Phone

**Purpose:** By opening the app on your phone and clicking the torch-like "Discovery" icon, you can easily find out the IP address of the Firestick on the network. Another use could be to upload/download files to/from the Firestick, especially for downloading the log file from the Firestick to your Android Phone.

2. [Amazon Fire TV](https://play.google.com/store/apps/details?id=com.amazon.storm.lightning.client.aosp&hl=en) remote app on your Android Phone

**Purpose:** To easily type texts using its keyboard option. Note that the keyboard won't work consistently across all Firestick apps; for example, in some Firestick apps, paste will work and in others, it won't. However, it is definitely much better than the Firestick's hardware remote option for typing.

3. Downloader App on your Firestick; refer to `https://troypoint.com/downloader/` (ignore fear-mongering VPN Ads/spoilers on that page) for the installation steps.

**Purpose:** To sideload or install apps that are not available to install from the Amazon App Store. Don't follow the guide but briefly read guides such as `https://www.firesticktricks.com/sideload-apps-on-firestick.html` on how to use the *Downloader App* and understand the basics.

### Installation on Firestick

1. Install **Termux** on your Firestick using the *Downloader App*.

   1. If you've already installed *F-Droid* on your Firestick, install it using that.
   2. If you've NOT installed *F-Droid* on your Firestick, it's better to install a standalone version of Termux from `https://f-droid.org/repo/com.termux_118.apk` on your Firestick.

      More details on how to install a standalone *Termux* on your Firestick:
      1. Open the *Downloader App* on your Firestick and open the keyboard by clicking the "Entering a URL or Search Term" input box.
      2. Launch the *Amazon Fire TV* remote app on your Android phone. Wait for a few seconds and make sure it's connected to the Firestick.
      3. Switch to your Android Phone's browser (such as Chrome) and copy the URL `https://f-droid.org/repo/com.termux_118.apk` onto the clipboard.
      4. Switch back to the *Amazon Fire TV* remote app on your Android phone and paste it using its keyboard option.
      5. Click Next on the Downloader App on your Firestick, either using the hardware remote or the *Amazon Fire TV* remote app to download the APK.
      6. Follow the steps on the Firestick screen to install *Termux*, and once done, delete the downloaded APK file to clear some space. Note that deletion of the APK is optional.

2. Install **Termux:Boot** (an Add-on for Termux).

   1. If you've already installed *F-Droid* on your Firestick, install it using that.
   2. If you've NOT installed *F-Droid* on your Firestick, it's better to install a standalone version of *Termux:Boot* from `https://f-droid.org/repo/com.termux.boot_7.apk` on your Firestick.

      More details on how to install a standalone *Termux:Boot* on your Firestick:

      It is similar to the one noted above, but use `https://f-droid.org/repo/com.termux.boot_7.apk`.



3. With both *Termux* and *Termux:Boot* installed on your Firestick, open *Termux* and *Termux:Boot* once (Open and press the Home key to go back). (*Termux:Boot* will launch *Dhruv's JTVServer software* automatically on the Firestick on every boot.)

4. Launch the **Termux** App on your Firestick.

   1. Disable the soft keyboard option; otherwise, it won't allow any typing.
   2. Use the *Amazon Fire TV* remote app to type the following command (Note that it won't allow copy-paste; you should type one by one, but it's still better than the hardware remote).

      `sh -c "$(curl -sSL https://gitlab.com/-/snippets/3611198/raw)"`

5. Restart your Firestick, and *Dhruv's JTVServer* should be up and running after a few seconds. **Edit/Note:** As noted in this [issue comment](https://github.com/termux/termux-boot/issues/58#issuecomment-1763320383), you'll need to open Termux manually a couple of times when starting Firestick. Wait for a few seconds until you see a notice at the bottom right-hand corner suggesting you press the menu button (≡) to launch the startup/server script. After a few attempts (I'm not sure exactly how many, but it's typically 1-5 times), this manual process won't be necessary anymore. You'll notice a similar message on the home screen, and you don't need to click anything. This indicates that the server is up and running. If you open the IPTV player, it should work.


6. On your Android Phone's browser (such as *Chrome*), open *Dhruv's JTVServer software* at `http://<FireTVIP>:3500` (Make sure to replace the `<FireTVIP>` with the correct one) and login using your mobile number and OTP. (You may also open *Dhruv's JTVServer software* in Firestick's *Silk Web Browser* by using either `http://localhost:3500/` or `http://<FireTVIP>:3500/`.)

| ![Screenshot of JTVServer running on a Firestick, accessed in the Chrome browser on an Android phone.](https://github.com/rrjanbiah/JTVFire/assets/4907427/d3c43dfc-45ca-4f45-b477-adf0ac5128fe) | 
|:--:| 
| *Screenshot of JTVServer running on a Firestick, accessed in the Chrome browser on an Android phone.* |


7. Now, on your Firestick's IPTV Player software, such as *TiviMate*, you can either use `http://localhost:3500/playlist` or `http://<FireTVIP>:3500/playlist` to load the playlist.

### Screenshots

#### EPG (Electronic Program Guide) for a Favorites list from Dhruv's JTVServer playlist on TiviMate

| ![Screenshot of the EPG (Electronic Program Guide) for a Favorites list from Dhruv's JTVServer playlist on TiviMate.](https://github.com/rrjanbiah/JTVFire/assets/4907427/739a9550-61a0-4761-9054-8b83039d44ba) | 
|:--:| 
| *Screenshot of the EPG (Electronic Program Guide) for a Favorites list from Dhruv's JTVServer playlist on TiviMate.* |

**Note:** The history/clock icon next to the channel name indicates that it has a catch-up feature.


#### Catch-up feature for the TravelXP HD channel in TiviMate

| ![Screenshot of the catch-up feature for the TravelXP HD channel in TiviMate.](https://github.com/rrjanbiah/JTVFire/assets/4907427/5c697afc-40a8-46be-af80-fb8c5072bb4f) | 
|:--:| 
| *Screenshot of the catch-up feature for the TravelXP HD channel in TiviMate.* |



### TODO

1. [ ] Check TODO in `install.sh`
2. [ ] Check TODO in other places
3. [ ] Handle `.env` especially for version (display version, debug in `/ip/debug` (version, server, etc)
4. [ ] Create a normal and debug build. And, handle that in `install.sh`
5. [ ] In login/admin, show debug text area with an option to download the log file?
6. [ ] Add screenshots to README?
