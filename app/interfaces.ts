
import {IUser} from "./user";
export interface IMessage {
    chatId: number;
    from?: {
        id: number,
        name: string
    };
    topic?: string;
    message: string;
    to: string;
}


export interface IMiddleware {
    service: string;
    credentials: {
        user: string,
        pass: string
    }
    initBot(bot: IBot): void;
    initSend(): void;
    initReceive(): void;
    send(message: IMessage): void;
    receive(chatId: string, message: string): void;
}


export interface IBot {
    bot: any;
    middleware: IMiddleware;
    subscribers: {};
    forward(message: any): void;
    receiveMessage(message: IMessage): void;
    sendMessage(message: IMessage): void;
    shouldForward(chatId: number): boolean;
    addSubscriber(user: IUser): void;
}

export interface ISubscribers {
    [propName: string]: IUser[];
}