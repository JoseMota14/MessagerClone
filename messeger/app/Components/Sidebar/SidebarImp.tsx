"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import Avatar from "../Avatar";

interface Props {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

function DesktopItem({ label, href, icon: Icon, active, onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <div>
      <li onClick={handleClick} key={label}>
        <Link
          href={href}
          className={clsx(
            `
              group 
              flex 
              gap-x-3 
              rounded-md 
              p-3 
              text-sm 
              leading-6 
              font-semibold 
              text-gray-500 
              hover:text-black 
              hover:bg-gray-100
            `,
            active && "bg-gray-100 text-black"
          )}
        >
          <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="sr-only">{label}</span>
        </Link>
      </li>
    </div>
  );
}

interface DesktopSidebarProps {
  currentUser: User;
}

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul className="flex flex-col items-center space-y-1" role="list">
          {routes.map((e) => (
            <DesktopItem
              key={e.label}
              href={e.href}
              label={e.label}
              icon={e.icon}
              active={e.active}
              onClick={e.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
}
