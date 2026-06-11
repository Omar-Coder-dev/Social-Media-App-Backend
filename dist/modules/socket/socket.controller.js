"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = void 0;
const socket_service_1 = require("./socket.service");
const registerSocketHandlers = (io, socket) => {
    const userId = socket.user?._id?.toString() || "";
    // 1. Connection tracking
    socket_service_1.SocketService.handleNewConnection(userId, socket.id);
    // 2. Room Joining (Essential for Groups)
    socket.on("join_room", (data) => {
        socket.join(data.roomId);
        console.log(`User ${userId} joined room: ${data.roomId}`);
    });
    // 3. Private Messaging
    socket.on("sendMessage", (data) => {
        socket_service_1.SocketService.handleDirectMessage(io, socket, userId, data);
    });
    // 🟢 4. THE MISSING LINK: Group Messaging
    socket.on("sendGroupMessage", (data) => {
        socket_service_1.SocketService.handleGroupMessage(socket, userId, data);
    });
    // 5. Disconnect
    socket.on("disconnect", () => {
        socket_service_1.SocketService.handleDisconnect(userId, socket.id);
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
//# sourceMappingURL=socket.controller.js.map