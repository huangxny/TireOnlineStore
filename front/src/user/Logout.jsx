import { useContext } from "react";
import UserContext from "./UserContext.jsx";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setEmail } = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    fetch("/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setEmail("");
      navigate("/");
    });
  }
  // Code Reviewer: consider disabling the button
  // if not loogged in or changing the text to log if not logged in 
  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
