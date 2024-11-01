import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Context, server } from "../main";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { isAuthenticated, user, setUser, loading } = useContext(Context);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${server}/users/myProfile`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserProfile();
  }, [setUser]);

  if (!isAuthenticated) return <Navigate to={"/SignIn"} />;

  if (isLoading) return <Loader />;

  return (
    <div className="user-card">
      <h2 className="user-name">{user?.name}</h2>
      <p className="user-email">{user?.email}</p>
    </div>
  );
};

export default Profile;
