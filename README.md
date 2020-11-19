# MultiplayerGame

![Game gif](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/shooting.gif)

This is 2D JavaScript Multiplayer game, where you can shoot and move on the map with other players.

What I use:
- [Node.js](https://nodejs.org/en/) for server run.
- [JavaScript](https://www.javascript.com/) and [p5.js](https://p5js.org/) for client side game and [Howler.js](https://howlerjs.com/) library for 3D sounds.
- [Socket.io](https://socket.io/) for the networking between server and clients.
- and also [Apache](http://www.apache.org/) server, or [Xampp](https://www.apachefriends.org/index.html), for running web server.

## New Features!

The game already has working Multiplayer engine, so you can play and test the game with more players in one map.

I added some screenshots of game and server:

### Menu for selecting cube color and name
![Menu image](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/menu.png)


### Chat update!
Smooth chat, looks cool, right?

![Chat](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/chat.gif)

### In the game, there is safe zone, where people cannot shoot and cannot be eliminated
![Game image](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/game.png)

### Also i created server settings page for easy control with constant variables
![Server image](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/server.png)

### Map update!
![Game map](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/map.png)

### Also with collisions system
![newest Game image](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/game2.png)

### Why "Wisteria" ?

I just like this tree, called Wisteria and also it has very nice name. So far, it's just such a temporary name, I don't have a fancy name yet.

## TODO list
- Knife hit enemy on use
- Sending firing as some 'tool use' event, not as 'shot' and creating bullets. With this I will be able to play music as type of gun
- Registration and login with MySQL database using Socket.io
- Server side map editor and management
- More chat commands
- Effect when bullet hits wall, player
- Animated player move

## Bugs to fix
- When a player moves on according to blocks placed next to each other, he stops.
- Rotation easing of enemies tools goes along the full reverse angle, when angle value dropped to start, just looks weird.
- players emit with pos etc. have very big delay, needs to sending only variables that have changed.
