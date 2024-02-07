import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

interface FieldInputProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function FieldInput({
  children,
  title,
  subtitle,
}: FieldInputProps) {
  return (
    <>
      <div className="flex flex-row items-start">
        <div className="w-[35%]">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-gray-400 w-80">{subtitle}</p>
        </div>
        {children}
      </div>
      <Separator />
    </>
  );
}
