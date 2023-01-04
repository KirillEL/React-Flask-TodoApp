import React from "react";
import TodoLST from "../TodoLST";
import './Main.css';
function MainComponent({st, theme = {}, todo, todos, setTodo }) {
  return (
    <div className="container">
      <input
        type="text"
        name="todo_input"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        onKeyUp={async (event) => {
          if (event.key === "Enter") {
            if (todo !== "") {
              await fetch("/", {
                method: "POST",
                body: JSON.stringify(todo),
                header: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
            }
            window.location.reload(false);
          }
        }}
        className={'App__input-' + (st===0 ? '0' : '1')}
        placeholder="Enter the Task"
      />
      <button
        onClick={async () => {
          if (todo !== "") {
            await fetch("/", {
              method: "POST",
              body: JSON.stringify(todo),
              header: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            });
          }
          window.location.reload(false);
        }}
        type="submit"
        className="App__btn"
        style={!st ? { backgroundColor: "black" } : { backgroundColor: theme[0].btn_color}}
      >
        Add Task
      </button>
      <TodoLST st={st} todos={todos} />
    </div>
  );
}

export default MainComponent;
