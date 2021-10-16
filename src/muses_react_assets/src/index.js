import { muses_react } from "../../declarations/muses_react";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with muses_react actor, calling the greet method
  const greeting = await muses_react.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
