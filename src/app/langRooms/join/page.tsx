"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

type Props = {
  searchParams: {
    language1?: string;
    language2?: string;
  };
};

export default function Page({ searchParams }: Props) {
  const utils = api.useUtils();
  const [name, setName] = useState("");

  // Correct way to use useQuery (without async/await)
  const { data, isLoading } = api.post.mapUserToLanguageRoom.useQuery(searchParams);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data found.</div>;
  }

  return <div>{data}</div>;
}
