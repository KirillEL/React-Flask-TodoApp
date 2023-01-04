import "./App.css";
import React, { useState, useEffect } from "react";
import MainComponent from "./Components/MainComponent/MainComponent";
import ChangeThemeComponent from "./Components/ChangeTheme/ChangeThemeComponent";


/* 
TODO: save theme after update (PUT theme ISSET -> boolean)
*/

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [theme, setTheme] = useState([{}]);
  

  useEffect(() => {
    fetch("/get_list")
      .then((res) => res.json())
      .then((data) => setTodos(data));

  }, []);

  if (theme[0].id === undefined) {
    return (
      <div className="main__app">
        <ChangeThemeComponent theme={theme} setTheme={setTheme} />
        <div className="App">
          <div className="App__container">
            <h2 className="App__title">Todo App (React Flask PostgreSQL)</h2>
            <MainComponent st={0} todo={todo} todos={todos} setTodo={setTodo} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="main__app"
        style={{ backgroundColor: theme[0].background_color }}
      >
        <ChangeThemeComponent theme={theme} setTheme={setTheme} />
        <div className="App">
          <div className="App__container">
            <h2 className="App__title" style={{ color: theme[0].h1_color }}>
              Todo App (React Flask PostgreSQL)
            </h2>
            <MainComponent
              st={1}
              theme={theme}
              todo={todo}
              todos={todos}
              setTodo={setTodo}
            />
          </div>
        </div>
      </div>
    );
  }
}
