import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");
  const client = await clerkClient();
  const user = await client.users.getUser(userId!);
  if (!user.emailAddresses[0]?.emailAddress) return notFound();
  await db.user.upsert({
    where: {
      email: user.emailAddresses[0]?.emailAddress ?? "",
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      email: user.emailAddresses[0]?.emailAddress ?? "",
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
  return redirect("/");
};

export default page;
