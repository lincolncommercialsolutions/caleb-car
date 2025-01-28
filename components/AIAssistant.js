'use client';
import { useState } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Add welcome message when chat first opens
  const handleToggle = () => {
    if (!isOpen && messages.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Welcome to CalebCar! I\'m here to answer questions about our services, pricing, and automotive expertise. How may I assist you today?' 
      }]);
    }
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 bg-accent hover:bg-accent-hover text-white rounded-full p-4 shadow-2xl transition-all duration-300 z-50 hover:scale-110"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-surface rounded-xl shadow-2xl flex flex-col z-50 border border-border">
          <div className="bg-accent text-white p-4 rounded-t-xl">
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-sm text-white text-opacity-90">Ask me about our services!</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'bg-background text-text-primary border border-border shadow-md'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background text-text-primary p-3 rounded-lg border border-border">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-accent bg-background text-text-primary"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition disabled:opacity-50 shadow-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
