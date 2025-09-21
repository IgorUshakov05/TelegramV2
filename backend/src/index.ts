import "dotenv/config"; // автоматически вызывает dotenv.config()
import express from "express";
import http from "http";
import { Server } from "socket.io";
import socketIndex from "./Socket/index";
import router from "./API/router";
import cors from "cors";
import { connectDB } from "./DataBase";
import requestIp from "request-ip";
import { Socket as SocketType } from "socket.io";

const app = express();

// Middleware для получения IP
app.use(requestIp.mw());

// CORS
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", router);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: SocketType) => socketIndex(io, socket));

async function StartServer() {
  await connectDB();
  console.log("✅ База подключена");

  const port = process.env.PORT || 4000;
  server.listen(port, () =>
    console.log(
      `🚀 Сервер запущен на ${
        process.env.BASE_URL_SERVER || `http://localhost:${port}`
      }`
    )
  );
}

StartServer();
