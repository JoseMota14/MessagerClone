"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  disable: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

export default function Input(props: Props) {
  const { register } = props;

  return (
    <div>
      <label className="block text-sm text-black" htmlFor={props.id}>
        {props.label}
      </label>
      <div className="mt-2">
        <input
          className={clsx(
            `
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`,
            props.errors[props.id] && "focus:ring-red-400",
            props.disable && "opacity-50 cursor-default"
          )}
          id={props.id}
          type={props.type}
          required={props.required}
          autoComplete={props.id}
          {...register(props.id, { required: props.required })}
        ></input>
      </div>
    </div>
  );
}
