"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiPlusCircle } from "react-icons/fi";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  const navCreateJobPage = () => router.push("/post-job");

  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div className="">
        <div className="">Company</div>
        <div className="font-semibold">{session?.user.name}</div>
      </div>
      <div className="">
        <Button onClick={navCreateJobPage} className="rounded-none py-3 px-6">
          <FiPlusCircle className="mr-2 w-4 h-4" /> Post a job
        </Button>
      </div>
    </div>
  );
}
