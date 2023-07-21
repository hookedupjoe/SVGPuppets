# SVGPuppets
- Author: Joseph Francis, hookedup, inc.
- Web Code License: MIT

## ToDo: Update this out of date FAQ

## About
- This is a Node.js application that uses D3 to visually represent music EQ and beat related values.  
- The page connects via WebSockets to the Hookedup LED Controller App to get a real time stream of EQ values (pre smoothed) and beat details (also processed for easier graphical display).
- This demo shows 30 bands using arcs.  There is a circle in the center that changes color as the Snare drum hits (to change color with the beat).  There is also a star that changes size with the volume, making it jump with the music over the colored dot.

## Setup
 1) Download the Hookedup LED Controller Application from the products page on the [Hookedup Website](https://www.hookedup.com)
 
 [Direct Link to Java App](https://hookedup.com/res/HookedupLEDController.jar?open)
 

 ### One Time Setup
 - Run the Hookedup LED Controller application 
   (if running on a mac, be sure to change the security setting to allow this to run)

 - Configure Web Server to start automatically
   - Go to the 'Options' tab then the 'Web Server' sub-tab
   - Change the port (Suggested: 7010)
   - Click option to run on startup
   - Press the Save Settings 

 - Load some music (mp3s only)
  - Click the 'Live Play' tab then the 'Music Playlists' sub-tab
  - Click 'Open Music Folder' button, that will open the folder where you can then drag / drop new mp3 files.
  - Close and reopen the application

## Usage
1) Run the Hookedup LED Controller Application and start live play
  - Click the 'Live Play' tab
  - Select a song
  - Click the 'Play' button
Note: At this point the eq should show the response to the same values being streamed to the web page.

2) Run this program
* npm install (one time
* npm start

Open the page at: 
http://localhost:33462

Press the connect button while music playing, it will start moving.

## Developer Details
The Hookedup LED Application provides for a WebSocket connection, see demo code for how to do that
The WebSocket sends the following data:
pos = Position: The position where the long is, in case you want to changes stuff based on the position in the song
vol = volume (0-255)
beats = beat values in this order
 - kick cycling color value (0-255)
 - snare cycling color value (0-255)
 - hat cycling color value (0-255)
 - kick actual value (0-1024)
 - snare actual value (0-1024)
 - hat actual value (0-1024)
 - B1 - B30 = 30 EQ bands 0=Lowest Band, 30=Highest

Sample:  
TBD