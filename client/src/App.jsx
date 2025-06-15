import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000/api';

function App() {
  const [tools, setTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toolsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/tools`),
        fetch(`${API_URL}/users`)
      ]);
      
      const toolsData = await toolsRes.json();
      const usersData = await usersRes.json();
      
      setTools(toolsData);
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedTool || !selectedUser) return;
    
    try {
      const response = await fetch(`${API_URL}/tools/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool_id: selectedTool,
          user_id: selectedUser,
        }),
      });
      
      if (response.ok) {
        await fetchData();
        setSelectedTool(null);
        setSelectedUser(null);
      }
    } catch (err) {
      setError('Failed to checkout tool');
    }
  };

  const handleCheckin = async () => {
    if (!selectedTool || !selectedUser) return;
    
    try {
      const response = await fetch(`${API_URL}/tools/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool_id: selectedTool,
          user_id: selectedUser,
        }),
      });
      
      if (response.ok) {
        await fetchData();
        setSelectedTool(null);
        setSelectedUser(null);
      }
    } catch (err) {
      setError('Failed to checkin tool');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app-container">
      <header>
        <h1>Tool Tracker</h1>
      </header>

      <main>
        <section className="tools-section">
          <h2>Tools</h2>
          <div className="tools-grid">
            {tools.map(tool => (
              <div 
                key={tool.id} 
                className={`tool-card ${tool.status} ${selectedTool === tool.id ? 'selected' : ''}`}
                onClick={() => setSelectedTool(tool.id)}
              >
                <h3>{tool.description}</h3>
                <p>ID: {tool.id}</p>
                <p>Status: {tool.status}</p>
                <p>Location: {tool.location}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="users-section">
          <h2>Users</h2>
          <div className="users-grid">
            {users.map(user => (
              <div 
                key={user.id} 
                className={`user-card ${selectedUser === user.id ? 'selected' : ''}`}
                onClick={() => setSelectedUser(user.id)}
              >
                <h3>{user.name}</h3>
                <p>ID: {user.id}</p>
                <p>Role: {user.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="actions-section">
          <h2>Actions</h2>
          <div className="action-buttons">
            <button 
              onClick={handleCheckout}
              disabled={!selectedTool || !selectedUser}
              className="checkout-btn"
            >
              Check Out Tool
            </button>
            <button 
              onClick={handleCheckin}
              disabled={!selectedTool || !selectedUser}
              className="checkin-btn"
            >
              Check In Tool
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App
