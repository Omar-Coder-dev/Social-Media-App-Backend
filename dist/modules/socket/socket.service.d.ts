import { Server, Socket } from "socket.io";
export declare class SocketService {
    private static connectedUsers;
    static handleNewConnection(userId: string, socketId: string): void;
    static handleDisconnect(userId: string, socketId: string): void;
    static handleDirectMessage(io: Server, socket: Socket, userId: string, data: {
        content: string;
        sendTo: string;
    }): Promise<void>;
    static handleGroupMessage(socket: Socket, userId: string, data: {
        content: string;
        groupId: string;
    }): Promise<void>;
}
//# sourceMappingURL=socket.service.d.ts.map