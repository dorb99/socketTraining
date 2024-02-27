const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/userRouter");

app.use(cors());
app.use(express.json())
const server = http.createServer(app);

dotenv.config({ path: "./.env" });
const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log("problem: " + err));


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  log("user connected: " + socket.id);

  socket.on("send_message", (data) => {
    if (data.room) {
      socket.broadcast.to(data.room).emit("new_message", data.content);
    } else {
      socket.broadcast.emit("new_message", data.content);
    }
  });

  socket.on("enter_room", (data) => {
    socket.join(data);
  });
});

app.use("/api/user", userRouter)

server.listen(3000, () => {
  log("server listening on 3000");
});
