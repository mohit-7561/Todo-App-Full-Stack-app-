// SignIn.js
import React, { useContext, useState } from "react";
import "./SignIn.css";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    console.log("Server URL:", `${server}/users/login`);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  if (isAuthenticated) return <Navigate to={"/"}></Navigate>;

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} type="submit">
          Sign In
        </button>
        <Link to={"/signup"} className="sign-up-link">
          Sign UP
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
