"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeIo = void 0;
const socket_io_1 = require("socket.io");
const token_1 = require("../../utils/security/token/token");
const socket_controller_1 = require("./socket.controller");
let io;
const initializeIo = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: { origin: "*" }
    });
    // Token Verification Middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error("UnAUthorized"));
            }
            const user = await (0, token_1.decodeToken)(token);
            socket.user = user;
            next();
        }
        catch (err) {
            console.log("Socket Authentication Error:", err);
            next(new Error("UnAUthorized"));
        }
    });
    // Initialize hand-off directly to modular controller event listeners
    io.on('connection', (socket) => {
        (0, socket_controller_1.registerSocketHandlers)(io, socket);
    });
    return io;
};
exports.initializeIo = initializeIo;
//# sourceMappingURL=socket.gateway.js.map