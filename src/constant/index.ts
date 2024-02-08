import { EnumValues } from "zod";

export const JOBTYPES: EnumValues = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
];

export const JOB_LISTINGS_COLUMNS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export const JOB_APPLICANT_COLUMNS: string[] = ["Name", "Applied Date"];

export const JOB_APPLICANT_DATA = [
  {
    name: "Dodi",
    appliedDate: "7 Jan 2024",
  },
];

export const JOB_LISTINGS_DATA = [
  {
    roles: "Software Engineer",
    status: "Live",
    datePosted: "12 Nov 2023",
    dueDate: "10 Feb 2024",
    jobType: "Full-Time",
    applicants: 16,
    needs: 10,
  },
];
