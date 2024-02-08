"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";

interface ActionButtonTableProps {
  url: string;
}

export default function ActionButtonTable({ url }: ActionButtonTableProps) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(url)} size="icon" variant="outline">
      <FiMoreVertical className="w-4 h-4" />
    </Button>
  );
}
