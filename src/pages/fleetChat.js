import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';

const FleetChat = () => {
  const [messages, setMessages] = useState([{
    sender: "bot", content: "Hey there Bob! How can *we* be of help?"
  }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');

  async function postMessage (message) {
    let data = {
      // message: "I need a diabetes-friendly dinner recipe. Can you find one and confirm if it aligns with my health records and medications?"
      topic: message
    };
    const res = await fetch("https://f1e4-38-29-145-10.ngrok-free.app/process_query", {
        method: "POST",
        headers: {
        "Content-Type": "application/json", 
        },
            body: JSON.stringify(data),
    });
    const out = await res.json();
    console.log(out);
   return out;
  }

  const sendMessage = (message) => {
    setMessages((prev) => [...prev, { sender: 'user', content: message }]);
    setInputValue('');
    setIsTyping(true);
    const response = postMessage(message);

    setTimeout(() => {
        console.log("response")
        console.log(response)
        console.log("haha")
        // console.log(response.then((data) => {console.log(data.value.result.response)}))
        const x = await response;
        if (response.response) {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', content: response.then(data) },
              ]);
        } else {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', content: "I'm sorry. Something went wrong. Please try again in some time." },
              ]);
        }
      setIsTyping(false);
    }, 30000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-grow overflow-y-auto p-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-2`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-black text-white rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl rounded-br-sm shadow-sm shadow-md'
                  : 'bg-gray-200 text-black rounded-tl-3xl rounded-bl-sm rounded-tr-3xl rounded-br-3xl shadow-md'
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="max-w-xs p-3 bg-gray-200 text-black rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputValue.trim()) sendMessage(inputValue);
          }}
        >
          <div className="flex items-center bg-black rounded-3xl overflow-hidden opacity-80 shadow-2xl-dark transition duration-500">
            <input
              type="text"
              className="flex-grow px-6 py-2 outline-none text-white bg-black opacity-80"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 font-roboto bg-black text-white hover:bg-white hover:text-black transition duration-400 hover:shadow-md rounded-full m-1 min-w-24"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FleetChat;
