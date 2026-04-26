import React from 'react';
import { User, Sparkles, Copy, RefreshCw, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatArea = ({
  messages = [],
  isLoading,
  activeSession,
  tone,
  onSuggestion,
  onCopy,
  onRetry
}) => {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-1000 px-6">
        <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center mb-6 border border-indigo-500/20 shadow-[0_0_50px_rgba(99,102,241,0.1)]">
          <Mail size={32} className="text-indigo-500" />
        </div>
        <h3 className="mb-8">Transform Any Mail Instantly</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 max-w-4xl px-4">
          {[
            "Reply professionally to a job offer",
            "Write a friendly follow-up email",
            "Respond formally to a complaint"
          ].map((suggestion, idx) => (
            <div
              key={idx}
              onClick={() => onSuggestion(suggestion)}
              className="suggestion-chip h-full flex items-center justify-center min-h-[50px] sm:min-h-[80px]"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-32 w-full">
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai group'} w-full md:max-w-[85%]`}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                {msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} className="text-indigo-400" />}
                {msg.role === 'user' ? 'Direct Content' : `${tone} Perfected`}
              </div>
              {msg.role === 'assistant' && (
                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onCopy(msg.content)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
                    <Copy size={14} />
                  </button>
                  <button onClick={onRetry} className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white">
                    <RefreshCw size={14} />
                  </button>
                </div>
              )}
            </div>
            <div className="text-base leading-relaxed opacity-90 markdown-container whitespace-pre-wrap">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      ))}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="chat-bubble-ai">
            <div className="flex gap-1.5 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 typing-dot [animation-delay:0.4s]"></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatArea;
