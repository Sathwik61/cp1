import React, { useState, useEffect } from "react";
import s1 from './assets/react.svg';
import './login.css';
import { Link,useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const fullText = "Sign in to your account";

  useEffect(() => {
    const typingAnimation = setInterval(() => {
      if (typedText !== fullText) {
        setTypedText((prevTypedText) => {
          const nextChar = fullText[prevTypedText.length];
          return prevTypedText + nextChar;
        });
      } else {
        clearInterval(typingAnimation);
      }
    }, 100); 
    return () => clearInterval(typingAnimation);
  }, [typedText, fullText]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // fetch(`${urls.URI}/login`, {
    fetch(`http://localhost:8080/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
     console.log(data)
     const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 5);

  
  localStorage.setItem('jwtToken', data.jwtToken);
  localStorage.setItem('expiryDate', expiryDate.toISOString());
      console.log("Data set succesfully")
navigate('/dashboard')
         })
    .catch(error => {
      
      console.error('Error:', error);
    //   console.log(`${urls.URI}/login`)
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
        <div className="flex justify-center">
        <img
            className="h-12 w-auto logo rotate"
            src={s1}
            alt="Logo"
        />
        </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{typedText}</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Password"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm my-6">
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                New User?
              </Link>
            </div>
            <div className="text-sm my-6">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
