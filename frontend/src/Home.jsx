import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile } from './service/api';

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

  // file sharing
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }


  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result).then(() => {
        alert('Link copied to clipboard!');
      }).catch((err) => {
        console.error('Failed to copy: ', err);
      });
    }
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
            <span className="text-white font-bold text-sm">File sahring</span>
            <p className="text-xs text-white">Welcome to our File sharing</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-white text-xs font-medium border border-white rounded-full px-4 py-1 hover:bg-white hover:text-blue-600 focus:outline-none transition duration-300"
        >
          Logout
        </button>
      </div>
      {/* <div className="flex-grow overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
       
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
      </div> */}
      {/* Input */}
     {/* <div className="p-4 bg-white shadow-lg">
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
      </div>  */}

<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        {url && <img src={url} className="w-full h-48 object-cover rounded" alt="uploaded file" />}
        <div className="text-center mt-4">
          <h1 className="text-2xl font-bold text-gray-800">Simple file sharing!</h1>
          <p className="text-gray-600 mt-2">Upload and share the download link.</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onUploadClick}
          >
            Upload
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {result && (
            <>
            <a href={result} target="_blank" rel="noopener noreferrer" className="block mt-4 text-blue-500">
              {result}
            </a>
            <button
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chatbot;
