import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Settings() {
  return (
    <div>
      <h1 className="font-semibold text-3xl">Settings</h1>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview</TabsContent>
        <TabsContent value="socialLinks">Social Links</TabsContent>
        <TabsContent value="teams">Teams</TabsContent>
      </Tabs>
    </div>
  );
}
