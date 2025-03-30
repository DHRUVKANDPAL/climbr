"use client";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  //  const [data,setData] = useState();

  //  useEffect(() => {
  //    const fetchData = async () => {
  //      try {
  //        const response = await fetch(
  //          `/api/getPaper/cm8vc8tsj0003m50mc49yukds`,
  //        );
  //        const data = await response.json();
  //        console.log(data);
  //         setData(data);
  //      } catch (error) {
  //        console.error("Error fetching hospital data:", error);
  //      }
  //    };
  //    fetchData();
  //  }, []);
  const { data } = api.post.getAllPapers.useQuery("cm8vm5asq002j132cbt5yuau4");
  console.log(data, "examData");
  return (
    <div className="w-full max-w-xs">
      {data ? (
        <p className="truncate">Your most recent post</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
    </div>
  );
};

export default page;
