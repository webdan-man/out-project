'use client'
import Image from "next/image";
import {useSession} from "next-auth/react";
import {Typography} from "antd";
const { Text } = Typography;

export default function ProfilePage() {
    const {data} = useSession();
    return (
        <div className='flex flex-col gap-4'>
            {data?.user?.image && data?.user?.name &&  (
                <>
                    <p className="font-medium">User Image:</p>
                    <Image src={data?.user?.image} alt={data?.user?.name } width={100} height={100} className="rounded-md ml-2"/>
                </>
            )}
            {data?.user?.name && (
                <>
                    <p className="font-medium">User Name:</p>
                    <p className="ml-2"><Text ellipsis={true}>{data.user.name}</Text></p>
                </>
            )}
            {data?.user?.email && (
                <>
                    <p className="font-medium">User Email:</p>
                    <p className="ml-2"><Text ellipsis={true}>{data.user.email}</Text></p>
                </>
            )}
        </div>
    )
}