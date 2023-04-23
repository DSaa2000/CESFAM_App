import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email} Password: ${password}`);
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="login-logo">¡Bienvenido!</h1>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="login-form-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="login-form-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="login-form-button">Entrar</button>
          <div className="login-or-divider">
          </div>
          <a href="/" className="login-forgot-password-link">¿Olvido su contraseña?</a>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;