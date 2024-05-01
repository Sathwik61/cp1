import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const expiryDate = localStorage.getItem("expiryDate");
  if (expiryDate === "null") {
    navigate("/signup");
  }
  console.log(expiryDate);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() === "") return;

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const str_time = `${hour}:${minute}`;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", time: str_time },
    ]);

    // Clear input field
    setInputText("");

    // Simulate chatbot reply after a short delay
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello, I'm Chatbot", sender: "chatbot", time: str_time },
      ]);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("expiryDate");
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="h-20 bg-gradient-to-r from-indigo-400 to-blue-600 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
            alt="Chatbot"
            className="rounded-full h-8 w-8 mr-2"
          />
          <div>
            <span className="text-white font-bold text-sm">ChatBot</span>
            <p className="text-xs text-white">Welcome to our ChatBot</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-white text-xs font-medium border border-white rounded-full px-4 py-1 hover:bg-white hover:text-blue-600 focus:outline-none transition duration-300"
        >
          Logout
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {/* Messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex justify-${
              message.sender === "user" ? "end" : "start"
            } mb-4`}
          >
            <div
              className={`rounded-lg py-2 px-4 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-800 mr-auto"
              } ${message.sender === "user" ? "mr-2" : "ml-2"}`}
            >
              {message.text}
              <span
                className={`text-xs ml-2 ${
                  message.sender === "user" ? "text-white" : "text-gray-500"
                }`}
                style={{ fontSize: "0.75rem" }}
              >
                {message.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div className="p-4 bg-white shadow-lg">
        <form onSubmit={handleMessageSubmit} className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 text-gray-800 bg-gray-100 px-4 py-2 rounded-l-lg focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg transition duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
