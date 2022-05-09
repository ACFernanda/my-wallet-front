import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    const promise = axios.post(
      "https://driven-mywallet-back.herokuapp.com/sign-in",
      {
        email: email,
        password: password,
      }
    );

    promise.then((response) => {
      setUser(response.data);
      navigate("/menu");
    });
    promise.catch((err) => {
      console.log(err.response);
      alert("Erro! :( Tente novamente.");
    });
  }

  return (
    <Container>
      <header>My Wallet</header>

      <form onSubmit={login}>
        <input
          required
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  header {
    font-family: "Saira Stencil One", cursive;
    font-size: 32px;
    color: white;
    margin-bottom: 24px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    width: 100%;
    height: 45px;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 19.976px;
    line-height: 25px;
    color: ##666666;
    margin-bottom: 6px;
  }
  input:placeholder {
    color: #dbdbdb;
  }
  input:disabled {
    background-color: #f2f2f2;
  }
  button {
    width: 100%;
    height: 45px;
    background: #a328d6;
    border: none;
    border-radius: 5px;
    font-size: 20.976px;
    font-weight: 700;
    line-height: 26px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    font-size: 15px;
    font-weight: 700;
    line-height: 17px;
    text-align: center;
    text-decoration-line: none;
    color: #ffffff;
    margin-top: 25px;
  }
`;
