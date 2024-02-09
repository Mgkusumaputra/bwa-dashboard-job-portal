import { JOBTYPES } from "@/constant";
import { string, z } from "zod";

export const jobFormSchema = z.object({
  roles: z
    .string({ required_error: "Job title is required" })
    .min(80, { message: "Job title must be at least 3 characters" }),
  jobType: z.enum(JOBTYPES, {
    required_error: "You need to select a job type",
  }),
  salaryFrom: z.string({ required_error: "Salary form is required" }),
  salaryTo: z.string({ required_error: "Salary form is required" }),
  categoryId: z.string({ required_error: "You need to select a category" }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: "Required skill must be at least 1 skill" }),
  jobDescription: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Job description must be at least 10 characters" }),
  responsibility: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Responsibility must be at least 10 characters" }),
  whoYouAre: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Who you are must be at least 10 characters" }),
  niceToHave: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Nice to have must be at least 10 characters" }),
  benefits: z
    .object({
      benefit: z.string(),
      description: z.string(),
    })
    .array()
    .nonempty({ message: "Benefit must be at least 1 benefit" }),
});

export const overviewFormSchema = z.object({
  image: z
    .any()
    .refine((item: any) => item?.name, { message: "Image is required" }),
  name: z.string({ required_error: "Name is required" }),
  website: z.string({ required_error: "Website is required" }),
  location: z.string({ required_error: "Location is required" }),
  employee: z.string({ required_error: "Employee is required" }),
  industry: z.string({ required_error: "Industry is required" }),
  dateFounded: z.date({ required_error: "Date founded is required" }),
  techStack: z
    .string({ required_error: "Tech stack is required" })
    .array()
    .nonempty({ message: "Tech stack must be at least 1 data" }),
  description: z.string({ required_error: "Description is required" }),
});

export const socialMediaFormSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional(),
  youtube: z.string().optional(),
  github: z.string().optional(),
});

export const teamFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  role: z.string({ required_error: "Role is required" }),
  instagram: z.string().optional(),
  linkedin: z.string({ required_error: "LinkedIn is required" }),
});
