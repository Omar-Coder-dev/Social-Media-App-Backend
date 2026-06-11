import { Server, Socket } from "socket.io";
import { SocketService } from "./socket.service";

export const registerSocketHandlers = (io: Server, socket: Socket) => {
    const userId = socket.user?._id?.toString() || "";

    // 1. Connection tracking
    SocketService.handleNewConnection(userId, socket.id);

    // 2. Room Joining (Essential for Groups)
    socket.on("join_room", (data: { roomId: string }) => {
        socket.join(data.roomId);
        console.log(`User ${userId} joined room: ${data.roomId}`);
    });

    // 3. Private Messaging
    socket.on("sendMessage", (data) => {
        SocketService.handleDirectMessage(io, socket, userId, data);
    });

    // 🟢 4. THE MISSING LINK: Group Messaging
    socket.on("sendGroupMessage", (data) => {
        SocketService.handleGroupMessage(socket, userId, data);
    });

    // 5. Disconnect
    socket.on("disconnect", () => {
        SocketService.handleDisconnect(userId, socket.id);
    });
};