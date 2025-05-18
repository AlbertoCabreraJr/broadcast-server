const WebSocket = require("ws");

let clients = [];

const startServer = ({ port }) => {
  const wss = new WebSocket.Server({ port }, () => {
    console.log(`WebSocket server started on port ${port}`);
  });

  wss.on("connection", (ws) => {
    clients.push(ws);
    console.log("New client connected. Total clients: ", clients.length);

    ws.on("message", (message) => {
      console.log("Received message: ", message.toString());

      // Broadcast to all clients
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

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

module.exports = { startServer }