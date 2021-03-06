import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "./../Contexts/UserContext.js";

import styled from "styled-components";

export default function Homepage({ setUser }) {
  const { token, username } = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://driven-mywallet-back.herokuapp.com/transactions`,
      config
    );

    promise.then((response) => {
      console.log(response.data);
      setTransactions(response.data);
    });

    promise.catch((err) => {
      console.log(err.response);
    });
  }, []);

  let total = 0;
  function calculateTotal() {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "input") {
        total += transactions[i].value;
      } else {
        total -= transactions[i].value;
      }
    }
    return total;
  }
  let balance = calculateTotal(transactions);

  function logout(setUser) {
    setUser(null);
    navigate("/");
  }

  return (
    <Container>
      <header>Olá, {username}</header>
      <ion-icon
        onClick={() => logout(setUser)}
        name="log-out-outline"
      ></ion-icon>
      <TransactionsContainer>
        {transactions.length > 0 ? (
          transactions.map(({ value, description, type, day }) => {
            return (
              <>
                <transaction className={type}>
                  <day>{day}</day>
                  <description>{description}</description>
                  <value>{value.toString().replace(".", ",")}</value>
                </transaction>
              </>
            );
          })
        ) : (
          <p className="noTransactions">
            Não há registros de <br></br> entrada ou saída
          </p>
        )}
        {transactions.length > 0 ? (
          <>
            <span>SALDO</span>
            <p className={balance >= 0 ? "green" : "red"}>
              {balance.toString().replace(".", ",")}
            </p>
          </>
        ) : (
          <></>
        )}
      </TransactionsContainer>

      <AddTransactionContainer>
        <button onClick={() => navigate("/newInput")}>
          <p>Nova entrada</p>
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
        <button onClick={() => navigate("/newOutput")}>
          <p>Nova saída</p>
          <ion-icon name="remove-circle-outline"></ion-icon>
        </button>
      </AddTransactionContainer>
    </Container>
  );
}

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  background-color: #8c11be;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 25px;
  header {
    width: 85%;
    font-size: 26px;
    font-weight: 700;
    color: white;
    margin-bottom: 22px;
    position: relative;
  }
  ion-icon {
    position: absolute;
    right: 20px;
    top: 23px;
    font-size: 30px;
    color: white;
  }
`;

const TransactionsContainer = styled.div`
  width: 85%;
  height: 70%;
  background-color: white;
  border-radius: 5px;
  padding-top: 10px;
  position: relative;
  transaction.input {
    color: #03ac00;
  }
  transaction.output {
    color: #c70000;
  }
  transaction {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    day {
      color: #c6c6c6;
      width: 18%;
      margin-left: 5px;
    }
    description {
      color: #000000;
      width: 58%;
    }
    value {
      width: 20%;
      text-align: right;
    }
  }
  span {
    position: absolute;
    bottom: 12px;
    left: 10px;
    font-weight: 700;
    font-size: 18px;
  }
  p {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-weight: 400;
    font-size: 18px;
  }
  p.green {
    color: #03ac00;
  }
  p.red {
    color: #c70000;
  }
  p.noTransactions {
    color: #868686;
    font-size: 20px;
    text-align: center;
    top: 40%;
    right: 50px;
    left: 50px;
  }
`;

const AddTransactionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  button {
    width: 150px;
    height: 114px;
    border: none;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    background-color: #a328d6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    position: relative;
    p {
      position: absolute;
      bottom: 5px;
      left: 8px;
      width: 10px;
    }
    ion-icon {
      position: absolute;
      top: 5px;
      left: 6px;
      font-size: 28px;
    }
  }
`;
