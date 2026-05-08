import { EventEmitter } from "events"
import { sendEmail } from "./sendEmail";

export type Events = "confirm-email" | "forget-password"

class Email {
    constructor(private emitter: EventEmitter) {
    }

    publish(eventName: Events, args: any) { // emit
        console.log("start publish", args);

        this.emitter.emit(eventName, args)
    }

    subscribe(eventName: Events, listener: (args: any) => void | Promise<void>) { // on
        console.log("start listen", listener);
        listener
        this.emitter.on(eventName, listener)
    }
}

const emailEmitter = new EventEmitter()
export const email = new Email(emailEmitter)

email.subscribe('confirm-email', async ({ to, subject, html }: { to: string, subject: string, html: string }) => {
    await sendEmail({ to, subject, html })
})