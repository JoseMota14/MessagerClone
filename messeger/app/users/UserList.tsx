"use client";

import { User } from "@prisma/client";
import UserData from "./UserData";

interface Props {
  users: User[];
}

export default function UserList({ users }: Props) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="font-bold py-2">People</div>
        </div>
        {users.map((e) => (
          <UserData key={e.id} data={e} />
        ))}
      </div>
    </aside>
  );
}
