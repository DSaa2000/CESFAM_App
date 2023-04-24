import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './LoginForm.css';
import { Grid } from '@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email} Password: ${password}`);
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
    navigate("/medicamentos");
  };

  return (
    <Grid container sx={{
      justifyContent: "center",
      backgroundImage: "url('https://images.unsplash.com/photo-1586773860363-8ec8703e6aa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=826&q=80')",
      backgroundRepeat: "none",
      backgroundSize: "cover"
    }}>
      <Grid item xs={12} sm={8} lg={6}>

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
      </Grid>
    </Grid>
  );
}

export default LoginForm;