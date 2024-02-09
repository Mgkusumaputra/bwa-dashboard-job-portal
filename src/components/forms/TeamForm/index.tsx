import FieldInput from "@/components/organism/FieldInput";
import React from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import DialogAddTeam from "./DialogAddTeam";

export default function TeamForm() {
  const TEAMS_DUMMY_DATA = [
    { name: "Budi", role: "CEO" },
    { name: "Tono", role: "VP of Engineering" },
    { name: "Tuti", role: "CFO" },
  ];

  return (
    <FieldInput
      title="Basic Information"
      subtitle="Add team member of your company"
    >
      <div className="w-[65%] mb-5">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg font-semibold">3 Members</h1>
          <DialogAddTeam />
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6">
          {TEAMS_DUMMY_DATA.map((item: any, key: number) => (
            <div className="p-3 shadow text-center" key={item + key}>
              <div className="w-14 h-14 rounded-full bg-gray-300 mx-auto" />

              <h2 className="mt-4 font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.role}</p>

              <div className="mt-5 inline-flex mx-auto gap-3 text-gray-500">
                <FaInstagram className="w-5 h-5" />
                <FaLinkedinIn className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </FieldInput>
  );
}
