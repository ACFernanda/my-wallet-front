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
          <Route path="/" element={<LoginPage setUser={setUser} />}></Route>
          <Route path="/cadastro" element={<SignUpPage />}></Route>
          <Route path="/menu" element={<Homepage setUser={setUser} />}></Route>
          <Route path="/newInput" element={<NewInput />}></Route>
          <Route path="/newOutput" element={<NewOutput />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
