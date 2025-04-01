import { db } from "@/server/db";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { roomName } = body;

  await db.languageRooms.delete({
   where:{
      roomId: roomName,
   }
  })

  return new Response("Disconnected from the room successfully", { status: 200 });

}