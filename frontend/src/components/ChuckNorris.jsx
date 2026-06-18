import React, { useState, useEffect } from 'react';

const ChuckNorris = ({ token, setToken }) => {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the fact using the token
  const getFact = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3333/fact', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFact(data.fact);
      } else {
        setFact("Oof, couldn't grab a fact right now.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFact("Backend is acting up bestie.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFact();
  }, [token]);

  // BONUS: Logout function
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
    } catch (error) {
      console.error("Failed to hit logout endpoint:", error);
    } finally {
      if (setToken) {
        setToken(null); 
      }
    }
  };

  return (
    <div className="fact-container dark-mode-vibe">
      <h2>Chuck Norris Facts 🥋</h2>
      
      <div className="fact-display">
        {/* BONUS: Loading Spinner */}
        {isLoading ? (
          <p className="loading-spinner">Loading fact... ⏳</p>
        ) : (
          <p className="fact-text">"{fact}"</p>
        )}
      </div>

      <div className="button-group">
        <button onClick={getFact} disabled={isLoading} className="btn-primary">
          Get Another Fact
        </button>
        <button onClick={handleLogout} className="btn-secondary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ChuckNorris;