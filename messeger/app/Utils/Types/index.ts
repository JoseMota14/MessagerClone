import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type Conv = {
  users: User[];
  messages: FullMessageType[];
};

export type FullConversationType = Conversation & Conv;
