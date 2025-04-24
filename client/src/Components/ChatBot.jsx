import { useState } from 'react';
import './ChatBot.css';

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="chat-popup">
          <div className="chat-header">AuraHP Assistant</div>
          <div className="chat-body">
            <div className="chat-message bot-message">How can I help you today?</div>
          </div>
          <div className="chat-footer">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}

      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        <span className="chat-icon">💬</span>
        <span className="chat-label">Messaging</span>
        <span className="chat-arrow">{open ? '▼' : '▲'}</span>
      </div>
    </>
  );
}
