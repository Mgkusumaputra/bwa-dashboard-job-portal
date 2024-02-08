import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PartyPopperIcon } from "lucide-react";
import { number } from "zod";

export default function JobDetails() {
  const JOB_DETAILS_1 = [
    {
      title: "Description",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sequi quae nam vel accusantium? Aperiam deserunt saepe at impedit quod voluptates tenetur iste reprehenderit eius, officiis aliquam veniam, minima facilis.",
    },
    {
      title: "Responsibilities",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sequi quae nam vel accusantium? Aperiam deserunt saepe at impedit quod voluptates tenetur iste reprehenderit eius, officiis aliquam veniam, minima facilis.",
    },
    {
      title: "Who You Are",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sequi quae nam vel accusantium? Aperiam deserunt saepe at impedit quod voluptates tenetur iste reprehenderit eius, officiis aliquam veniam, minima facilis.",
    },
    {
      title: "Nice-To-Haves",
      subtitle:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus sequi quae nam vel accusantium? Aperiam deserunt saepe at impedit quod voluptates tenetur iste reprehenderit eius, officiis aliquam veniam, minima facilis.",
    },
  ];

  const JOB_DETAILS_2 = [
    { title: "Apply Before", description: "12 August 2024" },
    { title: "Job Posted On", description: "5 May 2024" },
    { title: "Job Type", description: "Full-Time" },
    { title: "Salary", description: "Rp 15.000.000 - Rp 18.000.000" },
  ];

  const REQUIRED_SKILLS = ["HTML", "Javascript", "Golang"];

  const BENEFITS = [0, 1, 2];

  return (
    <div>
      {/* Upper Content Section */}
      <div className="grid grid-cols-3 w-full gap-5">
        {/* Main Content Section */}
        <div className="col-span-2 space-y-10">
          {JOB_DETAILS_1.map((item: any, key: number) => (
            <div key={key}>
              <h1 className="text-3xl font-semibold">{item.title}</h1>
              <p className="text-gray-500 mt-3">{item.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Leftbar Section */}
        <div>
          <h1 className="text-3xl font-semibold">About this role</h1>
          <div className="shadow p-3 text-center my-6">
            <p>
              1 <span className="text-gray-500">of 10 capacity</span>
            </p>
            <Progress className="mt-3" value={10} />
          </div>
          <div className="mb-10 space-y-5">
            {JOB_DETAILS_2.map((item: any, key: number) => (
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
              <Badge className="px-6 py-3">Software Engineer</Badge>
            </div>
          </div>

          <Separator />

          <div className="my-10">
            <h1 className="text-3xl font-semibold mb-4">Required Skills</h1>
            <div className="space-x-5">
              {REQUIRED_SKILLS.map((item: string, key: number) => (
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
          {BENEFITS.map((item: number) => (
            <div key={item}>
              <PartyPopperIcon className="w-10 h-10 text-primary mb-6" />

              <h2 className="text-lg font-semibold">Full Healthcare</h2>
              <p className="text-gray-500">
                We believe in thriving communities and that starts with our team
                being happy and healthy.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
