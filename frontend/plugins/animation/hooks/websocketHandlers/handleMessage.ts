import { handlerMap } from "../websocketHandlers";
import { HandlerContext, Message } from "./types";

export const handleMessage = async (message: Message, context: HandlerContext) => {
  if (!context) {
    return;
  }
  const handler = handlerMap[message.type];
  if (!handler) {
    return;
  }
  await handler(message, context);
};
