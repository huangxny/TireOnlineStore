import {useState, useEffect} from 'react'
import {BrowserRouter, Routes, Link, Route} from "react-router-dom";
import Register from "./user/Register.jsx";
import Login from "./user/Login.jsx";
import Logout from "./user/Logout.jsx";
import UserContext from "./user/UserContext.jsx";
import ProductDisplay from "./product/ProductDisplay.jsx";
import CartPage from "./Cart/CartPage.jsx";
import './style/App.css'

function App() {
  const [email, setEmail] = useState('')
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch('/user', {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    })
      .then(async (res) => {
        const data = await res.json();
        setEmail(data.user.email);
        setCart(data.user.cart);
      })
      .catch(() => {
        setEmail('');
      });
  }, []);

  return (
    <UserContext.Provider value={{email, setEmail}}>
      <BrowserRouter>
        <div>
          {!!email && (<div>Logged in as {email}</div>)}
          {!email && (<div>Not logged in</div>)}
        </div>
        <Logout/>
        <hr/>
        <div>
          <Link to={"/"}>Home</Link> <br/>
          <Link to={"/login"}>Login</Link> <br/>
          <Link to={"/register"}>Register</Link> <br/>
          <Link to={"/cart"}>Cart</Link> <br/>
        </div>
        <hr/>
        <Routes>
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/cart"} element={<CartPage cart={cart} setCart={setCart} email={email}/>}/>
        </Routes>
        <ProductDisplay cart={cart} setCart={setCart} email={email}/>
      </BrowserRouter>
    </UserContext.Provider>

  )
}

export default App
