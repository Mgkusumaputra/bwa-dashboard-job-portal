import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Applicants from "@/components/organism/Applicants";
import JobDetails from "@/components/organism/JobDetails";
import prisma from "../../../../../lib/prisma";

type paramsType = {
  id: string;
};

interface jobDetailProps {
  params: paramsType;
}

async function getDetailJob(id: string) {
  const job = await prisma.job.findFirst({
    where: {
      id: id,
    },
    include: {
      Applicants: {
        include: {
          user: true,
        },
      },
      categoryJob: true,
    },
  });

  return job;
}

export default async function JobDetail({ params }: jobDetailProps) {
  const job = await getDetailJob(params.id);

  return (
    <div>
      <div className="inline-flex items-center gap-5 mb-5">
        <div>
          <Link href="/job-listing">
            <FaArrowLeft />
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-1">{job?.role}</h1>
          <div className="flex gap-2">
            <p>{job?.categoryJob?.name}</p>
            <span>•</span>
            <p>{job?.jobType}</p>
            <span>•</span>
            <p>
              {job?.applicants}/{job?.needs} Hired
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="applicants">
        <TabsList className="mb-8">
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="jobDetail">Job Detail</TabsTrigger>
        </TabsList>
        <TabsContent value="applicants">
          <Applicants applicants={job?.Applicants} />
        </TabsContent>
        <TabsContent value="jobDetail">
          <JobDetails detail={job} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
