import React from "react";
import {
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaPen,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import endPoints from "../config/endPoints";
import { useNavigate } from "react-router-dom";

export default function Glossary() {
  const [state, setState] = React.useState({
    isUpdate: false,
    todo: "",
    isDone: false,
  });

  const token = localStorage.getItem("token");
  const [todoList, setTodoList] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const navigate = useNavigate();

  const getTodoList = () => {
    if (!token) {
      navigate("/");
    } else {
      axios.post(endPoints.findTodo, { token }).then((r) => {
        setTodoList(r.data.results ? r.data.results : []);
      });
    }
  };

  const handleEdit = (data) => {
    setState({
      isUpdate: true,
      todo: data.todo,
      todo_id: data._id,
      isDone: data.isDone,
    });
  };

  const handleDelete = (data) => {
    axios
      .delete(endPoints.deleteTodo, {
        headers: {
          Authorization: token,
        },
        data: {
          todo_id: data._id,
          token,
        },
      })
      .then((r) => setTodoList(todoList.filter((gl) => gl._id !== data._id)));
  };

  React.useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div
      style={{
        padding: "50px 40px",
      }}
    >
      <button
        onClick={(e) => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        style={{
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <FaArrowAltCircleLeft /> Logout
      </button>
      <form
        className="container2"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h3 id="logo">Todo List</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: 50,
            width: "100%",
            gap: 10,
          }}
        >
          <input
            type="text"
            id="Todo"
            name="Todo"
            placeholder="Write a new todo.."
            autocomplete="off"
            required
            value={state.todo}
            onChange={(e) =>
              setState({
                ...state,
                todo: e.target.value,
              })
            }
          />

          {state.isUpdate ? (
            <button
              style={{
                background: "#000",
                borderColor: "#000",
              }}
              type="submit"
              name="submit"
              onClick={(e) => {
                axios
                  .patch(endPoints.updateTodo, {
                    ...state,
                    token,
                  })
                  .then((r) => {
                    getTodoList();
                    setState({
                      isUpdate: false,
                      todo: "",
                      isDone: false,
                    });
                  });
              }}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              name="submit"
              onClick={(e) => {
                axios
                  .post(endPoints.createTodo, { ...state, token })
                  .then((r) => {
                    setTodoList([...todoList, r.data.results]);
                    setState({
                      isUpdate: false,
                      todo: "",
                      isDone: false,
                    });
                  });
              }}
            >
              Add
            </button>
          )}
        </div>
      </form>
      <input
        style={{}}
        placeholder="Filter Todo"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table class="content-table">
        <thead>
          <tr>
            <th>Todo</th>
            <th align="right">Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList
            .filter((d) => d.todo.toLowerCase().includes(filter.toLowerCase()))
            .sort((a, b) => a.todo.localeCompare(b.todo))
            .map((bo, idx) => (
              <tr className={idx % 2 === 0 ? "" : "active-row"} key={idx}>
                <td style={{ textDecoration: bo.isDone ? "line-through" : "" }}>
                  {bo.todo}
                </td>
                <td align="end">
                  <span
                    style={{
                      display: "flex",
                      gap: 15,
                      fontSize: "1.2rem",
                      color: "#000",
                      float: "right",
                    }}
                  >
                    <FaCheckCircle
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        axios
                          .patch(endPoints.updateTodo, {
                            todo_id: bo._id,
                            isDone: true,
                            token,
                          })
                          .then((r) => {
                            getTodoList();
                            setState({
                              isUpdate: false,
                              todo: "",
                              isDone: false,
                            });
                            alert("Todo Checked!");
                          });
                      }}
                    />
                    <FaPen
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit(bo)}
                    />
                    <FaTrash
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(bo)}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
