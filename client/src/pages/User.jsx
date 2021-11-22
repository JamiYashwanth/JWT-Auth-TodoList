import { useState, useEffect } from "react";
import axios from "axios";

function User() {
  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  useEffect(async () => {
    const token = localStorage.getItem("x-access-token");
    const res = await axios.get("http://localhost:5000/api/todo", {
      headers: {
        token: token,
      },
    });
    setList(res.data.list);
  }, [list]);

  async function handleSubmit(e) {
    e.preventDefault();
    const item = {
      title: title,
      time: time,
    };
    const token = localStorage.getItem("x-access-token");
    await axios.post("http://localhost:5000/api/add", item, {
      headers: {
        token: token,
      },
    });
    setTitle("");
    setTime("");
  }

  async function deleteTodo(id) {
    const token = localStorage.getItem("x-access-token");
    await axios.delete("http://localhost:5000/api/deleteTodo", {
      headers: {
        token: token,
      },
      data: {
        id: id,
      },
    });
  }

  return (
    <div>
      <h1>TODO-LIST</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Push-ups"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="7 AM"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button>ADD</button>
      </form>
      <div className="display">
        {list.length !== 0 ? (
          list.map((item) => (
            <div className="card" key={item._id}>
              <h3>
                Title : {item.title} | Time : {item.time}
              </h3>
              <button className="delete" onClick={() => deleteTodo(item._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1>No Activities</h1>
        )}
      </div>
    </div>
  );
}

export default User;
