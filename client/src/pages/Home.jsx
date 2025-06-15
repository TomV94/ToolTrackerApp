import { useState } from 'react';
import BarcodeScanner from '../components/BarcodeScanner';
import CheckedOutTools from '../components/CheckedOutTools';
import '../styles/BarcodeScanner.css';
import '../styles/Home.css';

function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [error, setError] = useState(null);

  const handleScanSuccess = (decodedText) => {
    setScannedCode(decodedText);
    setError(null);
    // Here you can add logic to handle the scanned barcode
    // For example, search for a tool with this barcode
    console.log('Scanned barcode:', decodedText);
  };

  const handleScanError = (err) => {
    setError('Error scanning barcode. Please try again.');
    console.error('Scan error:', err);
  };

  return (
    <div className="home-container">
      <h1>Tool Tracker</h1>
      
      <div className="scanner-section">
        <h2>Tool Scanner</h2>
        {!showScanner ? (
          <button 
            className="scan-button"
            onClick={() => setShowScanner(true)}
          >
            Open Scanner
          </button>
        ) : (
          <>
            <BarcodeScanner
              onScanSuccess={handleScanSuccess}
              onScanError={handleScanError}
            />
            <button 
              className="close-scanner-button"
              onClick={() => setShowScanner(false)}
            >
              Close Scanner
            </button>
          </>
        )}
        
        {scannedCode && (
          <div className="scan-result">
            <p>Scanned Code: {scannedCode}</p>
            <button onClick={() => setScannedCode(null)}>Clear</button>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}
      </div>

      <CheckedOutTools />

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">Add New Tool</button>
          <button className="action-button">View All Tools</button>
          <button className="action-button">Check Out Tool</button>
          <button className="action-button">Return Tool</button>
        </div>
      </div>
    </div>
  );
}

export default Home; 