"use client";

import { FullMessageType } from "@/app/Utils/Types";
import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface Props {
  initialMessages: FullMessageType[];
}

export default function Body(props: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<FullMessageType[]>(
    props.initialMessages
  );

  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    bottomRef.current?.scrollIntoView();

    const messageHandle = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandle);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandle);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
}
