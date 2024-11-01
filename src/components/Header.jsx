// Header.js
import { useContext } from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success(data.Message);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h1>Todo App</h1>
      </div>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {isAuthenticated ? (
              <Link disabled={loading} onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/SignIn">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
