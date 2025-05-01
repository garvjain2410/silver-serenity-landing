import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleGenerativeAI } from '@google/generative-ai';


const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    {
      sender: 'Chatbot',
      text: "Hello! I'm Silvia, your Jewelleryassistant. How can I help you today? Whether you have questions about our products, wholesale opportunities, or anything else, I'm here to assist!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat history
    setMessages((prev) => [...prev, { sender: 'User', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey); // Replace with your API key
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are a helpful and knowledgeable assistant for a silver whole store named . Respond to the user's queries about silver products, including jewelry, utensils, and other items. Provide detailed and friendly answers, and suggest products or care tips when appropriate. always make sure that responses are not more than 50 words long 

      User: ${input}
      
      Assistant:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add chatbot response to chat history
      setMessages((prev) => [...prev, { sender: 'Chatbot', text }]);
    } catch (error) {
      console.error('Error generating chatbot response:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'Chatbot', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-silver-dark hover:bg-silver-dark/90 text-white p-4 rounded-full shadow-lg z-50 h-16 w-16 flex items-center justify-center"
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </Button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 w-full md:w-[400px] transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <Card className="mx-4 mb-4 overflow-hidden rounded-t-lg shadow-xl border-silver">
          {/* Chat Header */}
          <div className="bg-silver-dark p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-playfair font-bold text-white">S</span>
              </div>
              <div>
                <h3 className="text-white font-medium">Silvia</h3>
                <p className="text-xs text-white/70">JewelleryAssistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-2 h-auto"
              aria-label="Close chat"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-[400px] overflow-y-auto bg-white">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    msg.sender === 'User' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      msg.sender === 'User'
                        ? "bg-silver-dark text-white rounded-tr-none"
                        : "bg-silver-light text-gray-800 rounded-tl-none"
                    )}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-silver-light text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button
                onClick={handleSend}
                disabled={loading}
                className="bg-silver-dark hover:bg-silver-dark/90 text-white"
              >
                {loading ? <Loader className="animate-spin w-5 h-5" /> : <Send size={18} />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChatBot;