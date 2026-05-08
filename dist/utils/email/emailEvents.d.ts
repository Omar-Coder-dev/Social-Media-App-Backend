import { EventEmitter } from "events";
export type Events = "confirm-email" | "forget-password";
declare class Email {
    private emitter;
    constructor(emitter: EventEmitter);
    publish(eventName: Events, args: any): void;
    subscribe(eventName: Events, listener: (args: any) => void | Promise<void>): void;
}
export declare const email: Email;
export {};
//# sourceMappingURL=emailEvents.d.ts.map