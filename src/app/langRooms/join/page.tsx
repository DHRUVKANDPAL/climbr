"use client";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { PageClientImpl } from "./[roomName]/PageClientImpl";

type Props = {
  searchParams: {
    language1: string;
    language2: string;
  };
};

export default function Page({ searchParams }: Props) {
  const utils = api.useUtils();
  const router = useRouter();

  const { data, isLoading, error } = api.post.mapUserToLanguageRoom.useQuery(
    searchParams,
    {
      refetchOnWindowFocus: false,
      staleTime: 60000, 
    },
  );

  const currentIndexRef = useRef(0);

  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      currentIndexRef.current = randomIndex;
      setCurrentRoomIndex(randomIndex);
      console.log("Initialized with random room index:", randomIndex);
    }
  }, [data]);

  useEffect(() => {
    console.log("Component mounted");
    console.log("Available rooms:", data?.length ?? 0);

    return () => console.log("Component unmounted");
  }, [data]);

  const handleNextRoom = useCallback(() => {
    if (!data || data.length === 0) return;

    console.log("Moving to next room");
    console.log("Current index:", currentIndexRef.current);

    const nextIndex = (currentIndexRef.current + 1) % data.length;
    currentIndexRef.current = nextIndex;

    setCurrentRoomIndex(nextIndex);

    console.log("New index:", nextIndex);
    console.log("New room ID:", data[nextIndex]?.roomId);
  }, [data]);

  if (isLoading) {
    return <div>Loading language rooms...</div>;
  }

  if (error) {
    return <div>Error loading rooms: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No language rooms found. Please try different languages.</div>;
  }

  const currentRoom = data[currentRoomIndex];

  if (!currentRoom) {
    return <div>Invalid room selection. Please refresh the page.</div>;
  }

  return (
    <div className="h-screen">
      <PageClientImpl
        key={`room-${currentRoom.roomId}`} 
        roomName={currentRoom.roomId}
        region={""}
        hq={true}
        codec={"vp9"}
        language={searchParams.language1 + "," + searchParams.language2}
        setNext={handleNextRoom}
      />
    </div>
  );
}
