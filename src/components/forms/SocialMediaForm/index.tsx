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
import { SOCIAL_LINK_LIST } from "@/constant";
import { socialMediaFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SocialMediaForm() {
  const form = useForm<z.infer<typeof socialMediaFormSchema>>({
    resolver: zodResolver(socialMediaFormSchema),
  });

  const onSubmit = (val: z.infer<typeof socialMediaFormSchema>) => {
    console.log(val);
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
                        placeholder={`Your ${item.name} username`}
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
