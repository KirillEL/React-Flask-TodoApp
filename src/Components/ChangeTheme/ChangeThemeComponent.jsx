import React, { useState } from "react";
import Button from "@mui/material/Button";
import AssistantIcon from "@mui/icons-material/Assistant";
import "./ChangeTheme.css";

function ChangeThemeComponent({ theme, setTheme }) {
  
  const [t, setT] = useState(1);

  return (
    <div className="changeTheme__container">
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          if (t) {
            fetch("/change_theme")
              .then((res) => res.json())
              .then((data) => {
                setTheme(data);
              });
              setT(!t);
          } else {
            setT(!t);
          }
        }}
      >
        Theme <AssistantIcon />
      </Button>
    </div>
  );
}

export default ChangeThemeComponent;
