import React, { useState, useEffect, useRef } from 'react';
import { ScreenName, ChatMessage } from '../types';
import { generateAIResponse } from '../services/geminiService';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  goBack: () => void;
}

const ChatScreen: React.FC<Props> = ({ goBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm Sustain AI. How can I help you live greener today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiText = await generateAIResponse(userMsg.text);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiText,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-primary)]">
      {/* Header */}
      <div className="h-[90px] pt-[47px] bg-gradient-to-r from-[var(--forest-deep)] to-[var(--teal)] text-white px-4 flex items-center gap-3 shadow-md shrink-0">
        <button onClick={goBack} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h2 className="font-bold text-lg leading-none">Sustain AI</h2>
          <span className="text-xs opacity-80 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--forest-deep)] flex items-center justify-center text-white text-xs mr-2 mt-1 shadow-sm shrink-0">
                <i className="fas fa-robot"></i>
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-br-none' 
                : 'bg-white text-[var(--text-primary)] rounded-bl-none'
            }`}>
              <p className="leading-relaxed">{msg.text}</p>
              <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-white/70 text-right' : 'text-gray-400'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--teal)] to-[var(--forest-deep)] flex items-center justify-center text-white text-xs mr-2 mt-1">
                <i className="fas fa-robot"></i>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[var(--border-light)] shrink-0">
        <div className="flex items-end gap-2 bg-[var(--bg-tertiary)] rounded-2xl p-2 border border-transparent focus-within:border-[var(--forest-light)] transition-colors">
          <button className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--forest-light)]">
            <i className="fas fa-plus"></i>
          </button>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-24 py-2.5 text-sm"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-[var(--forest-light)] text-white flex items-center justify-center shadow-md disabled:opacity-50 disabled:shadow-none transition-all hover:scale-105 active:scale-95"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
