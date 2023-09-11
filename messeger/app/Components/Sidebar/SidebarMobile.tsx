"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import clsx from "clsx";
import Link from "next/link";

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

function MobileItem({ href, icon: Icon, active, onClick }: MobileItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        `
        group 
        flex 
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-gray-500 
        hover:text-black 
        hover:bg-gray-100
      `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}
