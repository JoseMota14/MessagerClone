"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export default function MessageInput(props: Props) {
  return (
    <div className="relative w-full">
      <input
        id={props.id}
        type={props.type}
        autoComplete={props.id}
        {...props.register(props.id, { required: props.required })}
        placeholder={props.placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
}
