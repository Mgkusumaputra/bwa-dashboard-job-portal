"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaRegBuilding, FaRegClipboard, FaRegCalendar } from "react-icons/fa";
import { MdOutlinePeopleAlt, MdOutlineLogout } from "react-icons/md";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome className="mr-2 text-lg" />
              Home
            </Button>
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
            >
              <AiOutlineMessage className="mr-2 text-lg" />
              Messages
            </Button>
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
            >
              <FaRegBuilding className="mr-2 text-lg" />
              Company Profile
            </Button>
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
            >
              <MdOutlinePeopleAlt className="mr-2 text-lg" />
              All Applicants
            </Button>
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
              onClick={() => router.push("/job-listing")}
            >
              <FaRegClipboard className="mr-2 text-lg" />
              Job Listing
            </Button>
            <Button
              variant="ghost"
              className=" w-full justify-start rounded-none hover:text-primary"
            >
              <FaRegCalendar className="mr-2 text-lg" />
              My Schedule
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            variant="ghost"
            className=" w-full justify-start rounded-none hover:text-primary"
            onClick={() => router.push("/settings")}
          >
            <AiOutlineSetting className="mr-2 text-lg" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className=" w-full justify-start rounded-none text-red-500 hover:bg-red-200 hover:text-red-500"
            onClick={() => signOut()}
          >
            <MdOutlineLogout className="mr-2 text-lg" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
