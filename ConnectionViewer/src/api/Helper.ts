import { ConnectionViewer } from "../ConnectionViewer";

/**
 * Module that stores ConnectionViewer helpers
 */
export module Helper {
    /**
     * Add a message and display it.
     */
    export function addMessage(message: string): void {
        const MessageDiv: HTMLDivElement | null = document.getElementById(`${ConnectionViewer.ns}_MessageDiv`) as HTMLDivElement;
        if(MessageDiv !== null) {
            const messageSpan = document.createElement('span');
            messageSpan.textContent = message;
            (MessageDiv as HTMLDivElement).appendChild(messageSpan);
        }
    }
    /**
     * Add a message and display it, and line break with <br />.
     */
    export function addMessageln(message: string): void {
        const MessageDiv: HTMLDivElement | null = document.getElementById(`${ConnectionViewer.ns}_MessageDiv`) as HTMLDivElement;

        if(MessageDiv !== null) {
            const messageSpan = document.createElement('span');
            messageSpan.textContent = message;
            (MessageDiv as HTMLDivElement).appendChild(messageSpan);

            const br = document.createElement('br');
            (MessageDiv as HTMLDivElement).appendChild(br);
        }
    }
    /**
     * Add an error message and display it, and line break with <br />.
     */
    export function addErrorMessageln(message: string): void {
        addMessageln("Error: " + message);
    }
    /**
     * Add an Info level message and display it, and line break with <br />.
     */
    export function addInfoMessageln(message: string): void {
        addMessageln("Info: " + message);
    }
    /**
     * Show userAgent.
     */
    export function showUserAgent() {
        addMessage(navigator.userAgent);
    }
}
