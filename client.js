const WebSocket = require("ws");
const readline = require("readline");

const connectToServer = ({ url }) => {
  const ws = new WebSocket(url);

  ws.on("open", () => {
    console.log(`Connected to server at ${url}`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (line) => {
      ws.send(line);
    })    
  });

  ws.on("message", (message) => {
    console.log("> ", message.toString());
  });

  ws.on("close", () => {
    console.log("Connection closed");
    process.exit(0);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error: ", error);
    process.exit(1);
  });
};

module.exports = { connectToServer }