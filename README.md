# MultiplayerGame
[CodeWiki](https://github.com/GeorgeSikora/MultiplayerGame/wiki)

This is 2D JavaScript Multiplayer game, where you can shoot and move on the map with other players.

![Game gif](https://github.com/GeorgeSikora/MultiplayerGame/blob/master/screenshots/shooting.gif)

What I use:
- [Node.js](https://nodejs.org/en/) for server run.
- [JavaScript](https://www.javascript.com/) and [p5.js](https://p5js.org/) for client side game and [Howler.js](https://howlerjs.com/) library for 3D sounds.
- [Socket.io](https://socket.io/) for the networking between server and clients.
- and also [Apache](http://www.apache.org/) server, or [Xampp](https://www.apachefriends.org/index.html), for running web server.

<div style="float: left">
<img src="https://seeklogo.com/images/O/open-source-logo-55C3B4FF7B-seeklogo.com.png" width="8%">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" width="7%">
<img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" width="6%">
<img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_960_720.png" width="7%">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Apache_HTTP_server_logo_%282016%29.svg/1200px-Apache_HTTP_server_logo_%282016%29.svg.png" width="17%">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/711px-PHP-logo.svg.png" width="10%">
<img src="https://mariadb.com/wp-content/uploads/2019/11/mariadb-logo-vert_blue-transparent.png" width="9%">
<img src="https://upload.wikimedia.org/wikipedia/labs/8/8e/Mysql_logo.png" width="12%">
</div>

## JavaScript Libraries
#### Client / [Apache](https://www.apache.org)
- [p5.js](https://p5js.org/)
- [socket.io](https://socket.io/)
- [jQuery](https://jquery.com/)
- [howler.js](https://howlerjs.com/)
#### Server / [Node.js](https://github.com/GeorgeSikora/MultiplayerGame/#what-is-nodejs)
- [socket.io](https://socket.io/)
- [simplex-noise](https://www.npmjs.com/package/simplex-noise)

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
### - WAITING to fix:
When a player moves on according to blocks placed next to each other, he stops.
  > The collision system needs to be improved.
  
Rotation easing of enemies tools goes along the full reverse angle, when angle value dropped to start, just looks weird.
  > Bit of a math puzzle, I'll think about how to fix it, it's not that important yet.
  
players emit with pos etc. have very big delay, needs to sending only variables that have changed.
  > It has been improved, but it still wants to improve.
  
when someone disconnects when restarting, the music starts playing again
  > I know this is due to the server side, sends multiple restarts to clients, needs to be handled by the server.
  
in the menu I hear gunfire, sometimes I see bullets
  > Easy to fix, I'm just too lazy, just make sure the server sends bullets only to players in the game, or players would regulate the bullets, depending on whether they are in the game.
  
bug with the end, the player can move even if the game ends
  > I have to figure out why this is so, maybe just the player didn't get the socket that the game was over.
### - FIXED already:
when I kill someone in the lobby, the killed person then shows no contact with the server, I can't kill him, nor can I see him moving
  > The player was in respawning mode, so he was frozen and could not be eliminated.

## What is [Node.js](https://nodejs.org/)?
Software system designed for writing highly scalable Internet applications, especially web servers. Programs for Node.js are written in JavaScript, making extensive use of the event model and asynchronous I / O operations to minimize CPU overhead and maximize performance.
