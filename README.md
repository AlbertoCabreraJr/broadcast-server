# Broadcast Server

A simple CLI-based broadcast server built with Node.js and WebSockets. This project demonstrates real-time communication between clients — when one client sends a message, it's broadcasted to all connected clients.

## Features

- Start a WebSocket broadcast server
- Connect multiple clients via CLI
- Send and receive real-time messages across all clients
- Gracefully handles client connections and disconnections

## Installation

```
git clone https://github.com/yourusername/broadcast-server.git
cd broadcast-server
npm install
npm link
```

## Usage

### Start the server

```
broadcast-server start --port 8080
```

### Connect as a client

Open another terminal:

```
broadcast-server connect --url ws://localhost:8080
```

Start typing messages — they’ll be sent to all connected clients in real time.

## Testing

### Using WebSocket CLI client (recommended alternative to curl)

Since `curl` does **not support WebSockets**, you can test using tools like:

- **wscat** (WebSocket CLI tool)

Install:

```
npm install -g wscat
```

Connect to server:

```
wscat -c ws://localhost:8080
```

Open another terminal, connect again using `wscat`, and try sending messages between them.

### Example:

```
# Terminal 1
$ npx wscat -c ws://localhost:8080
> Hello from terminal 1

# Terminal 2
$ npx wscat -c ws://localhost:8080
< Hello from terminal 1
```

## Notes

- The server broadcasts any message it receives from one client to **all** connected clients, including the sender.
- Use `CTRL+C` to gracefully shut down the server or client.
