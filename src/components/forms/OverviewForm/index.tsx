"use client";

import TitleForms from "@/components/atoms/TitleForms";
import CustomUpload from "@/components/organism/CustomUpload";
import FieldInput from "@/components/organism/FieldInput";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { EMPLOYEE_OPTIONS, optionType } from "@/constant";
import { COUNTRY_LIST } from "@/constant/countryList";
import { overviewFormSchema } from "@/lib/form-schema";
import { cn, fetcher } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { object, z } from "zod";
import InputSkills from "@/components/organism/InputSkills";
import CKEditor from "@/components/organism/CKEditor";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { CompanyOverview, Industry } from "@prisma/client";
import { supabaseUpdateFile, supabaseUploadFile } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface OverviewFormProps {
  detail: CompanyOverview | undefined;
}

export default function OverviewForm({ detail }: OverviewFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [editorLoaded, setEditorLoaded] = useState<boolean>(false);

  const { data } = useSWR<Industry[]>("/api/company/industry", fetcher);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof overviewFormSchema>>({
    resolver: zodResolver(overviewFormSchema),
    defaultValues: {
      dateFounded: detail?.dateFounded,
      description: detail?.description,
      employee: detail?.employee,
      image: detail?.image,
      industry: detail?.industry,
      location: detail?.location,
      name: detail?.name,
      techStack: detail?.techStack,
      website: detail?.website,
    },
  });

  const onSubmit = async (val: z.infer<typeof overviewFormSchema>) => {
    try {
      let fileName = "";

      if (typeof val.image === "object") {
        const uploadImg = await supabaseUploadFile(val.image, "company");
        fileName = uploadImg.fileName;
      } else {
        fileName = val.image;
      }

      const body = {
        ...val,
        image: fileName,
        companyId: session?.user.id,
      };

      await fetch("/api/company/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      toast({
        title: "Success",
        description: "Edit profile success",
      });

      router.refresh();
    } catch (error) {
      await toast({
        title: "Error",
        description: "Please try again",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      <div className="my-5">
        <TitleForms
          title="Basic Information"
          subtitle="This is company information that you can update anytime"
        />
      </div>

      <Separator className="mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {/* Company Logo Input */}
          <FieldInput
            title="Company Logo"
            subtitle="This image will be shown publicly as company logo"
          >
            <CustomUpload form={form} name="image" />
          </FieldInput>

          <FieldInput
            title="Company Details"
            subtitle="Introduce your company core info quickly to users by fill up company details"
          >
            <div className="space-y-5">
              {/* Company Name Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="Your company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Website Input */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder="https://yourcompany.co"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Company Location Input */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[450px]">
                          <SelectValue placeholder="Select Company Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COUNTRY_LIST.map((item: any, key: number) => (
                          <SelectItem value={item} key={item + key}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-[450px] grid grid-cols-2 gap-4">
                {/* Number Company Employee Input */}
                <FormField
                  control={form.control}
                  name="employee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Employee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {EMPLOYEE_OPTIONS.map(
                            (item: optionType, key: number) => (
                              <SelectItem value={item.id} key={item.id + key}>
                                {item.label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company Industry Input */}
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="Industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((item: Industry) => (
                            <SelectItem value={item.id} key={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date Founded Input */}
              <FormField
                control={form.control}
                name="dateFounded"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Founded</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[450px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tech Stack Input */}
              <InputSkills
                form={form}
                name="techStack"
                label="Add Tech Stack"
              />
            </div>
          </FieldInput>

          <FieldInput
            title="About Company"
            subtitle="Brief description for your company. URLs are hyperlinked"
          >
            <CKEditor
              form={form}
              name="description"
              editorLoaded={editorLoaded}
            />
          </FieldInput>

          <div className="flex justify-end">
            <Button size="lg">Save Change</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
