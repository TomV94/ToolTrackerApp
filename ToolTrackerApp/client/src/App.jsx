import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tools" className="nav-link">Tools</Link>
          <Link to="/users" className="nav-link">Users</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<div>Tools Page (Coming Soon)</div>} />
          <Route path="/users" element={<div>Users Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
