import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/organism/Applicants";
import JobDetails from "@/components/organism/JobDetails";

export default function JobDetail() {
  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href="/job-listing">
            <FaArrowLeft />
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-1">Brand Designer</h1>
          <div className="flex gap-2">
            <p>Design</p>
            <span>•</span>
            <p>Full-Time</p>
            <span>•</span>
            <p>3/10 Hired</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetail">Job Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants />
        </TabsContent>
        <TabsContent value="jobDetail">
          <JobDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
}
