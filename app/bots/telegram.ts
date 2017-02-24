
import Telebot from "node-telegram-bot-api";

import {IMiddleware, IBot, IMessage, ISubscribers} from "../interfaces";
import {IUser} from "../user";

export interface ITelegramMessage {
    message_id: number;
    from: ITelegramUser;
    date: number;
    chat: ITelegramChat;
    text: string;
}

export interface ITelegramUser {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

export interface ITelegramChat {
    id: number;
    type: "private" | "group" | "supergroup" | "channel";
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;

}

class TelegramBot implements IBot {
    bot: Telebot;
    middleware: IMiddleware;
    subscribers: ISubscribers;
    constructor(token: string, middleware: IMiddleware) {
        this.bot = new Telebot(token, {polling: true});
        this.middleware = middleware;
        this.subscribers = {};
    }

    forward(message: ITelegramMessage) {
        if(this.shouldForward(message.chat.id)) {
            let msg: IMessage = {
                chatId: message.chat.id,
                to: this.subscribers[message.chat.id].map(user => user["email"]).join(", "),
                topic: message.chat.title || message.chat.username,
                message: "<div id=\"chatMessage\"><u>" + new Date(message.date).toLocaleTimeString() + " >> " +
                            message.from.first_name + " " + message.from.last_name + "</u><br/> "
                            + message.text + "<br/><br/></div>{TGCHATID:"+message.chat.id+"}",
            }
            this.sendMessage(msg);
        }

    }

    receiveMessage(message: IMessage) {

    }

    sendMessage(message: IMessage) {

    }

    shouldForward(chatId: number) {
        return this.subscribers[chatId] && this.subscribers[chatId].length > 0;
    }


    addSubscriber(user: IUser) {

    }



}

export default TelegramBot;