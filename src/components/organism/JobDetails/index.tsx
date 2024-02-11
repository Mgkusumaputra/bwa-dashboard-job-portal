import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { dateFormat, formatCurrency } from "@/lib/utils";
import { CategoryJob, Job } from "@prisma/client";
import { PartyPopperIcon } from "lucide-react";

type jobDetailType = {
  categoryJob: CategoryJob | null;
} & Job;

interface jobDetailProps {
  detail: jobDetailType | null;
}

export default function JobDetails({ detail }: jobDetailProps) {
  const UPPER_SECTION = [
    {
      title: "Description",
      subtitle: detail?.description!!,
    },
    {
      title: "Responsibilities",
      subtitle: detail?.responsibility!!,
    },
    {
      title: "Who You Are",
      subtitle: detail?.whoYouAre!!,
    },
    {
      title: "Nice-To-Haves",
      subtitle: detail?.niceToHave!!,
    },
  ];

  const LEFTBAR_SECTION = [
    { title: "Apply Before", description: dateFormat(detail?.dueDate) },
    { title: "Job Posted On", description: dateFormat(detail?.datePosted) },
    { title: "Job Type", description: detail?.jobType },
    {
      title: "Salary",
      description: `${formatCurrency(detail?.salaryFrom!!)} - ${formatCurrency(
        detail?.salaryTo!!
      )}`,
    },
  ];

  const benefits: any = detail?.benefits;

  return (
    <div>
      {/* Upper Content Section */}
      <div className="grid grid-cols-3 w-full gap-5">
        {/* Main Content Section */}
        <div className="col-span-2 space-y-10">
          {UPPER_SECTION.map((item: any, key: number) => (
            <div key={key}>
              <h1 className="text-3xl font-semibold">{item.title}</h1>
              <div
                className="text-gray-500 mt-3"
                dangerouslySetInnerHTML={{ __html: item.subtitle!! }}
              ></div>
            </div>
          ))}
        </div>

        {/* Leftbar Section */}
        <div>
          <h1 className="text-3xl font-semibold">About this role</h1>
          <div className="shadow p-3 text-center my-6">
            <p>
              {`${detail?.applicants} `}
              <span className="text-gray-500">of {detail?.needs} capacity</span>
            </p>
            <Progress
              className="mt-3"
              value={(detail?.applicants || 0) / (detail?.needs || 0) / 100}
            />
          </div>
          <div className="mb-10 space-y-5">
            {LEFTBAR_SECTION.map((item: any, key: number) => (
              <div className="flex justify-between" key={key}>
                <p className="text-gray-500">{item.title}</p>
                <p className="font-semibold">{item.description}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="my-10">
            <h1 className="text-3xl font-semibold mb-4">Category</h1>
            <div className="space-x-5">
              <Badge className="px-6 py-3">{detail?.categoryJob?.name}</Badge>
            </div>
          </div>

          <Separator />

          <div className="my-10">
            <h1 className="text-3xl font-semibold mb-4">Required Skills</h1>
            <div className="space-x-5">
              {detail?.requiredSkills.map((item: string, key: number) => (
                <Badge className="px-4 py-2" variant="outline" key={key}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Bottom Content Section */}
      <div>
        <h1 className="text-3xl font-semibold">Perks & Benefits</h1>
        <p className="text-gray-500">
          This job comes with several perks and benefits
        </p>

        <div className="grid grid-cols-4 gap-5 mt-9">
          {benefits?.map((item: any) => (
            <div key={item}>
              <PartyPopperIcon className="w-10 h-10 text-primary mb-6" />

              <h2 className="text-lg font-semibold">{item.benefit}</h2>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
