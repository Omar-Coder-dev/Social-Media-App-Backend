import { Server, Socket } from "socket.io";
// 1. Import our brand new chat model layout
import { chatModel } from "../../DB/models/chat.model";
import {groupModel} from "../../DB/models/group.model";

export class SocketService {
    private static connectedUsers: Map<string, string[]> = new Map();

    public static handleNewConnection(userId: string, socketId: string): void {
        const userSockets = this.connectedUsers.get(userId) || [];
        userSockets.push(socketId);
        this.connectedUsers.set(userId, userSockets);
        console.log("Online Mapping State updated:", this.connectedUsers);
    }

    public static handleDisconnect(userId: string, socketId: string): void {
        const userSockets = this.connectedUsers.get(userId) || [];
        const updatedSockets = userSockets.filter(id => id !== socketId);
        
        if (updatedSockets.length === 0) {
            this.connectedUsers.delete(userId);
        } else {
            this.connectedUsers.set(userId, updatedSockets);
        }
        console.log("Online Mapping State updated after disconnect:", this.connectedUsers);
    }

    // 1-on-1 Messages: Process real-time transfers AND save to MongoDB
    public static async handleDirectMessage(io: Server, socket: Socket, userId: string, data: { content: string, sendTo: string }) {
        const { content, sendTo } = data;

        try {
            // 🟢 2. Database Save: Find existing conversation OR generate a fresh room between both people
            let chat = await chatModel.findOne({
                participants: { $all: [userId, sendTo] }
            });

            if (!chat) {
                chat = await chatModel.create({
                    participants: [userId, sendTo],
                    messages: []
                });
            }

            // 🟢 3. Append the brand new message object to the internal data array
            chat.messages.push({
                content,
                createdBy: userId as any,
                createdAt: new Date()
            });
            await chat.save();

            // Construct payload structure expected by chat.js
            const messagePayload = {
                content,
                from: {
                    _id: userId,
                    userName: (socket as any).user?.name || "", // Target user model 'name' field
                    profilePicture: (socket as any).user?.profilePicture || ""
                },
                sendTo
            };

            // Emit acknowledgment back to sender UI
            socket.emit("successMessage", { content, sendTo });

            // Forward message to all open tabs of the recipient
            const recipientSockets = this.connectedUsers.get(sendTo);
            if (recipientSockets && recipientSockets.length > 0) {
                recipientSockets.forEach(socketId => {
                    io.to(socketId).emit("newMessage", messagePayload);
                });
            }
        } catch (error) {
            console.error("CRITICAL ERROR RECORDING SOCKET DIRECT MESSAGE:", error);
            socket.emit("custom_error", { message: "Internal server error failing to record text entry." });
        }
    }

    // Group Messages
// Group Messages: Broadcasts to an entire room AND saves to MongoDB
    public static async handleGroupMessage(socket: Socket, userId: string, data: { content: string, groupId: string }) {
        const { content, groupId } = data;

        try {
            // 1. Find the group by its ID and push the new message into the array
            const group = await groupModel.findById(groupId);
            
            if (!group) {
                socket.emit("custom_error", { message: "Group not found." });
                return;
            }

            group.messages.push({
                content,
                createdBy: userId as any,
                createdAt: new Date()
            });
            await group.save();

            // 2. Construct payload matching chat.js expectations
            const messagePayload = {
                content,
                from: {
                    _id: userId,
                    name: (socket as any).user?.name || "", 
                    profilePicture: (socket as any).user?.profilePicture || ""
                },
                groupId
            };

            // 3. Broadcast to everyone else in the room channel (using roomId saved in group)
            socket.to(group.roomId).emit("newMessage", messagePayload);

            // 4. Acknowledge back to sender
            socket.emit("successMessage", { content, sendTo: groupId });

        } catch (error) {
            console.error("CRITICAL ERROR RECORDING SOCKET GROUP MESSAGE:", error);
            socket.emit("custom_error", { message: "Internal server error failing to record group message." });
        }
    }
}