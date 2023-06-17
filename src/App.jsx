import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./views/signIn/signIn";
import SignUp from "./views/signUp/signUp";
import CartProvider from "./store/CartContext/CartContext";
import Home from "./views/Home/Home";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
