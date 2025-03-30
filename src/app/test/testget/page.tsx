"use client"
import { api } from '@/trpc/react'
import React, { useState } from 'react'

const page = () => {
   

   const utils = api.useUtils();
     const [name, setName] = useState("");
     const { data:latestPost } = api.post.getAllPapers.useQuery(
       "cm8vc8tsj0003m50mc49yukds",
     );
     console.log(latestPost, "latestPost")
   
     return (
       <div className="w-full max-w-xs">
         {latestPost ? (
           <p className="truncate">Your most recent post</p>
         ) : (
           <p>You have no posts yet.</p>
         )}
         
       </div>
     );
}

export default page