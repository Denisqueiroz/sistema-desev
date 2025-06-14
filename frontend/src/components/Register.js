import React, { useState } from 'react';
import axios from 'axios'; // Importe o axios

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // New state variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    // Construct the payload with all fields
    const payload = {
      username,
      password,
      fullName,
      email,
      phoneNumber,
      dateOfBirth: dateOfBirth || null, // Send null if date is empty, backend expects LocalDate
      gender
    };

    try {
      // Ensure the backend URL is correct (already set to absolute path previously)
      const response = await axios.post('http://localhost:8080/auth/register', payload);
      setMessage(response.data.message || 'Registro bem-sucedido!'); // Use message from backend
      setMessageType('success');
      // Clear form on success (optional, but good UX)
      setUsername('');
      setPassword('');
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setDateOfBirth('');
      setGender('');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Falha no registro';
      setMessage(`Falha no registro: ${errorMessage}`);
      setMessageType('error');
      console.error('Erro no registro:', errorMessage);
    } finally {
      setIsLoading(false); // Set loading false in finally block
    }
  };

  return (
    <div className="form-container"> {/* Added form-container */}
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group"> {/* Added form-group */}
          <label>Usuário:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading} />
        </div>
        <div className="form-group"> {/* Added form-group */}
          <label>Senha:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
        </div>
        {/* New input fields */}
        <div className="form-group">
          <label>Nome Completo:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={isLoading} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
        </div>
        <div className="form-group">
          <label>Telefone: (Opcional)</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={isLoading} />
        </div>
        <div className="form-group">
          <label>Data de Nascimento: (Opcional)</label>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} disabled={isLoading} />
        </div>
        <div className="form-group">
          <label>Gênero: (Opcional)</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Ex: Masculino, Feminino, Outro" disabled={isLoading} />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </div>
  );
}

export default Register;
