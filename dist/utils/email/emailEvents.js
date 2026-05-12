"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvents = exports.Email = void 0;
const events_1 = require("events");
const sendEmail_1 = require("./sendEmail");
const emailEmitter = new events_1.EventEmitter();
class Email {
    emitter;
    constructor(emitter) {
        this.emitter = emitter;
    }
    async publish(eventName, args) {
        console.log("start publish", args);
        this.emitter.emit(eventName, args);
    }
    async subscribe(eventName, listener) {
        this.emitter.on(eventName, listener);
    }
}
exports.Email = Email;
exports.emailEvents = new Email(emailEmitter);
exports.emailEvents.subscribe('confirm-email', async ({ to, otp, subject, html }) => {
    await (0, sendEmail_1.sendEmail)({ to, otp, subject, html });
});
//# sourceMappingURL=emailEvents.js.map