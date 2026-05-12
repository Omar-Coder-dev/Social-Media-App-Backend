"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const path_1 = __importDefault(require("path"));
const serviceAccountPath = path_1.default.resolve("firebase-config.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require(serviceAccountPath)),
});
// Use admin.messaging.Messaging to get the type correctly
exports.messaging = firebase_admin_1.default.messaging();
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.config.js.map