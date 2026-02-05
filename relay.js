import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", socket => {
  console.log("Peer connected:", socket.id);

  socket.on("signal", data => {
    if(io.sockets.sockets.get(data.to)){
      io.to(data.to).emit("signal", { from: socket.id, signal: data.signal });
    }
  });

  socket.on("disconnect", () => console.log("Peer disconnected:", socket.id));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Relay server running");
});
