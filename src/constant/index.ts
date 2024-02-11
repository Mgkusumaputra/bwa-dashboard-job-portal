import { EnumValues } from "zod";

export type optionType = {
  id: string;
  label: string;
};

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

export const JOB_APPLICANT_COLUMNS: string[] = ["Name"];

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

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: "1-50",
    label: "1-50",
  },
  {
    id: "51-150",
    label: "51-150",
  },
  {
    id: "151-250",
    label: "151-250",
  },
  {
    id: "251-500",
    label: "251-500",
  },
  {
    id: "501-1000",
    label: "501-1000",
  },
  {
    id: "1000-above",
    label: "1000-above",
  },
];

export const SOCIAL_LINK_LIST = [
  {
    name: "facebook",
    label: "Facebook",
  },
  {
    name: "instagram",
    label: "Instagram",
  },
  {
    name: "x",
    label: "X",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
  },
  {
    name: "youtube",
    label: "Youtube",
  },
  {
    name: "github",
    label: "Github",
  },
];
