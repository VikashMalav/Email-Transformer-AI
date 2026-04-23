import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

const InputBar = ({ 
  email, 
  setEmail, 
  onGenerate, 
  isLoading, 
  textareaRef 
}) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
      <div className="max-w-3xl mx-auto glass-input rounded-3xl p-2 pointer-events-auto shadow-2xl relative mb-4">
        <div className="flex items-end gap-2 px-2">
          <button className="p-3 text-white/40 hover:text-white transition-all">
            <MessageSquare size={20} />
          </button>
          <textarea 
            ref={textareaRef}
            rows={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Paste your email here..."
            className="flex-1 bg-transparent py-3 text-sm focus:outline-none no-scrollbar max-h-48"
          />
          <button 
            onClick={onGenerate}
            disabled={!email.trim() || isLoading}
            className={`p-2.5 rounded-xl transition-all duration-300 ${email.trim() && !isLoading ? 'bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
          >
            <Send size={20} />
          </button>
        </div>
        
        {email.length > 0 && (
          <div className="absolute -bottom-6 left-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            {email.length} characters
          </div>
        )}
      </div>
    </div>
  );
};

export default InputBar;
