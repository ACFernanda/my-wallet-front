import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import GlobalStyle from "./GlobalStyle";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Homepage from "./Homepage";
import NewInput from "./NewInput";
import NewOutput from "./NewOutput";

import UserContext from "./../Contexts/UserContext.js";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/cadastro" element={<SignUpPage />}></Route>
          <Route path="/menu" element={<Homepage />}></Route>
          <Route path="/NewInput" element={<NewInput />}></Route>
          <Route path="/NewOutput" element={<NewOutput />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
