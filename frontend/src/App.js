import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; // Import Dashboard
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true); // To toggle between Login and Register forms
  const [showDashboard, setShowDashboard] = useState(false); // To show Dashboard view
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // Optionally: setShowDashboard(true); // if you want to default to dashboard if logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setShowDashboard(false);
    setShowLogin(true); // Default to login view after logout
  };

  // This function could be passed to Login component to update App's state after successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowDashboard(true); // Navigate to dashboard after login
  };

  const navigateToDashboard = () => {
    setShowDashboard(true);
    setShowLogin(false); // Ensure login/register forms are hidden
  }

  const navigateToAuth = (isLoginView) => {
    setShowDashboard(false);
    setShowLogin(isLoginView);
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema AHQ</h1>
        <nav>
          {isLoggedIn ? (
            <>
              <button onClick={navigateToDashboard} className={showDashboard ? 'active' : ''}>Dashboard</button>
              {/* You might want a separate button to go back to profile or other logged-in views if dashboard isn't the only one */}
              {/* For now, let's assume clicking Dashboard button again or other nav would hide it if needed */}
              {/* Or, if Dashboard is the main view after login, this button might not be needed, or could be "Home" */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigateToAuth(true)} className={showLogin && !showDashboard ? 'active' : ''}>Login</button>
              <button onClick={() => navigateToAuth(false)} className={!showLogin && !showDashboard ? 'active' : ''}>Registrar</button>
            </>
          )}
        </nav>
      </header>
      <main>
        {isLoggedIn && showDashboard ? (
          <Dashboard />
        ) : isLoggedIn && !showDashboard ? (
          // Default view for logged-in users if not showing dashboard (e.g. a welcome message or profile page)
          // For now, let's make the Dashboard the primary view after login.
          // We can assume handleLoginSuccess will set showDashboard to true.
          // If user navigates away from dashboard while logged in, what to show?
          // For this iteration, clicking "Dashboard" button is the way to see it.
          // Let's display a placeholder if logged in but not on dashboard.
           <div className="form-container"><p>Bem-vindo! Clique em Dashboard para ver as métricas.</p></div>
        ) : showLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} /> // Pass callback
        ) : (
          <Register />
        )}
      </main>
    </div>
  );
}

export default App;
