import React, { useState, useEffect } from 'react';

const ChuckNorris = ({ token, setToken }) => {
  const [fact, setFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getFact = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3333/fact', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      {/*BONUS: Loading Spinner */ }
      await new Promise(resolve => setTimeout(resolve, 1000));
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

  {/*BONUS: Logout */ }
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3333/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Failed to hit logout endpoint:", error);
    } finally {
      if (setToken) {
        setToken("");
      }
    }
  };

  return (
    <div className="chuck-page">
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <h1 className="chuck-title">
        🥋 Chuck Norris Facts 🥋
      </h1>

      <div className="fact-card">
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading fact...</p>
          </div>
        ) : (
          <p className="fact-text">"{fact}"</p>
        )}

        <button
          onClick={getFact}
          disabled={isLoading}
          className="fact-btn"
        >
          Get Another Fact
        </button>
      </div>
    </div>
  );
};

export default ChuckNorris;