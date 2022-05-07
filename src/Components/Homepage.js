import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "./../Contexts/UserContext.js";

import styled from "styled-components";

export default function Homepage() {
  const user = useContext(UserContext);
  const [transactions, setTransactions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };

    const promise = axios.get(`http://localhost:5000/transactions`, config);

    promise.then((response) => {
      console.log(response.data);
      setTransactions(response.data);
    });

    promise.catch((err) => {
      console.log(err.response);
    });
  }, []);

  return "Homepage";
}
