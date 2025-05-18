#!/usr/bin/env node

const { program } = require("commander");
const { startServer } = require("./server");
const { connectToServer } = require("./client");

program
  .command("start")
  .description("Start the broadcast server")
  .option("--port <port>", "Port to listen on", "8080")
  .action((options) => {
    startServer({ port: options.port })
  })

program.command("connect")
  .description("Connect to the broadcast server")
  .option("--url <url>", "URL to connect to", "ws://localhost:8080")
  .action((options) => {
    connectToServer({ url: options.url })
  })

program.parse(process.argv)