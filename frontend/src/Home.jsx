import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFile,GetLinks } from './service/api';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [Links, setLinks] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const expiryDate = localStorage.getItem("expiryDate");
  if (expiryDate === "null") {
    navigate("/signup");
  }
  // console.log(expiryDate);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
useEffect(()=>{
  let a=localStorage.getItem('persist:root')
  
},[])

  const getLinks= async()=>{
    const uid=localStorage.getItem('uid')
    const data={data:uid};
    try {
      const response = await GetLinks(data);
      setLinks(response.links);
      console.log(response.links);
  } catch (error) {
      console.log('Error while calling the API', error.message);
  }
  }

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
    localStorage.removeItem("uid");
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
        let uid=localStorage.getItem('uid');
        data.append("name", file.name);
        data.append("file", file);
        data.append("uid", uid);
        
      
        const response = await uploadFile(data);
        console.log(response)
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
  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text);
        
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        
      });
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
  <div className="h-20 bg-gradient-to-r from-blue-800 to-purple-700 flex items-center justify-between px-4 shadow-lg">
    <div className="flex items-center">
      <img
        src="https://i.ibb.co/fSNP7Rz/icons8-chatgpt-512.png"
        alt="Chatbot"
        className="rounded-full h-8 w-8 mr-2 border border-blue-300"
      />
      <div>
        <span className="text-white font-bold text-sm">File Sharing</span>
        <p className="text-xs text-white">Welcome to our File Sharing</p>
      </div>
    </div>
    <button
      onClick={handleLogout}
      className="text-white text-xs font-medium border border-white rounded-full px-4 py-1 hover:bg-white hover:text-blue-800 focus:outline-none transition duration-300"
    >
      Logout
    </button>
  </div>
  <div className="flex items-center justify-center flex-grow">
    <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-6 border border-blue-300">
      {url && <img src={url} className="w-full h-48 object-cover rounded-lg shadow-lg" alt="uploaded file" />}
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold text-white">Simple File Sharing!</h1>
        <p className="text-white mt-2">Upload and share the download link.</p>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg"
          onClick={onUploadClick}
        >
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {result && (
          <>
            <a
              href={result}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-blue-200 hover:text-blue-300 transition duration-300"
            >
              {result}
            </a>
            <button
              className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition duration-300 shadow-lg"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  <div className="text-white m-16 flex flex-col">
    <h2 className="text-2xl font-bold mb-4">Links</h2>
    <div className="flex flex-col">
      <button
        onClick={getLinks}
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300 shadow-lg mb-4"
      >
        Get Links
      </button>
      <div>
      {Links.map((file, index) => (
        <div key={index} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg rounded-lg p-4 mb-4">
          <div className="text-lg font-medium text-white mb-2">{file.name}</div>
          <div className="flex items-center mb-2">
            <span className="text-lg font-medium text-white break-all">
              http://localhost:8080/api/v1/file/{file._id}
            </span>
            <button
              onClick={() => copyTextToClipboard(`http://localhost:8080/api/v1/file/${file._id}`)}
              className="ml-2 px-3 py-1 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition duration-300 shadow-lg text-xs"
            >
              Copy
            </button>
          </div>
          <div className="text-sm text-gray-300">{file.path}</div>
        </div>
        ))}
      </div>
    </div>
  </div>
</div>

  );
};

export default Chatbot;
