const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io with CORS enabled so the frontend can connect
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for the 'updateTask' event from any client
  socket.on("updateTask", (updatedTasks) => {
    console.log("Tasks updated, broadcasting to all clients...");
    
    // Broadcast the new task list to everyone EXCEPT the sender
    // Use io.emit if you want to send it to everyone including the sender
    socket.broadcast.emit("taskUpdated", updatedTasks);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});