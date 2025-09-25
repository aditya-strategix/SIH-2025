import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI mental health companion. How are you feeling today? I'm here to listen and provide support.",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    checkChatbotConnection();
  }, []);

  // Check if Python chatbot API is running
  const checkChatbotConnection = async () => {
    try {
      const response = await fetch('http://localhost:5001/health');
      if (response.ok) {
        const data = await response.json();
        if (data.status && data.model_loaded) {
          setIsConnected(true);
          setConnectionError('');
          console.log('Chatbot API connected successfully!');
        } else {
          setIsConnected(false);
          setConnectionError('Chatbot model not loaded properly');
        }
      } else {
        setIsConnected(false);
        setConnectionError('Failed to connect to chatbot API');
      }
    } catch (error) {
      console.log('Chatbot API not connected:', error.message);
      setIsConnected(false);
      setConnectionError('Cannot connect to chatbot server. Please ensure the Python chatbot is running on port 5001.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Check connection before sending
    if (!isConnected) {
      await checkChatbotConnection();
      if (!isConnected) {
        const errorMessage = {
          id: Date.now() + 1,
          text: "I'm sorry, I can't connect to the AI chatbot right now. Please ensure the Python chatbot server is running and try again. You can also try refreshing the page.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
    }

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputText;
    setInputText('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      // Call Python chatbot API
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botResponseText = data.response || "I received your message but couldn't generate a response.";
        
        const botResponse = {
          id: Date.now() + 1,
          text: botResponseText,
          isBot: true,
          timestamp: new Date(),
          intent: data.intent,
          confidence: data.confidence
        };

        setMessages(prev => [...prev, botResponse]);
      } else {
        const errorData = await response.json();
        console.error('Chatbot API error:', errorData);
        
        const errorResponse = {
          id: Date.now() + 1,
          text: "I'm having trouble processing your message right now. Could you please try rephrasing your question?",
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorResponse]);
      }
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // Connection lost, update status
      setIsConnected(false);
      setConnectionError('Connection lost to chatbot server');
      
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm sorry, I lost connection to the chatbot server. Please check if the Python chatbot is still running and try again.",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickResponses = [
    "I'm feeling stressed about studies",
    "I'm feeling anxious",
    "I need someone to talk to",
    "How can I manage my emotions?",
    "I want to book a counselor",
    "What are some breathing exercises?",
    "Help me with meditation techniques",
    "I'm feeling overwhelmed"
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-[var(--pastel-blue)] hover:text-[#96b9d8] transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={checkChatbotConnection}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
            >
              Reconnect
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium text-gray-700">
                {isConnected ? 'Python AI Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Connection Error Banner */}
      {!isConnected && connectionError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 mt-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Connection Issue:</strong> {connectionError}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Make sure to run: <code className="bg-yellow-100 px-1 rounded">cd Mental_Health/chatbot && python app.py</code>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Chat Header */}
        <div className="bg-white rounded-t-xl p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AI Mental Health Companion</h1>
              <p className="text-sm text-gray-600">
                {isConnected 
                  ? "Powered by trained mental health AI model" 
                  : "Waiting for AI connection..."}
              </p>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-white px-6 py-4 overflow-y-auto space-y-4 min-h-96 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-[var(--pastel-blue)] text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.isBot && message.intent && (
                    <span className="text-xs opacity-60 italic ml-2">
                      ({message.intent})
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex space-x-1 items-center">
                  <span className="text-xs text-gray-500 mr-2">AI is thinking</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Response Buttons */}
        <div className="bg-white px-6 py-4 border-t">
          <p className="text-sm text-gray-600 mb-3">Quick responses:</p>
          <div className="flex flex-wrap gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => setInputText(response)}
                disabled={isLoading || !isConnected}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  isConnected 
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {response}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-xl p-6 border-t">
          <div className="flex gap-3">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type your message here... Press Enter to send" : "Waiting for AI connection..."}
              className="flex-1 resize-none rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[var(--pastel-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--pastel-blue)] focus:ring-opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed"
              rows={2}
              disabled={isLoading || !isConnected}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || !isConnected}
              className="px-6 py-2 bg-[var(--pastel-blue)] text-white rounded-lg hover:bg-[#96b9d8] focus:outline-none focus:ring-2 focus:ring-[var(--pastel-blue)] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Helpful Resources */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/counselors"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">person</span>
              Book Counselor
            </Link>
            <Link
              to="/phq9"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Mental Health Assessment
            </Link>
            <Link
              to="/resources"
              className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">library_books</span>
              Resources
            </Link>
          </div>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-4 mb-4 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              <strong>Crisis Support:</strong> If you're experiencing a mental health emergency, please call{' '}
              <a href="tel:112" className="font-medium underline">112</a> or contact{' '}
              <a href="tel:9152987821" className="font-medium underline">AASRA: 91-9820466726</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;