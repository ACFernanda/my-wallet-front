import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "./../Contexts/UserContext.js";

export default function NewInput() {
  const { token } = useContext(UserContext);
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function registerTransaction(event) {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      `https://driven-mywallet-back.herokuapp.com/transactions`,
      {
        value: Number(value),
        description,
        type: "input",
      },
      config
    );

    promise.then((response) => {
      console.log(response.data);
      navigate("/menu");
    });
    promise.catch((err) => {
      console.log(err.response);
      alert("Erro! :( Tente novamente.");
    });
  }

  return (
    <Container>
      <header>Nova entrada</header>

      <form onSubmit={registerTransaction}>
        <input
          required
          type="number"
          min="0.01"
          max="99999999.00"
          step="0.01"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Salvar entrada</button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  header {
    font-weight: 700;
    font-size: 32px;
    color: white;
    width: 85%;
    padding: 30px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 80%;
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
    width: 80%;
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
