"use client";

import Avatar from "@/app/Components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";
interface Props {
  conversation: Conversation & {
    users: User[];
  };
}

export default function Header(props: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const otherUser = useOtherUser(props.conversation);
  const statusText = useMemo(() => {
    if (props.conversation.isGroup) {
      return props.conversation.users.length + "members";
    }
    return "Active";
  }, [props.conversation]);
  return (
    <>
      <ProfileDrawer
        data={props.conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {props.conversation.isGroup ? (
            <Avatar user={props.conversation.users[0]} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{props.conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          onClick={() => setDrawerOpen(true)}
          className="text-sky-500cursor-pointerhover:text-sky-600transition"
        />
      </div>
    </>
  );
}
