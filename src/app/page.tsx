'use client'
import {useSession} from "next-auth/react";

export default function Home() {
  const {data} = useSession();

  return (
      <h1 className="font-medium text-xl">HI {data?.user?.name}!</h1>
  )
}
