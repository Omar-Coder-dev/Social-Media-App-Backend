import { EventEmitter } from "events";
export type Events = "confirm-email" | "forget-password";
export declare class Email {
    private emitter;
    constructor(emitter: EventEmitter);
    publish(eventName: Events, args: any): Promise<void>;
    subscribe(eventName: Events, listener: (args: any) => void | Promise<void>): Promise<void>;
}
export declare const emailEvents: Email;
//# sourceMappingURL=emailEvents.d.ts.map