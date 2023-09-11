"use client";

import Avatar from "@/app/Components/Avatar";
import { FullConversationType } from "@/app/Utils/Types";
import useOtherUser from "@/app/hooks/useOtherUser";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface Props {
  data: FullConversationType;
  selected?: boolean;
}

export default function Box(props: Props) {
  const otherUser = useOtherUser(props.data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${props.data.id}`);
  }, [props.data, router]);

  const lastMessage = useMemo(() => {
    const messages = props.data.messages || [];

    return messages[messages.length - 1];
  }, [props.data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }
    if (lastMessage?.body) {
      return lastMessage?.body;
    }
    return "Started a conversation";
  }, [lastMessage]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }
    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100rounded-lgtransitioncursor-pointer`,
        props.selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {props.data.isGroup ? (
        <Avatar user={props.data.users[0]} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {props.data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p
            className={clsx(
              `truncate text-sm`,
              hasSeen ? "text-gray-500" : "text-black font-medium"
            )}
          >
            {lastMessageText}
          </p>
        </div>
      </div>
    </div>
  );
}
