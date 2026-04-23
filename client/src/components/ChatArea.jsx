import React from 'react';
import { User, Sparkles, Copy, RefreshCw, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatArea = ({
  displayedEmail,
  generatedReply,
  isLoading,
  tone,
  onSuggestion,
  onCopy,
  onRetry
}) => {
  if (!displayedEmail && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-1000 px-6">
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
    <div className="max-w-4xl mx-auto space-y-10 pb-32">
      {/* User Bubble */}
      {displayedEmail && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-end"
        >
          <div className="chat-bubble-user">
            <div className="text-xs font-black text-white/30 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <User size={12} /> Original Content
            </div>
            <p className="text-base leading-relaxed opacity-90">{displayedEmail}</p>
          </div>
        </motion.div>
      )}

      {/* AI Bubble */}
      {(generatedReply || isLoading) && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-start"
        >
          <div className="chat-bubble-ai group">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">{tone}</span>
                <Sparkles size={14} className="text-indigo-400" />
              </div>
              {!isLoading && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onCopy(generatedReply)} className="p-1.5 hover:bg-white/10 rounded-lg text-white/60">
                    <Copy size={14} />
                  </button>
                  <button onClick={onRetry} className="p-1.5 hover:bg-white/10 rounded-lg text-white/60">
                    <RefreshCw size={14} />
                  </button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex gap-1.5 py-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400 typing-dot"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 typing-dot [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-indigo-400 typing-dot [animation-delay:0.4s]"></div>
              </div>
            ) : (
              <p className="text-base leading-loose text-white/90 whitespace-pre-wrap">{generatedReply}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatArea;
