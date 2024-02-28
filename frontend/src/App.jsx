import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import createUser from "./userActions/createUser";

const socket = io.connect("https://render.com/docs/node-version");

function App() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  
  const handleMessage = (e) => {
    e.preventDefault();
    socket.emit("enter_room", room);
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });

    const content = { username, message, time };
    const currentMessage = { content, room };
    setMessages([...messages, content]);
    if (room) socket.emit("send_message", currentMessage);
    else socket.emit("send_message", currentMessage);
  };

  const handleLoging = async (e) => {
    e.preventDefault();
    createUser(fullName, username, room);
  };

  //socket on
  socket.on("new_message", (data) => {
    setMessages([...messages, data]);
  });

  socket.on("entered_room", (message) => {
    console.log(message);
  });

  return (
    <>
      <form onSubmit={handleLoging}>
        <div>
          <input
            value={fullName}
            type="text"
            placeholder="full Name"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            value={username}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">register</button>
        </div>
      </form>
      <form onSubmit={handleMessage}>
        <div>
          <input
            value={room}
            type="text"
            placeholder="room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <input
            value={message}
            type="text"
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">send message</button>
        </div>
      </form>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.username} ({msg.time}): {msg.message}
          </div>
        ))}
        <button type="button" onClick={() => setMessages([])}>
          delete chat
        </button>
      </div>
    </>
  );
}

export default App;
