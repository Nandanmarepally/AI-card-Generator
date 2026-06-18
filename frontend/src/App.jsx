import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import TopicInput from './components/TopicInput';
import Toggle from './components/Toggle';
import Card from './components/Card';
import Loader from './components/Loader';
import { Brain, RefreshCw, CheckCircle2, AlertCircle, Wifi, WifiOff } from 'lucide-react';

function App() {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState('Success Mode');
  const [cards, setCards] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorCardIndex, setErrorCardIndex] = useState(null);
  const [completionMessage, setCompletionMessage] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function onCardGenerated(data) {
      setCards(prev => {
        // Replace or append
        const newCards = [...prev];
        const existingIndex = newCards.findIndex(c => c.index === data.cardIndex);
        if (existingIndex >= 0) {
          newCards[existingIndex] = { ...data.card, index: data.cardIndex };
        } else {
          newCards.push({ ...data.card, index: data.cardIndex });
        }
        return newCards.sort((a, b) => a.index - b.index);
      });
      if (errorCardIndex === data.cardIndex) {
        setErrorCardIndex(null); // Clear error if it was a retry
      }
    }
    function onGenerationError(data) {
      setIsGenerating(false);
      setErrorCardIndex(data.cardIndex);
      if (data.cardIndex === 0) {
        setCompletionMessage(data.message || 'Fatal error occurred.');
      }
    }
    function onGenerationComplete(data) {
      setIsGenerating(false);
      setCompletionMessage(data.message);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('card_generated', onCardGenerated);
    socket.on('generation_error', onGenerationError);
    socket.on('generation_complete', onGenerationComplete);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('card_generated', onCardGenerated);
      socket.off('generation_error', onGenerationError);
      socket.off('generation_complete', onGenerationComplete);
    };
  }, [errorCardIndex]);

  const handleGenerate = () => {
    setCards([]);
    setErrorCardIndex(null);
    setCompletionMessage('');
    setIsGenerating(true);
    socket.emit('generate_cards', { topic, mode });
  };

  const handleRetry = () => {
    if (errorCardIndex) {
      setCompletionMessage('');
      setIsGenerating(true);
      socket.emit('retry_card', { topic, cardIndex: errorCardIndex });
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-2xl mb-2">
            <Brain className="w-10 h-10 text-blue-600 dark:text-blue-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            AI Learning Cards
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate bite-sized educational flashcards instantly. Enter any topic below to start learning.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full max-w-xl">
            <Toggle mode={mode} setMode={setMode} />
            <div className={`flex items-center gap-1.5 text-sm font-medium ${isConnected ? 'text-emerald-500' : 'text-slate-400'}`}>
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          
          <TopicInput 
            topic={topic} 
            setTopic={setTopic} 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating && !errorCardIndex} 
          />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {cards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card) => (
                <Card key={card.index} {...card} />
              ))}
              
              {/* Error State for a missing card */}
              {errorCardIndex && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-dashed border-red-200 dark:border-red-800/50 p-6 flex flex-col items-center justify-center text-center gap-4 animate-in zoom-in-95 duration-300">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Generation Failed</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Failed to generate Card {errorCardIndex}.</p>
                  </div>
                  <button
                    onClick={handleRetry}
                    disabled={isGenerating}
                    className="mt-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Retry Card {errorCardIndex}
                  </button>
                </div>
              )}
            </div>
          )}

          {isGenerating && !errorCardIndex && (
            <Loader message={cards.length > 0 ? "Generating next card..." : "Analyzing topic and creating cards..."} />
          )}

          {completionMessage && !errorCardIndex && (
            <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl animate-in fade-in slide-in-from-bottom-4">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-medium">{completionMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
