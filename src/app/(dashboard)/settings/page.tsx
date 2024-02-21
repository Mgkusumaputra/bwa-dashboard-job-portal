import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OverviewForm from "@/components/forms/OverviewForm";
import SocialMediaForm from "@/components/forms/SocialMediaForm";
import TeamForm from "@/components/forms/TeamForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "../../../../lib/prisma";

async function getDetailCompany() {
  const session = await getServerSession(authOptions);

  const company = await prisma.company.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
    },
  });

  return company;
}

export default async function Settings() {
  const company = await getDetailCompany();

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-5">Settings</h1>
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewForm detail={company?.CompanyOverview[0]} />
        </TabsContent>
        <TabsContent value="socialLinks">
          <SocialMediaForm detail={company?.CompanySocialMedia[0]} />
        </TabsContent>
        <TabsContent value="teams">
          <TeamForm teams={company?.CompanyTeam} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
