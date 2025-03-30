"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  searchParams: {
    language1: string;
    language2: string;
  };
};

export default function Page({ searchParams }: Props) {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const router=useRouter();

  // Correct way to use useQuery (without async/await)
  const { data, isLoading } = api.post.mapUserToLanguageRoom.useQuery(searchParams);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  router.push(
    `/langRooms/join/${data}?language=${searchParams.language1+',' + searchParams.language2}`,
  );
  return null; // Ensure the component doesn't render anything after the redirect
}
