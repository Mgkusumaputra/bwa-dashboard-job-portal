"use client";

import FieldInput from "@/components/organism/FieldInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { SOCIAL_LINK_LIST } from "@/constant";
import { socialMediaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanySocialMedia } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SocialMediaFromProps {
  detail: CompanySocialMedia | undefined;
}

export default function SocialMediaForm({ detail }: SocialMediaFromProps) {
  const form = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
    defaultValues: {
      facebook: detail?.facebook,
      instagram: detail?.instagram,
      x: detail?.x,
      linkedin: detail?.linkedin,
      github: detail?.github,
      youtube: detail?.youtube,
    },
  });

  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const onSubmit = async (val: z.infer<typeof socialMediaFormSchema>) => {
    try {
      const body = {
        ...val,
        companyId: session?.user.id,
      };

      await fetch("/api/company/social-media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await router.refresh();

      toast({
        title: "Success",
        description: "Editing social media success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Please try again",
      });

      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FieldInput
          title="Basic Information"
          subtitle="Add elsewhere links to your company profile. You can add only username without full https links."
        >
          <div className="space-y-5">
            {SOCIAL_LINK_LIST.map((item: any, key: number) => (
              <FormField
                key={key}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[450px]"
                        placeholder={`Your ${item.name} username URL`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FieldInput>

        <div className="flex justify-end">
          <Button size="lg">Save Change</Button>
        </div>
      </form>
    </Form>
  );
}
