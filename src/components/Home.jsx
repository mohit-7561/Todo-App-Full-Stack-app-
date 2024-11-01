import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/myTask`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.task);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to={"/SignIn"} />;

  return (
    <div className="task-manager">
      <h2>Add a New Task</h2>
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button disabled={loading} type="submit">
          Add Task
        </button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => handleUpdate(task._id)}
              className="task-info"
              key={tasks._id}
            />
            <button
              onClick={() => handleDelete(task._id)}
              className="delete-button"
              key={tasks._id}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
