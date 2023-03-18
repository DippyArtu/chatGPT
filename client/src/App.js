import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const SERVER = "https://chatgpt-server-omwj.onrender.com/api/chat";
// const SERVER = "http://localhost:3001/api/chat"; // dev

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    try {
      const response = await axios.post(SERVER, {
        messages: [...messages, { role: "user", content: input }],
      });
    
      if (response.data.choices && response.data.choices.length > 0) {
        const assistantMessage = response.data.choices[0].message;
        setMessages([...messages, { role: "user", content: input }, assistantMessage]);
      } else {
        console.error("Error: Unexpected response from the GPT-4 API:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>GPT-4 Chat</h1>
      <div className="chat">
        {messages.map((message, index) => (
          <p key={index} className={message.role}>
            {message.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
