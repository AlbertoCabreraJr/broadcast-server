const WebSocket = require("ws");

let clients = [];

modules.exports.startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 }, () => {
    console.log("WebSocket server started on port 8080");
  });

  wss.on("connection", (ws) => {
    clients.push(ws);
    console.log("New client connected. Total clients: ", clients.length);

    wss.on("message", (message) => {});

    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected. Total clients: ", clients.length);
    });
  });

  process.on("SIGINT", () => {
    console.log("Server is shutting down...");
    wss.close();
    process.exit(0);
  });
};
