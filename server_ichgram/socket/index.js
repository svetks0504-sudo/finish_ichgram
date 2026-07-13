import { Server } from "socket.io";
import Message from "../models/Message.js";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //создаем связь (трубу)
  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    //следим
    socket.on("join-user", (userId) => {
      socket.userId = userId;
      socket.join(userId);
    });

    //переходим в кабинет, заходим в комноту
    socket.on("join-room", async (conversationId) => {
      socket.join(conversationId);

      const messages = await Message.find({ conversationId }).sort({
        createdAt: 1,
      });

      socket.emit("chat-history", messages);
    });

    //создаем сообщения
    socket.on("send-message", async (data) => {
      const { conversationId, text } = data;

      const message = await Message.create({
        conversationId,
        sender: socket.userId,
        text,
      });
      // через то відправляємо кому/ хто в кімнаті цього чату
      io.to(conversationId).emit("receive-message", message);
    });

    //убираем связь (трубу)
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};

export default initSocket;
