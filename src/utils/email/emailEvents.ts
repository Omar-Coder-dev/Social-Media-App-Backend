import { EventEmitter } from "events"
import { sendEmail } from "./sendEmail";

export type Events = "confirm-email" | "forget-password"
const emailEmitter = new EventEmitter()
export class Email {
    constructor(private emitter: EventEmitter) {
    }

    async publish(eventName: Events, args: any) { // emit
        console.log("start publish", args);

        this.emitter.emit(eventName, args)
    }

    async subscribe(eventName: Events, listener: (args: any) => void | Promise<void>) { 
    this.emitter.on(eventName, listener)
    }
}

export const emailEvents = new Email(emailEmitter)

emailEvents.subscribe('confirm-email', async ({ to, otp, subject, html }: { to: string, otp: string, subject: string, html: string }) => {
    await sendEmail({ to, otp, subject, html })
})

