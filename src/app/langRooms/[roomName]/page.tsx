import * as React from 'react';
import { PageClientImpl } from './PageClientImpl';
import { isVideoCodec } from '@/lib/types';
import "../../../styles/main.module.css";
import "@livekit/components-styles";
import "@livekit/components-styles/prefabs";
export default async function Page({
  params,
  searchParams,
}: {
  params: { roomName: string };
  searchParams: {
    region?: string;
    hq?: string;
    codec?: string;
  };
}) {
  const codec: "vp9" | "vp8" | "h264" | "av1" =
    typeof searchParams.codec === 'string' && isVideoCodec(searchParams.codec)
      ? (searchParams.codec as "vp9" | "vp8" | "h264" | "av1")
      : 'vp9';
  const hq = searchParams.hq === 'true' ? true : false;
  // console.log(params.roomName) 
  const roomname=await params.roomName;
  const region=await searchParams.region;
  return (
    <div className='h-screen'>
      <PageClientImpl
        roomName={roomname}
        region={region}
        hq={hq}
        codec={codec}
        language='en'
      />
    </div>
  );
}
