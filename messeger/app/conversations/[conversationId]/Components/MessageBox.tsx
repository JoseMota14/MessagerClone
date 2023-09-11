"use client";

import Avatar from "@/app/Components/Avatar";
import { FullMessageType } from "@/app/Utils/Types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

interface Props {
  data: FullMessageType;
  isLast?: boolean;
}

export default function MessageBox(props: Props) {
  const session = useSession();
  const isOwn = session.data?.user?.email === props.data.sender.email;
  const seenList = (props.data.seen || [])
    .filter((user) => user.email !== props.data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    props.data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={props.data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{props.data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(props.data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          <div>{props.data.body}</div>
        </div>
        {props.isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
}
