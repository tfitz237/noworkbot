declare module "node-telegram-bot-api" {

    export default class Telebot {
        constructor(token: string, options: any);

        sendMessage(chatId: string, message: string): void;

        on(event: string, callback: void): void;

        onText(search: any, callback: void): void;
    }
}

