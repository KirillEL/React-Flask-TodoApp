import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
function TodoLST({st, todos }) {
  return (
    <div className="todos">
      {todos.map((todo) => {
        return (
          <div
            className={todo.ischecked ? "todo_item_checked" : "todo__item"}
            key={todo.id}
            style={!st ? { color: "black" } : { color: "white" }}
          >
            <Checkbox
              checked={todo.ischecked}
              onClick={async () => {
                await fetch(`/todo/update/${todo.id}`, {
                  method: "PUT",
                  header: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });
                window.location.reload(false);
              }}
              color="success"
              style={!st ? { borderColor: "black" } : { borderColor: "white" }}
            />
            {todo.todo_title}
            <button
              onClick={async () => {
                await fetch(`/todo/${todo.id}`, {
                  method: "DELETE",
                  header: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });
                window.location.reload(false);
              }}
              className="todo__item-btn"
              style={!st ? { color: "black" } : { color: "white" }}
            >
              <BsFillTrashFill className="item_trash" size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TodoLST;
