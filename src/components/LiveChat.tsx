import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Shield, Headset } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "agent" | "user";
  text: string;
  time: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "Hi there! Welcome to Zentricore IT Solutions. My name is Joan. How can I assist you with your IT systems, cloud, or HVAC requirements today?",
      time: "Just now",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: now },
    ]);
    setInputVal("");

    // Simulate Agent response with typing delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Thank you for sharing. A certified systems administrator has been assigned to your query and will reach out via the inquiry form below shortly!";
      
      const lower = userMsg.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
        replyText = "Our hardware catalog and subscription licensing are listed in Kenyan Shillings (KSH) in our IT Shop on this page! You can add items directly to your cart and initiate a checkout proposal instantly.";
      } else if (lower.includes("emergency") || lower.includes("broken") || lower.includes("down") || lower.includes("fail")) {
        replyText = "CRITICAL ADVISORY: For system down anomalies, please complete our Diagnostics scan above. It will formulate an emergency patch rating and pre-fill our dispatch queue.";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        replyText = "Hello! I am ready to guide you. Are you looking to procure high-reliability servers, set up network cabling, migrate database clusters, or maintain cold room cooling?";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: replyText, time: "Just now" },
      ]);
    }, 1800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[450px] mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-teal-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center text-lg shadow-inner relative">
                  🦢
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider">Joan (Support Agent)</h4>
                  <p className="text-[10px] text-teal-300 font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Zentricore Tech Support
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg, idx) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? "bg-teal-600 text-white rounded-tr-none shadow-md"
                          : "bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm font-medium"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1 text-right ${
                          isUser ? "text-teal-200" : "text-slate-400"
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-400 border border-slate-100 rounded-2xl rounded-tl-none p-3 text-xs flex items-center gap-1 shadow-sm font-medium">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer Form */}
            <div className="p-3 border-t border-slate-100 bg-white flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type your message and press Send..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400 text-slate-800 font-medium"
              />
              <button
                onClick={handleSend}
                className="p-2.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white transition-colors shadow-md active:translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-900 to-teal-900 hover:from-slate-850 hover:to-teal-850 text-white flex items-center justify-center shadow-xl shadow-teal-950/20 active:translate-y-0.5 transition-transform border border-teal-500/20 relative"
        id="floating-chat-trigger"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>
    </div>
  );
}
