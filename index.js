const { createSocket } = require('dgram');
const express = require('express');
const { isObject } = require('util');
const app = express()
const port = 3000
// server
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/gameControl', (req, res) => {
    res.sendFile(__dirname + '/js/game.control.js');
  });

app.get('/gameDisplay', (req, res) => {
    res.sendFile(__dirname + '/js/game.display.js');
  });

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/js/game.js');
  });

app.get('/gameKeycode', (req, res) => {
    res.sendFile(__dirname + '/js/game.keycode.js');
  });

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


var NbPlayer = 0;
io.on('connection', (socket) => {
    console.log('a user connected');
    NbPlayer++;
    if(NbPlayer == 1){
      console.log('player1');
      socket.emit('player', 'player1');
    }
    if(NbPlayer == 2){
      console.log('player2');
      socket.emit('player', 'player2');
    }
    if(NbPlayer == 3){
      console.log('player3');
      socket.emit('player', 'player3');
    }
    if(NbPlayer == 4){
      console.log('player4');
      socket.emit('player', 'player4');
      NbPlayer = 0;
    }

    // === // 

    socket.on('ack', (data) => {
        console.log('ack ' + data);
      });

    socket.on('uploadBall', (ballPosX, ballPosY, ballDirX, ballDirY) => {
      /*console.log('ballPosX : ' + ballPosX);
      console.log('ballPosY : ' + ballPosY);
      console.log('ballDirX : ' + ballDirX);
      console.log('ballDirY : ' + ballDirY);//*/
      io.emit('downloadBall', ballPosX, ballPosY, ballDirX, ballDirY);//*/
    });
    socket.on('uploadP1', (P1) => {
       //console.log('uploadP1');
       //console.log('P1' + P1);
       io.emit('downloadP1', P1);
      });
    socket.on('uploadP2', (P2) => {
      io.emit('downloadP2', P2);
      });
    socket.on('uploadP3', (P3) => {
      io.emit('downloadP3', P3);
      });
    socket.on('uploadP4', (P4) => {
      io.emit('downloadP4', P4);
      });

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });




http.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port)
})