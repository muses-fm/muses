import { useState } from "react";
import { render } from "react-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";

import { muses_react } from "../../declarations/muses_react";

const MyHello = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function doGreet() {
    const greeting = await muses_react.greet(name);
    setMessage(greeting);
  }

  return (
    <>
      <CssBaseline />
      <div style={{ fontSize: "30px" }}>
        <div style={{ backgroundColor: "yellow" }}>
          <p>Greetings, from DFINITY!</p>
          <p>
            {" "}
            Type your message in the Name input field, then click <b> Get Greeting</b> to display the result.
          </p>
        </div>
        <div style={{ margin: "30px" }}>
          <input id="name" value={name} onChange={(ev) => setName(ev.target.value)}></input>
          <Button onClick={doGreet}>Get Greeting!</Button>
        </div>
        <div>
          Greeting is: "<span style={{ color: "blue" }}>{message}</span>"
        </div>
      </div>
    </>
  );
};

render(<MyHello />, document.getElementById("app"));
