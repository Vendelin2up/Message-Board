import React, { useState, useEffect } from 'react';
import { getMessages, postMessage, updateMessage } from './api.js'; // Lägg till getMessagesByUser
import './App.css';  // Importera din CSS-fil

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ username: '', text: '' });
  const [editingMessage, setEditingMessage] = useState(null);  // Vilket meddelande som redigeras
  const [editText, setEditText] = useState('');  // Text för det redigerade meddelandet
  // const [searchUsername, setSearchUsername] = useState('');  // Sökfält för användarnamn

  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    fetchMessages();
  }, []);

  // Hantera förändringar i formulärfält
  const handleChange = (e) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value,
    });
  };

  // Hantera att skapa nytt meddelande
  const handleSubmit = async (e) => {
    e.preventDefault();
    await postMessage(newMessage);
    setNewMessage({ username: '', text: '' });
    const data = await getMessages();
    setMessages(data);
  };

  // Hantera att spara ett redigerat meddelande
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    await updateMessage(id, { text: editText });  // Skicka den uppdaterade texten
    setEditingMessage(null);  // Avsluta redigeringsläget
    setEditText('');  // Töm texten
    const data = await getMessages();
    setMessages(data);
  };

  // Hantera redigering av ett meddelande
  const handleEditClick = (message) => {
    setEditingMessage(message.id);  // Sätt meddelandet i redigeringsläge
    setEditText(message.text);  // Fyll textfältet med det befintliga meddelandet
  };

  // // Hantera sök efter användarnamn
  // const handleSearchSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (searchUsername) {
  //       const data = await getMessagesByUser(searchUsername);  // Hämta meddelanden för specifik användare
  //       setMessages(data);
  //     } else {
  //       const data = await getMessages();  // Om inget användarnamn anges, hämta alla meddelanden
  //       setMessages(data);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching messages for user:', error);
  //   }
  // };

  return (
    <div>
      <h1>Message Board</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={newMessage.username}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
        <textarea
          name="text"
          value={newMessage.text}
          onChange={handleChange}
          placeholder="Your message"
          required
        />
        <button type="submit">Post Message</button>
      </form>
{/* 
      Sökfält för att hämta meddelanden för en specifik användare
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          placeholder="Search by username"
        />
        <button type="submit">Search</button>
      </form> */}

      <h2>All Messages</h2>
      <div className="board">
        {messages.map((message) => (
          <div key={message.id} className="post-it">
            <strong>{message.username}</strong>
            {editingMessage === message.id ? (
              // Visar redigeringsformulär när vi redigerar ett meddelande
              <form onSubmit={(e) => handleUpdateSubmit(e, message.id)}>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  required
                  style={{ width: '100%', height: '80px' }}
                />
                <button type="button" className="cancel-btn" onClick={() => setEditingMessage(null)}>Cancel</button>
                <button type="submit" className="save-btn">Save</button>
              </form>
            ) : (
              <>
                {message.text}  {/* Vanligt meddelande */}
                <em>{new Date(message.createdAt).toLocaleString()}</em>
                <button onClick={() => handleEditClick(message)}>Edit</button>  {/* Edit-knappen */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
