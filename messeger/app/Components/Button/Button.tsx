"use client";
import clsx from "clsx";
type ButtonType = "button" | "submit" | "reset" | undefined;

interface Props {
  type: ButtonType;
  fullWidth?: boolean;
  children?: React.ReactNode;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button(props: Props) {
  return (
    <div>
      <button
        className={clsx(
          `
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
          props.disabled && "opacity-50 cursor-default",
          props.fullWidth && "w-full",
          props.secondary ? "text-gray-900" : "text-white",
          props.danger &&
            "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
          !props.secondary &&
            !props.danger &&
            "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
        )}
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
}
