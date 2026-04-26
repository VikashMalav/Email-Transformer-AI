import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from './api/api';
import toast, { Toaster } from 'react-hot-toast';

// Component Imports
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ChatArea from './components/ChatArea';
import InputBar from './components/InputBar';

function App() {
  // State Management
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSessionId, setLoadingSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  
  // UI State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [showToneDropdown, setShowToneDropdown] = useState(false);

  const textareaRef = useRef(null);

  // Initial Data & Effects
  useEffect(() => {
    fetchHistory();
    if (textareaRef.current) textareaRef.current.focus();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [email]);

  // Handlers
  const fetchHistory = async () => {
    try {
      const { data } = await api.get('/replies');
      setHistory(data.data || []);
    } catch (e) { }
  };

  const handleGenerate = useCallback(async () => {
    const emailToProcess = email.trim();
    if (!emailToProcess || isLoading) return;

    const loadingToast = toast.loading('Consulting Elite AI Architect...');
    
    // Optimistic UI: Add user message immediately
    const userMsg = { role: 'user', content: emailToProcess };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setLoadingSessionId(activeSession || 'new'); // Track context
    setEmail(''); 
    
    try {
      const { data } = await api.post('/generate-reply', { 
        email: emailToProcess, 
        tone,
        sessionId: activeSession 
      });
      
      if (data.messages) {
        setMessages(data.messages);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.generatedReply }]);
      }
      
      if (data.sessionId) setActiveSession(data.sessionId);
      
      toast.success('Reply perfected!', { id: loadingToast });
      fetchHistory();
    } catch (e) {
      const errorMsg = e.response?.data?.message || 'AI Architecture failed to respond.';
      toast.error(errorMsg, { id: loadingToast });
    } finally {
      setIsLoading(false);
      setLoadingSessionId(null);
    }
  }, [email, tone, isLoading, activeSession]);

  const loadSession = (item) => {
    setEmail('');
    setMessages(item.messages || []);
    setTone(item.tone);
    setActiveSession(item._id);
    setIsSidebarOpen(false);
    toast.success('Conversation loaded');
  };

  const newSession = () => {
    setEmail('');
    setMessages([]);
    setActiveSession(null);
    setIsSidebarOpen(false);
    if (textareaRef.current) textareaRef.current.focus();
    toast.success('Workspace cleared');
  };

  const deleteItem = async (e, id) => {
    e.stopPropagation(); // Prevent loading the session when clicking delete
    try {
      await api.delete(`/replies/${id}`);
      toast.success('Record removed');
      fetchHistory(); // Refresh from API
    } catch (e) {
      // Interceptor handles toast
    }
  };

  const clearHistory = async () => {
    if (!window.confirm('Permanently delete all saved replies? This cannot be undone.')) return;
    
    try {
      await api.delete('/replies');
      fetchHistory(); // Guaranteed fresh state from API
      newSession();
      toast.success('History wiped successfully');
    } catch (e) {
      // Interceptor handles toast
    }
  };

  return (
    <div className="flex h-dvh bg-dark overflow-hidden font-sans">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e1e',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '14px',
          },
        }}
      />
      <Sidebar 
        history={history}
        activeSession={activeSession}
        onNewSession={newSession}
        onLoadSession={loadSession}
        onClearHistory={clearHistory}
        onDeleteItem={deleteItem}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main className="flex-1 flex flex-col md:ml-[260px] h-full relative">
        <Navbar 
          activeSession={activeSession}
          tone={tone}
          setTone={setTone}
          showToneDropdown={showToneDropdown}
          setShowToneDropdown={setShowToneDropdown}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isLoading={isLoading && (loadingSessionId === activeSession || (!activeSession && loadingSessionId === 'new'))}
        />

        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-10">
          <ChatArea 
            messages={messages}
            isLoading={isLoading && (loadingSessionId === activeSession || (!activeSession && loadingSessionId === 'new'))}
            activeSession={activeSession}
            tone={tone}
            onSuggestion={setEmail}
            onCopy={(text) => { 
              navigator.clipboard.writeText(text); 
              toast.success('Copied to clipboard'); 
            }}
            onRetry={handleGenerate}
          />
        </div>

        <InputBar 
          email={email}
          setEmail={setEmail}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          textareaRef={textareaRef}
        />
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
        />
      )}
    </div>
  );
}

export default App;
