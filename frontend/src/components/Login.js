import React, { useState } from 'react';
import axios from 'axios'; // Importe o axios

function Login({ onLoginSuccess }) { // Accept onLoginSuccess as a prop
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Para feedback ao usuário
  const [messageType, setMessageType] = useState(''); // New state
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessageType(''); // Reset message type
    setMessage(''); // Reset message
    setIsLoading(true); // Set loading true
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username, password });
      const token = response.data.token; // Assuming token is in response.data.token
      if (token) {
        localStorage.setItem('authToken', token);
        setMessage('Login bem-sucedido! Autenticando...');
        setMessageType('success'); // Set message type
        console.log('Token stored:', token);
        if (onLoginSuccess) { // Call the callback
          onLoginSuccess();
        }
      } else {
        setMessage('Falha no login: Token não recebido.');
        setMessageType('error'); // Set message type
        console.error('Token not found in response:', response.data);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Falha no login';
      setMessage(`Falha no login: ${errorMessage}`);
      setMessageType('error'); // Set message type
      console.error('Erro no login:', errorMessage);
    } finally {
      setIsLoading(false); // Set loading false in finally block
    }
  };

  return (
    <div className="form-container"> {/* Added form-container */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Added form-group */}
          <label>Usuário:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading} /> {/* Optionally disable inputs too */}
        </div>
        <div className="form-group"> {/* Added form-group */}
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} /> {/* Optionally disable inputs too */}
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}

export default Login;
