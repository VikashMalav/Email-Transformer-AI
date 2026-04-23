import React from 'react';
import { Plus, Mail, Circle, Trash2, X } from 'lucide-react';

const Sidebar = ({ 
  history, 
  activeSession, 
  onNewSession, 
  onLoadSession, 
  onClearHistory,
  onDeleteItem,
  isSidebarOpen, 
  onToggleSidebar 
}) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-dark-lighter border-r border-white/10 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="flex flex-col h-full p-3">
        {/* Enhanced Logo */}
        <div className="flex items-center gap-3 px-3 py-6 mb-4 group cursor-default">
           <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                 <Mail size={20} className="text-white" strokeWidth={2.5} />
              </div>
           </div>
           <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white leading-none">EMAIL</span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/40 leading-none mt-1">TRANSFORMER</span>
           </div>
        </div>

        {/* New Session Button */}
        <button 
          onClick={onNewSession}
          className="flex items-center gap-3 px-4 py-3 mb-6 w-full rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-bold uppercase tracking-widest text-indigo-400 group"
        >
          <div className="p-1 rounded-md bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
            <Plus size={14} />
          </div>
          New Transformation
        </button>

        {/* History List */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mb-4">
          <div className="px-3 mb-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] flex items-center gap-2">
             Recent History
             <div className="flex-1 h-px bg-white/5"></div>
          </div>
          
          {history.length === 0 ? (
            <div className="px-3 py-10 text-center opacity-20 text-[10px] uppercase font-bold italic">
              No archives found
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item._id}
                onClick={() => onLoadSession(item)}
                className={`sidebar-item group/item ${activeSession === item._id ? 'sidebar-item-active' : ''}`}
              >
                <div className="flex justify-between items-center w-full gap-2">
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <Circle 
                      size={6} 
                      fill={item.tone === 'professional' ? '#818cf8' : '#4ade80'} 
                      className={`${item.tone === 'professional' ? 'text-indigo-400' : 'text-emerald-400'} flex-shrink-0`} 
                    />
                    <span className="text-xs truncate text-white/80">{item.originalEmail}</span>
                  </div>
                  
                  <button 
                    onClick={(e) => onDeleteItem(e, item._id)}
                    className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-white/10 rounded-md text-white/20 hover:text-red-400 transition-all"
                    title="Delete record"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all border border-transparent hover:border-red-500/20"
            >
              <Trash2 size={14} />
              Clear All History
            </button>
          )}
          
          <div className="px-4 py-3 opacity-20 grayscale cursor-not-allowed">
            <span className="text-[10px] uppercase font-black tracking-widest">v1.2 Stable</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
