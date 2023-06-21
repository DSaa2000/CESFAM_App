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
    //const data = { query: "query getUsuarios{}" };
    //fetch("http://localhost:8090/graphql?query=query getUsuario($rut: String){getUsuario(rut: $rut){correo} }&rut=String2").then(response=>response.json().then(data=>console.log(data)));
    const data = {
      "query": "query GetUsuario ($rut: String) {getUsuario(rut: $rut){contrasena}}",
      "operationName": "GetUsuario",
      "variables":   { "rut": email}
    }
    fetch("http://localhost:8090/graphql", {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data)
    }).then(response=>response.json()).then(data=>{
      if(password===data.data.getUsuario.contrasena){
        navigate("/medicamentos");
      }
    });
    // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al servidor
    
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
                  type="text"
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