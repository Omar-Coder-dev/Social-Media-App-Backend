"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = void 0;
const events_1 = require("events");
const sendEmail_1 = require("./sendEmail");
class Email {
    emitter;
    constructor(emitter) {
        this.emitter = emitter;
    }
    publish(eventName, args) {
        console.log("start publish", args);
        this.emitter.emit(eventName, args);
    }
    subscribe(eventName, listener) {
        console.log("start listen", listener);
        listener;
        this.emitter.on(eventName, listener);
    }
}
const emailEmitter = new events_1.EventEmitter();
exports.email = new Email(emailEmitter);
exports.email.subscribe('confirm-email', async ({ to, subject, html }) => {
    await (0, sendEmail_1.sendEmail)({ to, subject, html });
});
//# sourceMappingURL=emailEvents.js.map