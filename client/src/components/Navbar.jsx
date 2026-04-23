import React, { useEffect, useRef } from 'react';
import { Menu, Palette, Briefcase, Smile, Award, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ 
  onToggleSidebar, 
  activeSession, 
  tone, 
  setTone, 
  showToneDropdown, 
  setShowToneDropdown 
}) => {
  const dropdownRef = useRef(null);

  const tones = [
    { id: 'professional', label: 'Professional', icon: <Briefcase size={14} className="text-indigo-400" /> },
    { id: 'friendly', label: 'Friendly', icon: <Smile size={14} className="text-yellow-400" /> },
    { id: 'formal', label: 'Formal', icon: <Award size={14} className="text-blue-400" /> },
    { id: 'casual', label: 'Casual', icon: <Coffee size={14} className="text-emerald-400" /> }
  ];

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowToneDropdown(false);
      }
    };

    if (showToneDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showToneDropdown, setShowToneDropdown]);

  return (
    <nav className="h-14 border-b border-white/10 flex items-center justify-between px-4 sticky top-0 bg-dark/80 backdrop-blur-md z-40">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="md:hidden p-2 text-white/60 hover:text-white">
          <Menu size={20} />
        </button>
        <span className="text-sm font-semibold opacity-70">
          {activeSession ? 'Archived Session' : ''}
        </span>
      </div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          onClick={() => setShowToneDropdown(!showToneDropdown)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-all uppercase tracking-wider"
        >
          <Palette size={14} className="text-indigo-400" /> {tone}
        </button>
        
        <AnimatePresence>
          {showToneDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-xl shadow-2xl p-1 z-50 overflow-hidden"
            >
              {tones.map((t) => (
                <button 
                  key={t.id}
                  onClick={() => { setTone(t.id); setShowToneDropdown(false); }}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 text-left text-xs rounded-lg hover:bg-white/5 transition-all ${tone === t.id ? 'bg-white/10' : ''}`}
                >
                  <span>{t.icon}</span> {t.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
