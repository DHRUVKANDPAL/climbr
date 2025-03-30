"use client"
import { api } from '@/trpc/react'
import React, { useState } from 'react'

const page = () => {
   const utils = api.useUtils();
     const [name, setName] = useState("");
     const { data: examData } = api.post.getAllPapers.useQuery(
       "cm8vyx0j400019wa9nezb0q66",
     );
     console.log(examData, "examData")
     return (
       <div className="w-full max-w-xs">
         {examData ? (
           <p className="truncate">Your most recent post</p>
         ) : (
           <p>You have no posts yet.</p>
         )}
         
       </div>
     );
}

export default page