
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Bot, Send, User, Mic, MicOff, X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
  fullscreen?: boolean;
}

const Chatbot: React.FC<ChatbotProps> = ({ className, fullscreen = false }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm your legal assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsBotTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
      
      // Speak the response if text-to-speech is available
      speakText(botMessage.text);
    }, 1500);
  };

  // Simple bot response generator (placeholder for actual AI)
  const getBotResponse = (userInput: string): string => {
    const userInputLower = userInput.toLowerCase();
    
    if (userInputLower.includes('hello') || userInputLower.includes('hi')) {
      return "Hello! How can I assist you with legal matters today?";
    }
    
    if (userInputLower.includes('fir') || userInputLower.includes('complaint')) {
      return "To file an FIR (First Information Report), I can guide you through the process. Would you like to use our FIR Generator feature?";
    }
    
    if (userInputLower.includes('document') || userInputLower.includes('analyze')) {
      return "I can help analyze legal documents. To get started, please use our Document Analyzer feature and upload the document you'd like me to review.";
    }
    
    if (userInputLower.includes('video') || userInputLower.includes('evidence')) {
      return "Our Video Generator can help create a visual representation of events based on the information provided. Would you like to try that feature?";
    }
    
    if (userInputLower.includes('lawyer') || userInputLower.includes('attorney')) {
      return "While I can provide general legal information, I recommend consulting with a licensed attorney for specific legal advice. Would you like information about finding a lawyer?";
    }
    
    if (userInputLower.includes('get started') || userInputLower.includes('begin') || userInputLower.includes('how to use')) {
      return "To get started with our platform, you can explore our four main features: Legal Chatbot, Document Analysis, FIR Generator, and Video Generator. Click on any feature card to open it in fullscreen mode. Is there a specific feature you'd like to learn more about?";
    }
    
    return "I understand you're looking for legal assistance. Could you provide more details about your situation so I can better help you?";
  };

  // Text-to-speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech recognition functionality
  const toggleListening = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore - TypeScript doesn't know about webkitSpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
      
      // @ts-ignore - Store recognition instance
      window.recognitionInstance = recognition;
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    // @ts-ignore - Retrieve and stop recognition instance
    if (window.recognitionInstance) {
      // @ts-ignore
      window.recognitionInstance.stop();
      setIsListening(false);
    }
  };

  // Toggle chatbot visibility
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // If in fullscreen mode, render only the chat interface
  if (fullscreen) {
    return (
      <div className={cn("flex flex-col h-full", className)}>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.sender === 'user' 
                    ? "bg-indigo-600 text-white rounded-br-none dark:bg-indigo-500 legal-gold:bg-amber-600 legal-blue:bg-blue-600" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none legal-gold:bg-amber-100 legal-gold:text-amber-900 legal-blue:bg-blue-100 legal-blue:text-blue-900"
                )}
              >
                <div className="flex items-start">
                  {message.sender === 'bot' && (
                    <Avatar className="h-6 w-6 mr-2 mt-0.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                      <Bot size={14} />
                    </Avatar>
                  )}
                  <div>
                    <p className={cn(
                      "text-sm",
                      message.sender === 'user' ? "text-white" : "text-gray-900 dark:text-gray-100 legal-gold:text-amber-900 legal-blue:text-blue-900"
                    )}>
                      {message.text}
                    </p>
                    <span className={cn(
                      "text-xs mt-1 block",
                      message.sender === 'user' ? "text-indigo-200 dark:text-indigo-100 legal-gold:text-amber-200 legal-blue:text-blue-200" : "text-gray-500 dark:text-gray-400 legal-gold:text-amber-500 legal-blue:text-blue-500"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-6 w-6 ml-2 mt-0.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                      <User size={14} />
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg rounded-bl-none p-3 max-w-[80%] legal-gold:bg-amber-100 legal-gold:text-amber-900 legal-blue:bg-blue-100 legal-blue:text-blue-900">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                    <Bot size={14} />
                  </Avatar>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="resize-none min-h-[40px] max-h-[120px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex flex-col space-y-2">
              <Button 
                type="submit"
                size="icon"
                className={cn(
                  "h-10 w-10 rounded-full",
                  "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
                  "legal-gold:bg-amber-600 legal-gold:hover:bg-amber-700",
                  "legal-blue:bg-blue-600 legal-blue:hover:bg-blue-700"
                )}
              >
                <Send size={18} />
              </Button>
              <Button 
                type="button"
                size="icon"
                variant={isListening ? "destructive" : "outline"}
                className="h-10 w-10 rounded-full"
                onClick={toggleListening}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // For fixed button on page
  return (
    <div className={cn("", className)}>
      {/* Floating chat button - Moved to right side */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all z-20 backdrop-blur-sm border",
          "animate-pulse-subtle transform-gpu hover:scale-110",
          "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-500",
          "dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:border-indigo-400",
          "legal-gold:bg-amber-600 legal-gold:hover:bg-amber-700 legal-gold:border-amber-500",
          "legal-blue:bg-blue-600 legal-blue:hover:bg-blue-700 legal-blue:border-blue-500"
        )}
        aria-label="Chat with legal assistant"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className={cn(
            "fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] rounded-lg shadow-xl z-20 flex flex-col overflow-hidden glass border",
            "animate-fadeIn",
            "bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-800",
            "legal-gold:bg-amber-50/90 legal-gold:border-amber-200",
            "legal-blue:bg-blue-50/90 legal-blue:border-blue-200"
          )}
          ref={chatContainerRef}
        >
          {/* Chat header */}
          <div className={cn(
            "p-4 border-b flex items-center justify-between",
            "bg-gradient-to-r text-white",
            "from-indigo-600 to-blue-600 border-b-indigo-700",
            "dark:from-indigo-500 dark:to-blue-500 dark:border-b-indigo-600",
            "legal-gold:from-amber-600 legal-gold:to-amber-500 legal-gold:border-b-amber-700",
            "legal-blue:from-blue-600 legal-blue:to-blue-500 legal-blue:border-b-blue-700"
          )}>
            <div className="flex items-center space-x-2">
              <Avatar className={cn(
                "h-8 w-8",
                "bg-indigo-100 text-indigo-600",
                "legal-gold:bg-amber-100 legal-gold:text-amber-600",
                "legal-blue:bg-blue-100 legal-blue:text-blue-600"
              )}>
                <Bot size={18} />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Legal Assistant</h3>
                <p className={cn(
                  "text-xs",
                  "text-indigo-100",
                  "legal-gold:text-amber-100",
                  "legal-blue:text-blue-100"
                )}>Always here to help</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className={cn(
                "hover:text-white",
                "text-indigo-100",
                "legal-gold:text-amber-100",
                "legal-blue:text-blue-100"
              )}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div 
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.sender === 'user' 
                      ? "bg-indigo-600 text-white rounded-br-none dark:bg-indigo-500 legal-gold:bg-amber-600 legal-blue:bg-blue-600" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none legal-gold:bg-amber-100 legal-gold:text-amber-900 legal-blue:bg-blue-100 legal-blue:text-blue-900"
                  )}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && (
                      <Avatar className="h-6 w-6 mr-2 mt-0.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                        <Bot size={14} />
                      </Avatar>
                    )}
                    <div>
                      <p className={cn(
                        "text-sm",
                        message.sender === 'user' ? "text-white" : "text-gray-900 dark:text-gray-100 legal-gold:text-amber-900 legal-blue:text-blue-900"
                      )}>
                        {message.text}
                      </p>
                      <span className={cn(
                        "text-xs mt-1 block",
                        message.sender === 'user' ? "text-indigo-200 dark:text-indigo-100 legal-gold:text-amber-200 legal-blue:text-blue-200" : "text-gray-500 dark:text-gray-400 legal-gold:text-amber-500 legal-blue:text-blue-500"
                      )}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-6 w-6 ml-2 mt-0.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                        <User size={14} />
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isBotTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg rounded-bl-none p-3 max-w-[80%] legal-gold:bg-amber-100 legal-gold:text-amber-900 legal-blue:bg-blue-100 legal-blue:text-blue-900">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6 bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 legal-gold:bg-amber-100 legal-gold:text-amber-600 legal-blue:bg-blue-100 legal-blue:text-blue-600">
                      <Bot size={14} />
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce legal-gold:bg-amber-400 legal-blue:bg-blue-400" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="resize-none min-h-[40px] max-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex flex-col space-y-2">
                <Button 
                  type="submit"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-full",
                    "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
                    "legal-gold:bg-amber-600 legal-gold:hover:bg-amber-700",
                    "legal-blue:bg-blue-600 legal-blue:hover:bg-blue-700"
                  )}
                >
                  <Send size={18} />
                </Button>
                <Button 
                  type="button"
                  size="icon"
                  variant={isListening ? "destructive" : "outline"}
                  className="h-10 w-10 rounded-full"
                  onClick={toggleListening}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
