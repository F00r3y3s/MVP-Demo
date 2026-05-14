import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, Bot, Building2, Send, Sparkles } from 'lucide-react';
import { ScreenName, ChatMessage } from '../../types';
import { useOrgRoute } from '../../context/OrgRouteContext';
import { generateAIResponse } from '../../services/geminiService';

interface Props {
  onNavigate: (screen: ScreenName, params?: any) => void;
  onBack: () => void;
}

const quickPrompts = [
  'Which targets are behind this week?',
  'Draft nudges for water security',
  'What should we escalate to leadership?',
];

const OrgAIChat: React.FC<Props> = ({ onNavigate, onBack }) => {
  const { selectedEntity } = useOrgRoute();
  const shortName = selectedEntity?.shortName ?? 'MOEI';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `I am monitoring ${shortName}'s targets, ESG indicators, BCI movement, infrastructure signals, and verified actions. Water security and EV network adoption need attention today; Scope 3 disclosure is on track.`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(messages.length);

  // Reset scroll to top on mount — no auto-scroll on initial load
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
  }, []);

  // Only auto-scroll when new messages are actually added (not on mount)
  useEffect(() => {
    if (messages.length > messageCountRef.current || isTyping) {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }
    messageCountRef.current = messages.length;
  }, [messages.length, isTyping]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: trimmed,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const contextPrompt = `Answer as Estidamaty organization AI for ${shortName}. Use concise operational sustainability language. Current dashboard facts: BCI 74.8 up 3.2%, water security 64%, EV charging network 61%, green building adoption 58%, Scope 3 ESG overview on track, nudges sent 245,890, goal deviations 18,423, success rate 87.6%. User asks: ${trimmed}`;
    const aiText = await generateAIResponse(contextPrompt);

    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="flex h-full flex-col bg-[#EEF2EF]">
      <header className="shrink-0 bg-white px-4 pb-3 pt-[60px] shadow-[0_1px_0_rgba(15,23,42,.06)]">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500 active:scale-95" aria-label="Back">
            <ArrowLeft size={18} />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[var(--forest-medium)]">
            <Bot size={22} strokeWidth={2.6} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-black text-slate-900">{shortName} AI Command Chat</h1>
            <p className="mt-0.5 flex items-center gap-1 text-[10px] font-bold text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live dashboard context connected
            </p>
          </div>
          <button
            onClick={() => onNavigate(ScreenName.ORG_AI_AGENT)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500 active:scale-95"
            aria-label="Open AI insights"
          >
            <Sparkles size={17} />
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="mb-4 rounded-[24px] bg-gradient-to-br from-[#064E3B] to-[#0E7490] p-4 text-white">
          <div className="flex items-center gap-2">
            <Building2 size={17} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Entity context</span>
          </div>
          <p className="mt-2 text-[12px] font-semibold leading-6 text-white/82">
            I can reference targets, BCI, ESG, infrastructure, AI nudges, emirate performance, and reward readiness for {shortName}.
          </p>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map(prompt => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="shrink-0 rounded-full border border-emerald-100 bg-white px-3 py-2 text-[10px] font-black text-[var(--forest-medium)] shadow-sm active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'ai' && (
                <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0E7490] to-[#064E3B] text-white">
                  <Bot size={15} />
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                message.sender === 'user'
                  ? 'rounded-br-none bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-medium)] text-white'
                  : 'rounded-bl-none bg-white text-slate-800'
              }`}>
                <p className="leading-relaxed">{message.text}</p>
                <span className={`mt-1 block text-[10px] ${message.sender === 'user' ? 'text-right text-white/70' : 'text-slate-400'}`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0E7490] to-[#064E3B] text-white">
                <Bot size={15} />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-white px-4 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 delay-100" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 delay-200" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      <footer className="shrink-0 border-t border-slate-100 bg-white p-4">
        <div className="flex items-end gap-2 rounded-2xl border border-transparent bg-slate-100 p-2 focus-within:border-[var(--forest-light)]">
          <textarea
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask about targets, risks, ESG, nudges..."
            className="max-h-24 flex-1 resize-none border-none bg-transparent py-2.5 text-sm outline-none focus:ring-0"
            rows={1}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--forest-light)] text-white shadow-md transition-all active:scale-95 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={17} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OrgAIChat;
